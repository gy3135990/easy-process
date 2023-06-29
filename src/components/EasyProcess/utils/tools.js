/**
 * 复制对象(深拷贝)
 * @param source
 */
export const copy = (source) => {
    if(source) {
        const str = JSON.stringify(source);
        return JSON.parse(str);
    }
    return null;
}

const nodeIconModules = import.meta.glob("../assets/icon/node/*.svg", { eager: true });

export const nodeIcon = (nodeType) => {
    console.info("nodeType", nodeType)
    let key = `../assets/icon/node/${nodeType}.svg`
    if (nodeIconModules[key]) {
        console.info("2222", nodeIconModules[key].default)
        return nodeIconModules[key].default
    } else {
        return null
    }
}