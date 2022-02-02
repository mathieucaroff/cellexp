import { createStyles, makeStyles, Theme } from '@material-ui/core'
import * as React from 'react'

export interface OutlineProp {
   label: string
   children: React.ReactElement[] | React.ReactElement
}

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      label: {
         '&': {
            color: theme.palette.grey[300],
            fontSize: 13,
            paddingLeft: 8,
         },
         '&:focus': {
            color: theme.palette.primary.main,
         },
      },
      outline: {
         '&': {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'center',
            padding: theme.spacing(1),
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '4px',
            borderColor: theme.palette.grey[700],
         },
         '&:focus': {
            borderColor: theme.palette.primary.main,
         },
         '&:hover': {
            borderColor: 'white',
         },
      },
   }),
)

export let Outline = (prop: OutlineProp) => {
   let classes = useStyle()
   return (
      <div>
         <span className={classes.label}>{prop.label}</span>
         <div className={classes.outline}>{prop.children}</div>
      </div>
   )
}
