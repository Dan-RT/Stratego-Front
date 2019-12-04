import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage';
import PlayersSection from './components/PlayersSection';
import Game from "./components/Game";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Route from "react-router-dom/es/Route";

class App extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        {/*<ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                        </ul>*/}

                        <hr />

                        <Route path="/" component={HomePage} />
                        <Route path="/Players" component={PlayersSection} />
                        <Route path="/Game" component={Game} />
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
