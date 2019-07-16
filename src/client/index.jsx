import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

//
// Components
//

function App({getTweets}) {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact render={() => <Home getTweets={getTweets}/>} />
        <Route path="/settings/" render={() => <Settings/>} />
      </div>
    </Router>
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
        <Link className="text-light" to="/">Depot</Link>
      </section>
      <section className="navbar-section pr-1">
        <Link className="text-light" to="/settings/">Settings</Link>
      </section>
    </header>
  );
}

// Home

function Home({getTweets}) {
  return <TweetCollection getTweets={getTweets} />;
}
Home.propTypes = {
  getTweets: PropTypes.func.isRequired,
};

class TweetCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tweets: []};
  }

  async componentDidMount() {
    const tweets = await this.props.getTweets();
    this.setState({tweets: tweets});
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

// Settings

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {didLoad: false, spreadsheetID: '', toast: ''};
    this.save = this.save.bind(this);
  }

  async componentDidMount() {
    const settings = await getSettings();
    this.setState({didLoad: true, spreadsheetID: settings.spreadsheetID || ''});
  }

  async save() {
    await setSettings({spreadsheetID: this.state.spreadsheetID});
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-12">
           <div className="form-group">
              <label className="form-label">Google Spreadsheet ID</label>
              <input className="form-input" type="text"
                readOnly={!this.state.didLoad}
                value={this.state.spreadsheetID}
                onChange={(event)=>{
                  this.setState({spreadsheetID: event.target.value});
                }}
                placeholder="Google Spreadsheet ID" />
            </div>
          </div>
          <div className="column col-2 col-ml-auto mt-2">
            <button className="btn btn-primary" style={{width: '100%'}}
              disabled={!this.state.didLoad}
              onClick={this.save}>
              Save
            </button>
          </div>

          <div className="column col-12 mt-2">
            <div className="toast">
              <button className="btn btn-clear float-right"/>
              Settings are saved.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//
// Database accessors
//

function getTweets() {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((result) => resolve(result))
      .withFailureHandler((error) => resolve(error))
      .getTweets();
  });
}

function getSettings() {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((result) => resolve(result))
      .withFailureHandler((error) => resolve(error))
      .getSettings();
  });
}

function setSettings(settings) {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((result) => resolve(result))
      .withFailureHandler((error) => resolve(error))
      .setSettings(settings);
  });
}

//
// Render
//

ReactDOM.render(
  <App getTweets={getTweets}/>,
  document.getElementById('index'));
