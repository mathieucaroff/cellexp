import * as React from 'react'
import { OxExpansionPanel } from '../components/OxExpansionPanel'
import { ChangelogSection } from './ChangelogSection'
import { AlternativeSection } from './AlternativeSection'

export let InfoSection = () => {
   return (
      <div>
         <h2>Info</h2>
         <OxExpansionPanel
            defaultExpanded={false}
            title="Alternatives"
            content={<AlternativeSection />}
            contentDisplayBlock
         ></OxExpansionPanel>
         <OxExpansionPanel
            defaultExpanded={false}
            title="CellExp changelog"
            content={<ChangelogSection />}
            contentDisplayBlock
         ></OxExpansionPanel>
      </div>
   )
}
