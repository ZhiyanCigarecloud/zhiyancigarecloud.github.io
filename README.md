# 纸烟的博物馆奇妙夜

Docusaurus、React、TypeScript 个人文字博物馆。当前版本按独立页面组织：

首页 → 入馆动画 → 四馆导览 → 单馆目录 → 文章正文。

首页只展示标题、恐龙化石首图、关于馆长和开始漫游按钮。没有向下拼接导览或文章。tips 暂不显示，等待馆长提供专用文案。尚未收到 GIF 时，开始漫游直接进入四馆导览。

## 四个展厅

| 展厅 | 内容 | 目录地址 | 正文目录 |
| --- | --- | --- | --- |
| 地层馆 | 课内学习 | `/strata/` | `content/strata/` |
| 野外馆 | 课外探索 | `/wild/` | `content/wild/` |
| 琥珀馆 | 小说诗歌 | `/amber/` | `content/amber/` |
| 碎屑馆 | 杂谈感悟 | `/fragments/` | `content/fragments/` |

馆藏目录使用无框的文字链接，按编号排序，每页七篇。第二页地址如 `/amber/?page=2`，可前后翻页并保留浏览器返回记录。目前只有三篇真实内容，分页不会伪造额外文章。

- 琥珀馆 001《审视》，写于 2022-04-30。
- 琥珀馆 002《大马士革》，写于 2022-09-10。
- 碎屑馆 001，原文未提供标题，暂标“未题”，写于 2022-04-30。

## 添加文章

在对应 `content/` 子目录下新建 Markdown 文件。文章开头示意如下（仅维护说明，不会发布为馆藏）：

```yaml
---
title: 文章标题
description: 一句话摘要
slug: /amber-003
museum_hall: amber
category: 诗歌
specimen: "003"
date: "2026-10-21"
hide_table_of_contents: true
---
```

`museum_hall` 必须是 `strata`、`wild`、`amber`、`fragments` 之一。`slug` 必须唯一，同馆内编号不能重复。馆内 `specimen` 按写作日期从早到晚连续编号，同日作品保留原先顺序；补录早期作品时，需要顺延后续作品的编号及正文日期行中的编号。文件名和 `slug` 是固定地址，不随展示编号更改。目录从文章元数据自动读取题名、编号、写作日期。

`category` 填写中文分类：琥珀馆为 `小说` 或 `诗歌`；碎屑馆为 `影评`、`感悟` 或 `游记`。未填写分类的作品仍会显示在“全部”中。分类不改变馆内编号。

在正文开头加写作日期（可参考现有文章中的 `<time>`），日期必须与开头的 `date` 一致。诗歌每行末尾保留两个空格，再换行；节与节之间留空行。正文末尾可放返回所在展厅的链接。

首页的关于馆长、展厅说明和统一更新日期位于 `src/data/museum.ts`。写作日期和网站介绍的更新日期分开标注，不以今天的日期替代历史作品日期。

## 后续接入 GIF 与 tips

把 GIF 放入 `static/img/`，在 `src/data/museum.ts` 的 `entrance` 中设置 `src`（如 `/img/entrance.gif`）及 `durationMs`（单次播放时长，单位毫秒）。GIF 没有播放完成事件，需按实际帧时长填写。计时从图片加载完成后开始；播放完进入 `/halls/`，也可以跳过。加载失败可手动继续，减少动态效果偏好会直接进入展厅。

`tips` 目前是空数组，因此前台不会显示任何小记或占位。收到专用文案后，填入 `{text: '馆长提供的文案', date: '2026-10-21'}`。组件已支持点击换下一条，最后一条回到第一条。

## 本地开发与检查

安装 Node.js 22，然后在项目文件夹的终端执行：

```bash
npm ci
npm start
```

发布前检查：

```bash
npm run typecheck
node --experimental-strip-types --test tests/pagination.test.mjs
npm run build
```

## 发布

GitHub Pages 使用 GitHub Actions。合并到 `main` 后会自动检查类型、测试七篇分页、构建并部署。仓库 **Settings → Pages → Source** 使用 **GitHub Actions**。

线上地址：https://zhiyancigarecloud.github.io/

图片、纸张纹理与字体均保存在项目中。保留纸张米色、化石灰卡片、矿物紫细节与沉积金按钮；页面去除了原先添加的英文标签。
