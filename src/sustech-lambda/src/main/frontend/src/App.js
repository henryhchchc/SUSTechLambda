import React, {Component} from 'react';
import './App.css';
import HomePage from './HomePage'
import  PersonalPage from './PersonalPage'
import ScriptList from './ScriptList'
import CreateScript from './createScript'
import ButtonAppBar from "./Navigation Bar";

const isdebug = true

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            token:null,
            status: 'admin'
        }
    }
    setToken = (token) => {
        this.setState({
            token: token,
            status: 'admin'
        })
    }
    showMainPage = () =>{
        if(this.state.token == null){
            return(
                <HomePage setToken={this.setToken}/>
            )
        }else{
            return(
                <PersonalPage user = {this.state.status} token={this.state.token} />
            )
        }
    }

    render() {
        if (isdebug){
            return(
                <div>
                    <ButtonAppBar login={false} setToken={this.setToken} token={this.state.token}/>
                    {/*<HomePage />*/}
                    <PersonalPage user = 'user' token={this.state.token}/>
                    {/*<CreateScript/>*/}
                </div>
            )
        }else {
            return (
                <React.Fragment>
                    <ButtonAppBar login={this.state.token !== null} setToken={this.setToken}/>
                    {this.showMainPage()}
                    {/*<ScriptList/>*/}
                    {/*<CreateScript/>*/}
                    {/*<CodeEditor/>*/}

                </React.Fragment>
            );
        }
    }
}

export default App;
