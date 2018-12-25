import React, {Component} from 'react';
import './App.css';
import HomePage from './HomePage'
import PersonalPage from './PersonalPage'
import ButtonAppBar from "./Navigation Bar";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

const isdebug = true


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null,
            status: 'admin',
            userInformation: {
                "displayName": "ZZsdfafX",
                "id": "ZZX",
                "roles": [
                    "USER"
                ],
                "userName": "ZZX"
            },
            alertAllFieled:false,
            snakebarContent: ' ',
        }

    }
    setSnake = (f,c) =>{
        this.setState({
            alertAllFieled:f,
            snakebarContent:c,

        })
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
                    <ButtonAppBar login={false} setToken={this.setToken} token={this.state.token} userInformation={this.state.userInformation} setSnake={this.setSnake}/>
                    <HomePage />
                    
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={this.state.alertAllFieled}
                        onClose={this.handleClose}

                    >
                        <SnackbarContent
                            style={{backgroundColor: "#ff1a24"}}
                            message={<span style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>  <ErrorIcon/>{this.state.snakebarContent}</span>}
                        >
                        </SnackbarContent>
                    </Snackbar>
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
