// 节点配置
export const nodeConfig = {
    router: { // 路由
        "title": "条件分支", // 节点标题
        "canAdd": true, // 节点是否可以增加
        "hasDrawer": false,
        "icon": { // 图标
            "className": "router", // 类名
            "color": "#3CB371" // 颜色
        },
        "defaultNode": { // 默认节点结构，用于添加节点时
            "nodeName": "路由",
            "nodeType": "router",
            "config": {},
            "childNode": null,
            "conditionNodes": [
                {
                    "nodeName": "条件1",
                    "nodeType": "condition",
                    "config": {},
                    "childNode": {}
                },
                {
                    "nodeName": "条件2",
                    "nodeType": "condition",
                    "config": {},
                    "childNode": {}
                }
            ],
        }
    },
    start: { // 发起人
        "title": "发起人", // 节点标题
        "color": "#FFFFFF", // 节点标题颜色
        "bgColor": "#1e83e9", // 节点标题背景颜色
        "canAdd": false, // 节点是否可以增加
        "canRemoved": false, // 节点是否能够移除
        "hasDrawer": true, // 节点是否可以进行配置
        "icon": { // 图标
            "className": "start", // 类名
            "color": "#1e83e9" // 颜色
        },
        "defaultNode": { // 默认节点结构，用于添加节点时
            "nodeName": "发起人",
            "nodeType": "start",
        }
    },
    approver: { // 审核人
        "title": "审核人", // 节点标题
        "color": "#FFFFFF", // 节点标题颜色
        "bgColor": "#FF8C00", // 节点标题背景颜色
        "canAdd": true, // 节点是否可以增加
        "canRemoved": true, // 节点是否能够移除
        "hasDrawer": true,
        "icon": { // 图标
            "className": "approver", // 类名
            "color": "#FF8C00" // 颜色
        },
        "defaultNode": { // 默认节点结构，用于添加节点时
            "nodeName": "审批人",
            "nodeType": "approver",
            "config": {},
            "childNode": null
        }
    },
    condition: { // 条件
        "title": "条件", // 节点标题
        "color": "#FFFFFF", // 节点标题颜色
        "bgColor": "#3CB371", // 节点标题背景颜色
        "canAdd": false, // 节点是否可以增加
        "canRemoved": true, // 节点是否能够移除
        "hasDrawer": true,
        "icon": { // 图标
            "className": "condition", // 类名
            "color": "#3CB371" // 颜色
        },
        "defaultNode": { // 默认节点结构，用于添加节点时

        }
    },
    notify: { // 抄送人
        "title": "抄送人", // 节点标题
        "color": "#FFFFFF", // 节点标题颜色
        "bgColor": "#808000", // 节点标题背景颜色
        "canAdd": true, // 节点是否可以增加
        "canRemoved": true, // 节点是否能够移除
        "hasDrawer": true,
        "icon": { // 图标
            "className": "notify", // 类名
            "color": "#808000" // 颜色
        },
        "defaultNode": { // 默认节点结构，用于添加节点时
            "nodeName": "抄送人",
            "nodeType": "notify",
            "config": {},
            "childNode": null
        }
    },
}
