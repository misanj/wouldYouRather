import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../Actions/authedUser';

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(logout()),
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    this.props.Logout();
  }

  render() {
    const { users, authedUser } = this.props;
    return (
      <div className="form-inline my-2 my-lg-0">
        <span className=" text-primary m-3" type="search">
          {this.props.authedUser === null ? (
            ''
          ) : (
            <span>
              {this.props.authedUser}
              <img
                className="m-1"
                alt="avatar"
                width="50px"
                height="50px"
                src={users[authedUser].avatarURL}
              />
              <button
                onClick={this.handleLogout}
                className="btn btn-outline-success  my-2 my-sm-0"
                type="submit"
              >
                Logout
              </button>
            </span>
          )}
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
