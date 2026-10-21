import type {Config, Plugin} from '@docusaurus/types';
import type {Options, ThemeConfig} from '@docusaurus/preset-classic';
import type {LoadedContent} from '@docusaurus/plugin-content-docs';

function museumCollections(): Plugin {
  return {
    name: 'museum-collections',
    allContentLoaded({allContent, actions}) {
      const docs = Object.values(allContent['docusaurus-plugin-content-docs'] || {})
        .flatMap(content => (content as LoadedContent).loadedVersions.flatMap(version => version.docs))
        .filter(doc => !doc.unlisted);
      actions.setGlobalData(docs.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        href: doc.permalink,
        hall: String(doc.frontMatter.museum_hall || ''),
        category: String(doc.frontMatter.category || ''),
        specimen: String(doc.frontMatter.specimen || '—'),
        date: String(doc.frontMatter.date || ''),
      })).sort((a, b) => b.date.localeCompare(a.date) || a.specimen.localeCompare(b.specimen)));
    },
  };
}

const config: Config = {
  title: '纸烟的博物馆奇妙夜',
  tagline: '一只叫纸烟的恐龙，在这里收藏学习、探索、小说诗歌与杂谈感悟。',
  url: 'https://zhiyancigarecloud.github.io',
  baseUrl: '/',
  organizationName: 'ZhiyanCigarecloud',
  projectName: 'zhiyancigarecloud.github.io',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'zh-Hans', locales: ['zh-Hans']},
  plugins: [museumCollections],
  presets: [['classic', {
    docs: {
      path: 'content',
      routeBasePath: 'collection',
      sidebarPath: false,
      showLastUpdateAuthor: false,
      showLastUpdateTime: false,
    },
    blog: false,
    theme: {customCss: './src/css/custom.css'},
  } satisfies Options]],
  themeConfig: {
    colorMode: {defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false},
    navbar: {title: '纸烟的博物馆奇妙夜', items: []},
    footer: {style: 'light', links: []},
    metadata: [{name: 'theme-color', content: '#f1e6d2'}],
  } satisfies ThemeConfig,
};
export default config;
