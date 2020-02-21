import React from 'react'

import notificationService from '../../../../../../services/notification/index'
import apiService from '../../../../../../services/api/index'

class ButtonDeleteKeyword extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    apiService.deleteKeyword(this.props._id);
    notificationService.display(
      'Keyword Removed',
      'Successfully removed Keyword.',
      notificationService.types.danger
    );
  }

  render() {
    return (
      <span className="float-right">
        <button onClick={this.handleButtonClick} className="btn btn-warning">Delete</button>
      </span>
    )
  }
}

export default ButtonDeleteKeyword;
