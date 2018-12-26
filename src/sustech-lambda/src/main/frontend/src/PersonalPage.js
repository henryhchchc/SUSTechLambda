import React, {Component} from 'react';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ScriptList from "./ScriptList";
import AddIcon from '@material-ui/icons/Add';
import Profile from "./Profile";
import CreateScripts from "./CreateScripts";
import EnhancedTable from './userManagement'
import EnhancedTable2 from './scriptManagement'
import Modal from "@material-ui/core/Modal/Modal";
import Paper from "@material-ui/core/Paper/Paper";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {Container, Divider, Button, Header, Grid, Image, List, Segment} from "semantic-ui-react";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Grid2 from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {

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
        fontSize: 20,
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
const SnackBarDisplay = (props, setHandle) => {
    let color = "#8A2BE2"
    if (props.type == "Info") {
        color = "#8A2BE2"
    } else if (props.type == "Error") {
        color = "#ff1a24"
    } else if (props.type == "Success") {
        color = "#02C874"
    }
    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={props.open}
            onClick={() => {
                setHandle(props.type, props.info, false)
            }}
            onClose={() => {
                setHandle(props.type, props.info, false)
            }}
            autoHideDuration={3700}
        >
            <SnackbarContent
                style={{backgroundColor: color, fontSize: 15}}
                message={props.info}
            />
        </Snackbar>
    )
}

class PersonalPage extends Component {
    /****************************States****************************/
    constructor(props) {
        super(props)
        let label = ["My Profile", "Script List"]
        if (this.props.user == 'admin') {
            label = ['User Management', 'Script Management']
        }
        this.state = {
            token: this.props.token,
            tabValue: 0,
            label: label,
            showModal: false,
            selectedScript: {},
            sb_info: {
                type: 'default',
                info: '',
                open: false
            }
        };
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
    handleSelectScript = (script) => {
        this.setState({
            selectedScript: script,
            showModal: true
        })
    }
    setSnackBar = (type, info, open) => {
        this.setState({
            sb_info: {
                type: type,
                info: info,
                open: open
            }
        })
    }

    /****************************Show the Content****************************/
    showContent = (tabValue) => {
        if (this.props.user == 'admin') {
            if (this.state.tabValue === 0) {
                return this.showUserManagement()
            }
            if (this.state.tabValue === 1) {
                return this.showScriptManagement()
            }
        } else {
            if (this.state.tabValue === 0) {
                return this.showProfile()
            }
            if (this.state.tabValue === 1) {
                return this.showScriptList()
            }
            if (this.state.tabValue === 2) {
                return this.showForum()
            }

        }
    }
    //ScriptList
    showScriptList = () => {
        return (
            <div>
                <ScriptList token={this.props.token} type='run' setSnackBar={this.setSnackBar}/>
            </div>
        )
    }
    //Forum
    showForum = () => {
    }
    //Profile
    showProfile = () => {
        return (
            <div>
                <Profile userInformation={this.props.userInformation} token={this.props.token}
                         setSnackBar={this.setSnackBar}/>
            </div>
        )
    }
    //Create Script Button
    showButton = () => {
        if (this.props.user == 'user') {
            return (
                <Button
                    circular
                    inverted
                    style={{bottom: 30, right: 20, position: 'fixed', width: 50, height: 50}}
                    onClick={() => {
                        this.setState({showModal: true})
                    }}
                    color='blue'
                    icon='add'
                >
                </Button>
            )
        }
    }
    //UserManagement
    showUserManagement = () => {
        return (
            <EnhancedTable token={this.props.token} type='user'/>
        )
    }

    //ScriptManagement
    showScriptManagement = () => {
        return (
            <EnhancedTable2 token={this.props.token} type='user'/>

        )
    }

    /****************************Rendor****************************/
    render() {
        const {classes} = this.props;
        const {tabValue} = this.state;
        return (
            <Grid2 container style={{height: this.props.user == 'admin' ? 700 : 1600, backgroundImage: `url(${require("./image/he2.jpeg")})`,marginTop:0}}>
                <Paper style={{
                    width: 1200,
                    height: this.props.user == 'admin' ? 550 : 1000,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop:50,
                    borderRadius: '10px 10px 10px 10px'
                }}>
                    {SnackBarDisplay(this.state.sb_info, this.setSnackBar)}
                    <Tabs
                        value={tabValue}
                        onChange={this.handleTabChange}
                        classes={{root: classes.tabsRoot, indicator: classes.tabsIndicator}}
                    >
                        {this.state.label.map(
                            label =>
                                <Tab
                                    disableRipple
                                    classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                    label={label}
                                    style={{fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']}}
                                />
                        )}
                    </Tabs>
                    {this.showContent(this.state.tabValue)}
                    {this.showButton()}
                </Paper>

                <Dialog
                    open={this.state.showModal}
                    onClose={() => {
                        this.setState({showModal: false})
                    }}
                    scroll={'paper'}
                    maxWidth={'1000'}
                >
                    {/*<Paper style={{width: 1000, height: 1500}}>*/}
                    <DialogContent style={{width: 1000}}>
                        <CreateScripts id={null} token={this.props.token} mode="Editing"
                                       setSnackBar={this.setSnackBar}/>
                        {/*</Paper>*/}
                    </DialogContent>
                </Dialog>
                <Segment inverted vertical
                         style={{marginTop: this.props.user == 'admin' ? 100 : 200, width:'100%'}}>
                    <Container textAlign='center'>
                        <Grid divided inverted stackable>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Product'/>
                                <List link inverted>
                                    <List.Item as='a'>SUSTech Lamdba v1.0</List.Item>
                                    <List.Item as='a'>SUSTech Lamdba v2.0</List.Item>

                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Explore'/>
                                <List link inverted>
                                    <List.Item as='a'>SUSTech</List.Item>
                                    <List.Item as='a'>SQL Lab</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Company'/>
                                <List link inverted>
                                    <List.Item as='a'>About</List.Item>
                                    <List.Item as='a'>Customer</List.Item>
                                    <List.Item as='a'>Blog</List.Item>
                                    <List.Item as='a'>Career</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header inverted as='h4' content='Thanks for visiting our website!'/>
                                <p>
                                    Welcome to come back again!
                                </p>
                            </Grid.Column>
                        </Grid>

                        <Divider inverted section/>
                        <Image centered size='mini' src={require('./image/SUSTechLambda.png')}/>
                        <List horizontal inverted divided link size='small'>
                            <List.Item as='a' href='#'>
                                Site Map
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Contact Us
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Terms and Conditions
                            </List.Item>
                            <List.Item as='a' href='#'>
                                Privacy Policy
                            </List.Item>
                        </List>
                    </Container>
                </Segment>
            </Grid2>
        )
    }

}

PersonalPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalPage);
