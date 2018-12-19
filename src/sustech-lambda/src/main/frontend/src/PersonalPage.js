import React, {Component} from 'react';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ScriptList from "./ScriptList";
import AddIcon from '@material-ui/icons/Add';
import Profile from "./Profile";
import Button from "@material-ui/core/Button/Button";
import CreateScripts from "./CreateScripts";
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
        super(props)
        let label = ["My Profile", "Script List"]
        if (this.props.user == 'admin') {
            label = ['User Management', 'Script Management']
        }
        this.state = {
            token: this.props.token,
            tabValue: 0,
            label: label,
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
            if (this.state.tabValue === 3) {
                return this.showCreateScript()
            }
        }
    }

    //ScriptList
    showScriptList = () => {
        return (
            <div>
                <ScriptList token={this.state.token}/>
                <Button
                    variant="fab"

                    style={{bottom: 20, right: 20, position: 'fixed', backgroundColor: "#2b2b2b"}}
                    onClick={() => {
                        this.setState({tabValue: 3})
                    }}
                >
                    <AddIcon/>
                </Button>
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
                <Profile/>
            </div>
        )
    }

    //createScript
    showCreateScript = () => {
        return (<CreateScripts/>)
    }

    //UserManagement
    showUserManagement = () => {
        return (
            <EnhancedTable token={this.props.token}/>
        )
    }

    //ScriptManagement
    showScriptManagement = () => {

    }

    /****************************Rendor****************************/
    render() {
        const {classes} = this.props;
        const {tabValue} = this.state;
        return (
            <div>
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
