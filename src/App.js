import Box from '@material-ui/core/Box'
import React, { useContext } from 'react'
import { Context } from './Store'
import CsvDropzoneArea from './CsvDropzoneArea'
import { LangsTopTabs, FilesTopTabs } from './TopTabs'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

function App() {
  const [state] = useContext(Context)

  const helptext = (
    <>
      <Typography variant="caption">
        <ul>
          <li>
            Download the sheets from Zoho as .csv and then drag and drop over
            the highlighted area.
          </li>
          <li>Then click on the languages to check the result.</li>
          <li>Languages with a red dot means there are some problems.</li>
          <li>You can also upload many files at once.</li>
          <li>To update the result, re-upload the corresponding csv file.</li>
        </ul>
      </Typography>
    </>
  )

  return (
    <div className="App">
      <Box component="header" m={1}>
        <Box component="span" display="flex" justifyContent="space-evenly">
          eSail Lang Checker
        </Box>
      </Box>
      <CsvDropzoneArea />
      {state.data.length && (
        <>
          <FilesTopTabs />
          <LangsTopTabs />
        </>
      )}

      <Tooltip title={helptext}>
        <Fab className="floatButton" color="primary">
          <HelpOutlineIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default App
