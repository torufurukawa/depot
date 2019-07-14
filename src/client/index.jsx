import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';


//
// Components
//

function App() {
  return (
    <div>
      <Navbar />
      <TweetCollection />
    </div>
  );
}

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
    this.state = {tweets: [{id: '1140550654378692608'}]};
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

function Tweet({id}) {
  return (
    <TwitterTweetEmbed tweetId={id} />
  );
}
Tweet.propTypes = {
  id: PropTypes.string.isRequired,
};

//
// Render
//

ReactDOM.render(<App />, document.getElementById('index'));
