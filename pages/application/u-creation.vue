<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
const UserNamespace = namespace('user')

@Component
export default class UCreation extends Vue {
  @UserNamespace.Action('ACTION_GET_INFO')
  ACTION_GET_INFO!: () => void
  @UserNamespace.Getter('username')
  username!: string
  @UserNamespace.Getter('email')
  email!: string
}
</script>
