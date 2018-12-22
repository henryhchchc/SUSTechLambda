import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
        this.state = {
            login: this.props.login,
            userInformation: this.props.userInformation,
            menueListOpen: false,
            anchorEl: null,
            modalOpen: false,
            modalType: null,
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
            this.props.setToken(null)
        }

    }
    //handle open the Sign in and Sing up modal
    handleModal = a => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            modalType: a
        })

    }
    showContent = () =>{
        if(this.props.login){
            return(
                <Grid style={{marginLeft:window.screen.width-380,marginTop:14}}>
                    <Button
                            aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleToggle}>
                        <Avatar style={{
                            width: 25,
                            height: 25
                        }}>{this.props.userInformation.displayName.charAt(0)}</Avatar>
                        <Typography style={{color: '#ffffff',marginLeft:5}}>
                            {this.props.userInformation.displayName}
                        </Typography>
                        <ExpandMore fontSize="small" color='secondary'/>
                    </Button>
                    <Menu style={{marginTop: 50}}
                          id="simple-menu"
                          anchorEl={this.state.anchorEl}
                          open={Boolean(this.state.anchorEl)}
                          onClose={this.handleClose}>
                        {/*<MenuItem onClick={()=>this.handleClose('Profile')}>Profile</MenuItem>*/}
                        {/*<MenuItem onClick={()=>this.handleClose('Account')}>My account</MenuItem>*/}
                        <MenuItem onClick={() => this.handleClose('Signout')}>Sign out</MenuItem>
                    </Menu>
                </Grid>
            )
        }else{
            return(
                    <Grid style={{marginLeft:window.screen.width-450,marginTop:14}}>
                        <Button variant={"outlined"} style={{borderColor: '#ffffff'}}
                                onClick={() => this.handleModal("in")}>
                            <Typography style={{color: '#ffffff'}}>
                                Sign in
                            </Typography>
                        </Button>
                        <Button variant={"outlined"} style={{borderColor: '#ffffff',marginLeft:10}}
                                onClick={() => this.handleModal("up")} >
                            <Typography style={{color: '#ffffff'}}>
                                Sign up
                            </Typography>
                        </Button>
                    </Grid>

            )
        }
    }

    /****************************Rendor****************************/
    render() {

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <AppBar position={(this.props.login)?'relative':'fixed'} style={{backgroundColor: '#101319', height: 70}}>
                        <Toolbar >
                            <Grid container style={{height: 70}}>
                                <Grid item style={{width: 200 , marginTop:10}}>
                                    <icon>
                                        <Typography style={{fontSize: 35, color: '#ffffff'}}>
                                            Lambda
                                        </Typography>
                                    </icon>
                                </Grid>
                                {this.showContent()}
                            </Grid>
                            <Dialog
                                open={this.state.modalOpen}
                                onClose={this.handleModal}
                            >
                                <DialogContent>
                                    <Login type={this.state.modalType} setToken={this.props.setToken}
                                           handleModal={this.handleModal}/>
                                </DialogContent>
                            </Dialog>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>

            </div>
        )


    }
}


export default (ButtonAppBar);