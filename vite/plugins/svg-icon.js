import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default function createSvgIcon(isBuild) {
    return createSvgIconsPlugin({
		iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        symbolId: 'icon-ep-[dir]-[name]',
        customDomId: '__EASY_PROCESS_SVG_ICONS__',
        svgoOptions: isBuild
    })
}
