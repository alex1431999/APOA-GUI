import React from 'react'

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.triggerModal();
  }

  render() {
    return (
      <div className="Button">
        <button 
          className="btn btn-warning"
          onClick={this.handleButtonClick}
          data-toggle="modal" 
          data-target="#textSnippetsModal"
        >
          Text Snippets
        </button>
      </div>
    )
  }

}

export default Button;
