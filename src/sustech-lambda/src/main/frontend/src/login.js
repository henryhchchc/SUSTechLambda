import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";

import Paper from "@material-ui/core/Paper/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ErrorIcon from '@material-ui/icons/Error';
import Typography from "@material-ui/core/Typography/Typography";
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {Button} from "semantic-ui-react";

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
            showType: this.props.type,
            fields: t,
            showText: q,

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
                    console.log(123)
                    this.props.setSnake(true, 'Wrong username or password')
                } else if (response.status == 200) {
                    response.json().then(data => {
                        let url = `${apiHost}/api/identity/profile`
                        let myHeaders = new Headers();
                        myHeaders.append('Authorization', `Bearer ${data['access_token']}`)
                        fetch(url, {method: 'GET', headers: myHeaders})
                            .then(response => response.json().then(data2 => {
                                this.props.setToken(data['access_token'], data['roles'].indexOf('ADMIN') !== -1 ? 'admin' : 'user', data2)
                                this.props.handleModal()
                            }))
                    })
                    //this.props.setToken(token)
                } else if (response.status == 201) {
                    this.signIn('in')
                } else if (response.status == 409) {
                    this.props.setSnake(true, 'This id has been occupied')
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
                    this.props.setSnake(true, 'Please fill all fields')
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
                <Grid item style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <Typography style={{fontSize: 12, marginLeft: 20,marginTop:5,marginBottom:5}}>
                        Make sure it's more than 15 characters OR at least 8 characters including a number and a
                        lowercase letter.
                    </Typography>
                </Grid>
            )
        } else {
            return (
                <Grid item style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20,marginBottom:5}}>
                    <Grid container>
                        <Typography style={{fontSize: 12}}>
                            New to SUSTech Lambda?
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Typography style={{color: '#5eb85d',}}
                                    onClick={() => {
                                        this.setState({
                                            showType: 'up',
                                            fields: ['Username', 'Id', 'Password'],
                                            showText: "Sign up for SUSTech Lambda"
                                        })
                                    }}>
                            <a href='#'>Click here</a>
                        </Typography>
                    </Grid>


                </Grid>
            )
        }
    }

    /****************************Rendor****************************/
    render() {

        return (
            <Grid container style={{width: 300}}>
                <Grid container>
                    <Avatar style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 80,
                        height: 80,
                        marginTop: 3
                    }} src={require(`./image/SUSTechLambda.png`)}/>
                </Grid>
                <Grid item style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <form noValidate autoComplete="off">
                        {this.state.fields.map(
                            item => {
                                if (item == 'Password') {
                                    return (
                                        <div>
                                            <Grid container
                                                  style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 5}}>
                                                <InputLabel>
                                                    {item}
                                                </InputLabel>
                                            </Grid>
                                            <Grid container
                                                  style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 5}}>
                                                <Input
                                                    placeholder={item}
                                                    disableUnderline={true}

                                                    style={{
                                                        borderRadius: 4,
                                                        backgroundColor: '#ffffff',
                                                        border: '1px solid #ced4da',
                                                        fontSize: 16
                                                    }}
                                                    onChange={this.handleParameterIn({item})}
                                                    type='password'
                                                />
                                            </Grid>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div>
                                            <Grid container style={{marginTop: 5}}>
                                                <InputLabel>
                                                    {item}
                                                </InputLabel>
                                            </Grid>
                                            <Grid container style={{marginTop: 5}}>
                                                <Input
                                                    placeholder={item}
                                                    disableUnderline={true}
                                                    onChange={this.handleParameterIn({item})}
                                                    style={{
                                                        borderRadius: 4,
                                                        backgroundColor: '#ffffff',
                                                        border: '1px solid #ced4da',
                                                        fontSize: 16
                                                    }}
                                                />
                                            </Grid>
                                        </div>)
                                }
                            }
                        )}
                    </form>
                </Grid>
                {this.showWords()}

                {/*< Button onClick={this.handleSubmit}*/}
                         {/*style={{backgroundColor: "#5eb85d", marginTop: 15, marginRight: "auto", marginLeft: "auto"}}>*/}
                    {/*<Typography style={{color: "#ffffff"}}>*/}
                        {/*{this.state.showText}*/}
                    {/*</Typography>*/}
                {/*</Button>*/}
                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
                    {this.state.showText}
                </Button>
            </Grid>
        )
    }
}

export default Login;