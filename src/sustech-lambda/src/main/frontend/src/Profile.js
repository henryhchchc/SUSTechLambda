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
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ScriptList from "./ScriptList";
import CreateScripts from "./CreateScripts";
import Modal from "@material-ui/core/Modal/Modal";
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
                            <Typography style={{fontSize: 22, color: "#919191"}}>
                                Personal Information
                            </Typography>
                            <IconButton component="span" style={{marginLeft: 450, color: "#38d01f"}}>
                                <PhotoCamera/>
                            </IconButton>
                        </Grid>
                        <Grid container style={{paddingTop: 70}}>
                            <Grid item style={{width: 250}}>
                                <Typography style={{paddingLeft: 120}}>
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
                                <Typography style={{paddingLeft: 120}}>
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
                                        width: 450
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{paddingTop: 40}}>
                            <Grid item style={{width: 250}}>
                                <Typography style={{paddingLeft: 120}}>
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
                                        fontSize: 16, width: 450
                                    }}
                                />
                            </Grid>
                            <Grid container style={{paddingTop: 40}}>
                                <Grid item style={{width: 250}}>
                                    <Typography style={{paddingLeft: 120}}>
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
                                            fontSize: 16, width: 450
                                        }}
                                    />
                                </Grid>
                                <Grid container style={{paddingTop: 40}}>
                                    <Grid item style={{width: 250}}>
                                        <Typography style={{paddingLeft: 120}}>
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
                                                fontSize: 16, width: 450
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
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
                            <Typography style={{fontSize: 23, margin: 'auto', fontWeight: 'bold'}}>
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
                                <Typography style={{fontSize: 14, color: "#919191"}}>
                                    My Information
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                this.setState({showContent: 'My Scripts'})
                            }}>
                                <ListItemIcon>
                                    <Folder/>
                                </ListItemIcon>
                                <Typography style={{fontSize: 14, color: "#919191"}}>
                                    My Scripts
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                this.setState({showContent: 'Running History'})
                            }}>
                                <ListItemIcon>
                                    <History/>
                                </ListItemIcon>
                                <Typography style={{fontSize: 14, color: "#919191"}}>
                                    Running History
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Badge color="primary" badgeContent={4} invisible={false}>
                                        <Message/>
                                    </Badge>
                                </ListItemIcon>
                                <Typography style={{fontSize: 14, color: "#919191"}}>
                                    Messages
                                </Typography>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <Event/>
                                </ListItemIcon>
                                <Typography style={{fontSize: 14, color: "#919191"}}>
                                    Events
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Language/>
                                </ListItemIcon>
                                <Typography style={{fontSize: 14, color: "#919191"}}>
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
                        <CreateScripts id={this.state.selectedScript['id']} mode="Editing"/>
                    </DialogContent>
                </Dialog>
            </Grid>

        )

    }


}


export default Profile
