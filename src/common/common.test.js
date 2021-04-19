import { tagsMatch, empty } from './common.js'
import { strict as assert } from 'assert'

let en, pt

test('tagsMatch', () => {
  en =
    '<link="UserFeedback"><#300000><u><i>Give feedback</i></u><#000000></link>.'
  pt =
    '<link="UserFeedback"><#300000><u><i>Enviar seus comentários</i></u><#000000></link>.'
  expect(tagsMatch(en, pt)).toBeTruthy()

  en =
    '<link="UserFeedback"><#300000><u><i>Give feedback</i></u><#000000></link>.'
  pt =
    '<link=""><#300000><u><i>Enviar seus comentários</i></u><#000000></link>.'
  expect(tagsMatch(en, pt)).toEqual({
    en: [
      '<link="UserFeedback">',
      '<#300000>',
      '<u>',
      '<i>',
      '</i>',
      '</u>',
      '<#000000>',
      '</link>',
    ],
    other: [
      '<link="">',
      '<#300000>',
      '<u>',
      '<i>',
      '</i>',
      '</u>',
      '<#000000>',
      '</link>',
    ],
  })

  expect(tagsMatch('alo', 'alo')).toBeTruthy()

  expect(tagsMatch('alo', undefined)).toBeTruthy()

  en = `With [i]eSail[/i]`
  pt = `Com sSail`
  expect(tagsMatch(en, pt)).toEqual({
    en: ['[i]', '[/i]'],
    other: [],
  })

  en = `With [i]eSail[/i]`
  pt = `Com []sSail[/i]`
  expect(tagsMatch(en, pt)).toEqual({
    en: ['[i]', '[/i]'],
    other: ['[]', '[/i]'],
  })

  en = `With [i]eSail[/i]`
  pt = `Com [i]sSail[/i]`
  expect(tagsMatch('alo', undefined)).toBeTruthy()

  en = `With [i]eSail[/i]
    [img]{STEAM_APP_IMAGE}/extras/eSail_Mooring_banner.gif[/img]
    [b]ACCURATE BOAT HANDLING[/b]
    [b]
    LEARN FROM THE EXPERTS [/b]
    eSail includes a complete sailing course which can support your certified training ([url=https://www.rya.org.uk]RYA[/url], [url=https://www.ussailing.org/]US Sailing[/url]
  `
  pt = `Com o [i]eSail[/i]
    [img]{STEAM_APP_IMAGE}/extras/eSail_Mooring_banner.gif[/img]
    [b]MANUSEIO PRECISO DO BARCO[/b]
    [b]
    APRENDA COM OS ESPECIALISTAS [/b]
    O eSail inclui um curso de vela completo que pode apoiar seu treinamento certificado ([url=https://www.rya.org.uk]RYA[/url], [url=https://www.ussailing.org/]US Sailing[/url]
  `
  expect(tagsMatch('alo', undefined)).toBeTruthy()
})

test('empty', () => {
  en =
    '<link="UserFeedback"><#300000><u><i>Give feedback</i></u><#000000></link>.'
  pt =
    '<link="UserFeedback"><#300000><u><i>Enviar seus comentários</i></u><#000000></link>.'

  expect(empty(en, pt)).toBeFalsy()

  expect(empty(' ', '')).toBeFalsy()

  expect(empty('alo', ' ')).toBeTruthy()

  expect(empty('alo', null)).toBeTruthy()

  expect(empty('alo', undefined)).toBeTruthy()
})
