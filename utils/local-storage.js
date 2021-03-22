import Cookies from 'js-cookie'

export const TokenKey = 'User-Token'

export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export const getStore = (name, parse) => {
  if (!name) return
  let value = window.localStorage.getItem(name)
  if (parse) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      value = null
    }
  }
  return value
}

export const removeStore = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

export const getToken = function () {
  return Cookies.get(TokenKey)
}

export const setToken = function (token) {
  return Cookies.set(TokenKey, token)
}

export const removeToken = function () {
  Cookies.remove(TokenKey)
}
