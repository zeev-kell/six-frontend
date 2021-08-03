export function update(resourceId, data) {
  delete data._isLoaded
  delete data.versions
  return this.$$axios.$put('/v2/pipe/' + resourceId, data)
}
