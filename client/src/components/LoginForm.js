import React, {Component} from "react";
import UserContext from "../context/UserContext";

class LoginForm extends Component {
	static contextType = UserContext;

	state = {
		username: "",
		password: ""
	}

	changeHandler = (e) => {
		const {name, value} = e.target;
		this.setState({ [name]: value });
	}

	submitHandler = (e) => {
		e.preventDefault();
		const {username, password} = this.state;
		if (username && password) {
			this.context.login(username, password);
		}
	}

	render () {
		return (
			<form onSubmit={this.submitHandler}>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.changeHandler}
				/>
				<input
					type="password"
					name="password" 
					value={this.state.password}
					onChange={this.changeHandler}
				/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default LoginForm;