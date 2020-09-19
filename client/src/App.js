import React from "react";
import "./App.css";
import Home from "./pages/home";
import ContactList from "./pages/contact_list";
import ContactDetails from "./pages/contact_details";
import AddContact from "./pages/add_contact";
import ScrollToTop from "./components/scroll_to_top.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<div className="page-container">
				<div className="content-wrap">
					<Router>
						<ScrollToTop>
							<Switch>
								<Route path="/" exact component={Home}></Route>
								<Route path="/contacts" exact component={ContactList}></Route>
								<Route
									path="/contacts/add"
									exact
									component={AddContact}
								></Route>
								<Route
									path="/contacts/:id"
									exact
									component={ContactDetails}
								></Route>
							</Switch>
						</ScrollToTop>
					</Router>
				</div>
			</div>
		</div>
	);
}

export default App;
