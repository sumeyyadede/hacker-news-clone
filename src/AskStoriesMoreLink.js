import React from "react";
import AskStories from "./AskStories";
import propTypes from "prop-types"; //make sure the pagenumber is int or not.

class AskStoriesMoreLink extends React.Component {

	render() {
		return (
			<div>
				<AskStories pageNumber={ this.props.match.params.pageNumber } />
	    	</div>
	  	);
	}
};

export default AskStoriesMoreLink;
