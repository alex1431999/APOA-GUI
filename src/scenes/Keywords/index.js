import React from 'react'

import KeywordAddForm from './components/KeywordAddForm/index'
import KeywordSearch from './components/KeywordSearch/index'
import KeywordList from './components/KeywordList/index'

function Keywords() {
  return (
    <div className="Keywords center-screen">
      <KeywordAddForm/>
      <KeywordSearch/>
      <KeywordList/>
    </div>
  )
}

export default Keywords;
