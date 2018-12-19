import React, {Component} from 'react';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";

const isDebug = true;

const apiHost = isDebug ? "http://localhost:8080" : "";

class ScriptList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scripts: [{
                "content": {
                    "code": "\n" +
                        "import multiprocessing as mp\n" +
                        "import time\n" +
                        "import sys\n" +
                        "import numpy as np",
                    "language": "Python",
                    "parameters": [
                        {
                            "name": "P1",
                            "type": "STRING"
                        },
                        {
                            "name": "P2",
                            "type": "INT"
                        }
                    ]
                },
                "description": "This is a test example",
                "name": "Hello World"
            }],
            content: null,
            parameterValues: {},
            snakebarContent: '',
            alertAllFieled: false
        };
    }

    setScriptValue = (pr, index) => {
        let parameterValues = {}
        pr['content']['parameters'].map(
            item => parameterValues[item['name']] = ''
        )
        this.setState({
            content: pr,
            contentType: 'Script',
            parameterValues: parameterValues
        })
    }

    componentDidMount() {
        let url = ''
        if(this.props.type=='run') {
            url = `${apiHost}/api/scripts?page_idx=0&page_size=100`
        }else{
            url = `${apiHost}/api/scripts/mine`
        }

        const myRequest = new Request(url, {
            method: 'GET', headers: {
                'Authorization': `Bearer ${this.props.token}`
            }
        });

        fetch(myRequest)
            .then(res => res.json())
            .then(prs => {
                this.setState({scripts: prs.content})
            });
    }

    selectPr = (pr, index) => {
        this.setState({
            content: pr,
        });
    }
    handleParameterIn = name => event => {
        let t = this.state.parameterValues
        t[name] = event.target.value
        this.setState({
            parameterValues: t,
        })
    }

    handleRunScript = () => {
        let parameter = this.state.parameterValues
        let verified = true
        this.state.content['content']['parameters'].map(
            item => {
                if (parameter[item['name']] === undefined || parameter[item['name']] === "") {
                    // console.log(parameter[[item]])
                    verified = false
                    this.setState({
                        snakebarContent: 'Please fill all required parameter',
                        alertAllFieled: true,
                    })
                } else {
                    if (!this.verifyType(typeof(parameter[item['name']]), item['type'])) {
                        verified = false
                    }
                }

            }
        )
        if (verified) {
            //TODO post parameter to server to run
        }
    }

    verifyType = (type1, type2) => {
        if ((type2 == 'STRING' && type1 == 'string') || (type2 == 'NUMBER' && type1 == 'number')) {
            return true
        }
        return false
    }
    showScriptList = () => {
        return (
            <List >
                {
                    this.state.scripts.map((pr, index) =>
                        <ListItem button key={pr.name} onClick={() => this.selectPr(pr, index)}>
                            <ListItemText primary={pr.name} secondary={pr.description}/>
                        </ListItem>
                    )
                }
            </List>
        )
    }
    showRunScript = () => {
        let title = 'name'
        let code = 'XXXXaaaa'
        let parameter = []
        let language = 'XXX'
        if (this.state.content != null) {
            title = this.state.content['name']
            code = this.state.content['content']['code']
            parameter = this.state.content['content']['parameters']
            language = this.state.content['content']['language']
        }

        return (
            <div>
                <Typography style={{fontSize: 25, fontFamily: 'courier', paddingLeft: 30, paddingTop: 30}}>
                    {title}
                </Typography>
                <Paper style={{marginLeft: 20, marginRight: 20}}>
                    <SyntaxHighlighter
                        language={language}
                    >
                        {code}
                    </SyntaxHighlighter>

                </Paper>
                <Paper style={{marginLeft: 20, marginRight: 20}}>
                    <form noValidate autoComplete="off" style={{marginLeft: 0}}>
                        {parameter.map(
                            item =>
                                <Grid container style={{marginTop: 1}}>
                                    <TextField
                                        id="standard-name"
                                        label={item['name']}
                                        placeholder={item['type']}
                                        onChange={this.handleParameterIn(item['name'])}
                                        style={{margin: 8}}
                                        InputLabelProps={{
                                            shrink: true,
                                            style: {marginTop: 4}
                                        }}
                                    />
                                </Grid>
                        )}
                    </form>
                </Paper>
                <Button variant="contained" style={{marginTop: 20, marginLeft: 20}}
                        onClick={() => this.handleRunScript()}>
                    Run
                </Button>
                <Paper style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
                    <Typography>
                        OutPut
                    </Typography>
                </Paper>
            </div>
        )
    }

    render() {
        if (this.props.type == 'run') {
            return (
                <div>
                    <Grid container style={{height: 600}}>
                        <Grid item>
                            <Paper style={{height: 600, marginLeft: 25, marginTop: 20,width:550}}>
                                {this.showScriptList()}
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper style={{height: 600, marginLeft: 30, marginTop: 20, width: 800}}>
                                {this.showRunScript()}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={this.state.alertAllFieled}
                        onClose={() => {
                            this.setState({alertAllFieled: false})
                        }}
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


            );
        }
        else {
            return (
                this.showScriptList()
            )
        }
    }


}

export default ScriptList