import { Module, VuexModule } from 'vuex-module-decorators'

@Module({
  stateFactory: true,
  namespaced: false,
})
export default class RootModule extends VuexModule {
  bodyClass = ''
  helpMenus = []
  isMobile = false
  auth: any

  get username() {
    return this.auth?.user?.uname
  }
  get userId() {
    return this.auth?.user?.uid
  }
  get loggedIn() {
    return this.auth?.loggedIn
  }
  get role() {
    return this.auth?.user?.admin
  }
  get permissions() {
    return this.auth?.user?.permissions
  }
}
