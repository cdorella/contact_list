import React from "react";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

const SuccessAlert = props => {
	return (
		<div>
			<Alert color="dark">
				Your contact has been saved successfully!{" "}
				<Link to="/contacts" className="alert-link">
					Click here to return to the list.
				</Link>{" "}
			</Alert>
		</div>
	);
};

export default SuccessAlert;
