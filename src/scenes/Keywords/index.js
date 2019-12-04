import React from 'react'

import KeywordAddForm from './components/KeywordAddForm/index'
import KeywordSearch from './components/KeywordSearch/index'
import KeywordList from './components/KeywordList/index'

import './styles.scss'

function Keywords() {
  return (
    <div className="Keywords">
      <div className="container">
        <div className="jumbotron">
          <KeywordAddForm/>
          <br/>
          <KeywordSearch/>
          <KeywordList/>
        </div>
      </div>
    </div>
  )
}

export default Keywords;
