import React from "react";
import "./home.css";
import img from "../images/man-dancing.png";
import { Nav, NavItem, NavLink } from "reactstrap";

const Home = () => {
	return (
		<div>
			<h1 className="home-page-title">The Backstage Contact List</h1>
			<Nav>
				<NavItem>
					<NavLink href="/contacts" className="btn btn-danger" active>
						VIP Access
					</NavLink>
				</NavItem>
			</Nav>
			<div className="home-page-img-container">
				<img
					src={img}
					className="home-page-img"
					alt="man-dancing-illustration"
				></img>
			</div>

			<h6>
				A React on Rails Project by
				<a
					className="home-page-link"
					href="https://www.carolinadorella.com/"
					target="_blank"
				>
					Carolina Dorella
				</a>
				// Illustration by
				<a
					className="home-page-link"
					href="https://absurd.design/"
					target="_blank"
				>
					Absurd Design
				</a>
			</h6>
		</div>
	);
};

export default Home;
