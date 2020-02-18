import React from 'react'

import './styles.scss'

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    }
    
    this.tableHeaders = this.tableHeaders.bind(this);
    this.tableData = this.tableData.bind(this);
  }

  tableHeaders() {
    const headers = [];
    for (const key in this.state.data[0]) {
      const header = <th scope='col' key={key}>{key}</th>
      headers.push(header);
    }

    return headers;
  }

  tableData() {
    const rows = [];

    for (let i = 0; i < this.state.data.length; i += 1) {
      const dataPoint = this.state.data[i];
      const row = [];
      for (const key in dataPoint) {
        const td = (
          <td key={key}>
            {dataPoint[key]}
          </td>
        )
        row.push(td);
      }
      rows.push(<tr key={i}>{row}</tr>);
    }

    return rows;
  }

  render() {
    return (
      <div className="Table">
        <div className="conatiner">
          <div className="jumbotron">
            <h2 className="title">{this.props.title}</h2>
            <table className="table table-sm">
              <thead>
                <tr>
                  {this.tableHeaders()}
                </tr>
              </thead>
              <tbody>
                {this.tableData()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Table;
