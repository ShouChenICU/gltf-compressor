# GLTF Compressor

基于 `gltfpack` 的 GLB/GLTF 3D 模型在线压缩服务。

## 特性

- 支持直接上传 GLB 文件进行压缩
- 支持通过 URL 压缩远程 GLB 文件
- 优化网格、纹理和动画
- 返回压缩后的 GLB 文件供下载

## API 文档

服务提供两个接口用于压缩 GLB 文件:

### 通过文件上传压缩 GLB

```
POST /api/compGlbFromFile
Content-Type: multipart/form-data
```

将 GLB 文件作为 form-data 上传。

示例:

```bash
curl -X POST -F "file=@model.glb" http://localhost:3000/api/compGlbFromFile > compressed.glb
```

### 通过 URL 压缩 GLB

```
POST /api/compGlbFromUrl
Content-Type: application/json
```

请求体:

```json
{
  "url": "https://example.com/model.glb"
}
```

示例:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/model.glb"}' \
  http://localhost:3000/api/compGlbFromUrl > compressed.glb
```

## 响应

两个接口都返回:

- Content-Type: application/octet-stream
- 附件形式的压缩 GLB 数据
- 请求无效时返回 400 状态码

## 开发

1. 安装依赖:

```bash
yarn install
```

2. 启动开发服务器:

```bash
yarn dev
```

3. 构建生产版本:

```bash
yarn build
```

4. 启动生产服务器:

```bash
yarn preview
```
