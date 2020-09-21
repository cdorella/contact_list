import React from "react";
import SuccessDelete from "./success_delete";

class DeleteContactDb extends React.Component {
	constructor(props) {
		super();
		this.state = {
			deleteSuccess: false,
		};
	}

	componentDidMount() {
		const { id } = this.props;
		this.deleteContact(id);
	}

	deleteContact = id => {
		fetch(`/api/v1/contacts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(() => {
				this.setState({
					deleteSuccess: true,
				});
			})
			.catch(error => console.log(error));
	};

	render() {
		const { deleteSuccess } = this.state;
		return <div>{deleteSuccess && <SuccessDelete />}</div>;
	}
}

export default DeleteContactDb;
