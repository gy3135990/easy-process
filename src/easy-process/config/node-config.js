import { GATEWAY, CONDITION, START, TASK } from "./default-node-type.js"
import {copy} from "@/easy-process/utils/common-tools.js";

// 节点配置
const nodeConfig = {}

// 路由节点配置
nodeConfig[GATEWAY] = {
    "nodeType": GATEWAY,
    "nodeName": "网关", // 节点标题
    "enable": true, // 节点是否可用
    "canAdd": true, // 节点是否可以增加
    "hasDrawer": false, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "icon-ep-gateway", // 图标名
        "color": "#3CB371" // 颜色
    },
    "branchList": []
}

// 条件节点配置
nodeConfig[CONDITION] = {
    "nodeType": CONDITION,
    "nodeName": "条件", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#3CB371", // 节点标题背景颜色
    "enable": true, // 节点是否可用
    "canAdd": false, // 节点是否可以增加
    "canRemoved": true, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "icon-ep-condition", // 图标名
        "color": "#3CB371" // 颜色
    }
}

// 开始节点配置
nodeConfig[START] = {
    "nodeType": START,
    "nodeName": "开始", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#1e83e9", // 节点标题背景颜色
    "enable": true, // 节点是否可用
    "canAdd": false, // 节点是否可以增加
    "canRemoved": false, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "icon-ep-start", // 图标名
        "color": "#1e83e9" // 颜色
    }
}

// 任务节点配置
nodeConfig[TASK] = {
    "nodeType": TASK,
    "nodeName": "任务", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#FF8C00", // 节点标题背景颜色
    "enable": true, // 节点是否可用
    "canAdd": true, // 节点是否可以增加
    "canRemoved": true, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "icon-ep-task", // 图标名
        "color": "#FF8C00" // 颜色
    }
}

/**
 * 加载节点配置
 * @param externalConfig
 */
const loadNodeConfig = (externalConfig) => {
    if (externalConfig && externalConfig.length > 0) {
        externalConfig.forEach(item => {
            if (!item.nodeType) {
                throw new Error('加载自定义配置：nodeType节点类型不能为空')
            }
            if (!nodeConfig[item.nodeType] && !item.nodeName) {
                throw new Error('加载自定义配置：nodeName节点类型不能为空')
            }
            let node = nodeConfig[item.nodeType] || copy(nodeDefaultValue)
            nodeConfig[item.nodeType] =  { ...node, ...item}
        })
    }
}

// 默认节点值
const nodeDefaultValue = {
    "enable": true, // 节点是否可用
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#8225e4", // 节点标题背景颜色
    "canAdd": true, // 节点是否可以增加
    "canRemoved": true, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "icon-ep-task", // 图标名
        "color": "#8225e4" // 颜色
    }
}

export {nodeConfig, loadNodeConfig}