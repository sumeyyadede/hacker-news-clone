import React from "react";
import { Link } from "react-router-dom";
import { handleResponse, handleTime } from "./helper";
import { API_ITEM } from "./config";
import "./style.css";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      kid: [],
      time: '',
      score: '',
      user: '',
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const { id } = this.props;

    if (!localStorage.getItem(id)) {
      this.setState({ loading: true });
      this.fetchData();
    }
    else {
      var JsonParse = JSON.parse(localStorage.getItem(id));
      
      this.setState ({
        kid: JsonParse.kids,
        time: JsonParse.time,
        score: JsonParse.score,
        user: JsonParse.by,
        loading: false,
      });      
    }
  }    
   
  fetchData = () => {
    fetch(`${API_ITEM}/${this.props.id}.json?print=pretty`)
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
          score: data.score,
          user: data.by,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  showHide = () => {
    return(
      <span> | hide | </span>
    );
  }

  disappearHide = () => {
    return(
      <span> | </span>
    );
  }

  showNew = () => {
    return(
      <span> | hide | past | web | </span>
    );    
  }

  showCommentNumber = () => {
    const { kid } = this.state;

    if(kid && kid.length !== 0){
      return(
        <span> {kid.length} comments </span>
      ); 
    }
    else{
      return(
        <span> discuss </span> 
      );          
    }
  }

  render() {
    const { loading, error, score, user, time } = this.state;
    const { id } = this.props;

    if (loading) {
      return <div>Loading..</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <div>
          {
            this.props.showTime ? <div> { handleTime(time) } hour ago </div> : 
              <div>       
                {score} points by
                <Link className="link" to={`user/${user}`}>
                  <span/> {user} 
                </Link>
                <Link className="link" to={`item/${id}`}>
                  <span/> { handleTime(time) } hour ago
                </Link>          
                {
                  this.props.disappearHide ? this.disappearHide() : 
                    this.props.showNew ? this.showNew() : this.showHide()
                }
                <Link className="link" to={`item/${id}`}>
                  { this.showCommentNumber() }
                </Link>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default Comment;
