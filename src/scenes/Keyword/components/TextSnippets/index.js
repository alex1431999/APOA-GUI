import React from 'react'

import Button from './components/Button/index'
import ModalTextSnippets from './components/ModalTextSnippets/index'

class TextSnippets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    }

    this.triggerModal = this.triggerModal.bind(this);
  }

  triggerModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    let modal = null;
    
    if (this.state.showModal) {
      modal = (
        <ModalTextSnippets
          triggerModal={this.triggerModal}
          _id={this.props._id}
        >

        </ModalTextSnippets>)
    }

    return (
      <div className="TextSnippets">
        <Button
          triggerModal={this.triggerModal}
        >

        </Button>
        {modal}
      </div>
    )
  }

}

export default TextSnippets;
