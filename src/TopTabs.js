import React, { useContext } from 'react'
import { Context } from './Store'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { toLangs } from './runner'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  dateDetail: {
    fontSize: 'small',
  },
}))

export function LangsTopTabs() {
  const [state, dispatch] = useContext(Context)
  const classes = useStyles()
  const selectedLang = state.selectedLang
  const selectedFile = state.selectedFile
  const file = state.data.find((f) => f.filename === selectedFile)
  const selectedFileContent = file[selectedLang]

  const handleChange = (event, newSelectedLang) => {
    dispatch({ type: 'SET_SELECTED_LANG', payload: newSelectedLang })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedLang}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {toLangs.map((l) => {
            const errorClass = file[l] !== '' ? 'reddot' : ''
            return <Tab value={l} label={l} key={l} className={errorClass} />
          })}
        </Tabs>
      </AppBar>
      {toLangs.map((l) => (
        <div role="tabpanel" hidden={selectedLang !== l} key={l}>
          {selectedLang === l && (
            <Box p={3}>
              <pre>{selectedFileContent || '√ ok'}</pre>
            </Box>
          )}
        </div>
      ))}
    </div>
  )
}

export function FilesTopTabs() {
  const [state, dispatch] = useContext(Context)
  const classes = useStyles()
  const selectedFile = state.selectedFile
  const files = state.data

  const handleChange = (event, newSelectedFile) => {
    dispatch({ type: 'SET_SELECTED_FILE', payload: newSelectedFile })
  }

  const tabLabel = (file) => (
    <>
      <span>{file.filename.replace(/^.*_/, '').replace(/\.csv$/i, '')}</span>
      <span className={classes.dateDetail}>{file.datetime}</span>
    </>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedFile}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {files.map((f) => (
            <Tab value={f.filename} label={tabLabel(f)} key={f.filename} />
          ))}
        </Tabs>
      </AppBar>
    </div>
  )
}
