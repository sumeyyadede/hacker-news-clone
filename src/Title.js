import React from "react";
import { handleResponse } from "./helper";
import { API_ITEM } from "./config";
import Comment from "./Comment";
import "./Title.css";

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const { id } = this.props;

    if (!localStorage.getItem(id)) {
      this.setState({ loading: true });
      this.fetchData();
    }
    else{
      var JsonParse = JSON.parse(localStorage.getItem(id));

      this.setState ({
        title: JsonParse.title,
        url: JsonParse.url,
        loading: false,
      });      
    }
  }

  fetchData = () => {
    const { id } = this.props;

    fetch(`${API_ITEM}/${id}.json?print=pretty`)
      .then(handleResponse)
      .then(data => {
        this.setState({
          title: data.title,
          url: data.url,
          loading: false,
        });
        localStorage.setItem(id, JSON.stringify(data));
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  render() {
    const { loading, error, title, url } = this.state;
    const { titleNumber, id, disappearHide, showTime, showNew } = this.props;

    if (loading) {
      return <div>Loading..</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return(
      <div>
          { titleNumber ? 
            <div> { titleNumber }. 
              <a className="title" href={url}> { title } </a>      
            </div> : 
            <div> 
              <a className="title" href={url}> { title } </a>      
            </div> 
          }
        <Comment id={id} disappearHide={disappearHide} 
          showTime={showTime} showNew={showNew} />  
      </div>
    );
  }
}

export default Title;
