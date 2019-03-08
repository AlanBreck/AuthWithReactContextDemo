import React, { Component } from "react";
import axios from "axios";
import LoginPage from "./components/LoginPage";
import UserContext from "./context/UserContext";

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
		<UserContext.Provider value={{ login, user }}>
			{user ? (
				<div>
					<h1>Welcome {user.username}</h1>
				</div>
			) : (
				<LoginPage />
			)}
		</UserContext.Provider>
    );
  }
}

export default App;
