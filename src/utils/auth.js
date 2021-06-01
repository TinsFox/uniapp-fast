import defaultSettings from '@/setting'
const {cachePrefixKey,tokenPrefixKey} =defaultSettings
const key = `${cachePrefixKey}/${tokenPrefixKey}`
export function getToken() {
  return uni.getStorageSync(key)
}

export function setToken(token) {
  return uni.setStorageSync(key, token)
}

export function removeToken() {
  return uni.removeStorageSync(key)
}
