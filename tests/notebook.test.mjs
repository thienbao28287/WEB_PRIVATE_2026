import test from 'node:test';
import assert from 'node:assert/strict';
import { getLessonPitfalls, renderNotebookDialog, LESSON_PITFALLS } from '../web/assets/notebook.js';

test('lesson pitfalls dataset contains valid structure for all documented lessons', () => {
  for (const [lessonKey, list] of Object.entries(LESSON_PITFALLS)) {
    assert.ok(Array.isArray(list) && list.length > 0, `Lesson ${lessonKey} should have pitfalls`);
    for (const item of list) {
      assert.ok(item.id && typeof item.id === 'string', 'Pitfall must have an id');
      assert.ok(item.title && typeof item.title === 'string', 'Pitfall must have a title');
      assert.ok(item.tag && typeof item.tag === 'string', 'Pitfall must have a tag');
      assert.ok(item.symptom && typeof item.symptom === 'string', 'Pitfall must describe symptom');
      assert.ok(item.badCode && typeof item.badCode === 'string', 'Pitfall must have bad code example');
      assert.ok(item.goodCode && typeof item.goodCode === 'string', 'Pitfall must have good code solution');
      assert.ok(item.explanation && typeof item.explanation === 'string', 'Pitfall must have explanation');
    }
  }
});

test('getLessonPitfalls returns fallback or specific pitfalls for any requested lesson', () => {
  const p1 = getLessonPitfalls(1, 'theory');
  assert.ok(p1.length >= 3);
  assert.equal(p1[0].id, 'l1-path-git');

  const p2 = getLessonPitfalls(2, 'theory');
  assert.ok(p2.some(item => item.title.includes('preventDefault')));

  const pFallback = getLessonPitfalls(99, 'theory');
  assert.ok(pFallback.length > 0, 'Fallback returns general web pitfalls');
});

test('renderNotebookDialog produces valid markup with notebook styling and comparison boxes', () => {
  const lesson = { number: 2, title: 'HTML cơ bản' };
  const page = { type: 'theory' };
  const pitfalls = getLessonPitfalls(2, 'theory');
  const html = renderNotebookDialog(lesson, page, pitfalls);

  assert.match(html, /id="notebook-dialog"/);
  assert.match(html, /class="notebook-book"/);
  assert.match(html, /class="notebook-spine"/);
  assert.match(html, /class="notebook-page-surface"/);
  assert.match(html, /code-box-bad/);
  assert.match(html, /code-box-good/);
  assert.match(html, /preventDefault/);
});
