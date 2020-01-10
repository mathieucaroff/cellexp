import { makeStyles, Theme, createStyles } from '@material-ui/core'

let noVeritcalMargins = {
   marginTop: 0,
   marginBottom: 0,
}

export let useSharedStyle = makeStyles((theme: Theme) =>
   createStyles({
      block: {
         display: 'block',
      },
      inputList: {
         '& > *': {
            margin: theme.spacing(1),
            display: 'inline-block',
         },
      },
      noVeritcalMargins,
      panel: {
         '& .MuiExpansionPanelSummary-root': {
            backgroundColor: '#EEE',
            boxShadow: [
               // Copy-pasted from `.MuiPaper-elevation1`, then formatted
               '0px 2px 1px -1px rgba(0, 0, 0, 0.2)',
               '0px 1px 1px 0px rgba(0, 0, 0, 0.14)',
               '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
            ].join(', '),
         },
         '& .Mui-expanded': {
            minHeight: 0,
            ...noVeritcalMargins,
         },
      },
      ui: {
         marginLeft: '1em',
      },
   }),
)
