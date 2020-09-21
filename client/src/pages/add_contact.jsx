import React from "react";
import "./add_contact.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import SuccessAlert from "../components/success_alert";
import AddContactDb from "../components/add_contact_db";

class AddContact extends React.Component {
	constructor(props) {
		super();
		this.state = {
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			addDatabase: false,
			saveSuccess: false,
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
		this.setState({
			addDatabase: true,
		});
	};

	handleClearForm = () => {
		this.setState({
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
		});
	};

	handleBackButton = () => {
		this.props.history.push({
			pathname: "/contacts",
		});
	};

	handleAddSuccess = () => {
		this.setState({
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			saveSuccess: true,
		});
	};

	render() {
		const {
			first_name,
			last_name,
			email,
			phone_number,
			addDatabase,
			saveSuccess,
		} = this.state;

		return (
			<div>
				<div>
					<h1 className="add-contact-title">New Artist:</h1>
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
						<div>
							<Button color="danger" onClick={this.handleClearForm}>
								Clear
							</Button>
						</div>
						<div>
							<Button color="danger" onClick={this.handleBackButton}>
								Back
							</Button>
						</div>
					</div>
				</div>
				{addDatabase && (
					<AddContactDb
						first_name={first_name}
						last_name={last_name}
						email={email}
						phone_number={phone_number}
						sendAddSuccess={this.handleAddSuccess}
					/>
				)}
				{saveSuccess && <SuccessAlert />}
			</div>
		);
	}
}

export default AddContact;
