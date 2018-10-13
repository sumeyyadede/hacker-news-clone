import React from "react";
import "./Footer.css";

class Footer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    async handleChange(event) {
        await event.preventDefault();
        this.onClick(event);
    }

    async onClick (e) {
        e.preventDefault();
    
        const { value } = this.e;

        if (value === '') {
            return;
        }

        await fetch('https://hn.algolia.com/api/v1/search?query=' + e)
            .then(response => response.json())
            .then(result => this.onSetResult(result));
    }

    render() {
        return (
            <div>
                <a  className="a" href="https://news.ycombinator.com/newsguidelines.html"> Guidelines </a><span className="a"> | </span>
                <a  className="a" href="https://news.ycombinator.com/newsfaq.html"> FAQ </a><span className="a"> | </span>
                <a  className="a2" href="/"> Support </a><span className="a"> | </span>   
                <a  className="a" href="https://github.com/HackerNews/API"> API </a><span className="a"> | </span>
                <a  className="a" href="https://news.ycombinator.com/security.html"> Security </a><span className="a"> | </span>
                <a  className="a" href="/"> Lists </a><span className="a"> | </span>
                <a  className="a" href="https://news.ycombinator.com/bookmarklet.html"> Bookmarklet </a><span className="a"> | </span>
                <a  className="a" href="/"> Legal </a><span className="a"> | </span>
                <a  className="a" href="/"> Apply To YC </a><span className="a"> | </span>
                <a  className="a2" href="/"> Contact </a>
                <br />
                <br />
                <div>
                    <form className="a">
                        <label>
                            Search:
                            <input type="text" value={this.state.value} handleChange={this.handleChange}/>
                        </label>
                    </form>
                </div>
                <br />
            </div>
        );
    }
}

export default Footer;
