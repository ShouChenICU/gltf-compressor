# API 接口文档

本文档记录了 GLTF Compressor 服务提供的所有 API 接口及其使用说明。

## 基础地址

默认服务运行在：`http://localhost:3000`

---

## 1. 压缩接口 (Compression)

用于优化 GLB 模型，压缩网格、纹理和动画。

### 1.1 通过文件上传压缩 GLB

将本地 GLB 文件上传并获取压缩后的版本。

- **URL:** `/api/compGlbFromFile`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **参数:**
  - `file`: GLB 二进制文件
- **示例 (cURL):**
  ```bash
  curl -X POST -F "file=@model.glb" http://localhost:3000/api/compGlbFromFile > compressed.glb
  ```

### 1.2 通过 URL 压缩 GLB

提供远程 GLB 链接，由服务器下载后进行压缩。

- **URL:** `/api/compGlbFromUrl`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **请求体:**
  ```json
  {
    "url": "https://example.com/model.glb"
  }
  ```
- **示例 (cURL):**
  ```bash
  curl -X POST -H "Content-Type: application/json" \
    -d '{"url":"https://example.com/model.glb"}' \
    http://localhost:3000/api/compGlbFromUrl > compressed.glb
  ```

---

## 2. 解压缩接口 (Decompression)

用于移除 GLB 模型的 Meshopt 压缩 (即反向操作)。

### 2.1 通过文件上传解压缩 GLB

上传经过 Meshopt 压缩的 GLB 文件并还原。

- **URL:** `/api/decompGlbFromFile`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **参数:**
  - `file`: 已压缩的 GLB 文件
- **示例 (cURL):**
  ```bash
  curl -X POST -F "file=@compressed.glb" http://localhost:3000/api/decompGlbFromFile > decompressed.glb
  ```

### 2.2 通过 URL 解压缩 GLB

提供远程已压缩 GLB 的链接。

- **URL:** `/api/decompGlbFromUrl`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **请求体:**
  ```json
  {
    "url": "https://example.com/compressed.glb",
    "filename": "my-model"
  }
  ```
- **参数说明:**
  - `url` (String, 必填): 远程 GLB 文件的链接。
  - `filename` (String, 可选): 输出文件的名称（不含后缀）。默认为 `decompressed`。
- **示例 (cURL):**
  ```bash
  curl -X POST -H "Content-Type: application/json" \
    -d '{"url":"https://example.com/compressed.glb", "filename": "my-model"}' \
    http://localhost:3000/api/decompGlbFromUrl > my-model.glb
  ```

---

## 响应说明

所有接口在成功时均返回：

- **状态码:** `200 OK`
- **Content-Type:** `application/octet-stream`
- **Content-Disposition:** `attachment; filename=...`
- **Body:** GLB 文件的二进制流

在请求无效（如缺少参数、下载失败或文件格式错误）时返回：

- **状态码:** `400 Bad Request` 或 `500 Internal Server Error`
