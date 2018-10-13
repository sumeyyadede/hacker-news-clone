import React from "react";
import List from "./List";
import propTypes from "prop-types"; //make sure the pagenumber is int or not.

class Pagination extends React.Component {

	render() {

		return (
			<div>
				<List pageNumber={ this.props.match.params.pageNumber } />
	    	</div>
	  	);
	}
};

export default Pagination;
