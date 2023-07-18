import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.component('svg-icon', SvgIcon)
app.mount('#app')
