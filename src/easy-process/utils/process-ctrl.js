
/**
 * 流程控制器
 * @returns {{}}
 */
export const createProcessCtrl = () => {
    let ctrl = {};
    // 节点信息
    ctrl.nodes = new Map()

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

    return ctrl
}
