import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";

const IdAlert = () => {
	return (
		<div>
			<Alert color="dark">
				Oops, this contact does not exist!{" "}
				<Link to="/contacts" className="alert-link">
					Back to main list.
				</Link>{" "}
			</Alert>
		</div>
	);
};

export default IdAlert;
