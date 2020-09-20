import React from "react";
import EmailAlert from "./invalid_email_alert";

class AddContactDb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			saveError: false,
		};
	}

	componentDidMount() {
		this.addContact();
	}

	addContact = () => {
		const { first_name, last_name, email, phone_number } = this.props;
		fetch("/api/v1/contacts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name: first_name,
				last_name: last_name,
				email: email,
				phone_number: phone_number,
			}),
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === "Success") {
					this.props.sendAddSuccess();
				} else {
					this.setState({
						saveError: true,
					});
				}
			})
			.catch(error => console.log(error));
	};

	render() {
		const { saveError } = this.state;
		return <div>{saveError && <EmailAlert />}</div>;
	}
}

export default AddContactDb;
