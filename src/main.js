import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// svg图标
import 'virtual:svg-icons-register'
// easy-process
import ProcessDesigner from '@/easy-process/index'

const app = createApp(App)
app.use(router)
app.use(ProcessDesigner, {
    nodeImplPath: import.meta.glob('@/views/node/**'),
    nodeConfig: [
        {
            "nodeType": "start",
            "nodeName": "发起人",
            "config": {
                name: '张三'
            },
        },
        {
            "nodeType": "task",
            "nodeName": "审批人",
        },
        {
            "nodeType": "notify",
            "nodeName": "抄送",
            "color": "#FFFFFF", // 节点标题颜色
            "bgColor": "#8225e4", // 节点标题背景颜色
            "hasDrawer": true, // 节点是否可以进行配置
            "icon": { // 图标
                "name": "icon-ep-notify", // 图标名
                "color": "#8225e4" // 颜色
            },
            "config": {
                name: '主管'
            },
        }
    ]
})
app.mount('#app')
