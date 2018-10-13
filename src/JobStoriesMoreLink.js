import React from "react";
import JobStories from "./JobStories";
import propTypes from "prop-types"; //make sure the pagenumber is int or not.

class JobStoriesMoreLink extends React.Component {

	render() {
		return (
			<div>
				<JobStories pageNumber={ this.props.match.params.pageNumber } />
	    	</div>
	  	);
	}
};

export default JobStoriesMoreLink;
