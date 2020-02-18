import React from 'react'
import Loader from 'react-loader-spinner'

class BasicLoader extends React.Component {
  render() {
    const loader = <Loader
    type="Triangle"
    color="#0000FF"
    height={100}
    width={100}
    />

    return loader;
  }
}

export default BasicLoader;
