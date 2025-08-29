const EXCLUSIVE = 'exclusive'
const PARALLEL = 'parallel'

const GATEWAY_TYPE_LIST = [
    {
        type: EXCLUSIVE,
        name: '排他网关',
        icon: 'icon-ep-exclusive-gateway',
        desc: '按照分支顺序（从左向右）进行计算，选择第一个条件计算为true的分支继续流程，未设置条件时默认通过。'
    },
    {
        type: PARALLEL,
        name: '并行网关',
        icon: 'icon-ep-parallel-gateway',
        desc: '计算所有分支条件，符合条件的分支可并列执行，未设置条件时默认通过。'
    }
]

const GATEWAY_TYPE_MAP = new Map()
GATEWAY_TYPE_LIST.forEach(item => {
    GATEWAY_TYPE_MAP.set(item.type, item)
})

export {GATEWAY_TYPE_LIST, GATEWAY_TYPE_MAP, EXCLUSIVE, PARALLEL}

