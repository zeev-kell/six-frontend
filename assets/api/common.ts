import BaseModule from '@/assets/api/BaseModule'
import { CategoryModel } from '@/types/model/Common'

export class Module extends BaseModule {
  getTags(type: string): Promise<CategoryModel[]> {
    return this.$axios.$get<CategoryModel[]>('/v1/tags', { params: { type } })
  }
}

export type ModuleType = InstanceType<typeof Module>
