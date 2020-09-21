import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";

const SuccessAlert = () => {
	return (
		<div>
			<Alert color="dark">
				Artist has been saved successfully!{" "}
				<Link to="/contacts" className="alert-link">
					Back to main list.
				</Link>{" "}
			</Alert>
		</div>
	);
};

export default SuccessAlert;
