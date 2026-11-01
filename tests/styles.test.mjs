import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { compileStyles } from '../scripts/styles.mjs';

test('Tailwind build emits static utilities, components and visibility states', async () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const css = await compileStyles(root);
  const tree = postcss.parse(css);
  tree.walkAtRules(rule => {
    assert.ok(!['apply', 'import', 'theme', 'source', 'custom-variant'].includes(rule.name), `Uncompiled @${rule.name}`);
  });
  const selectors = [];
  tree.walkRules(rule => selectors.push(rule.selector));
  for (const selector of ['.button', '.code-toolbar', '.notes-document', '.lesson-quiz', '.inline-flex', '.balloons-left', '.balloons-right', '.balloon-0']) {
    assert.ok(selectors.some(value => value.includes(selector)), `Missing ${selector}`);
  }
  assert.ok(selectors.some(value => value.includes('intro\\:hidden')), 'Intro display variant must be generated');
  assert.ok(selectors.some(value => value.includes('min-\\[901px\\]')), 'Responsive header utility must be generated');
  assert.ok(selectors.some(value => value.includes('[hidden]')), 'Native hidden state must be retained');
});
