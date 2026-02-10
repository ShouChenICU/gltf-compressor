import fs from 'fs'
import path from 'path'

async function testApi() {
  const baseUrl = 'http://localhost:3000'
  const modelPath = path.resolve('model.glb')

  if (!fs.existsSync(modelPath)) {
    console.error('错误: 根目录下未找到 model.glb 文件')
    return
  }

  const originalStats = fs.statSync(modelPath)
  console.log(`1. 原始文件: model.glb (${(originalStats.size / 1024).toFixed(2)} KB)`)

  try {
    // --- 压缩测试 ---
    console.log('\n正在调用压缩接口 (/api/compGlbFromFile)...')
    const formData = new FormData()
    const fileBuffer = fs.readFileSync(modelPath)
    const blob = new Blob([fileBuffer])
    formData.append('file', blob, 'model.glb')

    const compResponse = await fetch(`${baseUrl}/api/compGlbFromFile`, {
      method: 'POST',
      body: formData
    })

    if (!compResponse.ok) throw new Error(`压缩请求失败: ${compResponse.statusText}`)

    const compBuffer = await compResponse.arrayBuffer()
    const compPath = 'model_compressed.glb'
    fs.writeFileSync(compPath, Buffer.from(compBuffer))
    console.log(`2. 压缩完成: ${compPath} (${(compBuffer.byteLength / 1024).toFixed(2)} KB)`)

    // --- 解压测试 ---
    console.log('\n正在调用解压接口 (/api/decompGlbFromFile)...')
    const decompressFormData = new FormData()
    const decompBlob = new Blob([compBuffer])
    decompressFormData.append('file', decompBlob, 'model_compressed.glb')

    const decompResponse = await fetch(`${baseUrl}/api/decompGlbFromFile`, {
      method: 'POST',
      body: decompressFormData
    })

    if (!decompResponse.ok) throw new Error(`解压请求失败: ${decompResponse.statusText}`)

    const decompBuffer = await decompResponse.arrayBuffer()
    const decompPath = 'model_decompressed.glb'
    fs.writeFileSync(decompPath, Buffer.from(decompBuffer))
    console.log(`3. 解压完成: ${decompPath} (${(decompBuffer.byteLength / 1024).toFixed(2)} KB)`)

    console.log('\nAPI 接口集成测试成功！')
  } catch (error) {
    console.error('\n测试失败:', error.message)
    console.log('\n请确保 Nitro 服务已启动 (运行 yarn dev 或 npm run dev)')
  }
}

testApi()
