import Vue from 'vue'

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
    this.enabled = true
    this._parent = undefined
  }

  get parent() {
    return this._parent
  }

  get root() {
    let x = this
    while (x._parent) {
      x = x._parent
    }
    return x
  }

  setParent(parent) {
    this._parent = parent
  }

  get(path) {
    return _find(this, path, '.')
  }

  disable(opts = {}) {
    this.enabled = false
    this._forEachChild((control) => {
      control.disable(Object.assign({}, opts, { onlySelf: true }))
    })
  }

  enable(opts = {}) {
    this.enabled = true
    this._forEachChild((control) => {
      control.enable(Object.assign({}, opts, { onlySelf: true }))
    })
    this.updateValueAndValidity({ onlySelf: true, emitEvent: opts.emitEvent })
  }

  updateValueAndValidity(opts = {}) {
    this._updateValue()
    if (this._parent && !opts.onlySelf) {
      this._parent.updateValueAndValidity(opts)
    }
  }

  _isBoxedValue(formState) {
    return (
      typeof formState === 'object' &&
      formState !== null &&
      Object.keys(formState).length === 2 &&
      'value' in formState &&
      'disabled' in formState
    )
  }

  toString() {
    const json = { value: this.value, enabled: this.enabled }
    // eslint-disable-next-line no-console
    // console.log(json)
    return JSON.stringify(json)
  }

  _forEachChild() {}
  _updateValue() {}
}

class FormControl extends AbstractControl {
  constructor(formState) {
    super()
    this._applyFormState(formState)
    this.type = 'FormControl'
  }

  setValue(value, options = {}) {
    this.value = value
    this.updateValueAndValidity(options)
  }

  patchValue(value, options = {}) {
    this.setValue(value, options)
  }

  _updateValue() {}

  reset(formState = null, options = {}) {
    this.setValue(formState, options)
  }

  _allControlsDisabled() {
    return !this.enabled
  }

  _forEachChild(cb) {}

  _applyFormState(formState) {
    if (this._isBoxedValue(formState)) {
      this.value = formState.value
      formState.disabled
        ? this.disable({ onlySelf: true, emitEvent: false })
        : this.enable({ onlySelf: true, emitEvent: false })
    } else {
      this.value = formState
    }
  }
}

class FormGroup extends AbstractControl {
  constructor(controls) {
    super()
    this.controls = controls
    this._setUpControls()
    this.updateValueAndValidity({ onlySelf: true, emitEvent: false })
    this.type = 'FormGroup'
  }

  registerControl(name, control) {
    if (this.controls[name]) {
      return this.controls[name]
    }
    Vue.set(this.controls, name, control)
    control.setParent(this)
    return control
  }

  addControl(name, control) {
    this.registerControl(name, control)
    this.updateValueAndValidity()
  }

  removeControl(name) {
    Vue.delete(this.controls, name)
    this.updateValueAndValidity()
  }

  contains(controlName) {
    // eslint-disable-next-line no-prototype-builtins
    return this.controls.hasOwnProperty(controlName) && this.controls[controlName].enabled
  }

  setValue(value, options = {}) {
    Object.keys(value).forEach((name) => {
      this._throwIfControlMissing(name)
      this.controls[name].setValue(value[name], { onlySelf: true, emitEvent: options.emitEvent })
    })
    this.updateValueAndValidity(options)
  }

  patchValue(value, options = {}) {
    Object.keys(value).forEach((name) => {
      if (this.controls[name]) {
        this.controls[name].patchValue(value[name], { onlySelf: true, emitEvent: options.emitEvent })
      }
    })
    this.updateValueAndValidity(options)
  }

  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value[name], { onlySelf: true, emitEvent: options.emitEvent })
    })
    this.updateValueAndValidity(options)
  }

  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control instanceof FormControl ? control.value : control.getRawValue()
      return acc
    })
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

  _reduceValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      if (control.enabled) {
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

  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false
      }
    }
    return Object.keys(this.controls).length > 0 || !this.enabled
  }
}

class FormArray extends AbstractControl {
  constructor(controls) {
    super()
    this.controls = controls
    this._setUpControls()
    this.updateValueAndValidity({ onlySelf: true, emitEvent: false })
    this.type = 'FormArray'
  }

  push(control) {
    this.controls.push(control)
    this._registerControl(control)
    this.updateValueAndValidity()
  }

  insert(index, control) {
    this.controls.splice(index, 0, control)
    this._registerControl(control)
    this.updateValueAndValidity()
  }

  removeAt(index) {
    this.controls.splice(index, 1)
    this.updateValueAndValidity()
  }

  setControl(index, control) {
    this.controls.splice(index, 1)
    if (control) {
      this.controls.splice(index, 0, control)
      this._registerControl(control)
    }
    this.updateValueAndValidity()
  }

  get length() {
    return this.controls.length
  }

  setValue(value, options = {}) {
    value.forEach((newValue, index) => {
      this._throwIfControlMissing(index)
      this.at(index).setValue(newValue, { onlySelf: true, emitEvent: options.emitEvent })
    })
    this.updateValueAndValidity(options)
  }

  patchValue(value, options = {}) {
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, { onlySelf: true, emitEvent: options.emitEvent })
      }
    })
    this.updateValueAndValidity(options)
  }

  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], { onlySelf: true, emitEvent: options.emitEvent })
    })
    this.updateValueAndValidity(options)
  }

  getRawValue() {
    return this.controls.map((control) => {
      return control instanceof FormControl ? control.value : control.getRawValue()
    })
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
    this.value = this.controls.filter((control) => control.enabled).map((control) => control.value)
  }

  _anyControls(condition) {
    return this.controls.some((control) => control.enabled && condition(control))
  }

  _setUpControls() {
    this._forEachChild((control) => this._registerControl(control))
  }

  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled) return false
    }
    return this.controls.length > 0 || !this.enabled
  }

  _registerControl(control) {
    control.setParent(this)
  }
}

export { FormGroup, FormArray, FormControl }
