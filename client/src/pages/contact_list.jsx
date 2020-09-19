import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import "./contact_list.css";

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
			<h1 className="contact-list-title">Click for contact details:</h1>
			{contacts.map(contact => (
				<ul key={contact.id}>
					<ListGroup>
						<ListGroupItem
							active
							tag="a"
							href={`/contacts/${contact.id}`}
							action
							className="btn btn-danger btn stretched-link"
						>
							{contact.first_name} {contact.last_name}
						</ListGroupItem>
					</ListGroup>
				</ul>
			))}

			<div className="add-new-container">
				<Link to="/contacts/add" className="btn btn-secondary stretched-link">
					Add New Contact
				</Link>
			</div>
		</div>
	);
};
export default ContactList;
