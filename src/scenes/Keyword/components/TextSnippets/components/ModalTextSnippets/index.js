import React from 'react'
import Modal from 'react-modal';

import apiService from '../../../../../../services/api/index'
import BasicLoader from '../../../../../../components/BasicLoader/index'

import './styles.scss'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : '#ffa500'
  }
};

class ModalTextSnippets extends React.Component {
  constructor(props) {
    super(props);

    Modal.setAppElement('#Keyword');

    this.state = {
      snippets: [],
      status: 'loading'
    }

    this.requestSnippets = this.requestSnippets.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.requestSnippets();
  }

  requestSnippets() {
    const request = apiService.getTextSnippets(this.props._id);

    request
     .then(snippets => {
       snippets = snippets.filter(element => 'score' in element);
       this.setState({ snippets, status: 'success' });
     })
     .catch(err => {
       console.log(err);
       this.setState({ status: 'failed' })
     });
  }

  handleButtonClick() {
    this.props.triggerModal();
  }

  render() {
    let snippetList = null;

    if (this.state.status === 'loading') {
      snippetList = <BasicLoader></BasicLoader>
    } else if (this.state.status === 'success') {
      const listItems = this.state.snippets.map((snippet, index) => {
        return (
          <li className="list-group-item list-group-item-warning" key={index}>
            <span className="snippetScore">
              {snippet.score.toFixed(1)}
            </span>
            <span className="float-right snippetTimestamp">
              {snippet.timestamp.replace('T', ' ')}
            </span>
            <br/>
            {snippet.text}
          </li>
        )
      })

      snippetList = (
        <ul className="list-group snippetList">
          {listItems}
        </ul>
      )
    } else if (this.state.status === 'failed') {
      snippetList = 'Failed to load snippets';
    }

    return (
      <div className="Modal">
        <Modal
          id="snippetModal"
          isOpen={true}
          style={customStyles}
        >
  
          {snippetList}

          <button 
            id="modalBtn" 
            className="btn btn-warning" 
            onClick={this.handleButtonClick}>
              Close
          </button>
        </Modal>
      </div>
    )
  }

}

export default ModalTextSnippets;
