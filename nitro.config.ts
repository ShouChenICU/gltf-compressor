//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-04-03',
  runtimeConfig: {
    // 可以在这里添加运行时配置
  },
  // 增加请求体限制，处理较大的 GLB 文件
  experimental: {
    // Nitro 某些版本可能在这里配置，但 h3 通常在 event handler 层或全局件处理
  }
})
