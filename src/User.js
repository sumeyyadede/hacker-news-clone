import React from "react";
import { handleResponse, handleText } from "./helper";
import { API_URL } from "./config";

class User extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    if(!localStorage.getItem(params.user)){
      this.setState({ loading: true });
      this.fetchData();
    }
    else {
      var JsonParse = JSON.parse(localStorage.getItem(params.user));
      
      this.setState ({
        id: JsonParse.id,
        about: JsonParse.about,
        created: JsonParse.created,
        karma: JsonParse.karma,
        loading: false,
      });      
    }
  }

  fetchData = () => {
    const { match: { params } } = this.props;

    fetch(`${API_URL}/user/${params.user}.json?print=pretty`)
      .then(handleResponse)
      .then(data => {
        this.setState({
          about : data.about,
          id: data.id,
          created: data.created,
          karma: data.karma,
          loading: false,
        });
        localStorage.setItem(params.user, JSON.stringify(data));
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });    
  }

  render() {
    const { loading, error, created, karma, about } = this.state;

    if (loading) {
      return <div>Loading..</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        user: {this.props.match.params.user}
        <br/>
        created: {created}
        <br/>
        karma: {karma}
        <br/>
        about: { handleText(about) }
      </div>
    );
  }
}

export default User;
