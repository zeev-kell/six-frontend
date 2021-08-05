/* eslint-disable camelcase */
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'system',
  stateFactory: true,
  namespaced: true,
})
export default class SystemModule extends VuexModule {
  bodyClass = ''
  isMobile = false

  @Mutation
  SET_BODY_CLASS(bodyClass: string) {
    this.bodyClass = bodyClass
  }
  @Mutation
  SET_MOBILE() {
    this.isMobile = true
  }
}
