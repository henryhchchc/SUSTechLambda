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
import CreateScripts from "./CreateScripts";

const isDebug = true;

const apiHost = isDebug ? "http://localhost:8080" : "";

class ScriptList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scripts: [],
            content: {id:null},
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
        //TODO open it when the create script api is usable
        let url = ''
        if (this.props.type == 'run' || this.props.type == 'admin edit') {
            url = `${apiHost}/api/scripts?page_idx=0&page_size=100`
            const myRequest = new Request(url, {
                method: 'GET', headers: {
                    'Authorization': `Bearer ${this.props.token}`
                }
            });
            fetch(myRequest)
                .then(response => response.json().then(prs => {
                        this.setState({scripts: prs.content,content:prs.content[0]})
                    }
                ));
        } else if (this.props.type == 'user edit' || this.props.type == 'user history') {
            if (this.props.type == 'user edit') {
                url = `${apiHost}/api/scripts/mine`
            } else {
                url = `${apiHost}/api/tasks/mine`
            }
            const myRequest = new Request(url, {
                method: 'GET', headers: {
                    'Authorization': `Bearer ${this.props.token}`
                }
            });
            fetch(myRequest)
                .then(response => response.json().then(prs => {
                        this.setState({scripts: prs})
                    }
                ));

        }


    }

    selectPr = (pr, index) => {
        if (this.props.type == 'run') {
            this.setState({
                content: pr,
            });
        } else {
            this.props.handleSelectScript(pr)
        }
    }

    showScriptList = () => {
        return (
            <List>
                {
                    this.state.scripts.map((pr, index) =>
                        <ListItem button key={pr.name} onClick={() =>this.selectPr(pr, index)}>
                            <ListItemText primary={pr.name} secondary={pr.description}/>
                        </ListItem>
                    )
                }
            </List>
        )
    }
    showRunScript = () => {
        console.log(this.state.content)
        return (
            <CreateScripts mode="Running" id = {this.state.content['id']}/>
        )
    }

    render() {
        if (this.props.type == 'run') {
            return (
                <div>
                    <Grid container style={{height: 600}}>
                        <Grid item>
                            <Paper style={{height: 1000, marginLeft: 25, marginTop: 20, width: 550}}>
                                {this.showScriptList()}
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper style={{height:1000, marginLeft: 30, marginTop: 20, width: 800}}>
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