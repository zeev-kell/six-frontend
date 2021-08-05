import { Store } from 'vuex'
import { getModule } from 'nuxt-property-decorator'
import User from '~/store/users'

/* eslint import/no-mutable-exports: 0 */
let userStore: User

function initialiseStores(store: Store<any>): void {
  userStore = getModule(User, store)
}

export { initialiseStores, userStore }
