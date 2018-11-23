import React, { Component } from 'react';
import './App.css';
import ParentPoll from "./components/ParentPoll";
import ChildPoll from "./components/ChildPoll";
import pollInformation from './static/PollInformation';

class App extends Component {
    render() {
        const pollListing = pollInformation.polls.map((information, index) => {
            return index === 0
                ? <ParentPoll
                    key={index}
                    pollInformation={information}
                />
                : <ChildPoll
                    key={index}
                    pollInformation={information}
                />
        });

        return (
            <div className="App" >
                { pollInformation.polls.length > 0 ? pollListing : ''}
            </div>
        );
    }
}

export default App;
