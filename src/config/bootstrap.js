import storage from 'store'
import { updateTheme } from '@ant-design-vue/pro-layout'
import store from '@/store'
import defaultSetting from './defaultSetting'

let settings = storage.get('settings') || defaultSetting
updateTheme(settings.primaryColor)
store.dispatch('common/saveSettings', settings)
