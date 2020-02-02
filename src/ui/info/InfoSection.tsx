import * as React from 'react'
import { OxExpansionPanel } from '../components/OxExpansionPanel'
import { ChangelogSection } from './ChangelogSection'

export let InfoSection = () => {
   let changelog = <ChangelogSection />

   return (
      <OxExpansionPanel
         defaultExpanded={false}
         title="CellExp Change log"
         content={changelog}
      ></OxExpansionPanel>
   )
}
