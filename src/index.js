import React from 'react';
import ReactDOM from 'react-dom';
import PlayersSection from './components/PlayersSection';
import Game from "./components/Game";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/Players">Players</Link>
                            </li>
                            <li>
                                <Link to="/Game">Game</Link>
                            </li>
                        </ul>

                        <hr />

                        <Route path="/Players" component={PlayersSection} />
                        <Route path="/Game" component={Game} />
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
