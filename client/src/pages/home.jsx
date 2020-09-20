import React from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, NavItem, NavLink } from "reactstrap";

const Home = () => {
	return (
		<div className="home-page">
			<h1 className="home-page-title">The Backstage Contact List</h1>
			<Nav>
				<NavItem>
					<NavLink href="/contacts" className="btn btn-danger" active>
						VIP Access
					</NavLink>
				</NavItem>
			</Nav>
		</div>
	);
};

export default Home;
