import {initNodes} from './config/node-component.js'
import {loadNodeConfig} from './config/node-config.js'
import {loadZIndexConfig} from './tools/z-index-tools.js'

const requireGlobalComponent = import.meta.glob([
    './ep-designer.vue',
    './components/svg-icon/ep-svg-icon.vue',
], { eager: true });

/**
 * 安装组件
 * @param app
 * @param options
 */
const install = (app, options) => {
    console.log("run install")
    if (install.installed) {
        return;
    }

    install.installed;

    // 加载配置
    loadOptions(app, options)

    //注册全局组件
    registerGlobalComponent(app, options);

};

/**
 * 注册全局组件
 * @param app
 * @param options
 */
const registerGlobalComponent = (app, options) => {
    Object.keys(requireGlobalComponent).forEach((fileName) => {
        const component = requireGlobalComponent[fileName];
        //获取组件名
        const componentName = component.default.name;
        app.component(componentName, component.default || component);
    });
}

/**
 * 加载配置
 * @param app
 * @param options
 */
const loadOptions = (app, options) => {
    let {nodeImplPath, nodeConfig, zIndexConfig} = options;
    // 加载节点组件
    initNodes(nodeImplPath)
    // 加载节点配置
    loadNodeConfig(nodeConfig)
    // 加载z-index配置
    loadZIndexConfig(zIndexConfig)
}

//环境检测
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

//对外暴露install方法
export default {
    install,
}