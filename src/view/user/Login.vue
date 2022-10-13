<template>
  <div class="main">
    <!-- <a-form id="formLogin" class="user-layout-login">
      <a-tabs :activeKey="customActiveKey" centered animated @change="handleTabClick">
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-alert v-if="isLoginError" type="error" style="margin-bottom: 24px;" showIcon message="账户或密码错误" />

          <a-form-item>
            <a-input size="large" type="text" placeholder="账户">
              <template #prefix>
                <user-outlined :style="inputIconStyle" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password size="large" type="text" placeholder="密码">
              <template #prefix>
                <lock-outlined :style="inputIconStyle" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="tab2" tab="手机号登陆">
          TODO: 手机号登陆
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox>自动登录</a-checkbox>
        <router-link :to="{ path: '/404',}" class="forge-password" style="float: right;">
          TODO: 忘记密码
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button block size="large" type="primary" htmlType="submit" class="login-button">确定</a-button>
        <a-button block size="large" type="primary" class="login-button" style="margin-top:24px"
          @click="changeTheme(ThemeType.light)">浅色</a-button>
        <a-button block size="large" type="primary" class="login-button" style="margin-top:24px"
          @click="changeTheme(ThemeType['dark-compact'])">深色收缩</a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>其他登录方式</span>
        <a href="javascript:void(0);">
          <icon-font type="icon-admin-wechat-fill" class="item-icon" />
        </a>
        <a href="javascript:void(0);">
          <icon-font type="icon-admin-zhifubaozhifu" />
        </a>
      </div>
    </a-form> -->
  </div>
</template>

<script lang="ts">
// import { defineComponent, ref } from 'vue';
// // import { createFromIconfontCN, UserOutlined, LockOutlined } from '@ant-design/icons-vue'
// import { ThemeType, changeTheme } from '@/core/theme'

// // const IconFont = createFromIconfontCN({
// //   scriptUrl: '//at.alicdn.com/t/c/font_3683245_eh00olhhlx4.js',
// //   // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
// // });

// export default defineComponent({
//   name: 'Login',
//   components: {
//     // UserOutlined,
//     // LockOutlined,
//     // IconFont,
//   },
//   setup() {

//     /* #region tabs */
//     let customActiveKey = ref<string>('tab1')
//     function handleTabClick(key: string) {
//       customActiveKey.value = key
//     }
//     /* #endregion */

//     let isLoginError = ref<boolean>(false)

//     const inputIconStyle = {
//       color: 'var(--ant-primary-color)'
//     }

//     const otherLoginIconStyle = {
//       color: 'var(--ant-success-color)',
//     }

//     return {
//       customActiveKey,
//       handleTabClick,
//       isLoginError,
//       inputIconStyle,
//       otherLoginIconStyle,
//       ThemeType,
//       changeTheme
//     }
//   }
// })
</script>

<style lang="less" scoped>

.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}

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
    font-size: 44px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
