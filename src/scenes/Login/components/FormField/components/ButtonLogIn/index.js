import React from 'react'

class ButtonLogIn extends React.Component {
  handleClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="ButtonLogIn">
        <button onClick={this.handleClick}>Log In</button>
      </div>
    )
  }
}

export default ButtonLogIn;
