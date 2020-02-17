import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            showErrorMsg: false
        }
    }

    decrementCounter = () => {
        const { counter } = this.state;
        if (counter) {
            this.setState({
                counter: counter - 1,
                showErrorMsg: false
            });
            return;
        }
        this.setState({ showErrorMsg: true });
    }

    render() {
        const { counter, showErrorMsg } = this.state;
        return (
            <div className="App" data-test-id='app-component-id'>
                <button data-test-id='increment-button-element-id' onClick={() => { this.setState({ counter: counter + 1 }) }}>Increment</button>
                <button data-test-id='decrement-button-element-id' onClick={() => { this.decrementCounter() }}>Decrement</button>
                <h3 data-test-id='counter-display-element-id'>The counter is: {counter}</h3>
                {showErrorMsg && <h5 data-test-id='counter-error-display-element-id'>Counter cannot be less than 0</h5>}

            </div>
        )
    }
  
}

export default App;
