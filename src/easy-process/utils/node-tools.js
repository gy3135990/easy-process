import {nodeConfig} from '../config/node-config.js'
import {START, GATEWAY, CONDITION} from '../config/default-node-type.js'
import {getUUID} from '../utils/common-tools.js'

/**
 * 创建节点
 * @param nodeType
 */
export const createNode = (nodeType = START) => {
    let config = nodeConfig[nodeType]
    let node = generateNodeObj(config)
    if (nodeType === GATEWAY) {
        let conditionConfig = nodeConfig[CONDITION]
        node.branchList = [generateNodeObj(conditionConfig), generateNodeObj(conditionConfig)]
    }
    return node
}

const generateNodeObj = (config) => {
    return {
        // 生成临时节点ID
        tempNodeId: getUUID(),
        nodeName: config.nodeName,
        nodeType: config.nodeType,
        config: config.config || {},
        childNode: null
    }
}