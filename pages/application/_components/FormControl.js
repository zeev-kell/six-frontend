const DISABLED = 'DISABLED'
const VALID = 'VALID'
function _find(control, path, delimiter) {
  if (path == null) return null
  if (!Array.isArray(path)) {
    path = path.split(delimiter)
  }
  if (Array.isArray(path) && path.length === 0) return null
  return path.reduce((v, name) => {
    if (v instanceof FormGroup) {
      return v.controls[name] || null
    }
    if (v instanceof FormArray) {
      return v.at(name) || null
    }
    return null
  }, control)
}
class AbstractControl {
  constructor() {
    this.value = undefined
  }

  get parent() {
    return this._parent
  }

  get disabled() {
    return this.status === DISABLED
  }

  get enabled() {
    return this.status !== DISABLED
  }

  disable(opts = {}) {
    this.status = DISABLED
    this._forEachChild((control) => {
      control.disable(Object.assign({}, opts, { onlySelf: true }))
    })
  }

  enable(opts = {}) {
    this.status = VALID
    this._forEachChild((control) => {
      control.enable(Object.assign({}, opts, { onlySelf: true }))
    })
  }

  setParent(parent) {
    this._parent = parent
  }

  get(path) {
    return _find(this, path, '.')
  }

  get root() {
    let x = this
    while (x._parent) {
      x = x._parent
    }
    return x
  }

  toString() {
    const json = { value: this.value, enabled: this.enabled, disabled: this.disabled, status: this.status }
    // eslint-disable-next-line no-console
    console.log(json)
    return JSON.stringify(json)
  }
}
class FormControl extends AbstractControl {
  constructor(formState = null) {
    super()
    this.value = formState
  }

  setValue(value, options = {}) {
    this.value = value
  }

  patchValue(value, options = {}) {
    this.setValue(value, options)
  }

  reset(formState = null, options = {}) {
    this.setValue(this.value, options)
  }

  _forEachChild(cb) {}
}
class FormGroup extends AbstractControl {
  constructor(controls) {
    super()
    this.controls = controls
    this._setUpControls()
  }

  registerControl(name, control) {
    if (this.controls[name]) return this.controls[name]
    this.controls[name] = control
    control.setParent(this)
    return control
  }

  addControl(name, control) {
    this.registerControl(name, control)
  }

  removeControl(name) {
    delete this.controls[name]
  }

  setControl(name, control) {
    delete this.controls[name]
    if (control) this.registerControl(name, control)
  }

  contains(controlName) {
    // eslint-disable-next-line no-prototype-builtins
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled
  }

  setValue(value, options = {}) {
    this._checkAllValuesPresent(value)
    Object.keys(value).forEach((name) => {
      this._throwIfControlMissing(name)
      this.controls[name].setValue(value[name], { onlySelf: true, emitEvent: options.emitEvent })
    })
  }

  patchValue(value, options = {}) {
    Object.keys(value).forEach((name) => {
      if (this.controls[name]) {
        this.controls[name].patchValue(value[name], { onlySelf: true, emitEvent: options.emitEvent })
      }
    })
  }

  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value[name], { onlySelf: true, emitEvent: options.emitEvent })
    })
  }

  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control instanceof FormControl ? control.value : control.getRawValue()
      return acc
    })
  }

  _syncPendingControls() {
    return this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated
    })
  }

  _throwIfControlMissing(name) {
    if (!Object.keys(this.controls).length) {
      throw new Error(`
        There are no form controls registered with this group yet.  If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `)
    }
    if (!this.controls[name]) {
      throw new Error(`Cannot find form control with name: ${name}.`)
    }
  }

  _forEachChild(cb) {
    Object.keys(this.controls).forEach((k) => cb(this.controls[k], k))
  }

  _setUpControls() {
    this._forEachChild((control) => {
      control.setParent(this)
    })
  }

  _updateValue() {
    this.value = this._reduceValue()
  }

  _anyControls(condition) {
    let res = false
    this._forEachChild((control, name) => {
      res = res || (this.contains(name) && condition(control))
    })
    return res
  }

  _reduceValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      if (control.enabled || this.disabled) {
        acc[name] = control.value
      }
      return acc
    })
  }

  _reduceChildren(initValue, fn) {
    let res = initValue
    this._forEachChild((control, name) => {
      res = fn(res, control, name)
    })
    return res
  }

  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false
      }
    }
    return Object.keys(this.controls).length > 0 || this.disabled
  }

  _checkAllValuesPresent(value) {
    this._forEachChild((control, name) => {
      if (value[name] === undefined) {
        throw new Error(`Must supply a value for form control with name: '${name}'.`)
      }
    })
  }
}
class FormArray extends AbstractControl {
  constructor(controls) {
    super()
    this.controls = controls
    this._setUpControls()
  }

  push(control) {
    this.controls.push(control)
    this._registerControl(control)
  }

  insert(index, control) {
    this.controls.splice(index, 0, control)
    this._registerControl(control)
  }

  removeAt(index) {
    this.controls.splice(index, 1)
  }

  setControl(index, control) {
    this.controls.splice(index, 1)
    if (control) {
      this.controls.splice(index, 0, control)
      this._registerControl(control)
    }
  }

  get length() {
    return this.controls.length
  }

  setValue(value, options = {}) {
    this._checkAllValuesPresent(value)
    value.forEach((newValue, index) => {
      this._throwIfControlMissing(index)
      this.at(index).setValue(newValue, { onlySelf: true, emitEvent: options.emitEvent })
    })
  }

  patchValue(value, options = {}) {
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, { onlySelf: true, emitEvent: options.emitEvent })
      }
    })
  }

  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], { onlySelf: true, emitEvent: options.emitEvent })
    })
  }

  getRawValue() {
    return this.controls.map((control) => {
      return control instanceof FormControl ? control.value : control.getRawValue()
    })
  }

  _syncPendingControls() {
    return this.controls.reduce((updated, child) => {
      return child._syncPendingControls() ? true : updated
    }, false)
  }

  _throwIfControlMissing(index) {
    if (!this.controls.length) {
      throw new Error(`
        There are no form controls registered with this array yet.  If you're using ngModel,
        you may want to check next tick (e.g. use setTimeout).
      `)
    }
    if (!this.at(index)) {
      throw new Error(`Cannot find form control at index ${index}`)
    }
  }

  _forEachChild(cb) {
    this.controls.forEach((control, index) => {
      cb(control, index)
    })
  }

  _updateValue() {
    this.value = this.controls.filter((control) => control.enabled || this.disabled).map((control) => control.value)
  }

  _anyControls(condition) {
    return this.controls.some((control) => control.enabled && condition(control))
  }

  _setUpControls() {
    this._forEachChild((control) => this._registerControl(control))
  }

  _checkAllValuesPresent(value) {
    this._forEachChild((control, i) => {
      if (value[i] === undefined) {
        throw new Error(`Must supply a value for form control at index: ${i}.`)
      }
    })
  }

  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled) return false
    }
    return this.controls.length > 0 || this.disabled
  }

  _registerControl(control) {
    control.setParent(this)
  }
}

export { FormGroup, FormArray, FormControl }
