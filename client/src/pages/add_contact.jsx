import React from "react";
import "./add_contact.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddContact extends React.Component {
	constructor(props) {
		super();
		this.state = {
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			error: false,
		};
	}

	handleInputChange = event => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.addContact();
		this.setState({
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
		});
	};

	addContact = () => {
		const { first_name, last_name, email, phone_number } = this.state;

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
					this.props.history.push({
						pathname: "/contacts",
					});
				} else {
					this.setState({
						error: true,
					});
				}
			})
			.catch(error => console.log(error));
	};

	handleClearForm = () => {
		this.setState({
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
		});
	};

	handleBackToList = () => {
		this.props.history.push({
			pathname: "/contacts",
		});
	};

	//pending to work with alert
	handleOpenForm = () => {
		this.setState({
			error: false,
			contactFormOpen: true,
		});
	};

	render() {
		const { first_name, last_name, email, phone_number, error } = this.state;

		return (
			<div>
				<div>
					<h1 className="add-contact-title">New Contact:</h1>
					<Form onSubmit={this.handleSubmit}>
						<div className="add-contact-container">
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label for="first-name" className="mr-sm-2">
									First Name:
								</Label>
								<Input
									type="text"
									name="first_name"
									value={first_name}
									onChange={this.handleInputChange}
									required
								/>
							</FormGroup>
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label for="last-name" className="mr-sm-2">
									Last Name:
								</Label>
								<Input
									type="text"
									name="last_name"
									value={last_name}
									onChange={this.handleInputChange}
									required
								/>
							</FormGroup>
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label for="email" className="mr-sm-2">
									Email:
								</Label>
								<Input
									type="text"
									name="email"
									value={email}
									onChange={this.handleInputChange}
									required
								/>
							</FormGroup>
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Label for="phone_number" className="mr-sm-2">
									Phone Number:
								</Label>
								<Input
									type="text"
									name="phone_number"
									value={phone_number}
									onChange={this.handleInputChange}
									required
								/>
							</FormGroup>
							<br></br>
						</div>
						<div className="form-btn-container">
							<Button color="danger">Submit</Button>
						</div>
					</Form>
					<div className="other-btn-container">
						<Button color="danger" onClick={this.handleClearForm}>
							Clear
						</Button>
					</div>
					<div className="other-btn-container">
						<Button color="danger" onClick={this.handleBackToList}>
							Back to List
						</Button>
					</div>
					{
						// <ConfirmationPopUp
						// 	success={success}
						// 	error={error}
						// 	handleFinalConfirmation={this.handleFinalConfirmation}
						// >
						// 	Submit
						// </ConfirmationPopUp>
					}
				</div>
				{error && (
					<div>
						<p> Sorry, this email is already taken, please try again.</p>
						<button onClick={this.handleOpenForm}>Back</button>
					</div>
				)}
			</div>
		);
	}
}

export default AddContact;
