<div align="center">

# 🗜️ GLTF Compressor

**高性能 GLB/GLTF 3D 模型压缩与解压缩微服务**

基于 [gltfpack](https://github.com/nicedoc/gltfpack) + [Nitro](https://nitro.unjs.io/) 构建，提供简洁的 RESTful API

[![Node.js](https://img.shields.io/badge/Node.js-≥18-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Nitro](https://img.shields.io/badge/Nitro-2.x-00DC82?logo=nuxtdotjs&logoColor=white)](https://nitro.unjs.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](#-docker-部署)
[![License](https://img.shields.io/badge/License-MIT-yellow?logo=opensourceinitiative&logoColor=white)](LICENSE)

</div>

---

## ✨ 特性

- 🚀 **高性能压缩** — 基于 Meshopt 算法优化网格、纹理和动画
- 📤 **文件上传** — 直接上传 GLB 文件进行压缩 / 解压缩
- 🔗 **远程 URL** — 提供 URL 即可处理远程 GLB 模型
- 🔄 **双向操作** — 同时支持压缩与解压缩（移除 Meshopt 压缩）
- 📦 **即用即走** — 处理结果以二进制流返回，直接下载
- 🐳 **Docker 友好** — 提供 docker-compose 一键部署

---

## 📦 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) >= 18
- npm / yarn / pnpm

### 安装 & 运行

```bash
# 克隆项目
git clone https://github.com/your-username/gltf-compressor.git
cd gltf-compressor

# 安装依赖
npm install

# 开发模式启动
npm run dev
```

服务默认运行在 **http://localhost:3000**

### 生产构建

```bash
# 构建
npm run build

# 预览 / 运行
npm run preview
```

---

## 🐳 Docker 部署

```bash
docker-compose up -d
```

容器将映射到主机的 **3003** 端口：

```yaml
services:
  gltf-compressor:
    image: node:22-alpine
    ports:
      - '3003:3000'
    restart: unless-stopped
```

---

## 🔌 API 接口

> 完整的接口文档请参阅 👉 [API.md](API.md)

### 接口一览

| 接口                     | 方法   | 说明                              |
| ------------------------ | ------ | --------------------------------- |
| `/api/compGlbFromFile`   | `POST` | 上传 GLB 文件 → 返回压缩后的 GLB  |
| `/api/compGlbFromUrl`    | `POST` | 提供远程 URL → 返回压缩后的 GLB   |
| `/api/decompGlbFromFile` | `POST` | 上传压缩的 GLB → 返回解压后的 GLB |
| `/api/decompGlbFromUrl`  | `POST` | 提供远程 URL → 返回解压后的 GLB   |

### 🗜️ 压缩 — 上传文件

```bash
curl -X POST \
  -F "file=@model.glb" \
  http://localhost:3000/api/compGlbFromFile \
  -o compressed.glb
```

### 🗜️ 压缩 — 远程 URL

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/model.glb"}' \
  http://localhost:3000/api/compGlbFromUrl \
  -o compressed.glb
```

### 📂 解压缩 — 上传文件

```bash
curl -X POST \
  -F "file=@compressed.glb" \
  http://localhost:3000/api/decompGlbFromFile \
  -o decompressed.glb
```

### 📂 解压缩 — 远程 URL

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/compressed.glb"}' \
  http://localhost:3000/api/decompGlbFromUrl \
  -o decompressed.glb
```

### 响应格式

| 场景        | 状态码 | Content-Type               |
| ----------- | ------ | -------------------------- |
| ✅ 成功     | `200`  | `application/octet-stream` |
| ❌ 参数错误 | `400`  | `application/json`         |
| ❌ 服务异常 | `500`  | `application/json`         |

成功时响应头包含 `Content-Disposition: attachment; filename=...`，可直接作为文件下载。

---

## 🏗️ 项目结构

```
gltf-compressor/
├── server/
│   ├── api/
│   │   ├── compGlbFromFile.post.ts     # 文件上传压缩
│   │   ├── compGlbFromUrl.post.ts      # URL 远程压缩
│   │   ├── decompGlbFromFile.post.ts   # 文件上传解压
│   │   └── decompGlbFromUrl.post.ts    # URL 远程解压
│   ├── routes/
│   │   └── index.ts                    # 首页路由
│   └── utils/
│       └── gltf.ts                     # gltfpack 核心封装
├── docker-compose.yml                  # Docker 编排配置
├── nitro.config.ts                     # Nitro 框架配置
├── package.json
├── tsconfig.json
├── API.md                              # 详细 API 文档
└── README.md
```

---

## 🛠️ 技术栈

| 技术                                               | 用途                            |
| -------------------------------------------------- | ------------------------------- |
| [Nitro](https://nitro.unjs.io/)                    | 轻量高性能服务端框架            |
| [gltfpack](https://www.npmjs.com/package/gltfpack) | glTF/GLB 模型压缩引擎 (Meshopt) |
| [TypeScript](https://www.typescriptlang.org/)      | 类型安全的开发体验              |
| [Docker](https://www.docker.com/)                  | 容器化部署                      |

---

## 🧪 测试

项目内置了集成测试脚本，确保服务启动后运行：

```bash
# 先启动服务
npm run dev

# 新终端中执行测试（需要根目录下有 model.glb 文件）
node test-api.mjs
```

测试流程：`原始文件` → `压缩` → `解压缩`，并输出每步的文件大小。

---

## 📄 License

本项目基于 [MIT License](LICENSE) 开源，欢迎自由使用与贡献。

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
