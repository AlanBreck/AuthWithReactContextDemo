import React, { Component } from "react";
import axios from "axios";
import {BrowserRouter, Route, Link, Redirect} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import UserContext from "./context/UserContext";

const Router = props => (
	<BrowserRouter>
		<div>
			{props.children}
		</div>
	</BrowserRouter>
);

const ProtectedRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={props => (
		false ? (
			<Component {...props} />
		) : (
			<Redirect to="/login" />
		)
	)} {...rest} />
);

class App extends Component {

  state = {
    user: null
  }

  login = (username, password) => {
	  axios.post("/api/authenticate", {username, password})
	  	.then(response => {
			this.setState({
				user: response.data
			});
		  })
		  .catch(err => {
			  console.warning(err);
		  });
  }

  render() {
	const {user} = this.state;
	const login = this.login;
    return (
		<Router>
			<header>
				<nav>
					<Link to="/">Home</Link> | <Link to="/login">Login</Link>
				</nav>
			</header>
			<UserContext.Provider value={{ login, user }}>
				<ProtectedRoute exact path="/" component={HomePage} />
				<Route exact path="/login" component={LoginPage} />
			</UserContext.Provider>
		</Router>
    );
  }
}

export default App;
