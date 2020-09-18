import React from "react";
import "./App.css";
import Home from "./pages/home";
import AllContacts from "./pages/contacts";
import ContactDetails from "./pages/contact_details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/" exact component={Home}></Route>
					<Route path="/contacts" exact component={AllContacts}></Route>
					<Route path="/contacts/:id" exact component={ContactDetails}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
