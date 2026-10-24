import type {Root} from 'mdast';

type Node = {
  type: string;
  value?: string;
  depth?: number;
  name?: string;
  url?: string;
  attributes?: {name?: string; value?: unknown}[];
  children?: Node[];
};

/** Chinese characters count individually; other letters/numbers count by word. */
export function countWords(text: string): number {
  const chinese = text.match(/\p{Script=Han}/gu)?.length ?? 0;
  const rest = text.replace(/\p{Script=Han}/gu, ' ');
  const words = rest.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return chinese + words;
}

function hasClass(node: Node, className: string): boolean {
  return node.attributes?.some(attr =>
    (attr.name === 'className' || attr.name === 'class') &&
    typeof attr.value === 'string' && attr.value.split(/\s+/).includes(className)) ?? false;
}

function visibleText(node: Node): string {
  if (['code', 'inlineCode', 'yaml', 'toml', 'html', 'mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'image', 'imageReference', 'definition', 'footnoteDefinition'].includes(node.type)) return '';
  if (node.type === 'heading' && node.depth === 1) return '';
  if (['writing-date', 'album-date', 'article-word-count'].some(name => hasClass(node, name))) return '';
  if (node.name === 'figcaption') return '';
  if (node.type === 'paragraph' && node.children?.length === 1) {
    const child = node.children[0];
    if (child.type === 'link' && /^\/(halls|strata|wild|amber|fragments)\/(?:\?|$)/.test(child.url ?? '') && /返回/.test(visibleText(child))) return '';
  }
  if (node.type === 'text') return node.value ?? '';
  // Inline formatting does not split a word; separate block elements do.
  const inline = ['paragraph', 'heading', 'strong', 'emphasis', 'delete', 'link', 'linkReference', 'mdxJsxTextElement'].includes(node.type);
  return node.children?.map(visibleText).join(inline ? '' : '\n') ?? '';
}

export function countArticleWords(tree: Node): number {
  return countWords(visibleText(tree));
}

/** Insert the count into every article at build time, including its static HTML. */
export default function remarkWordCount() {
  return (tree: Root) => {
    const nodes = tree.children as unknown as Node[];
    const count = countArticleWords(tree as unknown as Node);
    const dateIndex = nodes.findIndex(node => hasClass(node, 'writing-date'));
    const titleIndex = nodes.findIndex(node => node.type === 'heading' && node.depth === 1);
    const index = dateIndex >= 0 ? dateIndex + 1 : titleIndex >= 0 ? titleIndex + 1 : 0;
    tree.children.splice(index, 0, {
      type: 'paragraph',
      data: {hProperties: {className: ['article-word-count']}},
      children: [{type: 'text', value: `正文 ${count.toLocaleString('zh-CN')} 字`}],
    });
  };
}
