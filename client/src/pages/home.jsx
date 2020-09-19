import React from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="home-page">
			<h1 className="home-page-title">The Backstage Contact List</h1>
			<Link to="/contacts" className="btn btn-danger stretched-link">
				VIP Access
			</Link>
		</div>
	);
};

export default Home;
