import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Button,Icon,Input} from 'semantic-ui-react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import ExpandMore from "@material-ui/icons/es/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import Modal from "@material-ui/core/Modal/Modal";
import Login from "./login";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Grid from "@material-ui/core/Grid/Grid";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#101319',
        },
        secondary: {
            main: '#ffffff',
        },
    },
});
const styles = {
    root: {
        flexGrow: 1,

    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        borderColor: '#ffffff',
        marginLeft: 1160,
    },
};

class ButtonAppBar extends Component {
    constructor(props) {

        super(props);
        console.log(this.props.userInformation['displayName'])
        this.state = {
            login: this.props.login,
            userInformation: this.props.userInformation,
            displayName: this.props.userInformation['displayName'],
            menueListOpen: false,
            anchorEl: null,
            modalOpen: false,
            modalType: null,
            alertAllFieled: false,
            snakebarContent: ' ',
        };
    }

    /****************************Handlers****************************/
        //handle open menu list
    handleToggle = event => {
        this.setState({anchorEl: event.currentTarget});
    }
    //handle close the menu list
    handleClose = value => {
        this.setState({anchorEl: null});
        if (value == 'Signout') {
            this.props.setToken(null, '', {})
        }

    }
    //handle open the Sign in and Sing up modal
    handleModal = a => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            modalType: a
        })

    }
    setSnake = (f, c) => {
        this.setState({
            alertAllFieled: f,
            snakebarContent: c,

        })
    }
    showContent = () => {
        if (this.props.login) {
            return (
                <div>
                    <Grid container style={{marginTop: 20,marginLeft:window.screen.width-550}}>
                        <Button circular color='facebook' icon='facebook' />
                        <Button circular color='twitter' icon='twitter'/>
                        <Button circular color='linkedin' icon='linkedin' />
                        <Avatar style={{
                            width: 30,
                            height: 30,
                            marginLeft:30
                        }} src={require("./image/avatar.png")}
                        />
                        <Typography style={{color: '#ffffff', marginLeft: 10,marginTop:5,fontSize:14}}>
                            {this.props.userInformation['displayName']}
                        </Typography>
                        <Grid style={{marginLeft:10}}>
                        <Button
                            icon
                            inverted
                            color='black'
                            size="mini"
                            onClick={this.handleToggle}

                        >
                            <Icon name="angle down"/>
                        </Button>
                        </Grid>
                    </Grid>

                    <Menu style={{marginTop: 50}}
                          id="simple-menu"
                          anchorEl={this.state.anchorEl}
                          open={Boolean(this.state.anchorEl)}
                          onClose={this.handleClose}>
                        {/*<MenuItem onClick={()=>this.handleClose('Profile')}>Profile</MenuItem>*/}
                        {/*<MenuItem onClick={()=>this.handleClose('Account')}>My account</MenuItem>*/}
                        <MenuItem onClick={() => this.handleClose('Signout')} style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}}>Sign out</MenuItem>
                    </Menu>
                </div>
            )
        } else {
            return (
                <Grid item style={{marginLeft: window.screen.width -930, marginTop: 14}}>
                    <Grid container 
                    >
                    <Grid style={{width:300}}>
                    <Input fluid icon={{ name: 'search', circular: true, link: true }} placeholder='Search...' />
                    </Grid>
                    <Button inverted color='black'
                            onClick={() => this.handleModal("in")}
                            style={{marginLeft:20}}
                        >
                        Sign in
                    </Button>
                    <Button inverted color='black'
                            onClick={() => this.handleModal("up")}
                            style={{marginLeft:5}}>
                        {/*<Typography style={{color: '#ffffff',fontWeight:"bold"}}>*/}
                        Sign up
                        {/*</Typography>*/}
                    </Button>
                    </Grid>
                </Grid>

            )
        }
    }

    /****************************Rendor****************************/
    render() {

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <AppBar position={(this.props.login) ? 'relative' : 'fixed'}
                            style={{backgroundColor: '#101319', height: 70}}>
                        <Toolbar>
                            <Grid container style={{width: window.screen.width, height: 70}}>
                                <Grid item style={{width: 200, marginTop: 5}}>
                                    <img src={require('./image/SUSTechLambda.png')} style={{width: 60}}/>
                                </Grid>
                                {this.showContent()}
                            </Grid>
                            <Dialog
                                open={this.state.modalOpen}
                                onClose={this.handleModal}
                            >
                                <DialogContent>
                                    <Login type={this.state.modalType} setToken={this.props.setToken}
                                           handleModal={this.handleModal} setSnake={this.setSnake}/>
                                </DialogContent>
                            </Dialog>
                        </Toolbar>
                    </AppBar>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={this.state.alertAllFieled}
                        onClose={() => {
                            this.setState({alertAllFieled: false})
                        }}
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
                </MuiThemeProvider>

            </div>
        )


    }
}


export default (ButtonAppBar);