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
import Message from "@material-ui/icons/Message"
import Event from "@material-ui/icons/Event"
import Language from "@material-ui/icons/Language"

const information = {
    'Display Name': 'ZhanaZhaoxu',
    'Id': '123431',
    'Roles': ['fsdafs', 'fdsafds', 'safds'],
    'Bio': 'Happy days.',
    'Email': '111@111.com'
}

class Profile extends Component {

    constructor(props) {
        super(props)
        information['Display Name'] = this.props.userInformation['displayName']
        information['Id'] = this.props.userInformation['userName']
        information['Roles'] = this.props.userInformation['roles']
        this.state = {
            showContent: 'My Information',
            userInformation: this.props.userInformation,
            selectedScript: {},
            showModal: false,
            information: information

        }
    }

    handleSelectScript = (script) => {
        this.setState({
            selectedScript: script,
            showModal: true
        })
    }
    showContent = () => {
        if (this.state.showContent == 'My Information') {
            return (
                <Grid container>
                    <Grid item>
                        <Grid container>
                            <Typography>
                                {information.Id}
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Typography>
                                {information.Id}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )
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
                            <Avatar style={{
                                width: 80,
                                height: 80,
                                marginLeft: 110,
                                marginTop: 60
                            }}>{this.props.userInformation['displayName'].charAt(0)}</Avatar>
                        </Grid>
                        <Grid container style={{marginTop: 30}}>
                            <Typography style={{fontSize: 20, margin: 'auto'}}>
                                {this.props.userInformation['displayName']}
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
                            <MenuItem>
                                <ListItemIcon>
                                    <Message/>
                                </ListItemIcon>
                                <ListItemText inset primary="Messages"/>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Event/>
                                </ListItemIcon>
                                <ListItemText inset primary="Events"/>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Language/>
                                </ListItemIcon>
                                <ListItemText inset primary="Supports"/>
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
                    onClose={() => {
                        this.setState({showModal: false})
                    }}
                    style={{paddingLeft: 210, paddingTop: 40}}
                >
                    <Paper style={{width: 1000, height: 800}}>
                        <CreateScripts script={this.state.selectedScript}/>
                    </Paper>
                </Modal>
            </Grid>

        )

    }


}


export default Profile
