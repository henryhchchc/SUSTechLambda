import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Fade from "@material-ui/core/Fade/Fade";
import {ControlBar, Player} from 'video-react';
import "video-react/dist/video-react.css";
import { Button } from 'semantic-ui-react'
import Login from "./login";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

const allmember = [
    {
        name: 'Zhu Hengcheng',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    },
    {
        name: 'Zhang Zhaoxu',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    },
    {
        name: 'Wang Yutong',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    },
    {
        name: 'Zhang Siyu',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    },
    {
        name: 'He Haibin',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    }
]
const style = {
    Paper: {
        backgroundImage: `url(${require("./image/he.jpg")})`,
        height: 1700,
        backgroundSize: 'cover'
    },
    button: {
        marginLeft: document.body.clientWidth / 2 - 40,
    },
    caption: {
        margin: 200,
        fontFamily: 'Arial',
        fontSize: 100,
        color: '#ffffff'
    },
    grid1: {
        height: 500,
        margin: "auto",
    },
    bootstrapRoot: {
        marginLeft: window.screen.availWidth / 2 - 90,
        width: 200,
        height: 60,

        backgroundColor: "#000a12",
        borderColor: '#000a12',
        borderRadius: '30px 30px 30px 30px',
        // '&:hover': {
        //     backgroundColor: "#000a12",
        //     borderColor: '#0062cc',
        // ,
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#ffffff',

        }
        // '&:focus': {
        //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        // },
    }
}

class HomePage extends Component {
    state = {
        open: false,
        alertAllFieled:false,
        snakebarContent: ' ',

    }
    handleModal = a => {
        this.setState({open: false})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    showMembers = () => {
        return (
            allmember.map(pr => {
                    return (
                        <Grid item xs={2} style={{marginLeft: 'auto', marginTop: 10}}>
                            <Card style={{width: (window.screen.width / allmember.length) / 1.8, height: 240,backgroundColor:"#2a3743"}}>
                                <Avatar style={{
                                    marginLeft: 'auto',
                                    marginRight:'auto',
                                    width: 80,
                                    height: 80,
                                    marginTop:10
                                }} src={require(`./image/${pr.name}.jpeg`)}/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{color:'#ffffff'}}>
                                        {pr.name}
                                    </Typography>
                                    <Typography component="p" style={{color:'#ffffff'}}>
                                        {pr.Introduction}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
            )
        )
    }
    setSnake = (f,c) =>{
        this.setState({
            alertAllFieled:f,
            snakebarContent:c,

        })
    }
    render() {
        return (
            <React.Fragment>
                <Paper style={style.Paper}>
                    <Grid container spacing={24}>
                        <Grid item alignContent={"center"} style={style.grid1}>
                            <Fade in={true} timeout={1000}>
                                <Typography style={style.caption}>
                                    SUSTech Lambda
                                </Typography>
                            </Fade>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item>
                            <Fade in={true} timeout={1000}>
                                <Button inverted style={style.bootstrapRoot} color='black' onClick={() => {
                                    this.setState({open: true})
                                }}>
                                    <Typography style={{color: '#FFFFFF', fontFamily: 'Arial', fontSize: 20}}>
                                        Try it now!
                                    </Typography>
                                </Button>
                            </Fade>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item style={{margin: 'auto', marginTop: 80, borderStyle: 'solid', borderWidth: 5}}>
                            <Player autoPlay={true}
                                    fluid={false}
                                    width={800}

                            >
                                <source src={require(`./image/startmovie.mov`)}/>
                                <ControlBar autoHide={true} disableCompletely/>
                            </Player>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={this.state.open}
                        onClose={() => {
                            this.setState({open: false})
                        }}
                    >
                        <DialogContent>
                            <Login type="in" setToken={this.props.setToken} handleModal={this.handleModal} setSnake={this.setSnake}/>
                        </DialogContent>
                    </Dialog>
                    <Grid container spacing={24} style={{marginTop: 300}}>
                        <Grid item>
                            <div style={{width: window.screen.width, height: 430, backgroundColor: '#101319'}}>
                                <Grid container>
                                    {this.showMembers()}

                                </Grid>
                                <Grid container>
                                    <Typography style={{color: '#ffffff', marginTop: 50, marginLeft: 'auto',marginRight:'auto'}}>
                                        By clicking “Sign up”, you agree to our terms of service and privacy
                                        statement. We’ll occasionally send you account related emails.
                                    </Typography>
                                </Grid>
                            </div>

                        </Grid>
                    </Grid>
                </Paper>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={this.state.alertAllFieled}
                    onClose={()=>{this.setState({alertAllFieled:false})}}
                    autoHideDuration={1000}

                >
                    <SnackbarContent
                        style={{backgroundColor: "#ff1a24"}}
                        message={<span style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>  <ErrorIcon/>{this.state.snakebarContent}</span>}
                    >
                    </SnackbarContent>
                </Snackbar>
                {/*<ButtonAppBar/>*/}
            </React.Fragment>
        );
    }

}

export default HomePage;