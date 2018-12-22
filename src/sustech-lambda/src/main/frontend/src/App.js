import React, {Component} from 'react';
import './App.css';
import HomePage from './HomePage'
import PersonalPage from './PersonalPage'
import ButtonAppBar from "./Navigation Bar";

const isdebug = false


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null,
            status: 'admin',
            userInformation: {
                "displayName": "ZZX",
                "id": "ZZX",
                "roles": [
                    "USER"
                ],
                "userName": "ZZX"
            }
        }

    }

    setToken = (token, status, userInformation) => {
        this.setState({
            token: token,
            status: status,
            userInformation: userInformation,
        })
    }
    showMainPage = () => {
        if (this.state.token == null) {
            return (
                <HomePage setToken={this.setToken}/>
            )
        } else {
            return (
                <PersonalPage user={this.state.status} token={this.state.token} userInformation={this.state.userInformation}/>
            )
        }
    }

    render() {
        if (isdebug) {
            return (
                <div>
                    <ButtonAppBar login={true} setToken={this.setToken} token={this.state.token} userInformation={this.state.userInformation}/>
                    {/*<HomePage />*/}
                    <PersonalPage user='user' token={this.state.token} userInformation={this.state.userInformation} />
                    {/*<CreateScript/>*/}
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <ButtonAppBar login={this.state.token !== null} setToken={this.setToken}
                                  userInformation={this.state.userInformation}/>
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
