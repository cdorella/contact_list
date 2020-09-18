import React from "react";
// import AllContacts from "./all_contacts";

class ContactList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			contacts: [],
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			selectedContact: "",
			selectedField: "",
			newValue: "",
			edited_field: "",
			showDetails: false,
			editDetails: false,
			showNewContactForm: false,
			showEditContactForm: false,
			error: false,
		};
	}

	componentDidMount() {
		this.getAllContacts();
	}

	getAllContacts() {
		fetch("/api/v1/contacts")
			.then(response => response.json())
			.then(response => {
				this.setState({
					contacts: response.data,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	}

	handleAddNewContact = () => {
		this.setState({
			showNewContactForm: true,
		});
	};

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
			showNewContactForm: false,
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
					this.getAllContacts();
				} else {
					this.setState({
						error: true,
					});
				}
			})
			// work on error handling, check uniqueness of email and edge case without "required" on client side
			.catch(error => {
				console.log("error", error.response);
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

	handleCloseForm = () => {
		this.setState({
			showNewContactForm: false,
		});
	};

	handleShowDetails = id => {
		const { contacts } = this.state;
		const selection = contacts.find(contact => {
			return contact.id === id;
		});
		this.setState({
			showDetails: true,
			selectedContact: selection,
		});
	};

	// Show field selection form
	handleEditContact = () => {
		this.setState({
			editDetails: true,
		});
	};

	// Update selected field on state
	handleEditSelection = event => {
		const value = event.target.value;
		this.setState({
			selectedField: value,
		});
	};

	// Show edit form
	handleEditSubmit = event => {
		event.preventDefault();
		this.setState({
			showEditContactForm: true,
		});
	};

	// Edit another field
	handleRefreshForm = () => {
		this.setState({
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
			.then(() => {
				this.getAllContacts();
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

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
				this.getAllContacts();
				this.setState({
					showDetails: false,
				});
			})
			.catch(() => {
				this.setState({ error: true });
			});
	};

	render() {
		const {
			contacts,
			error,
			showNewContactForm,
			editDetails,
			first_name,
			last_name,
			email,
			phone_number,
			showDetails,
			selectedContact,
			selectedField,
			newValue,
			showEditContactForm,
		} = this.state;

		return (
			<div>
				<h2>Contacts:</h2>
				{contacts.map(contact => (
					<ul key={contact.id}>
						<li>
							{contact.first_name} {contact.last_name}
							<br></br>
							<button onClick={() => this.handleShowDetails(contact.id)}>
								Details
							</button>
						</li>
					</ul>
				))}
				<button onClick={() => this.handleAddNewContact()}>
					Add New Contact
				</button>
				{showDetails && (
					<div>
						<p>First Name: {selectedContact.first_name} </p>
						<p>Last Name: {selectedContact.last_name} </p>
						<p>Email: {selectedContact.email} </p>
						<p>Phone Number: {selectedContact.phone_number}</p>
						<button onClick={this.handleEditContact}>Edit</button>
						<button
							onClick={() => this.handleDeleteContact(selectedContact.id)}
						>
							Delete
						</button>
					</div>
				)}
				<div>
					{showNewContactForm && (
						<div>
							<form onSubmit={this.handleSubmit}>
								<h3>Add New Contacts:</h3>
								<label>First Name:</label>
								<input
									type="text"
									name="first_name"
									value={first_name}
									onChange={this.handleInputChange}
									required
								/>
								<label>Last Name:</label>
								<input
									type="text"
									name="last_name"
									value={last_name}
									onChange={this.handleInputChange}
									required
								/>
								<label>Email:</label>
								<input
									type="text"
									name="email"
									value={email}
									onChange={this.handleInputChange}
									required
								/>
								<label>Phone Number:</label>
								<input
									type="text"
									name="phone_number"
									value={phone_number}
									onChange={this.handleInputChange}
									required
								/>
								<br></br>
								<button>Submit</button>
							</form>
							<button onClick={this.handleClearForm}>Clear</button>
							<button onClick={this.handleCloseForm}>Close</button>
						</div>
					)}
				</div>
				<div>
					{editDetails && (
						<div>
							<h4>
								<form onSubmit={this.handleEditSubmit}>
									What would you like to edit for {selectedContact.first_name}{" "}
									{selectedContact.last_name}?{" "}
									<select
										value={selectedField}
										onChange={this.handleEditSelection}
									>
										<option>SELECT ONE:</option>
										<option value="first_name">First Name</option>
										<option value="last_name">Last Name</option>
										<option value="email">Email</option>
										<option value="phone_number">Phone Number</option>
									</select>
									<button>Edit</button>
								</form>
							</h4>
						</div>
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
							<button onClick={this.handleRefreshForm}>
								Edit another field
							</button>
						</div>
					)}
				</div>
				<br></br>
				{error && (
					<p className="error">
						{" "}
						Sorry, this email is already taken, please try again.
					</p>
				)}
			</div>
		);
	}
}

// REFACTORING LATER
// render() {
// 	return (
// 		<div>
// 			<AllContacts contacts={this.state.contacts} />
// 		</div>
// 	);
// }

export default ContactList;
