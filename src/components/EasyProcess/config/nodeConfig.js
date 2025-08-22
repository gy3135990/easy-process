import { ROUTER, CONDITION, START, APPROVER, NOTIFY } from "./nodeType"

// 节点配置
export const nodeConfig = {}

// 路由节点配置
nodeConfig[ROUTER] = {
    "title": "条件分支", // 节点标题
    "canAdd": true, // 节点是否可以增加
    "hasDrawer": false, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "router", // 图标名
        "color": "#3CB371" // 颜色
    },
    "defaultNode": { // 默认节点结构，用于添加节点时
        "nodeName": "路由",
        "nodeType": ROUTER,
        "config": {},
        "childNode": null,
        "conditionNodes": [
            {
                "nodeName": "条件",
                "nodeType": "condition",
                "config": {},
                "childNode": null
            },
            {
                "nodeName": "条件",
                "nodeType": "condition",
                "config": {},
                "childNode": null
            }
        ],
    }
}

// 条件节点配置
nodeConfig[CONDITION] = {
    "title": "条件", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#3CB371", // 节点标题背景颜色
    "canAdd": false, // 节点是否可以增加
    "canRemoved": true, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "condition", // 图标名
        "color": "#3CB371" // 颜色
    },
    "defaultNode": {
        "nodeName": "条件",
        "nodeType": CONDITION,
        "config": {},
        "childNode": {}
    },
}

// 发起人节点配置
nodeConfig[START] = {
    "title": "发起人", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#1e83e9", // 节点标题背景颜色
    "canAdd": false, // 节点是否可以增加
    "canRemoved": false, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "start", // 图标名
        "color": "#1e83e9" // 颜色
    },
    "defaultNode": { // 默认节点结构，用于添加节点时
        "nodeName": "发起人",
        "nodeType": START,
        "config": {},
        "childNode": null,
    }
}

// 审核人节点配置
nodeConfig[APPROVER] = {
    "title": "审核人", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#FF8C00", // 节点标题背景颜色
    "canAdd": true, // 节点是否可以增加
    "canRemoved": true, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "approver", // 图标名
        "color": "#FF8C00" // 颜色
    },
    "defaultNode": { // 默认节点结构，用于添加节点时
        "nodeName": "审批人",
        "nodeType": APPROVER,
        "config": {},
        "childNode": null
    }
}

// 抄送人节点配置
nodeConfig[NOTIFY] = {
    "title": "抄送人", // 节点标题
    "color": "#FFFFFF", // 节点标题颜色
    "bgColor": "#808000", // 节点标题背景颜色
    "canAdd": true, // 节点是否可以增加
    "canRemoved": true, // 节点是否能够移除
    "hasDrawer": true, // 节点是否可以进行配置
    "icon": { // 图标
        "name": "notify", // 图标名
        "color": "#808000" // 颜色
    },
    "defaultNode": { // 默认节点结构，用于添加节点时
        "nodeName": "抄送人",
        "nodeType": NOTIFY,
        "config": {},
        "childNode": null
    }
}
