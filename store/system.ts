/* eslint-disable camelcase */
import { Module, VuexMutation, VuexModule } from 'nuxt-property-decorator'

@Module({
  name: 'system',
  stateFactory: true,
  namespaced: true,
})
export default class SystemModule extends VuexModule {
  bodyClass = ''
  isMobile = false

  @VuexMutation
  SET_BODY_CLASS(bodyClass: string) {
    this.bodyClass = bodyClass
  }
  @VuexMutation
  SET_MOBILE() {
    this.isMobile = true
  }
}
