import React from 'react'
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

class ModalTextSnippets extends React.Component {
  constructor(props) {
    super(props);

    Modal.setAppElement('#Keyword');

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.triggerModal();
  }

  render() {
    return (
      <div className="Modal">
        <Modal
          isOpen={true}
          style={customStyles}
        >
          <ul>
            <li>
              test
            </li>
          </ul>

          <button className="btn btn-warning" onClick={this.handleButtonClick}>Close</button>
        </Modal>
      </div>
    )
  }

}

export default ModalTextSnippets;
