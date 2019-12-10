import React, { Component } from "react"
import { fetchPlayers } from "./index"
import Accordion from "react-bootstrap/Accordion"
import PlayerRow from "./PlayerRow"

export default class Players extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      loading: true
    }
  }

  updatePlayers = players => {
    this.setState({ players, loading: false })
  }

  componentDidMount() {
    fetchPlayers(this.updatePlayers)
  }

  render() {
    let { players, loading } = this.state
    return (
      <div>
        {loading && <h4 className="fetching-msg">Fetching your players...</h4>}
        {!loading && (
          <Accordion>
            {players.map((player, index) => (
              <PlayerRow
                key={index}
                eventKey={index}
                title={player.name}
                playerID={player.key}
              />
            ))}
          </Accordion>
        )}
      </div>
    )
  }
}
