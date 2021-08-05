/* eslint-disable camelcase */
import { Action, Module, VuexModule } from 'vuex-module-decorators'
import Element from 'element-ui'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
  get username() {
    return this.context.rootState.auth?.user?.uname
  }
  get userId() {
    return this.context.rootState.auth?.user?.uid
  }
  get loggedIn() {
    return this.context.rootState.auth?.loggedIn
  }
  get role() {
    return this.context.rootState.auth?.user?.admin
  }
  get permissions() {
    return this.context.rootState.auth?.user?.permissions
  }

  // 登录，目前需要手动保存 user 信息
  @Action({ root: true, rawError: true })
  ACTION_LOGIN(data: any) {
    const $auth = this.context.rootState.$auth
    return $auth
      .loginWith('local', { data })
      .then((response: any) => {
        $auth.setUser(response.data.data)
        $auth.$storage.setLocalStorage('user', response.data.data)
      })
      .catch((e: any) => {
        Element.Message.error(e.msg || e)
        return Promise.reject(e)
      })
  }

  // 登出，无论是否异常，清空自身保存的 user 信息
  @Action({ root: true, rawError: true })
  ACTION_LOGOUT() {
    console.log(1111111111111111111111111)
    const $auth = this as any
    return $auth
      .logout()
      .finally(() => {
        $auth.setUser(null)
        $auth.$storage.setLocalStorage('user', undefined)
      })
      .catch(() => {
        $auth.setUser(null)
        $auth.$storage.setLocalStorage('user', null)
      })
  }
}
