import { makeStyles, Theme, createStyles } from '@material-ui/core'

export let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      ui: {
         '&': {
            marginLeft: '1em',
         },
         '& *': {
            fontFamily: 'Segoe UI',
         },
         '& h1, & h2, & h3, & h4, & h5, & h6': {
            fontWeight: 300,
         },
         '& input': {
            width: 135,
         },
      },
      inputList: {
         '& > *': {
            margin: theme.spacing(1),
            display: 'inline-block',
         },
      },
      propertyList: {},
   }),
)
