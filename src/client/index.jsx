import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//
// Components
//

function App() {
  return (
    <div>
      <Navbar/>
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

function TweetCollection() {
  return (
    <div>
      <Tweet id='1140550654378692608' />
    </div>
  );
}

function Tweet({id}) {
  return (
    <div>[tweet { id }]</div>
  );
}
Tweet.propTypes = {
  id: PropTypes.string.isRequired,
};

//
// Render
//

ReactDOM.render(<App />, document.getElementById('index'));
