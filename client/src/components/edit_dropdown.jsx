import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Form,
} from "reactstrap";

const EditDropdown = props => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	// TEST IF I CAN REMOVE THIS selectedValue
	const [selectedValue, setSelectedValue] = useState("");

	const toggle = () => setDropdownOpen(prevState => !prevState);

	const { contact } = props;

	const handleSelect = event => {
		const value = event.target.value;
		setSelectedValue(value);
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

{
	/* <h5>
<Form onSubmit={this.handleEditSubmit}>
  What would you like to edit for {selectedContact.first_name}{" "}
  {selectedContact.last_name}?{" "}
  <div className="add-contact-container">
    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      <select value={selectedField} onChange={this.handleEditSelection}>
        <option>Select One:</option>
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
        <option value="email">Email</option>
        <option value="phone_number">Phone Number</option>
      </select>
    </FormGroup>
    <br></br>
  </div>
  <div className="form-btn-container">
    <Button color="danger">Edit</Button>
  </div>
</Form>
</h5>
</div>; */
}
