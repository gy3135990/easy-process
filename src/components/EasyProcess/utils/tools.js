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