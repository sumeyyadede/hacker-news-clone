import React from "react";
import ShowStories from "./ShowStories";
import propTypes from "prop-types"; //make sure the pagenumber is int or not.

class ShowStoriesMoreLink extends React.Component {

	render() {
		return (
			<div>
				<ShowStories pageNumber={ this.props.match.params.pageNumber } />
	    	</div>
	  	);
	}
};

export default ShowStoriesMoreLink;
