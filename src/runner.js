import neatCsv from 'neat-csv'
import { tagsMatch, empty } from './common/common.js'

const headers = [
  {
    filename: 'eSailData_LocaleCategories',
    en: ['1=MenuTitle', '2=MenuText'],
    fr: ['8=French Title', '9=French Text'],
    ru: ['10=Russian Title', '11=Russian Text'],
    de: ['12=German Title', '13=German Text'],
    tr: ['14=Turkish Title', '15=Turkish Text'],
    es: ['16=Spanish Title', '17=Spanish Text'],
    pt: ['18=Portuguese Title', '19=Portuguese Text'],
    gr: ['20=Greek Title', '21=Greek Text'],
    it: ['22=Italian Title', '23=Italian Text'],
    nl: ['24=Dutch Title', '25=Dutch Text'],
    pl: ['26=Polish Title', '27=Polish Text'],
    ignore: [14], //the num of the line to ignore (the num is what you see on the sheet)
  },
  {
    filename: 'eSailData_LocaleModules',
    en: ['1=MenuTitle', '2=MenuText'],
    fr: ['3=French Header', '4=French Text'],
    ru: ['5=Russian Header', '6=Russian Text'],
    de: ['7=German Header', '8=German Text'],
    tr: ['9=Turkish Header', '10=Turkish Text'],
    es: ['11=Spanish Header', '12=Spanish Text'],
    pt: ['13=Portuguese Header', '14=Portuguese Text'],
    gr: ['15=Greek Header', '16=Greek Text'],
    it: ['17=Italian Header', '18=Italian Text'],
    nl: ['19=Dutch Header', '20=Dutch Text'],
    pl: ['21=Polish Header', '22=Polish Text'],
  },
  {
    filename: 'eSailData_LocaleItems',
    en: ['3=text \n\n ° <flink=000></fLink>', '4=Beginner Text'],
    fr: ['31=French', '32=French Beginner'],
    ru: ['33=Russian', '34=Russian Beginner'],
    de: ['35=German', '36=German Beginner'],
    tr: ['37=Turkish', '38=Turkish Beginner'],
    es: ['39=Spanish', '40=Spanish Beginner'],
    pt: ['41=Portuguese', '42=Portuguese Beginner'],
    gr: ['43=Greek', '44=Greek Beginner'],
    it: ['45=Italian', '46=Italian Beginner'],
    nl: ['47=Dutch', '48=Dutch Beginner'],
    pl: ['49=Polish', '50=Polish Beginner'],
    ignore: [1], //the num of the line to ignore (the num is what you see on the sheet)
  },
  {
    filename: 'eSailData_LocaleTextStrings',
    en: ['English '],
    fr: ['French'],
    ru: ['Russian'],
    de: ['German'],
    tr: ['Turkish'],
    es: ['Spanish'],
    pt: ['Portuguese'],
    gr: ['Greek'],
    it: ['Italian'],
    nl: ['Dutch'],
    pl: ['Polish'],
  },
  {
    filename: 'eSailData_LocaleAlerts',
    en: ['2=Alert Header', '3=Alert Text     \\n\\n    °  <flink=000></fLink>'],
    fr: ['4=French Header', '5=French Text'],
    ru: ['6=Russian Header', '7=Russian Text'],
    de: ['8=German Header', '9=German Text'],
    tr: ['10=Turkish Header', '11=Turkish Text'],
    es: ['12=Spanish Header', '13=Spanish Text'],
    pt: ['14=Portuguese Header', '15=Portuguese Text'],
    gr: ['16=Greek Header', '17=Greek Text'],
    it: ['18=Italian Header', '19=Italian Text'],
    nl: ['20=Dutch Header', '21=Dutch Text'],
    pl: ['22=Polish Header', '23=Polish Text'],
    ignore: [1], //the num of the line to ignore (the num is what you see on the sheet)
  },
  {
    filename: 'eSailData_LocaleKeyNames',
    en: ['English'],
    fr: ['French'],
    ru: ['Russian'],
    de: ['German'],
    tr: ['Turkish'],
    es: ['Spanish'],
    pt: ['Portuguese'],
    gr: ['Greek'],
    it: ['Italian'],
    nl: ['Dutch'],
    pl: ['Polish'],
  },
  {
    filename: 'eSailData_LocaleOptions',
    en: ['1=Text'],
    fr: ['2=French Text'],
    ru: ['3=Russian Text'],
    de: ['4=German Text'],
    tr: ['5=Turkish Text'],
    es: ['6=Spanish Text'],
    pt: ['7=Portuguese Text'],
    gr: ['8=Greek Text'],
    it: ['9=Italian Text'],
    nl: ['10=Dutch Text'],
    pl: ['11=Polish Text'],
  },
  {
    filename: 'eSailData_Steam',
    en: ['English'],
    fr: ['French'],
    ru: ['Russian'],
    de: ['German'],
    tr: ['Turkish'],
    es: ['Spanish'],
    pt: ['Portuguese'],
    gr: ['Greek'],
    it: ['Italian'],
    nl: ['Dutch'],
    pl: ['Polish'],
  },
  {
    filename: 'eSailData_Website',
    en: ['English'],
    fr: ['French'],
    ru: ['Russian'],
    de: ['German'],
    tr: ['Turkish'],
    es: ['Spanish'],
    pt: ['Portuguese'],
    gr: ['Greek'],
    it: ['Italian'],
    nl: ['Dutch'],
    pl: ['Polish'],
    ignore: [42],
  },
]

export async function checkOneFile(
  data,
  enHeaders,
  otherHeaders,
  otherLang,
  ignore = []
) {
  const output = []
  const lines = await neatCsv(data)
  const print = (msg) => {
    console.log(msg)
    output.push(msg)
  }

  for (let i in lines) {
    i = parseInt(i)

    if (ignore && ignore.includes(i + 2)) continue

    const line = lines[i]
    for (let k in enHeaders) {
      const enH = enHeaders[k]
      const otherH = otherHeaders[k]
      const en = line[enH]
      const other = line[otherH]
      if (en) {
        const tagsMatchResult = tagsMatch(en, other)
        if (empty(en, other)) {
          print(`┌line ${2 + i} ${enH}`)
          print(`├en' ${en}`)
          print(`└${otherLang} <empty>\n`)
        } else if (tagsMatchResult !== true) {
          print(`┌line ${2 + i} ${enH}`)
          print(`├en ${tagsMatchResult.en}`)
          print(`└${otherLang} ${tagsMatchResult.other}\n`)
        }
      }
    }
  }
  return output.join('\n')
}

export const toLangs = [
  'fr',
  'ru',
  'de',
  'tr',
  'es',
  'pt',
  'gr',
  'it',
  'nl',
  'pl',
]

export default async function runner(/*File*/ file, data) {
  const result = {
    filename: file.name,
    datetime: new Date(file.lastModified).toLocaleString(),
  }

  for (let toLang of toLangs) {
    console.log(`\n--> Starting ${toLang} check...`)
    const headerMap = headers.find((h) =>
      h.filename.includes(file.name.replace(/\.csv/i, ''))
    )
    result[toLang] = await checkOneFile(
      data,
      headerMap.en,
      headerMap[toLang],
      toLang,
      headerMap.ignore
    )
  }

  return result
}
