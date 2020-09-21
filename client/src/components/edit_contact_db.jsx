import React from "react";
import EmailAlert from "./invalid_email_alert";

class EditContactDb extends React.Component {
	constructor(props) {
		super();
		this.state = {
			emailError: false,
		};
	}

	componentDidMount() {
		this.editContact();
	}

	editContact = () => {
		const { first_name, last_name, email, phone_number, contact } = this.props;

		let field = {};

		if (first_name !== "") {
			field.key = "first_name";
			field.value = first_name;
		}
		if (last_name !== "") {
			field.key = "last_name";
			field.value = last_name;
		}
		if (email !== "") {
			field.key = "email";
			field.value = email;
		}
		if (phone_number !== "") {
			field.key = "phone_number";
			field.value = phone_number;
		}

		const db_key = field.key;
		const db_value = field.value;
		const id = contact.id;

		fetch(`/api/v1/contacts/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				[db_key]: db_value,
			}),
		})
			.then(response => response.json())
			.then(response => {
				if (response.status === "Success") {
					this.props.sendEditSuccess(id);
				} else {
					this.setState({
						emailError: true,
					});
				}
			})
			.catch(error => console.log(error));
	};

	render() {
		const { emailError } = this.state;
		return <div> {emailError && <EmailAlert />}</div>;
	}
}

export default EditContactDb;
