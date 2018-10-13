import React from "react";
import { Link } from "react-router-dom";
import { handleResponse, handleText, handleTime } from "./helper";
import { API_ITEM } from "./config";
import "./DisplayComment.css";

class DisplayComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      kid: [],
      time: '',
      text: '',
      by: '',
      error: null,
    };
  }

  componentDidMount() {
    const { kid } = this.props;

    if (!localStorage.getItem(kid)) {
      this.setState({ loading: true });
      this.fetchData();
    }
    else{
      var JsonParse = JSON.parse(localStorage.getItem(kid));

      this.setState ({
        kid: JsonParse.kids,
        time: JsonParse.time,
        text: JsonParse.text,
        by: JsonParse.by,
        loading: false,
      });      
    }
  }
  
  fetchData = () => {
    const { kid } = this.props;

    fetch(`${API_ITEM}/${kid}.json?print=pretty`)
      .then(handleResponse)
      .then(data => {
        if (data.kids == null) {
          this.setState({
            kid: [],
          });
        } else {
          this.setState({
            kid: data.kids,
          });
        }
        this.setState({
          time: data.time,
          text: data.text,
          by: data.by,
          loading: false,
        });
        localStorage.setItem(kid, JSON.stringify(data));
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  displayComments = () => {
    const { kid, text } = this.state;

    if(kid && (kid.length !== 0 || kid.length !== 1)){
      return (
        <div>
          { handleText(text) }
          <br/>
          <a className="a-reply" href="">reply</a>
          {kid.map(kid => (
            <div key={kid.objectID}>
              <DisplayComment kid={kid} />
            </div>
          ))}
        </div>
      );
    } else{
        return (
          <div>
            { handleText(text) }
            <br/>
            <a className="a-reply" href="">reply</a>
          </div>
        );
     }
  }

  render() {
    const { loading, error, by, time, kid } = this.state;

    if (loading) {
      return <div>Loading..</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <ul>
          <br />
          <li>
            <Link className="link-user" to={`user/${by}`}>
              <span/> {by} 
            </Link>
            <span></span>
            <Link className="link-user" to={`item/${kid}`}>
              <span/> { handleTime(time) } hour ago
            </Link>          
            { this.displayComments() }
          </li>
        </ul>
      </div>
    );
  }
}

export default DisplayComment;
