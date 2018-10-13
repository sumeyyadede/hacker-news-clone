import React from "react";
import AskStories from "./AskStories";
import "./style.css";

export const handleResponse = response => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
};

export const handleText = response => {
	return ( <t dangerouslySetInnerHTML={{ __html: response }} /> );
};

export const handleTime = response => {
	return ( Math.floor((response % 3600) % 60) );
};

export const handleAskStoriesMoreLink = (pageNumber) => {
    return (
        <div>
            <AskStories pageNumber={ pageNumber } />
        </div>
    );
}

