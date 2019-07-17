import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TwitterTweetEmbed} from 'react-twitter-embed';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

//
// Components
//

function App({server}) {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact render={() => <Home server={server} />} />
        <Route path="/settings/" render={() => <Settings server={server} />} />
      </div>
    </Router>
  );
}
App.propTypes = {
  server: PropTypes.object,
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

function Home({server}) {
  return <TweetCollection server={server} />;
}
Home.propTypes = {
  server: PropTypes.object.isRequired,
};

class TweetCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tweets: []};
  }

  async componentDidMount() {
    const tweets = await this.props.server.getTweets();
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
  server: PropTypes.object.isRequired,
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
  constructor({server, ...props}) {
    super(props);
    this.server = server;
    this.state = {didLoad: false, spreadsheetID: '', notification: ''};
    this.save = this.save.bind(this);
  }

  async componentDidMount() {
    const settings = await this.server.getSettings();
    this.setState({
      didLoad: true,
      spreadsheetID: settings.spreadsheetID || '',
    });
  }

  async save() {
    await this.server.setSettings({spreadsheetID: this.state.spreadsheetID});
    this.setState({notification: 'Saved Spreadsheet ID.'});
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
                onChange={(event) => {
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

          <Toast notification={this.state.notification}
            onClick={()=>{
              this.setState({notification: ''});
            }}/>
        </div>
      </div>
    );
  }
}
Settings.propTypes = {
  server: PropTypes.object.isRequired,
};

function Toast({notification, onClick}) {
  if (!notification) {
    return null;
  }
  return (
    <div className="column col-12 mt-2">
      <div className="toast">
        <button className="btn btn-clear float-right" onClick={onClick}/>
        {notification}
      </div>
    </div>
  );
}
Toast.propTypes = {
  notification: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

//
// Database accessors
//

// turns google.script.run into an object with a promise api
function scriptRunPromise() {
  const gs = {};
  const ks = Object.keys(google.script.run);
  for (let i=0; i < ks.length; i++) {
    gs[ks[i]] = (function(k) {
      return function(...args) {
        return new Promise(function(resolve, reject) {
          google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)[k]
            .apply(google.script.run, args);
        });
      };
    })(ks[i]);
  }
  return gs;
}

//
// Render
//

ReactDOM.render(
  <App server={scriptRunPromise()} />,
  document.getElementById('index'));
