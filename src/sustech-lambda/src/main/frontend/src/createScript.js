import React, {Component} from 'react';
import ButtonAppBar from "./Navigation Bar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Profile from "./Profile";
import ScriptList from "./ScriptList";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";

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
        color: '#9e9e9e',
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightMedium,
        fontSize:15,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            // '-apple-system',
            // 'BlinkMacSystemFont',
            // '"Segoe UI"',
            // 'Roboto',
            // '"Helvetica Neue"',
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
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

class CreateScripts extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
        <div>
        <ButtonAppBar login={true}/>
    </div>)
    }
}

export default CreateScripts