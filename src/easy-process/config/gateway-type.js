const EXCLUSIVE = 'exclusive'
const PARALLEL = 'parallel'

const gatewayTypeConfig = {}

gatewayTypeConfig[EXCLUSIVE] = {
    type: EXCLUSIVE,
    name: '排他网关',
    enable: true, // 是否启用
    icon: 'ep-exclusive-gateway',
    desc: '按照分支顺序（从左向右）进行计算，选择第一个条件计算为true的分支继续流程，未设置条件时默认通过。'
}
gatewayTypeConfig[PARALLEL] = {
    type: PARALLEL,
    name: '并行网关',
    enable: true, // 是否启用
    icon: 'ep-parallel-gateway',
    desc: '计算所有分支条件，符合条件的分支可并列执行，未设置条件时默认通过。'
}

// 默认网关类型
let defaultGatewayType = null

/**
 * 加载网关类型配置
 * @param externalConfig
 */
const loadGatewayTypeConfig = (externalConfig) => {
    if (externalConfig && externalConfig.length > 0) {
        externalConfig.forEach(item => {
            if (!item.type) {
                throw new Error('加载网关类型配置：type网关类型不能为空')
            }
            if (!gatewayTypeConfig[item.type]) {
                throw new Error('加载网关类型配置：不存在网关类型：' + item.type)
            }
            gatewayTypeConfig[item.type] =  { ...gatewayTypeConfig[item.type], ...item}

            if (item.isDefault && item.isDefault === true) {
                defaultGatewayType = item.type
            }
        })
    }

    if (defaultGatewayType == null) {
        let types = Object.keys(gatewayTypeConfig)
        for (let i = 0; i < types.length; i++) {
            if (gatewayTypeConfig[types[i]].enable) {
                defaultGatewayType = types[i]
                break
            }
        }
    }
}
export {gatewayTypeConfig, defaultGatewayType, loadGatewayTypeConfig}

