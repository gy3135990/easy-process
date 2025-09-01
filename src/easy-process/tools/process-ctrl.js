
/**
 * 流程控制器
 * @returns {{}}
 */
export const createProcessCtrl = () => {
    let ctrl = {};
    // 节点信息
    ctrl.nodes = new Map()
    // 事件绑定
    ctrl.events = new Map()

    // 添加节点
    ctrl.addNode = (nodeId, nodeConfig) => {
        ctrl.nodes.set(nodeId, nodeConfig)
    }

    // 获取节点
    ctrl.getNode = (nodeId) => {
        return ctrl.nodes.get(nodeId)
    }

    // 移除节点
    ctrl.removeNode = (nodeId) => {
        ctrl.nodes.delete(nodeId)
    }

    // 绑定事件
    ctrl.bindEvent = (key, callback) => {
        if (key && callback && typeof callback === 'function') {
            ctrl.events.set(key, callback)
        }
    }

    // 解除绑定事件
    ctrl.unbindEvent = (key) => {
        ctrl.events.delete(key)
    }

    // 获取绑定事件
    ctrl.getBindEvent = (key) => {
        return ctrl.events.get(key)
    }
    // 触发事件
    ctrl.triggerEvent = (key, params) => {
        let f = ctrl.getBindEvent(key)
        if (f) {
            return f(params)
        }
        return null
    }

    return ctrl
}
