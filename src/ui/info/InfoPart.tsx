import * as React from 'react'
import { OxExpansionPanel } from '../components/OxExpansionPanel'
import { AlternativeSection } from './AlternativeSection'
import { ChangelogSection } from './ChangelogSection'
import { UserDocumentationSection } from './UserDocumentationSection'

export let InfoPart = () => {
   return (
      <div>
         <h2>Info</h2>
         <OxExpansionPanel
            defaultExpanded={false}
            title="Automaton explorer alternatives"
            content={<AlternativeSection />}
            contentDisplayBlock
         />
         <OxExpansionPanel
            defaultExpanded={false}
            title="Cellexp User Documentation"
            content={<UserDocumentationSection />}
            contentDisplayBlock
         />
         <OxExpansionPanel
            defaultExpanded={false}
            title="CellExp Changelog"
            content={<ChangelogSection />}
            contentDisplayBlock
         />
      </div>
   )
}
