import { reactive } from "vue";
export const createValidator = () => {
    let validator = new Object();
    validator.nodeRules = new Map()
    validator.results = reactive(new Map())

    // 注册节点验证规则
    validator.register = (nodeId, validatorFun) => {
        if(validatorFun && validatorFun instanceof Function) {
            validator.nodeRules.set(nodeId, validatorFun)
        }
    }

    // 移除节点验证规则
    validator.remove = (nodeId) => {
        validator.nodeRules.delete(nodeId)
        validator.results.delete(nodeId)
    }

    // 验证节点
    validator.validate = () => {
        let valid = true
        let messages = []
        validator.nodeRules.forEach((value, key) => {
            let fun = value
            if(fun && fun instanceof Function) {
                let result = fun()
                if(!result.valid) {
                    valid = false
                    validator.results.set(key, result)
                    messages.push(result.message)
                } else {
                    validator.results.delete(key)
                }
            }
        })
        return {valid, messages}
    }

    // 获取指定节点的结果
    validator.getResult = (nodeId) => {
        let result = validator.results.get(nodeId)
        if(result) {
            return result
        }
    }

    return validator
}
