import React from "react";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

const SuccessAlert = () => {
	return (
		<div>
			<Alert color="dark">
				Your contact has been saved successfully!{" "}
				<Link to="/contacts" className="alert-link">
					Back to contacts.
				</Link>{" "}
			</Alert>
		</div>
	);
};

export default SuccessAlert;
