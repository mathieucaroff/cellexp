import * as React from 'react'
import { OxAccordion } from '../components/OxAccordion'
import { AlternativeSection } from './AlternativeSection'
import { ChangelogSection } from './ChangelogSection'
import { UserDocumentationSection } from './UserDocumentationSection'

export let InfoPart = () => {
   return (
      <div>
         <h2>Info</h2>
         <OxAccordion
            defaultExpanded={false}
            title="Automaton explorer alternatives"
            content={<AlternativeSection />}
            contentDisplayBlock
         />
         <OxAccordion
            defaultExpanded={false}
            title="Cellexp User Documentation"
            content={<UserDocumentationSection />}
            contentDisplayBlock
         />
         <OxAccordion
            defaultExpanded={false}
            title="CellExp Changelog"
            content={<ChangelogSection />}
            contentDisplayBlock
         />
      </div>
   )
}
