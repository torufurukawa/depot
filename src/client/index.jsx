import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TwitterTweetEmbed} from 'react-twitter-embed';


//
// Components
//

function App({getTweets}) {
  return (
    <div>
      <Navbar />
      <TweetCollection getTweets={getTweets} />
    </div>
  );
}
App.propTypes = {
  getTweets: PropTypes.func.isRequired,
};

function Navbar() {
  return (
    <header className="navbar bg-dark pt-2 pb-2">
      <section className="navbar-section" />
      <section className="navbar-center">
        Depot
      </section>
      <section className="navbar-section" />
    </header>
  );
}

class TweetCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tweets: []};
  }

  componentDidMount() {
    this.props.getTweets(null, (tweets) => {
      this.setState({tweets: tweets});
    });
  }

  render() {
    return (
      <div className="pl-2 pr-2">
        {this.state.tweets.map((tweet, i) => {
          return <Tweet id={tweet.id} key={i} />;
        })}
      </div>
    );
  }
}
TweetCollection.propTypes = {
  getTweets: PropTypes.func.isRequired,
};

function Tweet({id}) {
  return (
    <TwitterTweetEmbed tweetId={id} />
  );
}
Tweet.propTypes = {
  id: PropTypes.string.isRequired,
};

//
// Database accessors
//

function getTweets(query, callback) {
  google.script.run.withSuccessHandler(callback).getTweets(query);
}

//
// Render
//

ReactDOM.render(
  <App getTweets={getTweets}/>,
  document.getElementById('index'));
