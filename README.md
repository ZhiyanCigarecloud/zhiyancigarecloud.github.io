# 纸烟的博物馆奇妙夜

一只叫纸烟的恐龙，在这里收藏学习、探索、小说诗歌与杂谈感悟。

**心中有绿色，出门便是草。**

- [访问网站](https://zhiyancigarecloud.github.io/)
- [四馆简介](https://zhiyancigarecloud.github.io/halls/)
- [资源整合](https://zhiyancigarecloud.github.io/resources/)
- [找到我](https://zhiyancigarecloud.github.io/contact/)

网站使用 Docusaurus 3、React 和 TypeScript，文章使用 Markdown / MDX，托管于 GitHub Pages。

## 页面与功能

首页独立展示标题、恐龙化石首图、关于馆长、开始漫游和一条更新记录。点击“开始漫游”后进入四馆简介，再进入展厅目录和文章正文，不把所有页面堆叠在首页下方。

| 展厅 | 内容 | 细分类 | 目录地址 | 内容文件夹 |
| --- | --- | --- | --- | --- |
| 地层馆 | 课内学习 | 暂无 | `/strata/` | `content/strata/` |
| 野外馆 | 课外探索 | 口琴谱 | `/wild/` | `content/wild/` |
| 琥珀馆 | 小说诗歌 | 小说、诗歌 | `/amber/` | `content/amber/` |
| 碎屑馆 | 杂谈感悟 | 影评、感悟、游记 | `/fragments/` | `content/fragments/` |

- 四馆简介保留四张展厅卡片，细分类名称只作说明，点击“查看馆藏”进入目录。
- 展厅内部可切换细分类，不设置“全部”分类；默认显示第一个分类。
- 目录按写作日期从早到晚排列，每页七篇，使用文字标题链接。
- 编号在每个展厅的每个分类内独立从 `001` 开始。
- 正文底部提供同分类的上一篇、下一篇，无需返回大目录查找。
- 游记包含南京、苏州、北京照片集；桌面端两列、手机端单列，图片保留完整比例，点击可查看图片文件，日期标在照片集末尾。
- 资源整合分为“学习”和“生活”，展示网页工具及简短介绍。
- “找到我”包含微信、Gmail 和恐龙表情包；微信可复制，邮箱使用邮件链接。
- 非首页的顶部导航依次为：首页、四馆简介、资源整合、找到我；手机端收进导览菜单。

入馆 GIF 尚未配置，因此入口会直接进入四馆简介。互动小记的文案尚未提供，当前保持隐藏。

## 添加文章：可以直接在 GitHub 操作

不需要每篇都发给 AI，也不需要手动修改文章目录。

1. 打开仓库，进入对应的 `content/` 子文件夹。
2. 点击 **Add file → Create new file**，填写一个没有使用过的文件名，例如 `new-poem.md`。
3. 参照同分类的现有文章填写开头信息，再粘贴正文。
4. 点击 **Commit changes** 保存到 `main`。
5. 到 **Actions** 查看发布结果，构建和部署成功后再打开网站检查。

新增文章会自动出现在所属目录、分页和上一篇 / 下一篇导航中。网站目前没有后台编辑器，内容文件是文章的来源。

### 文章格式

以下是维护模板，替换后再使用：

```md
---
title: 文章标题
description: 一句话摘要
slug: /my-new-poem
museum_hall: amber
category: 诗歌
specimen: "026"
date: "2026-10-22"
hide_table_of_contents: true
---

<p className="writing-date">琥珀馆 · 诗歌 · 026　写于 <time dateTime="2026-10-22">2026年10月22日</time></p>

这里填写正文。

[← 返回诗歌目录](/amber/?category=诗歌)
```

| 字段 | 填写规则 |
| --- | --- |
| `title` | 显示在目录和正文中的标题。 |
| `description` | 可选的一句话摘要。 |
| `slug` | 唯一且稳定的文章地址片段，避免与其他文章重复。上述模板的正文地址是 `/collection/my-new-poem/`。 |
| `museum_hall` | 填 `strata`、`wild`、`amber` 或 `fragments`。 |
| `category` | 琥珀馆填“小说”或“诗歌”；碎屑馆填“影评”“感悟”或“游记”。野外馆填“口琴谱”；地层馆目前可省略。 |
| `specimen` | 所属分类内的三位编号，使用引号保留前导零。模板编号只是示意，添加前应检查该分类已有编号。 |
| `date` | 作品写作日期，使用带引号的 `YYYY-MM-DD`；只知道月份时可填 `YYYY-MM`。 |

编号按同分类作品的写作日期从早到晚排列；同日作品沿用已有顺序。补录更早的作品时，应顺延该分类后续作品的 `specimen`，同时修改正文日期行中的展示编号。**文件名和 `slug` 不随展示编号更改**，以免旧链接失效。

正文中的日期应与 `date` 一致，不用上传日期代替历史作品的写作日期。诗歌如需保留换行，每行末尾加两个空格；节与节之间留一空行，也可参考现有诗歌写法。

目录示例：`/amber/?category=诗歌&page=2`。返回链接应指向文章所属的展厅和分类。

口琴谱位于 `content/wild/`，一首一篇。谱面放在 `harmonica-score` 容器内的 `text` 代码块中，以保留空格、换行及升号；括号表示音区，`/` 表示和声。口琴谱按馆长要求不填写 `date`，不显示日期，六篇按提供顺序编号。

## 添加照片集

1. 将照片放进 `static/img/` 下独立的文件夹，例如 `static/img/travel-new/`。
2. 建议先压缩为 WebP 或 JPG，长边约 1600 像素，保留方向与完整画面；确认文件非空且可以打开。
3. 在 `content/fragments/` 中新建 `.mdx` 文件，参考 `travel-001.mdx`、`travel-002.mdx` 或 `travel-003.mdx`。
4. 填写 `museum_hall: fragments`、`category: 游记`、日期及该分类内的编号。
5. 将照片放进 `travel-photo-grid`，逐张更新图片路径、尺寸、替代文字和序号。末尾单独标注日期。

单张图片的写法：

```mdx
<div className="travel-photo-grid">
  <figure>
    <a href="/img/travel-new/01.jpg" aria-label="放大查看：照片内容">
      <img src="/img/travel-new/01.jpg" alt="照片内容" width="1600" height="1200" loading="eager" decoding="async" />
    </a>
    <figcaption>01 / 01</figcaption>
  </figure>
</div>

<p className="album-date"><time dateTime="2026-10">2026/10</time></p>
```

`width` 和 `height` 填照片的实际尺寸。第一张可用 `loading="eager"`，后续照片用 `loading="lazy"`。`static/img/example.jpg` 在网页中的路径是 `/img/example.jpg`，不带 `static`。

## 常用修改位置

| 想修改的内容 | 文件 |
| --- | --- |
| 关于馆长、四馆说明、首页更新日期、GIF 和小记配置 | `src/data/museum.ts` |
| 首页标题、短句、首图布局、更新记录文案 | `src/pages/index.tsx` |
| 四馆简介布局 | `src/pages/halls.tsx` |
| 导航、手机菜单、馆藏目录 | `src/components/Museum.tsx` |
| 分类名称与目录排序 | `src/utils/categories.ts` |
| 学习 / 生活工具及简介 | `src/data/resources.ts` |
| 联系方式和表情包引用 | `src/pages/contact.tsx` |
| 基础样式、字体声明 | `src/css/custom.css` |
| 当前视觉样式、桌面字号、照片集和联系方式样式 | `src/css/gallery.css` |
| 字体生成脚本 | `scripts/prepare-font.py` |
| 构建、站点地址和文章元数据收集 | `docusaurus.config.ts` |
| GitHub Actions 发布流程 | `.github/workflows/deploy.yml` |

`gallery.css` 在 `custom.css` 之后加载。当前设计采用旧纸档案与书刊排版：首页以深蓝刊头和化石首图组成封面，四馆简介使用双列展览目录，文章页收窄阅读宽度并统一文字层级。保留米黄色纸张背景、矿物紫细节，以及四馆的褐、绿、琥珀、化石灰。全站使用汇文明朝体，联系方式页表情包通过 CSS 混合模式与页面底色衔接。

添加网页工具时，在 `src/data/resources.ts` 的 `webTools` 数组中增加一项，`category` 填“学习”或“生活”，简介尽量简短并以句号结尾。

## 本地开发

需要 Node.js 22、Python 3 和 fontTools。下面的 `python3` 在部分 Windows 环境中需改成 `python`。

```bash
npm ci
python3 -m pip install fonttools==4.61.1
npm run dev
```

`npm run dev` 会先准备汇文明朝体，再启动开发服务。首次准备字体需要联网下载固定版本的源字体，并校验文件；后续可使用本机缓存。字体按 `src/`、`content/` 中的文字生成子集，新文章中的字会在下一次构建时纳入。

字体来源、许可及构建说明见 `static/fonts/README.md` 和 `static/fonts/Huiwen-Mincho-LICENSE.txt`。生成的 `static/fonts/huiwen-mincho.woff` 不提交到仓库，正式构建时生成后随网站发布。

如果使用 `npm start`，请先手动执行一次 `python3 scripts/prepare-font.py`。

发布前检查：

```bash
npm run typecheck
node --experimental-strip-types --test tests/*.test.mjs
npm run build
```

构建产物位于 `build/`，可用 `npm run serve` 本地预览。只更新 README 等说明文档时，不需要重新运行整站测试。

## 发布与排错

仓库的 **Settings → Pages → Source** 应选择 **GitHub Actions**。推送到 `main` 会触发类型检查、分类与分页测试、字体准备、网站构建和 GitHub Pages 部署。

**提交成功不等于网站已经更新。** 在仓库的 **Actions** 中找到对应提交，确认 `build` 和 `deploy` 都成功，再检查线上页面。部署可能需要几分钟；如果没有出现对应任务，可以在 **Build and deploy museum → Run workflow** 中选择 `main` 手动启动。

- **页面仍是旧版：** 先看部署是否完成，再尝试强制刷新或无痕窗口，排除缓存。
- **图片空白：** 检查原文件能否打开、是否为空、路径和大小写是否一致，并直接访问图片地址验证。
- **新文章没出现：** 检查所属展厅、分类、日期和编号，确认没有设置 `unlisted: true`，再看 Actions 是否报错。
- **构建因链接失败：** 检查 `slug` 和返回链接；站点配置会将失效链接作为构建错误。

## 入馆动画与互动小记

- **入馆动画：** 点击“开始漫游”后，首页原化石图分为 16 块带凹凸接口的拼图，散开淡出，1.2 秒后进入四馆简介。可跳过，减少动态效果时直接入馆；旧 `/entrance/` 地址同样使用化石拼图。动画组件与时长在 `src/components/FossilPuzzle.tsx`，样式在 `src/css/gallery.css`。旧折纸 GIF 仅作为历史素材保留。
- **互动小记：** `tips` 当前为空数组，页面不展示占位。提供专用文案后，可填入 `{text: '文案', date: '2026-10-22'}`，组件支持循环切换。文章正文不作为小记内容。
