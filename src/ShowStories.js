import React from "react";
import { Link } from "react-router-dom";
import { handleResponse } from "./helper";
import { API_URL } from "./config";
import Title from "./Title";
import "./style.css";

class ShowStories extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      id: [],
      disappearHide: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { pageNumber } = this.props;
    this.setState({ loading: true });

    fetch(`${API_URL}/showstories.json?print=pretty`)
      .then(handleResponse)
      .then(data => {
        this.setState({
          id :  data.slice( 30*(pageNumber - 1), 30*pageNumber),
          dataLength: data.length,
          titleNumber: 30*(pageNumber - 1) + 1,
          showMoreButton: pageNumber*30,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.pageNumber !== nextProps.pageNumber || this.state.titleNumber !== nextState.titleNumber 
  }

  async componentDidUpdate() {
    await this.fetchData();
  }

  handleTitle = () => {
    const { id, titleNumber, disappearHide } = this.state;

    return (
      <div>
        { id.map((ides, index) => 
          <div key={ides}>
            <Title id={ides} titleNumber={titleNumber + index} disappearHide={disappearHide} />
            <br />
            </div>
        )}
      </div>
    );
  }  

  render() {
    const { loading, error, showMoreButton, dataLength } = this.state;
    const { pageNumber } = this.props;

    if (loading) {
      return <div>Loading..</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <div className="p"> 
          Please read the <a className="a" href="https://news.ycombinator.com/showhn.html"><u>rules</u>.</a> You can also browse the newest Show HNs.
        </div>
        <br/>
        { this.handleTitle() }
        <div>        
          { showMoreButton !== dataLength && showMoreButton < dataLength &&
            <Link className="more" to={`showp=${ parseInt(pageNumber, 10) + 1 }`} >More</Link> 
          }
        </div>
      </div>
    );
  }
}

export default ShowStories;
