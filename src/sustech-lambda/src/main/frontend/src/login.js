import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";

import Paper from "@material-ui/core/Paper/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ErrorIcon from '@material-ui/icons/Error';
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";

const isDebug = true;

const apiHost = isDebug ? "http://localhost:8080" : "";

class Login extends Component {
    constructor(props) {
        super(props);
        let t = ['Username', 'Id', 'Password']
        let q = "Sign up for SUSTech Lambda"
        if (this.props.type === "in") {
            t = ['Id', 'Password']
            q = "Sign in for SUSTech Lambda"
        }
        this.state = {
            parameterValues: {},
            alertAllFieled: false,
            showType: this.props.type,
            fields: t,
            showText: q,
            snakebarContent: '',
        }
    }

    signIn = (type) => {

        let url = ''
        let message = {}
        if (type == 'in') {
            url = `${apiHost}/api/identity/login`
            message = {
                'password': this.state.parameterValues['Password'],
                'userName': this.state.parameterValues['Id']
            }
        } else {
            url = `${apiHost}/api/users/register`
            message = {
                'password': this.state.parameterValues['Password'],
                'displayName': this.state.parameterValues['Username'],
                'userName': this.state.parameterValues['Id'],
                'roles': ['USER', 'DESIGNER']
            }
        }
        const myRequest = new Request(url, {
            method: 'POST', body: JSON.stringify(message), headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        fetch(myRequest)
            .then(response => {
                if (response.status === 401) {
                    this.setState({
                        snakebarContent: 'Wrong username or password',
                        alertAllFieled: true,

                    })
                } else if (response.status == 200) {
                    response.json().then(data => {

                        let url = `${apiHost}/api/identity/profile`
                        let myHeaders = new Headers();
                        myHeaders.append('Authorization', `Bearer ${data['access_token']}`)
                        let displayName = ''
                        fetch(url, {method: 'GET', headers: myHeaders})
                            .then(response => response.json().then(data2 => {
                                displayName = data2['displayName']
                                this.props.setToken(data['access_token'], data['roles'].indexOf('ADMIN') !== -1 ? 'admin' : 'user', displayName)
                                this.props.handleModal()
                            }))


                    })
                    //this.props.setToken(token)
                } else if (response.status == 201) {
                    this.signIn('in')
                } else if (response.status == 409) {
                    this.setState({
                        snakebarContent: 'This id has been occupied',
                        alertAllFieled: true,
                    })
                }
            })


    }


    /****************************Handlers****************************/
        //Save the input of the input fields
    handleParameterIn = (name) => event => {
        let t = this.state.parameterValues
        t[name.item] = event.target.value
        this.setState({
            parameterValues: t,
        })
    }
    //handle submit , if not fielded , show alert ***left: verification
    handleSubmit = () => {
        let parameter = this.state.parameterValues
        let verified = true
        this.state.fields.map(
            item => {
                if (parameter[[item]] === undefined || parameter[[item]] === "") {
                    verified = false
                    this.setState({
                        snakebarContent: 'Please fill all fields',
                        alertAllFieled: true,
                    })
                }
            }
        )


        if (verified) {
            if (this.state.showType == 'in') {
                this.signIn('in')
            } else if (this.state.showType == 'up') {
                this.signIn('up')
            }
        }
    }
    //handle close the alert
    handleClose = () => {
        this.setState({alertAllFieled: false})
    }
    showWords = () => {
        if (this.state.showType == 'up') {
            return (
                <Grid container>
                    <Typography style={{fontSize: 12, marginLeft: 20}}>
                        Make sure it's more than 15 characters OR at least 8 characters including a number and a
                        lowercase letter.
                    </Typography>
                </Grid>
            )
        } else {
            return (
                <Grid container>
                    <Typography style={{fontSize: 12, marginLeft: 25}} onClick={() => {
                        this.setState({showType: 'up',fields:['Username', 'Id', 'Password'],showText:"Sign up for SUSTech Lambda"})
                    }}>
                        New to SUSTech Lambda? Click here to sign up!
                    </Typography>
                </Grid>
            )
        }
    }

    /****************************Rendor****************************/
    render() {

        return (
            <Paper style={{height: 400, width: 300, marginLeft: 550, marginTop: 200}}>
                <form noValidate autoComplete="off">
                    {this.state.fields.map(
                        item => {
                            if (item == 'Password') {
                                return (
                                    <Grid container style={{marginTop: 15, marginLeft: 'auto'}}>
                                        <TextField
                                            required
                                            id="standard-name"
                                            placeholder={item}
                                            onChange={this.handleParameterIn({item})}
                                            margin="normal"
                                            type='password'
                                        />
                                    </Grid>)
                            } else {
                                return (
                                    <Grid container style={{marginTop: 15, marginLeft: 'auto'}}>
                                        <TextField
                                            required
                                            id="standard-name"
                                            placeholder={item}
                                            onChange={this.handleParameterIn({item})}
                                            margin="normal"
                                        />
                                    </Grid>)
                            }
                        }
                    )}
                </form>
                {this.showWords()}
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={this.state.alertAllFieled}
                    onClose={this.handleClose}
                    autoHideDuration={1000}
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
                < Button onClick={this.handleSubmit}
                         style={{backgroundColor: "#5eb85d", marginTop: 30, marginRight: "20%", marginLeft: "20%"}}>
                    <Typography style={{color: "#ffffff"}}>
                        {this.state.showText}
                    </Typography>
                </Button>
            </Paper>
        )
    }
}

export default Login;