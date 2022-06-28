<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :handleMediaQuery="q => q"
    :handleCollapse="e => (collapsed = e)"
    :i18n-render="i18nRender"
    v-bind="settings"
  >
    <template v-slot:menuHeaderRender>
      <div>
        <img src="@/assets/logo.svg?inline" class="logo" alt="logo" />
        <h1>Simple Pro</h1>
      </div>
    </template>

    <setting-drawer :settings="settings" @change="handleSettingChange">
      <div style="margin: 12px 0">
        <a-button type="primary" block @click="$store.dispatch('common/resetSetting')">重置</a-button>
      </div>
    </setting-drawer>
    <template v-slot:rightContentRender>
      <right-content :top-menu="false" :is-mobile="false" :theme="settings.theme" />
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
import { SettingDrawer } from '@ant-design-vue/pro-layout'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import { i18nRender } from '@/locales'
const CONTENT_WIDTH_TYPE = {
  Fluid: 'Fluid',
  Fixed: 'Fixed'
}
export default {
  name: 'BasicLayout',
  components: {
    ProLayout,
    PageHeaderWrapper,
    SettingDrawer,
    RightContent,
    GlobalFooter
  },
  data() {
    return {
      isProd: process.env.NODE_ENV === 'production',
      menus: [],
      // 侧栏收起状态
      collapsed: false
    }
  },
  computed: {
    mainMenu() {
      return this.$store.state.user.routes
    },
    settings() {
      return this.$store.state.common.settings
    }
  },
  created() {
    const routes = this.mainMenu.find(item => item.path === '/')
    this.menus = (routes && routes.children) || []
  },
  methods: {
    i18nRender,
    handleSettingChange({ type, value }) {
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
      this.$store.dispatch('common/saveSettings', this.settings)
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
.ant-drawer {
  .ant-pro-setting-drawer-content {
    .ant-alert-warning {
      display: none;
    }
    // .ant-btn-block:nth-child(1) {
    //   display: none;
    // }
  }

  // 设置按钮大小
  .ant-pro-setting-drawer-handle {
    width: 24px;
    height: 24px;
  }

  // vue2不支持暗黑模式
  .ant-pro-setting-drawer-block-checbox-item:nth-child(3) {
    display: none;
  }
}
</style>
