import React from 'react';
import createHistory from 'history/createBrowserHistory';

const Match=({ pattern, component: Component }) => {
  const pathname=location.pathname;
  if (pathname.match(pattern)) {
    return(
      <Component />
    );
  } else {
    return null;
  }
};
Match.contextTypes={
  location: React.PropTypes.object,
};

const Link=({ to, children }, { history }) => (
  <a
    onClick={(e) => {e.preventDefault();history.push(to);}} href={to}
    > {children}
  </a>
);
Link.contextTypes={
  history: React.PropTypes.object,
};

class Router extends React.Component {

  static childContextTypes = {
    history: React.PropTypes.Object,
    location: React.PropTypes.Object,
  };

  constructor(props) {
    super(props);

    this.history=createHistory();
    this.history.listen(() => this.forceUpdate());
  }
  getChildContext() {
    return {
      history: this.history,
      location: window.location,
    };
  }
  render() {
    return this.props.children;
  }
}

const App=() => (
  <Router>
    <div
      className='ui text container'
    >
      <h2 className='ui dividing header'>
        Which body of water?
      </h2>

      <ul>
        <li>
          <Link to='/atlantic'>
            <code>/atlantic</code>
          </Link>
        </li>
        <li>
          <Link to='/pacific'>
            <code>/pacific</code>
          </Link>
        </li>
      </ul>

      <hr />
      <Match pattern='/atlantic' component={Atlantic} />
      <Match pattern='/pacific' component={Pacific} />
      {/* We'll insert the Match components here */}
    </div>
  </Router>
);



const Atlantic=() => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
    </p>
  </div>
);

const Pacific=() => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);

export default App;
