import React, { Component } from "react"
import { OptionBar, VideosList, Players } from "./components"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: "videosList"
    }
  }

  handleToggle = view => {
    this.setState({ view })
  }

  render() {
    let { view } = this.state
    return (
      <div className="App">
        <OptionBar handleToggle={this.handleToggle} />
        {view === "videosList" && <VideosList />}
        {view === "players" && <Players />}
      </div>
    )
  }
}

export default App
