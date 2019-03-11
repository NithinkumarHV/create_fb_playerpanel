import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class PlayerDetails extends Component {
  state = {
    showRankingUpdate: false,
    RankingUpdate: ""
  };

  // Update balance
  RankingSubmit = e => {
    e.preventDefault();

    const { player, firestore, history } = this.props;
    const { RankingUpdate } = this.state;

    const playerUpdate = {
      ranking: parseFloat(RankingUpdate)
    };

    // Update in firestore
    firestore
      .update({ collection: "players", doc: player.id }, playerUpdate)
      .then(history.push("/"));
  };

  // Delete client
  onDeleteClick = () => {
    const { player, firestore, history } = this.props;

    firestore
      .delete({ collection: "players", doc: player.id })
      .then(history.push("/"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { player } = this.props;
    const { showRankingUpdate, RankingUpdate } = this.state;

    let RankingForm = "";
    // If balance form should display
    if (showRankingUpdate) {
      RankingForm = (
        <form onSubmit={this.RankingSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="RankingUpdate"
              placeholder="Ranking"
              value={RankingUpdate}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      RankingForm = null;
    }

    if (player) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link
                  to={`/players/edit/${player.id}`}
                  className="btn btn-dark"
                >
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {player.firstName} {player.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                {/* <div className="col-md-8 col-sm-6">
                  <h4>
                    Player ID:{" "}
                    <span className="text-secondary">{player.id}</span>
                  </h4>
                </div> */}

                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    ranking:{" "}
                    <span
                      className={classnames({
                        "text-danger": player.ranking > 5,
                        "text-success": player.ranking < 5
                      })}
                    >
                      #{parseFloat(player.ranking)}
                    </span>{" "}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showRankingUpdate: !this.state.showRankingUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {RankingForm}
                </div>
              </div>
              <div>
                <img src={player.url} alt=" " width="250" height="200" />
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Slams Won: {player.slamsWon}
                </li>
                <li className="list-group-item">Country: {player.country}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

PlayerDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "players",
      storeAs: "player",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    player: ordered.player && ordered.player[0]
  }))
)(PlayerDetails);
