import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import List from "./List";
import ShowStories from "./ShowStories";
import AskStories from "./AskStories";
import NewStories from "./NewStories";
import JobStories from "./JobStories";
import User from "./User";
import Pagination from "./Pagination";
import CommentList from "./CommentList";
import Search from "./Search";
import NotFound from "./NotFound";
import Footer from "./Footer";
import NewStoriesMoreLink from "./NewStoriesMoreLink";
import AskStoriesMoreLink from "./AskStoriesMoreLink";
import ShowStoriesMoreLink from "./ShowStoriesMoreLink";
import JobStoriesMoreLink from "./JobStoriesMoreLink";
import "./App.css";

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      pageNumber: 1,
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <center>
            <table className="table">
              <tbody className="tbody">
                <tr className="tr">
                  <Header />
                </tr>      
                <tr>
                  <td>
                    <div className="body">
                      <Switch>
                        <Route path="/" render={(props) => <List pageNumber={this.state.pageNumber} {...props} /> }  exact />
                        <Route path="/show" render={(props) => <ShowStories pageNumber={this.state.pageNumber} {...props} /> } />
                        <Route path="/ask" render={(props) => <AskStories pageNumber={this.state.pageNumber} {...props} /> } />
                        <Route path="/newest" render={(props) => <NewStories pageNumber={this.state.pageNumber} {...props} /> } />
                        <Route path="/jobs" render={(props) => <JobStories pageNumber={this.state.pageNumber} {...props} /> } />
                        <Route path="/item/:id" component={CommentList} />
                        <Route path="/user/:user" component={User} />
                        <Route path="/p=:pageNumber" component={Pagination} />
                        <Route path="/newestp=:pageNumber" component={NewStoriesMoreLink} />
                        <Route path="/askp=:pageNumber" component={AskStoriesMoreLink} />
                        <Route path="/showp=:pageNumber" component={ShowStoriesMoreLink} />
                        <Route path="/jobp=:pageNumber" component={JobStoriesMoreLink} />
                        <Route path="/search/:value" component={Search} />
                        <Route component={NotFound} />
                      </Switch>
                    </div>
                  </td>
                </tr>
                <tr>
                  <div>
                    <center>
                      <hr className="line" />
                      <Footer />
                    </center>
                  </div>
                </tr>
              </tbody>
            </table> 
          </center>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
