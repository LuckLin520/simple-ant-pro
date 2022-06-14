<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :handleMediaQuery="q => q"
    :handleCollapse="handleCollapse"
    :i18n-render="t => t"
    v-bind="defaultSettings"
  >
    <template v-slot:menuHeaderRender>
      <div>
        <img src="@/assets/logo.svg?inline" class="logo" alt="logo" />
        <h1>{{ defaultSettings.title }}</h1>
      </div>
    </template>

    <template v-slot:rightContentRender>
      <right-content :top-menu="false" :is-mobile="false" :theme="defaultSettings.theme" />
    </template>
    <!-- custom footer / 自定义Footer -->
    <template v-slot:footerRender>
      <global-footer />
    </template>

    <page-header-wrapper>
      <router-view />
    </page-header-wrapper>
  </pro-layout>
</template>

<script>
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'

export default {
  name: 'BasicLayout',
  components: {
    ProLayout,
    PageHeaderWrapper,
    RightContent,
    GlobalFooter
  },
  data() {
    return {
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      defaultSettings
    }
  },
  computed: {
    mainMenu() {
      return this.$store.state.user.routes
    }
  },
  created() {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.dispatch('app/setSideCollapsed', this.collapsed)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    handleCollapse(val) {
      this.collapsed = val
    }
  }
}
</script>

<style lang="less">
.ant-pro-global-header-index-right {
  margin-right: 8px;

  &.ant-pro-global-header-index-dark {
    .ant-pro-global-header-index-action {
      color: hsl(0deg 0% 100% / 85%);

      &:hover {
        background: #1890ff;
      }
    }
  }

  .ant-pro-account-avatar {
    display: flex;
    align-items: center;
    .antd-pro-global-header-index-avatar {
      margin-right: 8px;
      color: @primary-color;
      vertical-align: top;
      background: rgb(255 255 255 / 85%);
    }
  }

  .menu {
    .anticon {
      margin-right: 8px;
    }

    .ant-dropdown-menu-item {
      min-width: 100px;
    }
  }
}
.ant-page-header-heading {
  display: none;
}
</style>
