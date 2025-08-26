import { shallowRef, defineAsyncComponent } from 'vue'
export const nodeComponents = shallowRef({});
export const drawerComponents = shallowRef({});

const nodePattern = /([^/]+)-node\.vue$/i
const drawerPattern = /([^/]+)-drawer\.vue$/i

export const initNodes = (extNodes) => {
    // 加载本地节点组件
    initComponents(import.meta.glob('../node/*/*.vue'))
    // 加载扩展节点组件
    if (extNodes) {
        initComponents(extNodes)
    }
}

const initComponents = (components) => {
    Object.keys(components).forEach(key => {
        loadNodeComponents(components, key);
        loadDrawerComponents(components, key);
    })
}

const loadNodeComponents = (components, key) => {
    let nodeType = getNodeType(nodePattern, key)
    if (nodeType) {
        let component = components[key]
        nodeComponents.value[nodeType] = defineAsyncComponent(component)
    }
}
const loadDrawerComponents = (components, key) => {
    let nodeType = getNodeType(drawerPattern, key)
    if (nodeType) {
        let component = components[key]
        drawerComponents.value[nodeType] = defineAsyncComponent(component)
    }
}

const getNodeType = (pattern, path) => {
    let result = pattern.exec(path)
    if (result !== null) {
        return result[1]
    }
    return null
}