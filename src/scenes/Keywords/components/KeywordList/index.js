import React from 'react'

import ButtonDeleteKeyword from './components/ButtonDeleteKeyword/index'

import './styles.scss'

class KeywordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: this.props.keywords,
    }
  }

  render() {
    return (
      <div className="KeywordList">
        <ul className="list-group">
          {
            this.state.keywords.map((keyword) => {
              return( 
                <li className="list-group-item" key={keyword._id.$oid}>
                  <a href={'/keywords/' + keyword._id.$oid}>{keyword.keyword_string} ({keyword.language})</a>
                  <ButtonDeleteKeyword _id={keyword._id.$oid}/>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default KeywordList;
