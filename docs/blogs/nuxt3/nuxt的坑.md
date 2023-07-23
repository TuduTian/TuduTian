---
title: nuxt3 开发中的坑
date: 2023-7-13
categories:
    - nuxt3
tags:
  - 服务端渲染
  - nuxt3
  - vue3
sticky: 1
---
# nuxt3开发中的坑
## Nuxt3中开发生产如何更换端口
1. 安装依赖
```js·
  npm install cross-env  
```

2. 修改 package.json ， 就可以自定义
```js
"scripts": {
  "build": "nuxi build",
  "dev": "nuxi dev",
  "start": "cross-env PORT=8080 node .output/server/index.mjs",
  "lint": "eslint .",
  "postinstall": "nuxi prepare",
  "generate": "nuxi generate"
},
```
