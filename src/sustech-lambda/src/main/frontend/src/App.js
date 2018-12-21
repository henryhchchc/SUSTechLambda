import React, {Component} from 'react';
import './App.css';
import HomePage from './HomePage'
import PersonalPage from './PersonalPage'
import ButtonAppBar from "./Navigation Bar";

const isdebug = true


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null,
            status: 'admin',
            displayName: 'XXX'
        }
    }

    setToken = (token, status, displayName) => {
        this.setState({
            token: token,
            status: status,
            displayName: displayName,
        })
    }
    showMainPage = () => {
        if (this.state.token == null) {
            return (
                <HomePage setToken={this.setToken}/>
            )
        } else {
            return (
                <PersonalPage user={this.state.status} token={this.state.token} displayName={this.state.displayName}/>
            )
        }
    }

    render() {
        if (isdebug) {
            return (
                <div>
                    <ButtonAppBar login={true} setToken={this.setToken} token={this.state.token} displayName={this.state.displayName}/>
                    {/*<HomePage />*/}
                    <PersonalPage user='user' token={this.state.token} />
                    {/*<CreateScript/>*/}
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <ButtonAppBar login={this.state.token !== null} setToken={this.setToken}
                                  displayName={this.state.displayName}/>
                    {this.showMainPage()}
                    {/*<ScriptList/>*/}
                    {/*<CreateScript/>*/}
                    {/*<CodeEditor/>*/}
                </React.Fragment>
            )
        }
    }
}



export default App;
