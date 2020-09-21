import { useEffect } from "react";

const GetContactById = props => {
	useEffect(() => {
		const { id } = props;

		fetch(`/api/v1/contacts/${id}`)
			.then(response => response.json())
			.then(response => {
				if (response.status === "Success") {
					props.contactDetails(response.data);
				} else {
					props.invalidId();
				}
			})
			.catch(error => console.log(error));
		// eslint-disable-next-line
	}, []);

	return null;
};

export default GetContactById;
