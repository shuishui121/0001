import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import jaJP from './locales/ja-JP'

export type LocaleType = 'zh-CN' | 'en-US' | 'ja-JP'

export const LOCALE_OPTIONS: { value: LocaleType; label: string; flag: string }[] = [
  { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'ja-JP', label: '日本語', flag: '🇯🇵' }
]

const STORAGE_KEY = 'moja-locale'

function getInitialLocale(): LocaleType {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'zh-CN' || saved === 'en-US' || saved === 'ja-JP') {
    return saved
  }
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getInitialLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP
  }
})

export function setLocale(locale: LocaleType) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

export function getLocale(): LocaleType {
  return i18n.global.locale.value as LocaleType
}

export default i18n
