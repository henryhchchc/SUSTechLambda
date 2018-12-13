import React, {Component} from 'react';
import ButtonAppBar from "./Navigation Bar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import ScriptList from "./ScriptList";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add';
import Profile from "./Profile";
import Login from "./login";
import Modal from "@material-ui/core/Modal/Modal";
import CreateScripts from './createScript'
import Button from "@material-ui/core/Button/Button";
import EnhancedTable from './userManagement'
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        marginTop: 80,
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#111111',
    },
    tabRoot: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#9e9e9e',
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: 15,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#111111',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#111111',
            fontWeight: 'bold',
        },
        '&:focus': {
            color: '#111111',
        },
    },
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

class PersonalPage extends Component {
    /****************************States****************************/
    constructor(props) {
        super(props);
        let labels = ["My Profile", "Script List", "Forum"]
        if(this.props.identity === 'admin'){
            labels = ["My Profile", "User Management","Script Management"]
        }
        this.state = {
            tabValue: 100,
            content: null,
            contentType: null,
            parameterValues: {},
            modalOpen: false,
            identity: props.identity,
            label: labels
        }
    }



    /****************************Handlers****************************/
    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };
    toggleDrawer = (open) => {
        this.setState({
            tabValue: 100,
        });
    };
    setScriptValue = (pr, index) => {
        let parameterValues = {}
        pr['parameter'].map(
            item => parameterValues[item] = ''
        )
        this.setState({
            content: pr,
            contentType: 'Script',
            parameterValues: parameterValues
        })
    }
    handleParameterIn = name => event => {
        let t = this.state.parameterValues
        t[name] = event.target.value
        this.setState({
            parameterValues: t,
        })
    }
    handleModal = () =>{
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    /****************************Show the Content****************************/
    showContent = (tabValue) => {
        if(this.state.identity === 'user'){
            if (this.state.tabValue === 0) {
                return this.showProfile()
            }
            if (this.state.tabValue === 1) {
                return this.showScriptList()
            }
            if (this.state.tabValue === 2) {
                return this.showForum()
            }
        }else{
            if (this.state.tabValue === 0) {
                return this.showProfile()
            }
            if (this.state.tabValue === 1) {
                return this.showUserManagement()
            }
            if (this.state.tabValue === 2) {
                return this.showScriptManagement()
            }
        }
    }

    //ScriptList
    showScriptList = () => {
        let title = 'Title'
        let code = 'XXXX'
        let parameter = []
        if (this.state.contentType != null) {
            title = this.state.content['title']
            code = this.state.content['code']
            parameter = this.state.content['parameter']
        }
        return (
            <Grid container>
                <Grid item>
                    <ScriptList setScriptValue={this.setScriptValue}/>
                </Grid>
                <Grid item>
                    <Typography>
                        {title}
                    </Typography>
                    <Paper style={{width: window.screen.availWidth - 500}}>
                        {code}
                    </Paper>
                    <form noValidate autoComplete="off">
                        {parameter.map(
                            item =>
                                <Grid container>
                                    <TextField
                                        id="standard-name"
                                        label={item}
                                        onChange={this.handleParameterIn({item})}
                                        margin="normal"
                                    />
                                </Grid>
                        )}
                    </form>
                    <button>
                        Run
                    </button>
                    <Paper style={{width: window.screen.availWidth - 500}}>
                        <Typography>
                            OutPut
                        </Typography>P
                    </Paper>
                    <Button color="primary"  variant="fab"  onClick={()=>this.handleModal()}>
                        <AddIcon />
                    </Button>
                    <Modal
                        open={this.state.modalOpen}
                        onClose={this.handleModal}
                    >
                        <Paper>
                            <CreateScripts />
                        </Paper>
                    </Modal>
                </Grid>
            </Grid>
        )
    }

    //Forum
    showForum = () => {

    }
    //Profile
    showProfile = () => {
        return(<Profile/>)
    }
    showUserManagement = () =>{
        return(<EnhancedTable/>)
    }
    showScriptManagement = () =>{

    }
    /****************************Rendor****************************/
    render() {

        let {classes} = this.props
        return (
            <div>
                <ButtonAppBar login={true}/>
                <Tabs
                    value= {this.state.tabValue}
                    onChange={this.handleTabChange}
                    classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
                >
                    {this.state.label.map(
                        label =>
                            <Tab
                                disableRipple
                                classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                label={label}
                            />
                    )}
                </Tabs>
                {this.showContent(this.state.tabValue)}

            </div>
        )
    }

}

PersonalPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalPage);
