import { makeStyles, Theme, createStyles } from '@material-ui/core'

export let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      ui: {
         marginLeft: '1em',
      },
      inputList: {
         '& > *': {
            margin: theme.spacing(1),
            display: 'inline-block',
         },
      },
   }),
)
