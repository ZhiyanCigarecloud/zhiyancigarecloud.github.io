# 纸烟的博物馆奇妙夜

基于已确认的 Figma 原型，使用 Docusaurus + React + TypeScript 构建。图片与字体均随项目保存。

## 在电脑上预览

安装 Node.js 22 LTS，在 VS Code 中打开这个文件夹，然后打开「终端 → 新建终端」：

```bash
npm ci
npm start
```

打开终端显示的网址。修改文件并保存后，开发预览会自动更新。

检查正式版本：

```bash
npm run typecheck
npm run build
npm run serve
```

## 写文章

- `content/literature/`：情感语言区。
- `content/courses/`：课程研究区。
- `content/field/`：野外科考区。

复制同目录下的一篇 `.md` 文件，修改文件名及开头信息，再写正文：

```yaml
---
title: 我的文章标题
description: 一句话摘要。
slug: /my-first-article
museum_hall: literature
specimen: "004"
museum_status: 展出中
museum_example: false
date: "2026-10-21"
---
```

`slug` 必须唯一；`museum_hall` 使用 `literature`、`courses` 或 `field`。日期决定首页最新出土顺序，同日以馆藏编号排序。替换示例文章后，将 `museum_example` 改为 `false`。

馆长介绍在 `src/pages/about.md`；首页布局在 `src/pages/index.tsx`；颜色与响应式样式在 `src/css/custom.css`。

## GitHub Pages 上线

1. 将此项目提交到仓库主分支 `main`。
2. 在 GitHub 仓库打开 **Settings → Pages**，将 Source 设为 **GitHub Actions**。
3. `.github/workflows/deploy.yml` 会安装依赖、检查类型、构建并部署。
4. 在 **Actions** 中看到成功后，打开 `https://zhiyancigarecloud.github.io/`。

首次启用 Pages 后如需重跑，可在 Actions 选择 **Build and deploy museum → Run workflow**。拉取请求仅检查；推送到 `main` 才部署。

## 设计与素材

[Figma 设计稿](https://www.figma.com/design/5BZrbwZVzr6VmOM8VVIgeE)

卡片统一为化石灰 `#D5D2CA`，其余配色保留午夜岩层 `#171C20`、展厅深蓝 `#28333C`、骨白 `#E8E0CE`、沉积金 `#C5A676`、矿物紫 `#6F5AA8`。

`static/img/specimen-01.jpg` 至 `specimen-16.jpg` 是从该设计的原始导入缓存恢复的相同图片分块；第 13 块同时作为纸张背景。保留了 Figma 中的图像构图和裁切。示例馆藏均明确标记，方便用真实内容替换。

字体由 Fontsource 分发，相关许可证随各字体包提供。
