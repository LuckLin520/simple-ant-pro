<template>
  <div class="main">
    <a-form class="user-layout-login" :form="form" @submit.prevent="handleSubmit">
      <a-tabs :activeKey="activeKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }" @change="handleTabClick">
        <a-tab-pane key="tab1" tab="账户密码登录">
          <a-alert v-if="errorMsg" type="error" showIcon style="margin-bottom: 24px" :message="errorMsg" />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账号"
              v-decorator="['username', { rules: [{ required: true, message: '请输入账号' }], validateTrigger: 'change' }]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="密码"
              v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登录">
          <a-alert v-if="errorMsg" type="error" showIcon style="margin-bottom: 24px" :message="errorMsg" />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-decorator="[
                'mobile',
                { rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入手机号' }], validateTrigger: 'change' }
              ]"
            >
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="验证码"
                  v-decorator="['captcha', { rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur' }]"
                >
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click="getCaptcha"
                v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">记住我</a-checkbox>
        <a style="float: right">忘记密码</a>
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button size="large" type="primary" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn" htmlType="submit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      activeKey: 'tab1',
      errorMsg: '',
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      }
    }
  },
  methods: {
    handleTabClick(key) {
      this.activeKey = key
      this.errorMsg = ''
    },
    handleSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          if (this.activeKey === 'tab1') {
            const { username, password, rememberMe } = values
            const data = await this.$store.dispatch('user/login', {
              username,
              password,
              rememberMe
            })
            if (data.code === 200) {
              this.$notification.success({ message: '登录成功' })
              this.$router.push('/')
            } else {
              this.errorMsg = data.message
            }
          } else {
            // eslint-disable-next-line no-unused-vars
            const { mobile, captcha } = values
          }
        }
      })
    },
    getCaptcha() {}
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
