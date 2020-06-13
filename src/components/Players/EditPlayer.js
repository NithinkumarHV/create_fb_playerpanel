import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditPlayer extends Component {
  constructor(props) {
    super(props);
    // Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();

    this.slamsWonInput = React.createRef();
    this.urlInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { player, firestore, history } = this.props;

    // Updated player
    const updPlayer = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,

      slamsWon: this.slamsWonInput.current.value,
      url: this.urlInput.current.value
    };

    // Update player in firestore
    firestore
      .update({ collection: "players", doc: player.id }, updPlayer)
      .then(history.push("/"));
  };

  render() {
    const { player } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (player) {
      return (
        <div style={{backgroundColor:"white",opacity:"0.6",padding:"10px",border:"10px white"}}>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Edit Player</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    required
                    ref={this.firstNameInput}
                    defaultValue={player.firstName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    required
                    ref={this.lastNameInput}
                    defaultValue={player.lastName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="slamsWon">Slams Won</label>
                  <input
                    type="text"
                    className="form-control"
                    name="slamsWon"
                    ref={this.slamsWonInput}
                    defaultValue={player.slamsWon}
                    disabled={disableBalanceOnEdit}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="url">Photo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="url"
                    required
                    ref={this.urlInput}
                    defaultValue={player.url}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditPlayer.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "players", storeAs: "player", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    player: ordered.player && ordered.player[0],
    settings: settings
  }))
)(EditPlayer);
