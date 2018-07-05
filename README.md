### 框架说明

```
React+webpack，目前还比较粗糙，但是功能已齐全，包括mock，dev，build相关功能，后续还会继续打磨
```

### 框架使用指南

```
# 安装依赖
npm install 或者淘宝镜像 cnpm install

# 本地开发，访问地址：http://localhost:8080
npm run dev

# 生产环境
npm run build

#后续待扩展
eslint引入，单元测试引入，redux引入

```

### 框架目录结构

<pre><code>
├── README.md
├── dist               // 项目编译后目录
├── build              // webpack配置文件
├── config             // 项目配置目录
├── mock               // mock数据目录
├── public             // 首页
├── src                // 生产目录
│   ├── assets         // 图片以及公用scss目录
│   ├── component      // 公共组件
│   ├── routes         // 公共路由配置
│   ├── utils          // 公用js
│   ├── views          // 页面
│   │   ├── containers // 容器，其他同级目录为页面组件
├── static             // 静态资源以及第三方包存放