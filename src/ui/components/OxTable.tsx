import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import * as React from 'react'
import { Xelement } from '../util/Xelement'

let useStyle = makeStyles((theme: Theme) => {
   let style = {
      width: 'max-content', // 'initial',
   }

   return createStyles({
      tableContainer: style,
      table: style,
   })
})

export type Align = 'left' | 'right' | 'inherit' | 'center' | 'justify'

export interface SymmetricTableProp {
   tableHead: [Xelement, Align?][]
   tableData: Xelement[][]
}

export let OxTable = (prop: SymmetricTableProp) => {
   let { tableHead, tableData } = prop

   if (tableData.some((line) => line.length > tableHead.length)) {
      let msg = 'OxTable{.tableData[?].length > .tableHead.length}'
      console.error(msg, new Error().stack)
   }

   let classes = useStyle()

   let TC = TableCell

   return (
      <TableContainer className={classes.tableContainer} component={Paper}>
         <Table className={classes.table}>
            {/* size="small" -- has no effect in production :c */}
            <TableHead>
               <TableRow>
                  {tableHead.map(([content, align], k) => (
                     <TC
                        className={'MuiTableCell-sizeSmall'}
                        align={align}
                        key={k}
                     >
                        <strong>{content}</strong>
                     </TC>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {tableData.map((line, j) => (
                  <TableRow key={j}>
                     {line.map((content, k) => (
                        <TC
                           className={'MuiTableCell-sizeSmall'}
                           align={(tableHead[k] || [])[1]}
                           key={k}
                        >
                           {content}
                        </TC>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}
