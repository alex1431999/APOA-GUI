import React from 'react'

import Graph from './components/graph/index'

class RelationshipGraph extends React.Component {
  constructor(props) {
    super(props);

    const { _id } = this.props.match.params;

    this.state = {
      _id,
    }
  }

  render() {
    return (
      <div className="RelationshipGraph">
        <Graph _id={this.state._id}></Graph>
      </div>
    )
  }
}

export default RelationshipGraph;
