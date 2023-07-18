const Validator = (function () {
    return function () {
        this.nodeRules = {}

        // 注册节点验证规则
        this.registerNodeRules = (nodeId, validatorFun) => {
            if(validatorFun && validatorFun instanceof Function) {
                this.nodeRules[nodeId] = validatorFun
            }
        }

        // 移除节点验证规则
        this.removeNodeRules = (nodeId) => {
            delete this.nodeRules[nodeId]
        }

        // 验证节点
        this.validate = () => {
            let valid = true
            let messages = []
            Object.keys(this.nodeRules).forEach((key) => {
                let fun = this.nodeRules[key]
                if(fun && fun instanceof Function) {
                    let result = fun()
                    if(!result.valid) {
                        valid = false
                        messages.push(result.message)
                    }
                 }
            })
            return {valid, messages}
        }
    }
})();

Validator.prototype = {
    constructor : Validator
}

export default Validator
