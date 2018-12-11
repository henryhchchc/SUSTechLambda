import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";

import Paper from "@material-ui/core/Paper/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ErrorIcon from '@material-ui/icons/Error';


class Login extends Component {
    constructor(props) {
        super(props);
        let t = ['Username', 'Email', 'Password']
        let q = "Sing up for SUSTech Lambda"
        if (this.props.type === "in") {
            t = ['Username', 'Password']
            q = "Sing in for SUSTech Lambda"
        }
        this.state = {
            parameterValues: {},
            alertAllFieled: false,
            showType: this.props.type,
            fields: t,
            showText: q,
        }
    }

    handleParameterIn = (name) => event => {
        console.log(name.item)
        let t = this.state.parameterValues
        t[name.item] = event.target.value
        console.log(t)
        this.setState({
            parameterValues: t,
        })
    }
    handleSubmit = () => {
        let parameter = this.state.parameterValues

        this.state.fields.map(
            item => {
                // console.log(item)
                if (parameter[[item]] === undefined || parameter[[item]] === "") {

                    // console.log(parameter[[item]])
                    this.setState({
                        alertAllFieled: true,
                    })
                }
            }
        )
    }

    handleClose = () => {
        this.setState({alertAllFieled: false})
    }

    render() {
        console.log(this.state.showType)
        return (

            <Paper style={{height: 400, width: 300, marginLeft: 550, marginTop: 200}}>
                <form noValidate autoComplete="off">
                    {this.state.fields.map(
                        item => {
                            // if ((item) == 'Password'){
                            //
                            // }else{
                            if (item == 'Password') {
                                return (
                                    <Grid container>
                                        <TextField
                                            required
                                            id="standard-name"
                                            label={item}
                                            onChange={this.handleParameterIn({item})}
                                            margin="normal"
                                            type='password'
                                        />
                                    </Grid>)
                            } else {
                                return (
                                    <Grid container>
                                        <TextField
                                            required
                                            id="standard-name"
                                            label={item}
                                            onChange={this.handleParameterIn({item})}
                                            margin="normal"
                                        />
                                    </Grid>)
                            }
                        }
                    )}
                </form>
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
                        }}>  <ErrorIcon/>Please fill all fields!</span>}
                    >
                    </SnackbarContent>
                </Snackbar>
                < button onClick={this.handleSubmit}>
                    {this.state.showText}
                </button>
            </Paper>
        )
    }
}

export default Login;