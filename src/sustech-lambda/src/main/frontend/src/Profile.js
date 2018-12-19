import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ContactMail from '@material-ui/icons/ContactMail'
import App1 from './profileComponents/App1'
import './profileComponents/scss/main.scss'
import Grid from "@material-ui/core/Grid/Grid";
import ProfilePhoto from "./profileComponents/ProfilePhoto";
import Form from "./profileComponents/Form";
import Folder from "@material-ui/icons/Folder"
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ScriptList from "./ScriptList";

class Profile extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.displayName)
        this.state = {
            showContent: 'My Information',
            displayName: this.props.displayName
        }
    }


    showContent = () => {
        if (this.state.showContent == 'My Information') {
            return('aaaa')
        } else if (this.state.showContent == 'My Scripts') {
            return (
                <ScriptList/>
            )
        }

    }

    render() {
        return (
            <Grid container style={{height: 400}}>
                <Grid item>
                    <Paper style={{width: 300, marginLeft: 50, marginTop: 50, marginRight: 50, height: 500}}>
                        <Grid container>
                            <Avatar style={{width: 80, height: 80, marginLeft: 110, marginTop: 60}}>a</Avatar>
                        </Grid>
                        <Grid container style={{marginTop: 30}}>
                            <Typography style={{fontSize: 20, margin: 'auto'}}>
                                {this.props.displayName}
                            </Typography>
                        </Grid>
                        <Divider variant="middle" style={{marginTop: 40}}/>
                        <MenuList>
                            <MenuItem onClick={() => {
                                this.setState({showContent: 'My Information'})
                            }}>
                                <ListItemIcon>
                                    <ContactMail/>
                                </ListItemIcon>
                                <ListItemText inset primary="My Information"/>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                this.setState({showContent: 'My Scripts'})
                            }}>
                                <ListItemIcon>
                                    <Folder/>
                                </ListItemIcon>
                                <ListItemText inset primary="My Scripts"/>
                            </MenuItem>

                        </MenuList>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{width: 900, marginTop: 50}}>
                        {this.showContent()}
                    </Paper>
                </Grid>
            </Grid>
        )

    }


}


export default Profile
