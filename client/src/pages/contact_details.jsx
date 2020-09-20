import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Jumbotron, Button, Form, FormGroup } from "reactstrap";
import EditDropdown from "../components/edit_dropdown";
// import DeleteContact from "../components/delete_contact";

class ContactDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedContact: {},
			idError: false,
			emailError: false,
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			editDetails: false,
			showEditContactForm: false,
			selectedField: "",
			newValue: "",
			// deleteContact: false,
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.getContactById(id);
	}

	getContactById(id) {
		fetch(`/api/v1/contacts/${id}`)
			.then(response => response.json())
			.then(response => {
				if (response.status === "Success") {
					this.setState({
						selectedContact: response.data,
					});
				} else {
					this.setState({
						idError: true,
					});
				}
			})
			.catch(() => {
				this.setState({ error: true });
			});
	}

	// Show field selection form // NEW Show Component Edit Dropdown
	handleEditContact = () => {
		this.setState({
			editDetails: true,
		});
	};

	// Update selected field on state // NEW handled by the component
	// handleEditSelection = event => {
	// 	const value = event.target.value;
	// 	this.setState({
	// 		selectedField: value,
	// 	});
	// };

	// Show edit form // NEW UPDATED
	handleSelectedField = value => {
		this.setState({
			showEditContactForm: true,
			selectedField: value,
		});
	};

	// Handle input change edit form
	handleInputChange = event => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value,
		});
	};

	// Edit another field
	handleCloseForm = () => {
		this.setState({
			editDetails: false,
			showEditContactForm: false,
		});
	};

	handleFinalEditSubmit = event => {
		event.preventDefault();
		this.editContact();
		this.setState({
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			showDetails: false,
			editDetails: false,
			showEditContactForm: false,
		});
	};

	editContact = () => {
		const {
			first_name,
			last_name,
			email,
			phone_number,
			selectedContact,
		} = this.state;

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

		fetch(`/api/v1/contacts/${selectedContact.id}`, {
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
					this.getContactById(selectedContact.id);
				} else {
					this.setState({
						emailError: true,
					});
				}
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	// pending modal implementation
	handleOpenForm = () => {
		this.setState({
			emailError: false,
			editDetails: true,
		});
	};

	handleBackButton = () => {
		this.props.history.push({
			pathname: "/contacts",
		});
	};

	// handleDeleteContact = () => {
	// 	this.setState({
	// 		deleteContact: true,
	// 	});
	// };

	handleDeleteContact = id => {
		this.deleteContact(id);
	};

	deleteContact = id => {
		fetch(`/api/v1/contacts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(() => {
				this.props.history.push({
					pathname: "/contacts",
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	render() {
		const {
			selectedContact,
			idError,
			emailError,
			editDetails,
			showEditContactForm,
			selectedField,
			newValue,
			// deleteContact,
		} = this.state;

		return (
			<div>
				{idError ? (
					<div>
						<p className="error"> Oops, this id does not exist.</p>
						<Link to="/contacts">Back</Link>
					</div>
				) : (
					<div>
						<h1 className="contact-title">
							Here is your selected contact details:
						</h1>
						<Jumbotron>
							<p className="lead">First Name: {selectedContact.first_name} </p>
							<p className="lead">Last Name: {selectedContact.last_name} </p>
							<p className="lead">Email: {selectedContact.email} </p>
							<p className="lead">
								Phone Number: {selectedContact.phone_number}
							</p>
							<p className="lead">
								<Button color="danger" onClick={this.handleEditContact}>
									Edit
								</Button>
								<span></span>
								<Button
									color="danger"
									onClick={() => this.handleDeleteContact(selectedContact.id)}
								>
									Delete
								</Button>
								<span></span>
								<Button color="danger" onClick={this.handleBackButton}>
									Back
								</Button>
							</p>
						</Jumbotron>
					</div>
				)}
				<div>
					{editDetails && (
						<div>
							<EditDropdown
								contact={selectedContact}
								sendSelection={this.handleSelectedField}
							/>
							{/* <h5>
								<Form onSubmit={this.handleEditSubmit}>
									<div className="add-contact-container">
										<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
											What would you like to edit for{" "}
											{selectedContact.first_name} {selectedContact.last_name}?{" "}
											<select
												value={selectedField}
												onChange={this.handleEditSelection}
											>
												<option>Select One:</option>
												<option value="first_name">First Name</option>
												<option value="last_name">Last Name</option>
												<option value="email">Email</option>
												<option value="phone_number">Phone Number</option>
											</select>
											<span></span>
											<Button color="danger">Go</Button>
										</FormGroup>
									</div>
								</Form>
							</h5> */}
						</div>
						// <div>
						// 	<h5>
						// 		<form onSubmit={this.handleEditSubmit}>
						// 			What would you like to edit for {selectedContact.first_name}{" "}
						// 			{selectedContact.last_name}?{" "}
						// 			<select
						// 				value={selectedField}
						// 				onChange={this.handleEditSelection}
						// 			>
						// 				<option>Select One:</option>
						// 				<option value="first_name">First Name</option>
						// 				<option value="last_name">Last Name</option>
						// 				<option value="email">Email</option>
						// 				<option value="phone_number">Phone Number</option>
						// 			</select>
						// 			<button>Edit</button>
						// 		</form>
						// 	</h5>
						// </div>
					)}
				</div>
				<div>
					{showEditContactForm && (
						<div>
							<form onSubmit={this.handleFinalEditSubmit}>
								<label>Edit information:</label>
								<input
									type="text"
									name={selectedField}
									defaultValue={newValue}
									onChange={this.handleInputChange}
									required
								/>
								<br></br>
								<button>Submit</button>
							</form>
							<button onClick={this.handleCloseForm}>Close</button>
						</div>
					)}
				</div>
				{emailError && (
					<div>
						<p>Sorry, this email is already taken, please try again.</p>
						<button onClick={this.handleOpenForm}>OK</button>
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(ContactDetails);
