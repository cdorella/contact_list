import React from "react";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";

const SuccessDelete = () => {
	return (
		<div>
			<Alert color="dark">
				Your contact has been deleted successfully!{" "}
				<Link to="/contacts" className="alert-link">
					Back to contacts.
				</Link>{" "}
			</Alert>
		</div>
	);
};

export default SuccessDelete;
