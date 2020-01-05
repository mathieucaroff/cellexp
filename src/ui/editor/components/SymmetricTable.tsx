import * as React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { Rule } from './Rule'
import { toBase } from '../../../util/baseConverter'

let reverse = (v: string): string => {
   return v
      .split('')
      .reverse()
      .join('')
}

let useStyle = makeStyles((theme: Theme) => {
   let style = {
      width: 'max-content', // 'initial',
   }

   return createStyles({
      container: {
         display: 'inline-block',
      },
      tableContainer: style,
      table: style,
   })
})

export interface SymmetricTableProp {
   label: string
   rule: number
   symmetricReferenceRule: number
   symmetricMessage: string
}

export let SymmetricTable = (prop: SymmetricTableProp) => {
   let { label, rule, symmetricReferenceRule, symmetricMessage } = prop

   let classes = useStyle()

   let binary = toBase(rule, 2, { size: 255 })
   let colorInputComplement = parseInt(reverse(binary), 2)
   let colorSymmetric = 255 - colorInputComplement

   //              [0, 1, 2, 3, 4, 5, 6, 7]
   //              [   x     y  x     y   ]
   let lrSwapped = [0, 4, 2, 6, 1, 5, 3, 7].map((k) => binary[k]).join('')
   let lrSymmetric = parseInt(lrSwapped, 2)
   let bothSymmetric = 255 - parseInt(reverse(lrSwapped), 2)

   let getStatus = (someRule: number): string => {
      return someRule === symmetricReferenceRule ? symmetricMessage : ''
   }

   let tableInfo: [string, number][] = [
      ['Left-right symmetry', lrSymmetric],
      ['Color symmetry', colorSymmetric],
      ['Both symmetries', bothSymmetric],
   ]

   let TC = TableCell

   return (
      <div className={classes.container}>
         <h4>
            {label} <Rule rule={rule} />
         </h4>
         <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} size="small">
               <TableHead>
                  <TableRow>
                     <TC>
                        <strong>Name</strong>
                     </TC>
                     <TC align="center">
                        <strong>Symmetric Rule</strong>
                     </TC>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {tableInfo.map(([name, someRule]) => {
                     let status = getStatus(someRule)

                     return (
                        <TableRow key={name}>
                           <TC>{name}</TC>
                           <TC align="center">
                              {status ? `${status} ` : ''}
                              <Rule rule={someRule} />
                           </TC>
                        </TableRow>
                     )
                  })}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   )
}
