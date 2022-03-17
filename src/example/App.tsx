import * as React from 'react'

import { SearchSuggestions } from '..'

const suggestions = [
  'polite',
  'fastidious',
  'dull',
  'pudding',
  'mole',
  'angle',
  'anticipation',
  'ton',
  'tissue',
  'reform',
  'mathematics',
  'eavesdrop',
  'award',
  'glow',
  'unlikely',
  'relationship',
  'sustain',
  'crop',
  'net',
  'side',
  'grimace',
  'obscure',
  'fat',
  'shift',
  'danger',
  'dictate',
  'lineage',
  'butterfly',
  'hike',
  'outlook',
  'shelter',
  'smile',
  'dog',
  'interference',
  'remain',
  'inside',
  'reserve',
  'requirement',
  'tease',
  'poll',
  'hard',
  'glare',
  'forum',
  'mark',
  'home',
  'lack',
  'fast',
  'carpet',
  'pressure',
  'cooperate',
].map(word => (
  <a
    key={word}
    onKeyDown={e => {
      if (e.key === 'Enter') {
        console.log(word)
      }
    }}
    onClick={() => {
      console.log(word)
    }}
  >
    <div>
      <div>{word}</div>
    </div>
  </a>
))

const App = (): JSX.Element => (
  <SearchSuggestions
    suggestions={suggestions}
    autoFocus
    withTheme
    highlightKeywords
  />
)

export default App
