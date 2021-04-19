import { readFile } from 'fs'
import neatCsv from 'neat-csv'
import { tagsMatch, empty } from './src/common/common.js'

const headers= [
  {
    filename: './eSailData_LocaleCategories.csv',
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
    filename: './eSailData_LocaleModules.csv',
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
    filename: './eSailData_LocaleItems.csv',
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
    filename: './eSailData_LocaleTextStrings.csv',
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
    filename: './eSailData_LocaleAlerts.csv',
    en: ['2=Alert Header','3=Alert Text     \\n\\n    °  <flink=000></fLink>'], 
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
    filename: './eSailData_LocaleKeyNames.csv',
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
    filename: './eSailData_LocaleOptions.csv',
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
    filename: './eSailData_Steam.csv',
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
    filename: './eSailData_Website.csv',
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

function checkOneFile(filepath, enHeaders, otherHeaders, otherLang, ignore=[]) {
  return new Promise(rs =>
    readFile(filepath, 'utf8', async (err, data) => {
      if (err) throw err;
      const lines = await neatCsv(data)
      console.log(filepath)
      for (let i in lines) {
        i=parseInt(i)

        if (ignore && ignore.includes(i+2)) 
          continue

        const line = lines[i]
        for (let k in enHeaders) {
          const enH = enHeaders[k]
          const otherH = otherHeaders[k]
          const en = line[enH]
          const other = line[otherH]
          if (en) {
            const tagsMatchResult = tagsMatch(en, other)
            if (empty(en, other)) {
              console.log('┌line', 2+i, enH)
              console.log('├en', en)
              console.log(`└${otherLang}`, '<empty>')
            }
            else if (tagsMatchResult !== true) {
              console.log('┌line', 2+i, enH)
              console.log('├en', tagsMatchResult.en)
              console.log(`└${otherLang}`, tagsMatchResult.other)
            }
          }
        }
      }
      rs()
    })
  )
}


async function main (toLangs) {
  for (let toLang of toLangs) {
    console.log(`\n--> Starting ${toLang} check...`)
    for (let headerMap of headers) {
      await checkOneFile(headerMap.filename, headerMap.en, headerMap[toLang], toLang, headerMap.ignore)
    }
  }
}

const toLangs = ['en', 'fr', 'ru', 'de', 'tr', 'es', 'pt', 'gr', 'it', 'nl', 'pl']


function cliOptions() {
  const validOptions = toLangs.map(l=>`--${l}`)
  return validOptions.filter(l => process.argv.find(o => o == l)).map(o => o.replace(/^--/, ''))
}

const opts = cliOptions()
const selectedLangs = opts.length ? opts : toLangs

main(selectedLangs)

