import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
//import { firestore } from "firebase";

class AddPlayer extends Component {
  state = {
    firstName: "",
    lastName: "",
    country: "",
    ranking: "",
    slamsWon: "",
    url: ""
  };
  onSubmit = e => {
    e.preventDefault();

    const newPlayer = this.state;

    const { firestore } = this.props;

    firestore
      .add({ collection: "players" }, newPlayer)
      .then(() => this.props.history.push("/"));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn-btn-link">
              <i className="fas fa-arrow-circle-left" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Player</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="slamsWon">Slams Won</label>
                <input
                  type="text"
                  className="form-control"
                  name="slamsWon"
                  minLength="1"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                  disabled={disableBalanceOnAdd}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ranking">Ranking</label>
                <input
                  type="text"
                  className="form-control"
                  name="ranking"
                  onChange={this.onChange}
                  value={this.state.ranking}
                  //disabled={disableBalanceOnAdd}
                />
              </div>

              <div className="form-group">
                <label htmlFor="url">Photo</label>
                <input
                  type="text"
                  className="form-control"
                  name="url"
                  onChange={this.onChange}
                  value={this.state.url}
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
  }
}

AddPlayer.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddPlayer);
