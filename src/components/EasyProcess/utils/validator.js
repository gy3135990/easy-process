const Validator = (function () {
    return function () {
        this.nodeRules = {}

        this.registerNodeRules = (nodeId, validatorFun) => {
            console.info("registerNodeRules nodeId = ", nodeId)
            console.info("registerNodeRules validatorFun = ", validatorFun)
            if(validatorFun && validatorFun instanceof Function) {
                this.nodeRules[nodeId] = validatorFun
            }
        }

        this.removeNodeRules = (nodeId) => {
            delete this.nodeRules[nodeId]
        }

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
