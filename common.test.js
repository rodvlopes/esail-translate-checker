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

  en=`With [i]eSail[/i]`
  pt=`Com sSail`
  assert.ok(!tagsChecker(en, pt))  

  en=`With [i]eSail[/i]`
  pt=`Com []sSail[/i]`
  assert.ok(!tagsChecker(en, pt))  

  en=`With [i]eSail[/i]`
  pt=`Com [i]sSail[/i]`
  assert.ok(tagsChecker(en, pt))  


  en=`With [i]eSail[/i]
[img]{STEAM_APP_IMAGE}/extras/eSail_Mooring_banner.gif[/img]
[b]ACCURATE BOAT HANDLING[/b]
[b]
LEARN FROM THE EXPERTS [/b]
eSail includes a complete sailing course which can support your certified training ([url=https://www.rya.org.uk]RYA[/url], [url=https://www.ussailing.org/]US Sailing[/url]`
  pt=`Com o [i]eSail[/i]
[img]{STEAM_APP_IMAGE}/extras/eSail_Mooring_banner.gif[/img]
[b]MANUSEIO PRECISO DO BARCO[/b]
[b]
APRENDA COM OS ESPECIALISTAS [/b]
O eSail inclui um curso de vela completo que pode apoiar seu treinamento certificado ([url=https://www.rya.org.uk]RYA[/url], [url=https://www.ussailing.org/]US Sailing[/url]`
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
