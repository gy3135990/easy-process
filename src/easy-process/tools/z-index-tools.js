let zIndex = 2000
let zIndexFunction = null

/**
 * 加载zIndex配置
 */
export const loadZIndexConfig = ({initZIndexValue, bindZIndexFunction}) => {
    if (bindZIndexFunction) {
        if (typeof bindZIndexFunction === 'function') {
            zIndexFunction = bindZIndexFunction
        } else {
            throw new Error('zIndexFunction must be a function')
        }
    } else if (initZIndexValue) {
        zIndex = initZIndexValue
    }
}

/**
 * 获取下一个zIndex
 */
export const nextZIndex = () => {
    if (zIndexFunction && typeof zIndexFunction === 'function') {
        return zIndexFunction()
    }
    return zIndex++;
}