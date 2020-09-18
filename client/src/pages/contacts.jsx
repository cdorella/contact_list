import React from "react";
import { Link } from "react-router-dom";

class AllContacts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: [],
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			showNewContactForm: false,
			success: false,
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
					this.setState({
						success: true,
					});
					this.getAllContacts();
				} else {
					this.setState({
						error: true,
					});
				}
			})
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

	render() {
		const {
			contacts,
			first_name,
			last_name,
			email,
			phone_number,
			showNewContactForm,
			success,
			error,
		} = this.state;

		return (
			<div>
				<h2>Contacts:</h2>
				{contacts.map(contact => (
					<ul key={contact.id}>
						<li>
							{contact.first_name} {contact.last_name}
							<br></br>
							<Link to={`/contacts/${contact.id}`}>Details</Link>
						</li>
					</ul>
				))}
				<button onClick={() => this.handleAddNewContact()}>
					Add New Contact
				</button>
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
				{/* MAKE THESE ALERTS WHEN STYLING */}
				{success && <p className="error"> Your contact has been saved!</p>}
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

export default AllContacts;
