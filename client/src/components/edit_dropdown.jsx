import React, { useState } from "react";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Form,
} from "reactstrap";

const EditDropdown = props => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen(prevState => !prevState);

	const { contact } = props;

	const handleSelect = event => {
		const value = event.target.value;
		props.sendSelection(value);
	};

	return (
		<div>
			<Form>
				<Dropdown direction="right" isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle caret>
						{" "}
						What would you like to edit for {contact.first_name}{" "}
						{contact.last_name}?
					</DropdownToggle>
					<DropdownMenu onClick={handleSelect}>
						<DropdownItem value="first_name">First Name</DropdownItem>
						<DropdownItem value="last_name">Last Name</DropdownItem>
						<DropdownItem value="email">Email</DropdownItem>
						<DropdownItem value="phone_number">Phone Number</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</Form>
		</div>
	);
};

export default EditDropdown;
