import Banner from "./Banner";
import MainView from "./MainView";
import React from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
  ITEM_SEARCH,
} from "../../constants/actionTypes";

const Promise = global.Promise;

class SearchBar extends React.Component {
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
      <div className="search-box">
        <span id="get-part">A place to get</span>
        <div id="search-box">
          <input
            type="text"
            className="search-input"
            value={this.state.title}
            onChange={this.handleSearchInput}
            placeholder="What is that you desire?"
          />
        </div>
        <span> the cool stuff.</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
  onSearch: (payload) => dispatch({ type: ITEM_SEARCH, payload }),
});

class Home extends React.Component {
  componentWillMount() {
    const tab = "all";
    const itemsPromise = agent.Items.all;

    this.props.onLoad(
      tab,
      itemsPromise,
      Promise.all([agent.Tags.getAll(), itemsPromise()])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <Banner />
        <div className="container page">
          <SearchBar onSearch={this.props.onSearch} />
          <Tags tags={this.props.tags} onClickTag={this.props.onClickTag} />
          <MainView />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
