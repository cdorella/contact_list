import React, { useState } from "react";
import { Alert } from "reactstrap";

const EmailAlert = props => {
	const [visible, setVisible] = useState(true);

	const onDismiss = () => {
		setVisible(false);
		window.location.reload();
	};

	return (
		<Alert color="dark" isOpen={visible} toggle={onDismiss}>
			Oops, it seems we already have this email in our database. Please try
			again.
		</Alert>
	);
};

export default EmailAlert;
