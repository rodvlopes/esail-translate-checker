import { readFile } from 'fs'
import neatCsv from 'neat-csv'
import { tagsChecker, empty } from './common.js'

const headers= [
  {
    filename: './eSailData_LocaleTextStrings.csv',
    enHeaders: ['English '], 
    ptHeaders: ['Portuguese'],
    topShift: 0, //num of lines to ignore after header
  },
  {
    filename: './eSailData_LocaleItems.csv',
    enHeaders: ['3=text \n\n ° <flink=000></fLink>', '4=Beginner Text'], 
    ptHeaders: ['41=Portuguese', '42=Portuguese Beginner'],
    topShift: 1, //num of lines to ignore after header
  },
]

function checkOneFile(filepath, enHeaders, otherHeaders, topShift) {
  readFile(filepath, 'utf8', async (err, data) => {
    if (err) throw err;
    const lines = await neatCsv(data)
    console.log(filepath)
    for (let i in lines) {
      if (i < topShift) 
        continue

      const line = lines[i]
      for (let k in enHeaders) {
        const enH = enHeaders[k]
        const otherH = otherHeaders[k]
        const en = line[enH]
        //console.log(en)
        const other = line[otherH]
        if (en && (!tagsChecker(en, other) || empty(en, other))) {
          console.log('┌line', 2+parseInt(i), enH)
          console.log('├en', en)
          console.log('└pt', other)
        }
      }
    }
  })
}

for (let headerMap of headers) {
  const {
    filename, enHeaders, ptHeaders, topShift
  } = headerMap
  checkOneFile(filename, enHeaders, ptHeaders, topShift)
}
