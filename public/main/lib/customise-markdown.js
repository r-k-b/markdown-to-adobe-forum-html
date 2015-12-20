'use strict';

import R from 'ramda';
import markdownit from 'markdown-it';
const md = markdownit();

const weirdBlockSpacer = '<p class="weird-block-spacer">&nbsp;</p>';
const extraIndentLevel = 4;
const extraIndent = ' '.repeat(extraIndentLevel);
const linebreakRE = /\n/g;

const mangleCodeBlock = (tokenContent) => {
  const normalBlock = md.utils.escapeHtml(tokenContent);
  return extraIndent + normalBlock.replace(
      linebreakRE,
      `<br />${ extraIndent }`
    );
};

md.renderer.rules.paragraph_close = () => '</p>\n' + weirdBlockSpacer;// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers

md.renderer.rules.code_block = (tokens, idx /*, options, env */) => {// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
  return `<pre><code>${
    mangleCodeBlock(tokens[idx].content)
    }</code></pre>\n${ weirdBlockSpacer }`;
};

export default R.bind(md.render, md);
