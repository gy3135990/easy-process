// 节点配置
export const nodeConfig = {
    router: { // 路由
        "hasDrawer": false
    },
    start: { // 发起人
        "title": "发起人", // 节点标题
        "color": "#FFFFFF", // 节点标题颜色
        "bgColor": "#1e83e9", // 节点标题背景颜色
        "canRemoved": false, // 节点是否能够移除
        "hasDrawer": true, // 节点是否可以进行配置
    },
    approver: { // 审核人
        "title": "审核人", // 节点标题
        "color": "#FFFFFF", // 节点标题颜色
        "bgColor": "#FF8C00", // 节点标题背景颜色
        "canRemoved": true, // 节点是否能够移除
        "hasDrawer": true,
    },
    condition: { // 条件
        "title": "条件", // 节点标题
        "color": "#FFFFFF", // 节点标题颜色
        "bgColor": "#3CB371", // 节点标题背景颜色
        "canRemoved": true, // 节点是否能够移除
        "hasDrawer": true,
    },
    notify: { // 抄送人
        "title": "抄送人", // 节点标题
        "color": "#FFFFFF", // 节点标题颜色
        "bgColor": "#808000", // 节点标题背景颜色
        "canRemoved": true, // 节点是否能够移除
        "hasDrawer": true,
    },
}
