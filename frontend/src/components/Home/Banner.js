import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  handleSearchInput = (event) => {
    event.preventDefault();
    const title = event.target.value;
    this.setState({ title });
    if (title.length >= 3) {
      const filteredItems = agent.Items.search(title);
      if (filteredItems.length === 1) {
        this.props.onSearch([]);
      }
      this.props.onSearch(filteredItems);
    }
  };

  render() {
    return (
      <div className="banner text-white">
        <div className="container p-4 text-center">
          <img src={logo} alt="banner" />
          <div className="search-box">
            <span id="get-part">A place to get</span>
            <div>
              <input
                type="text"
                id="search-box"
                className="search-input"
                value={this.state.title}
                onChange={this.handleSearchInput}
                placeholder="What is that you desire?"
              />
            </div>
            <span> the cool stuff.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
