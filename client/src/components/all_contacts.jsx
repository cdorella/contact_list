import React from "react";

// REFACTORING LATER

const AllContacts = props => {
	const contacts = props.contacts.map(contact => {
		return (
			<div key={contact.id}>
				<li>
					{contact.first_name} {contact.last_name}
				</li>
			</div>
		);
	});
	return <div>{contacts}</div>;
};

export default AllContacts;
