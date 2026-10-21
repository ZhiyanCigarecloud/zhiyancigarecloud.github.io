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
        specimen: String(doc.frontMatter.specimen || '—'),
        status: String(doc.frontMatter.museum_status || '展出中'),
        example: doc.frontMatter.museum_example === true,
        date: String(doc.frontMatter.date || ''),
      })).sort((a, b) => b.date.localeCompare(a.date) || a.specimen.localeCompare(b.specimen)));
    },
  };
}

const config: Config = {
  title: '纸烟的博物馆奇妙夜',
  tagline: '每段文字，都是被发掘和重新命名的化石标本。',
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
