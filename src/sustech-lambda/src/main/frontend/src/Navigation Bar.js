import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import AccountCircle from "@material-ui/icons/es/AccountCircle";
import ExpandMore from "@material-ui/icons/es/ExpandMore";
import Popper from "@material-ui/core/Popper/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import Menu from "@material-ui/core/Menu/Menu";

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
        this.state = {
            login: props.login,
            userName: 'aaa',
            menueListOpen: false,
            anchorEl:null
        };
    }
    state = {

    }
    handleToggle = event =>{
        this.setState({ anchorEl: event.currentTarget });
    }
    handleClose = event =>{
        this.setState({ anchorEl: null });
    }
    render() {
        if (this.state.login) {
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
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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
                                <Button variant={"outlined"} style={{borderColor: '#ffffff', marginLeft: 1130}}>
                                    <Typography style={{color: '#ffffff'}}>
                                        Login in
                                    </Typography>
                                </Button>
                                <Button variant={"outlined"} style={{borderColor: '#ffffff', marginLeft: 10}}>
                                    <Typography style={{color: '#ffffff'}}>
                                        Login in
                                    </Typography>
                                </Button>
                            </Toolbar>

                        </AppBar>
                    </MuiThemeProvider>
                </div>
            )
        }
    };
}


export default (ButtonAppBar);