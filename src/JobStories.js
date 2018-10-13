import React from "react";
import { Link } from "react-router-dom";
import { handleResponse } from "./helper";
import { API_URL } from "./config";
import Title from "./Title";
import "./style.css";

class JobStories extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      id: [],
      showTime: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { pageNumber } = this.props;
    this.setState({ loading: true });

    fetch(`${API_URL}/jobstories.json?print=pretty`)
      .then(handleResponse)
      .then(data => {
        this.setState({
          id :  data.slice( 30*(pageNumber - 1), 30*pageNumber),
          dataLength: data.length,
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
    const { id, showTime } = this.state;

    if(id.length !== 0){
      return (
        <div>
          { id.map(ides => 
            <div key={ides}>
              <Title id={ides} showTime={showTime} />
              <br />
              </div>
          )}
        </div>
      );      
    }
    else{
      return (
        <div>
          <p>Sorry, there is not available jobs.</p>
        </div>
      );
    }
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
          These are jobs at YC startups. You can apply to many at once through 
          <a className="a" href="https://www.workatastartup.com/"><u> Work at a Startup</u></a> or 
          <a className="a" href="https://triplebyte.com/?ref=yc_jobs"><u> Triplebyte </u></a>, and browse company profiles at 
          <a className="a" href="https://www.keyvalues.com/yc-funded-companies"><u> Key Values</u></a> (YC W18).
        </div>
        <br/>
        { this.handleTitle() }
        <div>        
          { showMoreButton !== dataLength && showMoreButton < dataLength && 
            <Link className="more" to={`jobp=${ parseInt(pageNumber, 10) + 1 }`}>More</Link> 
          }
        </div>
      </div>
    );
  }
}

export default JobStories;
