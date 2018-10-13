import React from "react";
import NewStories from "./NewStories";
import propTypes from "prop-types"; //make sure the pagenumber is int or not.

class NewStoriesMoreLink extends React.Component {

	render() {
		return (
			<div>
				<NewStories pageNumber={ this.props.match.params.pageNumber } />
	    	</div>
	  	);
	}
};

export default NewStoriesMoreLink;
