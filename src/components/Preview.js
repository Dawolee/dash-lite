import React, { Component } from "react"

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}

  render() {
    let { url } = this.props
    return (
      <div>
        <video src={url}></video>
      </div>
    )
  }
}
