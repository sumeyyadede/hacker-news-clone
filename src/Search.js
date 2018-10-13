import React from "react";
import { Link } from "react-router-dom";
import { handleResponse } from "./helper";
import { API_URL } from "./config";
import Title from "./Title";
import "./style.css";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      id: [],
      error: null,
      disappearHide: true,
    };
  }

  handleTitle = () => {
    const { disappearHide } = this.state;
    const { items } = this.props;
    const { match: { params } } = this.props;

    return (
      <div>
        { params.items.map(item => 
          <div key={item.objectID}>
            <Title id={item} disappearHide={disappearHide}/>
            <br />
          </div>
        )}
      </div>
    );
  }

  render() {
    const { loading, error, showMoreButton } = this.state;
    const { items } = this.props;

    if (loading) {
      return <div>Loading..</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        { this.handleTitle() }
      </div>
    );
  }
}

export default List;
