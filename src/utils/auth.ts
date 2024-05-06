import { jwtDecode } from 'jwt-decode'

const TOKEN_KEY = 'access_token'

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) as string
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// 获取用户信息
export function getUserInfo() {
  return jwtDecode(getToken())
}