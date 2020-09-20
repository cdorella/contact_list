import React from "react";
import {
	Card,
	CardText,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	Input,
} from "reactstrap";
import IdAlert from "../components/invalid_id_alert";
import EditDropdown from "../components/edit_dropdown";
import EditContactDb from "../components/edit_contact_db";
import DeleteContactDb from "../components/delete_contact_db";
import SuccessAlert from "../components/success_alert";

class ContactDetails extends React.Component {
	constructor(props) {
		super();
		this.state = {
			selectedContact: {},
			invalidId: false,
			deleteContact: false,
			editDetails: false,
			showEditContactForm: false,
			editDatabase: false,
			editSuccess: false,
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			deleteId: "",
			selectedField: "",
			newValue: "",
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
						invalidId: true,
					});
				}
			})
			.catch(() => {
				this.setState({ error: true });
			});
	}

	handleBackButton = () => {
		this.props.history.push({
			pathname: "/contacts",
		});
	};

	handleDeleteContact = id => {
		this.setState({
			deleteContact: true,
			deleteId: id,
		});
	};

	handleEditContact = () => {
		this.setState({
			editDetails: true,
		});
	};

	handleSelectedField = value => {
		this.setState({
			selectedField: value,
			showEditContactForm: true,
			editDetails: false,
		});
	};

	handleInputChange = event => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value,
		});
	};

	handleFinalEditSubmit = event => {
		event.preventDefault();
		this.setState({
			showEditContactForm: false,
			editDatabase: true,
		});
	};

	handleCloseForm = () => {
		this.setState({
			showEditContactForm: false,
		});
	};

	handleEditSuccess = id => {
		this.setState({
			editSuccess: true,
		});
		this.getContactById(id);
	};

	render() {
		const {
			selectedContact,
			invalidId,
			deleteContact,
			editDetails,
			showEditContactForm,
			editDatabase,
			editSuccess,
			first_name,
			last_name,
			email,
			phone_number,
			deleteId,
			selectedField,
			newValue,
		} = this.state;

		return (
			<div>
				{invalidId ? (
					<div>
						<IdAlert />
					</div>
				) : (
					<div>
						<h1 className="contact-title">Here are the details:</h1>
						<Row>
							<Col sm="5">
								<Card body>
									<CardText>
										<p className="lead">
											First Name: {selectedContact.first_name}{" "}
										</p>
										<p className="lead">
											Last Name: {selectedContact.last_name}{" "}
										</p>
										<p className="lead">Email: {selectedContact.email} </p>
										<p className="lead">
											Phone Number: {selectedContact.phone_number}
										</p>
									</CardText>
									<p className="lead">
										<Button color="danger" onClick={this.handleEditContact}>
											Edit
										</Button>
										<span></span>
										<Button
											color="danger"
											onClick={() =>
												this.handleDeleteContact(selectedContact.id)
											}
										>
											Delete
										</Button>
										<span></span>
										<Button color="danger" onClick={this.handleBackButton}>
											Back
										</Button>
									</p>
								</Card>
							</Col>
							{showEditContactForm && (
								<Col sm="6">
									<Card body>
										<Form inline onSubmit={this.handleFinalEditSubmit}>
											<CardText className="lead">Edit information:</CardText>
											<FormGroup>
												<Input
													type="text"
													name={selectedField}
													defaultValue={newValue}
													onChange={this.handleInputChange}
													required
												/>
												<span></span>
												<Button>Submit</Button>
												<span></span>
												<Button onClick={this.handleCloseForm}>Close</Button>
											</FormGroup>
										</Form>
									</Card>
								</Col>
							)}
						</Row>
						<div>
							{editDetails && (
								<div>
									<EditDropdown
										contact={selectedContact}
										sendSelection={this.handleSelectedField}
									/>
								</div>
							)}
						</div>
					</div>
				)}
				{editDatabase && (
					<EditContactDb
						contact={selectedContact}
						first_name={first_name}
						last_name={last_name}
						email={email}
						phone_number={phone_number}
						sendEditSuccess={this.handleEditSuccess}
					/>
				)}
				{editSuccess && <SuccessAlert />}
				{deleteContact && <DeleteContactDb id={deleteId} />}
			</div>
		);
	}
}

export default ContactDetails;
