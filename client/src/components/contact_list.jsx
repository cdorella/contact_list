import React from "react";
// import AllContacts from "./all_contacts";

class ContactList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			error: false,
			contacts: [],
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
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
			.then(() => {
				this.getAllContacts();
			})
			.catch(error => {
				console.log("error", error.response);
			});
	};

	render() {
		const {
			contacts,
			message,
			first_name,
			last_name,
			email,
			phone_number,
		} = this.state;
		return (
			<div>
				<h2>Contacts:</h2>
				{contacts.map(contact => (
					<li key={contact.id}>
						{contact.first_name} {contact.last_name}
					</li>
				))}
				<div>
					<h4>{message}</h4>
					<br></br>
					<form onSubmit={this.handleSubmit}>
						<h3>Add New Contacts:</h3>
						<label>First Name:</label>
						<input
							type="text"
							name="first_name"
							value={first_name}
							onChange={this.handleInputChange}
						/>
						<label>Last Name:</label>
						<input
							type="text"
							name="last_name"
							value={last_name}
							onChange={this.handleInputChange}
						/>
						<label>Email:</label>
						<input
							type="text"
							name="email"
							value={email}
							onChange={this.handleInputChange}
						/>
						<label>Phone Number:</label>
						<input
							type="text"
							name="phone_number"
							value={phone_number}
							onChange={this.handleInputChange}
						/>
						<button>Submit</button>
					</form>
				</div>
				{this.state.error && (
					<p className="error"> Sorry, there has been an error.</p>
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
