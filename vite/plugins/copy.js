import copy from 'rollup-plugin-copy'

export default function createCopy() {
    return copy({
        hook: 'closeBundle',
        targets: [
            { src: 'src/easy-process/assets/*', dest: 'dist/assets' },
            { src: 'src/easy-process/config/event-keys.js', dest: 'dist/config' },
            { src: 'src/easy-process/config/gateway-type.js', dest: 'dist/config' },
            { src: 'src/easy-process/config/default-node-type.js', dest: 'dist/config' },
            { src: 'src/easy-process/config/provide-keys.js', dest: 'dist/config' },
        ]
    })
}