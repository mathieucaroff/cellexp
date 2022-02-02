import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import {
   displayThemeNameFromCellexp,
   themeNameFromCellexp,
} from '../../www/theme'
import { useStore } from '../util/useContextHook'
import { ThemeSelector } from './components/AppThemeSelector'
import { OxExpansionPanel } from '../components/OxExpansionPanel'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      inputSizing: {
         '& input': {
            width: '120px',
         },
      },
      inputList: {
         '& > *': {
            margin: theme.spacing(1),
            display: 'inline-block',
         },
      },
   }),
)

export let ThemeConfigurator = observer(() => {
   let classes = useStyle()
   let store = useStore()

   return (
      <div>
         <OxExpansionPanel
            title="Theme"
            defaultExpanded={false}
            contentDisplayBlock={true}
            ExpansionPanelDetailsProps={{
               className: classes.inputSizing,
            }}
            content={
               <div className={classes.inputList}>
                  <ThemeSelector
                     label="App Theme"
                     help="Application UI colors"
                     store={store}
                     themeProperty="theme"
                     nameFunction={themeNameFromCellexp}
                  />
                  <ThemeSelector
                     label="Display Theme"
                     help="Cellular automaton colors"
                     store={store}
                     themeProperty="displayTheme"
                     nameFunction={displayThemeNameFromCellexp}
                     allowUnset
                  />
               </div>
            }
         />
      </div>
   )
})
