import React from "react";
import { PropTypes } from "prop-types";

const Item = props => {
	return (
		<li className="list-group-item" key={props.index}>
			{props.value.label}
			<button
				onClick={() => props.onClick(props.index)}
				className="btn btn-default btn-xs pull-right remove-item">
				<i className="fas fa-trash-alt text-danger mx-2"></i>
			</button>
		</li>
	);
};

Item.propTypes = {
	value: PropTypes.shape({
		label: PropTypes.string,
		done: PropTypes.bool
	}),
	index: PropTypes.number,
	onClick: PropTypes.func
};

export default Item;
