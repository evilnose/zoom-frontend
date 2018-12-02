import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import './bootswatch.css';
import Dashboard from "./Dashboard";
import {Container} from "reactstrap";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false,
        };
    }

    render() {
        if (!this.state.verified)
            return (
                <div>
                    <span className="huge-title">Zoom: take attendance with ease</span>
                    <div className="outer">
                        <div className="middle">
                            <div className="inner">
                                <input type="text"
                                       ref={(input) => {
                                           this.codeInput = input;
                                       }}
                                       onKeyPress={this.enterCode.bind(this)}
                                       placeholder="Enter class code..."
                                       id="classCode" className="big-input"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        return (
            <Container>
                <Dashboard/>
            </Container>);
    }

    enterCode(e) {
        if (e.key === 'Enter')
            this.setState({verified: true});
    }

    componentDidMount() {
        this.codeInput.focus();
    }
}

export default App;
