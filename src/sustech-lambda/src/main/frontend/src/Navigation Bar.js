import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import AccountCircle from "@material-ui/icons/es/AccountCircle";
import ExpandMore from "@material-ui/icons/es/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import Modal from "@material-ui/core/Modal/Modal";
import Login from "./login";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#212121',
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
        console.log(this.props.login)
        this.state = {
            login: this.props.login,
            userName: 'aaa',
            menueListOpen: false,
            anchorEl:null,
            modalOpen: false,
            modalType: null,
        };
    }
    /****************************Handlers****************************/
    //handle open menu list
    handleToggle = event =>{
        this.setState({ anchorEl: event.currentTarget });
    }
    //handle close the menu list
    handleClose = value =>{
        this.setState({ anchorEl: null });
        if(value=='Profile'){

        }else if(value== 'Account'){

        }else if(value=='Signout') {
            this.props.setToken(null)
        }

    }
    //handle open the Sign in and Sing up modal
    handleModal = a =>{
        this.setState({modalOpen: !this.state.modalOpen,
                        modalType: a})

    }
    /****************************Rendor****************************/
    render() {
        if (this.props.login) {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <AppBar position='absolute' color='primary'>
                            <Toolbar >
                                <icon>Lambda</icon>
                                <Button style={{marginLeft:1230}}
                                        aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleToggle}>
                                    <AccountCircle fontSize="large" color='secondary'/>
                                    <Typography style={{color: '#ffffff'}}>
                                        {this.state.userName}
                                    </Typography>
                                    <ExpandMore fontSize="small" color='secondary' />
                                </Button>
                                <Menu style={{marginTop:48}}
                                      id="simple-menu"
                                      anchorEl={this.state.anchorEl}
                                      open={Boolean(this.state.anchorEl)}
                                      onClose={this.handleClose}>
                                    {/*<MenuItem onClick={()=>this.handleClose('Profile')}>Profile</MenuItem>*/}
                                    {/*<MenuItem onClick={()=>this.handleClose('Account')}>My account</MenuItem>*/}
                                    <MenuItem onClick={()=>this.handleClose('Signout')}>Sign out</MenuItem>
                                </Menu>
                            </Toolbar>
                        </AppBar>
                    </MuiThemeProvider>

                </div>
            )
        } else {
            return (
                <div>
                    <MuiThemeProvider theme={theme}>
                        <AppBar position='fixed' color='primary'>
                            <Toolbar>
                                <icon>Lambda</icon>
                                <Button variant={"outlined"} style={{borderColor: '#ffffff', marginLeft: 1130}} onClick={()=>this.handleModal("in")}>
                                    <Typography style={{color: '#ffffff'}}>
                                        Sign in
                                    </Typography>
                                </Button>
                                <Button variant={"outlined"} style={{borderColor: '#ffffff', marginLeft: 10}} onClick={()=>this.handleModal("up")}>
                                    <Typography style={{color: '#ffffff'}}>
                                        Sign up
                                    </Typography>
                                </Button>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.modalOpen}
                                    onClose={this.handleModal}
                                >
                                    <Login type = {this.state.modalType} setToken={this.props.setToken} handleModal={this.handleModal}/>

                                </Modal>
                            </Toolbar>

                        </AppBar>
                    </MuiThemeProvider>
                </div>
            )
        }
    };
}


export default (ButtonAppBar);