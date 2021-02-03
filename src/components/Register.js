import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import bcrypt from 'bcryptjs';
import axios from 'axios';


export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      user_name: '',
      password: '',
      register: false,
      error: false,
    };
  }

  handleOnChangeFirstName = e => {
    this.setState({
      first_name: e.target.value,
    });
  };

  handleOnChangeLastName = e => {
    this.setState({
      last_name: e.target.value,
    });
  };

  handleOnChangeUserName = e => {
    this.setState({
      user_name: e.target.value,
    });
  };

  handleOnChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  };

  handleOnBlur = async e => {
    this.setState({
      user_name: e.target.value,
    });
    const data = {
      user_name: this.state.user_name,
    };

    const UsernameValidation = data => (
      axios.post('https://express-server-demo1o1.herokuapp.com/validateUsername', data)
        .then(exist => exist.status)
    )

    const isUsernameTaken = await UsernameValidation(data);

    isUsernameTaken === 204
      ? this.setState({ user_name_taken: true })
      : this.setState({ user_name_taken: false });
  };

  onSubmit = async e => {
    e.preventDefault();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      user_name: this.state.user_name,
      password: this.state.password,
    };

    const UserRegistration = data => {
      const password = data.password;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      data["password"] = hash;

      return axios.post('https://express-server-demo1o1.herokuapp.com/Register', data)
        .then(res => res.status);
    };

    const registerStatus = await UserRegistration(data);
    if (registerStatus === 200) {
      this.setState({
        first_name: '',
        last_name: '',
        user_name: '',
        password: '',
        register: true,
        error: false,
      })
      window.location = '/view';;
    } else
      this.setState({
        error: true,
        register: false,
      });
  };

  render() {
    const { register, error, user_name_taken } = this.state;

    return (
      <div className="Registration">
        <h1> Sign Up </h1> <form
          onSubmit={this.onSubmit}
        >
          <div>
            <div className="fields">
              <p> First Name </p>
              {' '}
              <input
                type="text"
                value={this.state.first_name}
                name="FirstName"
                onChange={this.handleOnChangeFirstName}
              />
              {' '}
            </div> <div className="fields">
              <p> Last Name </p>
              {' '}
              <input
                type="text"
                value={this.state.last_name}
                name="LastName"
                onChange={this.handleOnChangeLastName}
              />
              {' '}
            </div> <div className="fields">
              <p> Username </p>
              {' '}
              <input
                type="text"
                className={classNames({ error: user_name_taken })}
                value={this.state.user_name}
                name="Username"
                onBlur={this.handleOnBlur}
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                required
              />
            </div> <div className="fields">
              <p> Password </p>
              {' '}
              <input
                type="password"
                value={this.state.password}
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="password"
                required
              />
            </div> <div className="buttons">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={user_name_taken}
              >
                {' '}Register{' '}
              </button>
              {' '}
              <Link to="/"> Cancel </Link>
              {' '}
            </div>{' '}
          </div>{' '}
        </form>
      </div>
    );
  }
}
