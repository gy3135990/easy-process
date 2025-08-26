import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// svg图标
import 'virtual:svg-icons-register'
// import svg-icon from '@/easy-process/components/svg-icon'

import ProcessDesigner from '@/easy-process/index'
import path from 'path-browserify'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(ProcessDesigner, {

})
// app.component('svg-icon', svg-icon)
app.mount('#app')
