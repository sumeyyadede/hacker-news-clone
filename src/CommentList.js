import React from "react";
import { Link } from "react-router-dom";
import { FormGroup, Input } from 'reactstrap';
import { handleResponse, handleTime  } from "./helper";
import { API_ITEM } from "./config";
import DisplayComment, {} from "./DisplayComment";
import "./CommentList.css";
import "./Title.css";

class CommentList extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      kid: [],
      title: '',
      score: '',
      by: '',
      time: '',
      error: null
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    if (!localStorage.getItem(params.id)) {
      this.setState({ loading: true });
      this.fetchData();
    }
    else{
      var JsonParse = JSON.parse(localStorage.getItem(params.id));

      this.setState ({
        kid: JsonParse.kids,
        title: JsonParse.title,
        time: JsonParse.time,
        score: JsonParse.score,
        by: JsonParse.by,
        loading: false,
      });      
    }

    this.fetchUrlData();
  }

  fetchData = () => {
    const { match: { params } } = this.props;

    fetch(`${API_ITEM}/${params.id}.json?print=pretty`)
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
          title: data.title,
          score: data.score,
          by: data.by,
          time: data.time,
          loading: false,
        });
        localStorage.setItem(params.id, JSON.stringify(data));
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  fetchUrlData = () => {
    const { match: { params } } = this.props;

    fetch(`${API_ITEM}/${params.id}.json?print=pretty`)
      .then(handleResponse)
      .then(data => {
        this.setState({
          url: data.url,
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

  displayComments = () => {
    const { kid } = this.state;

    if(kid && kid.length !== 0){
      return(
        <div>
          {kid.map(kid => (
            <div>
              <DisplayComment kid={ kid } />
              <br />
            </div>
          ))}
        </div>
      );
    }
    else{
      return(
        <div>
          <br/>
          <br/>
        </div>
      );          
    }
  }

  addComment() {}

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
    const { loading, error, title, url, score, by, time } = this.state;
    const { match: { params } } = this.props;

    if (loading) {
      return <div>Loading..</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <div>
          <a className="title" href={url}> { title } </a>
        </div>
        <br/>
        <div>
          {score} points by
          <Link className="link" to={`user/${by}`}>
            <span/> {by} 
          </Link>
          <Link className="link" to={`${params.id}`}>
            <span/> { handleTime(time) } hour ago
          </Link>  
          <span> | hide </span>
          <span> | past | </span>
          <Link className="link" to={`${params.id}`}>
            { this.showCommentNumber() }
          </Link>
        </div>
        <br />
        <br />
        <FormGroup>
          <Input className="input" type="textarea" name="text" id="exampleText" rows="6" cols="60" />
        </FormGroup>
        <button type="button" onClick={this.addComment}>
          add comment
        </button>
        <br />

        { this.displayComments() }
      </div>
    );
  }
}

export default CommentList;
