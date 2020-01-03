import * as React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { useStore } from '../../util/useStore'
import { Rule } from './Rule'
import { observer } from 'mobx-react-lite'
import { toBase } from '../../../util/baseConverter'

let style = {
   width: 'max-content', // 'initial',
}

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      tableContainer: style,
      table: style,
   }),
)

let reverse = (v: string): string => {
   return v
      .split('')
      .reverse()
      .join('')
}

export let PropertyList = observer(() => {
   let store = useStore()
   let classes = useStyle()

   let { rule } = store
   let binary = toBase(rule, 2, { size: 255 })
   let colorComplement = parseInt(reverse(binary), 2)
   let colorSymmetric = 255 - colorComplement

   //              [0, 1, 2, 3, 4, 5, 6, 7]
   //              [   x     y  x     y   ]
   let lrSwapped = [0, 4, 2, 6, 1, 5, 3, 7].map((k) => binary[k]).join('')
   let lrSymmetric = parseInt(lrSwapped, 2)
   let bothSymmetric = 255 - parseInt(reverse(lrSwapped), 2)

   let tableInfo: [string, number][] = [
      ['Left-right symmetry', lrSymmetric],
      ['Color symmetry', colorSymmetric],
      ['Both symmetries', bothSymmetric],
      ['Out color complement', colorComplement],
   ]

   let TC = TableCell

   return (
      <TableContainer className={classes.tableContainer} component={Paper}>
         <Table className={classes.table} size="small">
            <TableHead>
               <TableRow>
                  <TC>Name</TC>
                  <TC>Status</TC>
                  <TC align="right">Rule</TC>
               </TableRow>
            </TableHead>
            <TableBody>
               {tableInfo.map(([name, r]) => {
                  let status = r === rule ? 'symmetric' : 'asymmetric'
                  return (
                     <TableRow key={name}>
                        <TC>{name}</TC>
                        <TC>{status}</TC>
                        <TC align="right">
                           <Rule rule={r} />
                        </TC>
                     </TableRow>
                  )
               })}
            </TableBody>
         </Table>
      </TableContainer>
   )
})
