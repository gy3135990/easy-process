import { shallowRef, defineAsyncComponent } from 'vue'
export const nodeComponents = shallowRef({});
export const drawerComponents = shallowRef({});

const nodePattern = /([^/]+)Node\.vue$/i
const drawerPattern = /([^/]+)Drawer\.vue$/i

export const initLocalComponents = () => {
    loadNodeComponents(import.meta.glob('../node/*/*Node.vue'))
    loadDrawerComponents(import.meta.glob('../node/*/*Drawer.vue'))
}

export const loadNodeComponents = (modules) => {
    Object.keys(modules).forEach(key => {
        let module = modules[key]
        let nodeType = getNodeType(nodePattern, key)
        nodeComponents.value[nodeType] = defineAsyncComponent(module)
    })
}

export const loadDrawerComponents = (modules) => {
    Object.keys(modules).forEach(key => {
        let module = modules[key]
        let nodeType = getNodeType(drawerPattern, key)
        drawerComponents.value[nodeType] = defineAsyncComponent(module)
    })
}

const getNodeType = (pattern, path) => {
    let result = pattern.exec(path)
    if (result !== null) {
        return result[1]
    }
    return null
}