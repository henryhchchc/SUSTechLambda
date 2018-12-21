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
import CreateScripts from "./CreateScripts";
import Modal from "@material-ui/core/Modal/Modal";

class Profile extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.displayName)
        this.state = {
            showContent: 'My Information',
            displayName: this.props.displayName,
            selectedScript:{},
            showModal: false
        }
    }

    handleSelectScript = (script) =>{
        this.setState({
            selectedScript: script,
            showModal: true
        })
    }
    showContent = () => {
        if (this.state.showContent == 'My Information') {
            return('aaaa')
        } else if (this.state.showContent == 'My Scripts') {
            return (
                <ScriptList handleSelectScript={this.handleSelectScript} type='user edit' token={this.props.token}/>
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
                <Modal
                    open={this.state.showModal}
                    onClose={()=>{this.setState({showModal:false})}}
                    style={{paddingLeft:210,paddingTop:40}}
                >
                    <Paper style={{width:1000, height:800}}>
                        <CreateScripts script={this.state.selectedScript}/>
                    </Paper>
                </Modal>
            </Grid>

        )

    }


}


export default Profile
