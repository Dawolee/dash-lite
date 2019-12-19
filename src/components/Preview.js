import React, { Component } from "react"
import Button from "react-bootstrap/Button"

export default class Preview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}

  render() {
    let { url, closePlayer } = this.props
    return (
      //using video tag so no analytics get sent(except for usage i guess)
      <div>
        <video autoPlay controls src={url}></video>
        <Button onClick={closePlayer}>Close Player</Button>
      </div>
    )
  }
}
