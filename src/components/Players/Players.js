import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Players extends Component {
  state = {
    totalslamsWon: null
  };

  static getDerivedStateFromProps(props, state) {
    const { players } = props;

    if (players) {
      // Add slams
      const total = players.reduce((total, player) => {
        return total + parseInt(player.slamsWon.toString());
      }, 0);

      return { totalslamsWon: total };
    }

    return null;
  }
  render() {
    const { players } = this.props;
    const { totalslamsWon } = this.state;
    if (players) {
      return (
        <div style={{backgroundColor:"white",opacity:"0.5",padding:"10px",border:"2px black"}}>
          <div className="row" >
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-users" /> Players{" "}
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Slams Won{" "}
                <span className="text-primary">#{parseInt(totalslamsWon)}</span>
              </h5>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>SlamsWon</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.id}>
                  <td>
                    <h5>
                      {player.firstName} {player.lastName}
                    </h5>

                    {/* <img src={player.url} alt="" width="250" height="200" /> */}
                  </td>
                  <td>
                    <h6>{player.country}</h6>
                  </td>
                  <td>{player.slamsWon}</td>
                  <td>
                    <Link
                      to={`/players/${player.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Players.propTypes = {
  firestore: PropTypes.object.isRequired,
  players: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "players" }]),
  connect((state, props) => ({
    players: state.firestore.ordered.players
  }))
)(Players);
