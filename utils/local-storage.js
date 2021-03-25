import Cookies from 'js-cookie'

export const TokenKey = 'User-Token'

export const getToken = function () {
  return Cookies.get(TokenKey)
}

export const setToken = function (token) {
  return Cookies.set(TokenKey, token)
}

export const removeToken = function () {
  Cookies.remove(TokenKey)
}
