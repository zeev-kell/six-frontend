import BaseModule from '@/assets/api/BaseModule'

export class Module extends BaseModule {
  getTags(params?: any): Promise<any> {
    return this.$axios.$get<any>('/v1/tags', { params })
  }
}

export type ModuleType = InstanceType<typeof Module>
