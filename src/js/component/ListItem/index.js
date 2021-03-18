import React from "react";
import { PropTypes } from "prop-types";
const ListItem = props => {
	console.log(props.list);
	return <ul className="list-group">{props.list}</ul>;
};

ListItem.propTypes = {
	list: PropTypes.any
};
export default ListItem;
