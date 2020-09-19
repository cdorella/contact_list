import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ContactList = props => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		fetch("/api/v1/contacts")
			.then(response => response.json())
			.then(response => setContacts(response.data))
			.catch(error => console.log(error));
	}, []);

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
			<Link to="/contacts/add">Add New Contact</Link>
		</div>
	);
};
export default ContactList;
