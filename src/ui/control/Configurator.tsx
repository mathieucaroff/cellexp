import {
   createStyles,
   ExpansionPanel,
   ExpansionPanelDetails,
   ExpansionPanelSummary,
   makeStyles,
   Theme,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import {
   displayThemeNameFromCellexp,
   themeNameFromCellexp,
} from '../../www/theme'
import { useSharedStyle } from '../style'
import { clx } from '../util/clx'
import { useStore } from '../util/useStore'
import { ThemeSelector } from './components/AppThemeSelector'

export let useStyle = makeStyles((theme: Theme) =>
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

export let Configurator = observer(() => {
   let store = useStore()
   let shared = useSharedStyle()
   let classes = useStyle()

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails

   return (
      <div>
         <EP className={shared.panel}>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Application Config</h3>
            </EPSm>
            <EPDt className={clx(classes.inputSizing, shared.block)}>
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
            </EPDt>
         </EP>
      </div>
   )
})
