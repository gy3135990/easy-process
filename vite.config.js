import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.quxiou.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.quxiou.vip/admin/，则设置 baseUrl 为 /admin/。
    base: '/',
    plugins: createVitePlugins(env, command === 'build'),
    build: {
      outDir: "dist", // 打包输出目录
      lib: {
        // 指定库入口文件
        entry: path.resolve(__dirname, "src/easy-process/index.js"),
        // 指定库的名称
        name: "easy-process",
        fileName: (format) => `easy-process.${format}.js` // 输出文件名格式化函数。例如，'my-vue-plugin.es.js' 和 'my-vue-plugin.umd.js'。
      },
      rollupOptions: {
        external: ["vue"], // 防止将vue打包进库
        output: {
          globals: {
            vue: "Vue",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith(".css")) {
              return "css/[name][extname]";
            }
            return "[name].[hash][extname]";
          },
        },
      },
    },
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
      port: 80,
      host: true,
      open: true,
    },
    optimizeDeps: {
      exclude: ["fsevents"],
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  }
})
