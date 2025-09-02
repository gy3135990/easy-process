let iconPrefix = '#icon-'


/**
 * 加载图标配置
 * @param iconConfig
 */
export const loadIconConfig = (iconConfig) => {
    let {prefix} = iconConfig || {}
    setIconPrefix(prefix)
}

/**
 * 设置图标前缀
 * @param prefix
 */
const setIconPrefix = (prefix) => {
    if (prefix) {
        iconPrefix = prefix
    }
}

/**
 * 获取图标前缀
 * @returns {string}
 */
export const getIconPrefix = () => {
    return iconPrefix
}