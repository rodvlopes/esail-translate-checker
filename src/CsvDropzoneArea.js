import React, { useCallback, useContext } from 'react'
import { Context } from './Store'
import { DropzoneArea } from 'material-ui-dropzone'
import runner from './runner'

export default function CsvDropzoneArea() {
  const [, dispatch] = useContext(Context)

  const onChange = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = async () => {
          const fileText = reader.result
          const result = await runner(file, fileText)
          dispatch({
            type: 'ADD_DATA',
            payload: result,
          })
        }
        reader.readAsText(file)
      })

      console.log('acceptedFiles', acceptedFiles)
    },
    [dispatch]
  )

  return (
    <DropzoneArea
      onChange={onChange}
      acceptedFiles={['text/csv']}
      showPreviewsInDropzone={false}
      filesLimit={10000000}
    />
  )
}
