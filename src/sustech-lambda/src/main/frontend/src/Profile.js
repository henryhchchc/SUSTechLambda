import React, {Component} from 'react';
import ContactMail from '@material-ui/icons/ContactMail'
import Grid from "@material-ui/core/Grid/Grid";
import Folder from "@material-ui/icons/Folder"
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ScriptList from "./ScriptList";
import CreateScripts from "./CreateScripts";
import Message from "@material-ui/icons/Message"
import Event from "@material-ui/icons/Event"
import Language from "@material-ui/icons/Language"
import Input from '@material-ui/core/Input';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import History from "@material-ui/icons/History"
import Badge from "@material-ui/core/Badge/Badge";
import {Button} from "semantic-ui-react";

const information = {
    'Display Name': 'ZhanaZhaoxu',
    'Id': '123431',
    'Roles': ['fsdafs', 'fdsafds', 'safds'],
    'Bio': 'Happy days.',
    'Email': '111@111.com'
}
const containerStyle = {}

class Profile extends Component {

    constructor(props) {
        super(props)
        information['Display Name'] = this.props.userInformation['displayName']
        information['Id'] = this.props.userInformation['userName']
        information['Roles'] = this.props.userInformation['roles']
        this.state = {
            showContent: 'My Information',
            userInformation: this.props.userInformation,
            selectedScript: {id: null},
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
                        <Grid container style={{marginTop: 50, marginLeft: 100}}>
                            <Typography style={{
                                fontSize: 22,
                                color: "#919191",
                                fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                            }}>
                                Personal Information
                            </Typography>
                            <Grid item style={{marginLeft: 380}}>
                                <Button circular size='large' icon='camera' color='blue'/>
                            </Grid>
                        </Grid>
                        <Grid container style={{paddingTop: 70}}>
                            <Grid item style={{width: 250}}>
                                <Typography
                                    style={{paddingLeft: 120, fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']}}>
                                    Id
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    id="bootstrap-input"
                                    disableUnderline={true}
                                    defaultValue={information.Id}
                                    style={{
                                        borderRadius: 4,
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ced4da',
                                        fontSize: 16, width: 450
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{paddingTop: 40}}>
                            <Grid item style={{width: 250}}>
                                <Typography
                                    style={{paddingLeft: 120, fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']}}>
                                    Display Name
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    id="bootstrap-input"
                                    disableUnderline={true}
                                    defaultValue={information['Display Name']}
                                    style={{
                                        borderRadius: 4,
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ced4da',
                                        fontSize: 16,
                                        width: 450,
                                        fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{paddingTop: 40}}>
                            <Grid item style={{width: 250}}>
                                <Typography
                                    style={{paddingLeft: 120, fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']}}>
                                    Roles
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    id="bootstrap-input"
                                    disableUnderline={true}
                                    defaultValue={information['Roles']}
                                    style={{
                                        borderRadius: 4,
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ced4da',
                                        fontSize: 16, width: 450, fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{paddingTop: 40}}>
                            <Grid item style={{width: 250}}>
                                <Typography style={{
                                    paddingLeft: 120,
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                }}>
                                    Bio
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    id="bootstrap-input"
                                    disableUnderline={true}
                                    defaultValue={information['Bio']}
                                    style={{
                                        borderRadius: 4,
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ced4da',
                                        fontSize: 16,
                                        width: 450,
                                        fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{paddingTop: 40}}>
                            <Grid item style={{width: 250}}>
                                <Typography style={{
                                    paddingLeft: 120,
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                }}>
                                    Email
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Input
                                    id="bootstrap-input"
                                    disableUnderline={true}
                                    defaultValue={information['Email']}
                                    style={{
                                        borderRadius: 4,
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ced4da',
                                        fontSize: 16,
                                        width: 450,
                                        fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{paddingTop: 120,paddingLeft: 580}}>
                            <Button.Group>
                                <Button>Cancel</Button>
                                <Button.Or/>
                                <Button positive>Save</Button>
                            </Button.Group>
                        </Grid>
                    </Grid>
                </Grid>
            )
        } else if (this.state.showContent == 'My Scripts') {
            return (
                <ScriptList handleSelectScript={this.handleSelectScript} type={'user edit'} token={this.props.token}/>
            )
        } else if (this.state.showContent == 'Running History') {
            return (
                <ScriptList handleSelectScript={this.handleSelectScript} type={'user history'}
                            token={this.props.token}/>
            )
        }
    }

    render() {
        return (
            <Grid container style={{height: 400}}>
                <Grid item>
                    <Paper style={{width: 300, marginLeft: 50, marginTop: 50, marginRight: 50, height: 700}}>
                        <Grid container>
                            <Avatar style={{
                                width: 80,
                                height: 80,
                                marginLeft: 110,
                                marginTop: 60,
                                borderStyle: 'solid', borderWidth: 3, borderColor: "#919191"
                            }} src={require("./image/avatar.png")}
                            />
                        </Grid>
                        <Grid container style={{marginTop: 30}}>
                            <Typography style={{
                                fontSize: 23,
                                margin: 'auto',
                                fontWeight: 'bold',
                                fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                            }}>
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
                                <Typography style={{
                                    fontSize: 14,
                                    color: "#919191",
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                }}>
                                    My Information
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                this.setState({
                                    showContent: 'My Scripts',
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                })
                            }}>
                                <ListItemIcon>
                                    <Folder/>
                                </ListItemIcon>
                                <Typography style={{
                                    fontSize: 14,
                                    color: "#919191",
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                }}>
                                    My Scripts
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                this.setState({showContent: 'Running History'})
                            }}>
                                <ListItemIcon>
                                    <History/>
                                </ListItemIcon>
                                <Typography style={{
                                    fontSize: 14,
                                    color: "#919191",
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                }}>
                                    Running History
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Badge color="secondary" badgeContent={4} invisible={false}>
                                        <Message/>
                                    </Badge>
                                </ListItemIcon>
                                <Typography style={{
                                    fontSize: 14,
                                    color: "#919191",
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                }}>
                                    Messages
                                </Typography>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <Event/>
                                </ListItemIcon>
                                <Typography style={{
                                    fontSize: 14,
                                    color: "#919191",
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                }}>
                                    Events
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Language/>
                                </ListItemIcon>
                                <Typography style={{
                                    fontSize: 14,
                                    color: "#919191",
                                    fontFamily: ['Comic Sans MS', 'cursive', 'sans-serif']
                                }}>
                                    Supports
                                </Typography>
                            </MenuItem>

                        </MenuList>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{width: 900, marginTop: 50, height: 800}}>
                        {this.showContent()}
                    </Paper>
                </Grid>
                <Dialog
                    open={this.state.showModal}
                    onClose={() => {
                        this.setState({showModal: false})
                    }}
                    scroll={'paper'}
                    maxWidth={'1000'}
                >
                    <DialogContent style={{width: 1000}}>
                        <CreateScripts id={this.state.selectedScript['id']} mode="Editing" token={this.props.token}/>
                    </DialogContent>
                </Dialog>
            </Grid>

        )

    }


}


export default Profile
