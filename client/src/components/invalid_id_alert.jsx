import React from "react";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

const IdAlert = () => {
	return (
		<div>
			<Alert color="dark">
				Oops, this id does not exist!{" "}
				<Link to="/contacts" className="alert-link">
					Back to contacts.
				</Link>{" "}
			</Alert>
		</div>
	);
};

export default IdAlert;
