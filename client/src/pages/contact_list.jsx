import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Nav, NavItem, NavLink } from "reactstrap";
import "./contact_list.css";

const ContactList = () => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		fetch("/api/v1/contacts")
			.then(response => response.json())
			.then(response => setContacts(response.data))
			.catch(error => console.log(error));
	}, []);

	return (
		<div>
			<div>
				<div>
					<h1 className="contact-title">Click for contact details:</h1>
				</div>
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
			</div>
			<div className="add-new-bottom-container">
				<Nav>
					<NavItem>
						<NavLink href="/contacts/add" className="btn btn-secondary" active>
							Add New Contact
						</NavLink>
					</NavItem>
				</Nav>
				<Nav>
					<NavItem>
						<NavLink href="/" className="btn btn-secondary" active>
							Back to Home
						</NavLink>
					</NavItem>
				</Nav>
			</div>
		</div>
	);
};
export default ContactList;
