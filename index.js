import { readFile } from 'fs'
import neatCsv from 'neat-csv'
import { tagsChecker, empty } from './common.js'

const headers= [
  {
    filename: './eSailData_LocaleCategories.csv',
    enHeaders: ['1=MenuTitle', '2=MenuText'], 
    ptHeaders: ['18=Portuguese Title', '19=Portuguese Text'],
    ignore: [14],
  },
  {
    filename: './eSailData_LocaleModules.csv',
    enHeaders: ['1=MenuTitle', '2=MenuText'], 
    ptHeaders: ['13=Portuguese Header', '14=Portuguese Text'],
  },
  {
    filename: './eSailData_LocaleTextStrings.csv',
    enHeaders: ['English '], 
    ptHeaders: ['Portuguese'],
  },
  {
    filename: './eSailData_LocaleItems.csv',
    enHeaders: ['3=text \n\n ° <flink=000></fLink>', '4=Beginner Text'], 
    ptHeaders: ['41=Portuguese', '42=Portuguese Beginner'],
    ignore: [1], //the num of the line to ignore (the num is what you see on the sheet)
  },
  {
    filename: './eSailData_LocaleAlerts.csv',
    enHeaders: ['2=Alert Header','3=Alert Text     \\n\\n    °  <flink=000></fLink>'], 
    ptHeaders: ['14=Portuguese Header', '15=Portuguese Text'],
    ignore: [1], //the num of the line to ignore (the num is what you see on the sheet)
  },
  {
    filename: './eSailData_LocaleKeyNames.csv',
    enHeaders: ['English'], 
    ptHeaders: ['Portuguese'],
  },
  {
    filename: './eSailData_LocaleOptions.csv',
    enHeaders: ['1=Text'], 
    ptHeaders: ['7=Portuguese Text'],
  },
  {
    filename: './eSailData_Steam.csv',
    enHeaders: ['English'], 
    ptHeaders: ['Portuguese'],
  },
  {
    filename: './eSailData_Website.csv',
    enHeaders: ['English'], 
    ptHeaders: ['Portuguese'],
    ignore: [42],
  },
]

function checkOneFile(filepath, enHeaders, otherHeaders, ignore=[]) {
  readFile(filepath, 'utf8', async (err, data) => {
    if (err) throw err;
    const lines = await neatCsv(data)
    //console.log(Object.keys(lines[0]))
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
        //console.log(en)
        const other = line[otherH]
        if (en && (!tagsChecker(en, other) || empty(en, other))) {
          console.log('┌line', 2+i, enH)
          console.log('├en', en)
          console.log('└pt', other)
        }
      }
    }
  })
}

for (let headerMap of headers) {
  const {
    filename, enHeaders, ptHeaders, ignore
  } = headerMap
  checkOneFile(filename, enHeaders, ptHeaders, ignore)
}
