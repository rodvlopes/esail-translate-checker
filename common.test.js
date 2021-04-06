import { tagsChecker, empty } from './common.js'
import { strict as assert } from 'assert';

function test_tagsChecker() {
  let en, pt
  en='<link="UserFeedback"><#300000><u><i>Give feedback</i></u><#000000></link>.'
  pt='<link="UserFeedback"><#300000><u><i>Enviar seus comentários</i></u><#000000></link>.'

  assert.ok(tagsChecker(en, pt))


  en='alo'
  pt='alo'
  assert.ok(tagsChecker(en, pt))
}

function test_empty() {
  let en, pt
  en='<link="UserFeedback"><#300000><u><i>Give feedback</i></u><#000000></link>.'
  pt='<link="UserFeedback"><#300000><u><i>Enviar seus comentários</i></u><#000000></link>.'

  assert.ok(!empty(en, pt))

  assert.ok(!empty(' ', ''))

  assert.ok(empty('alo', ' '))

  assert.ok(empty('alo', null))
}

test_tagsChecker()
test_empty()
