import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";

const fields = ['Username','Password']

class Login extends Component {

    state = {
        parameterValues: {},
    }
    handleParameterIn = name => event => {
        let t = this.state.parameterValues
        t[name] = event.target.value
        this.setState({
            parameterValues: t,
        })
    }
    handleSubmit = () =>{
        let parameter = this.state.parameterValues
        console.log(parameter)
        fields.map(
            item =>
            {
                console.log(item)
                if (parameter[[item]]===undefined || parameter[[item]] === ' '){
                    console.log(1)
                    return (
                        <SnackbarContent
                        variant="error"
                        message="This is an error message!"
                        />
                    )
                }
            }
        )
    }
    render() {

        return (
                <Paper style={{height: 400,width:300,marginLeft:550,marginTop:200}}>
                <form noValidate autoComplete="off">
                    {fields.map(
                        item =>
                            <Grid container>
                                <TextField
                                    required
                                    id="standard-name"
                                    label={item}
                                    onChange={this.handleParameterIn({item})}
                                    margin="normal"
                                />
                            </Grid>
                    )}
                </form>
                < button onClick={this.handleSubmit}>
                    Sign in for SUSTech Lambda
                </button>
                </Paper>
        )
    }
}

export default Login;