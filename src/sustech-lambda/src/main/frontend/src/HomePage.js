import React, {Component} from 'react';
import ButtonAppBar from './Navigation Bar'
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Fade from "@material-ui/core/Fade/Fade";
import {ControlBar, Player} from 'video-react';
import "video-react/dist/video-react.css";
import Button from "@material-ui/core/Button/Button";
import Modal from "@material-ui/core/Modal/Modal";
import Login from "./login";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from "@material-ui/core/Avatar/Avatar";

const allmember = [
    {
        name: 'Zhang Zhaoxu',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    },
    {
        name: 'Zhang Zhaoxu',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    },
    {
        name: 'Zhang Zhaoxu',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    },
    {
        name: 'Zhang Zhaoxu',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    },
    {
        name: 'Zhang Zhaoxu',
        Phonenumber: 133333333,
        Introduction: 'hahahahahah'
    }
]
const style = {
    Paper: {
        backgroundImage: `url(${require("./image/he.jpg")})`,
        height: 1851,
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
        open: false
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
                            <Card style={{width: (window.screen.width / allmember.length) / 1.5, height: 300}}>
                                <Avatar style={{marginLeft: (window.screen.width / allmember.length) /3 - 45, width:80,height:80}}>{pr.name.charAt(0)}</Avatar>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {pr.name}
                                    </Typography>
                                    <Typography component="p">
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

    render() {
        console.log(window.screen.availWidth)
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
                                <Button variant="contained" style={style.bootstrapRoot} onClick={() => {
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
                                <source src={'http://media.w3.org/2010/05/bunny/movie.mp4'}/>
                                <ControlBar autoHide={true} disableCompletely/>
                            </Player>
                        </Grid>
                    </Grid>
                    <Modal
                        open={this.state.open}
                        onClose={() => {
                            this.setState({open: false})
                        }}
                    >
                        <Login type={"in"} setToken={this.props.setToken} handleModal={this.handleModal}/>
                    </Modal>
                    <Grid container spacing={24} style={{marginTop: 500}}>
                        <Grid item>
                            <div style={{width: window.screen.width, height: 450, backgroundColor: '#101319'}}>
                                <Grid container>
                                    {this.showMembers()}

                                </Grid>
                                <Grid container >
                                    <Typography style={{color: '#ffffff', marginTop: 50,marginLeft: 200}}>
                                        By clicking “Sign up for GitHub”, you agree to our terms of service and privacy
                                        statement. We’ll occasionally send you account related emails.
                                    </Typography>
                                </Grid>
                            </div>

                        </Grid>
                    </Grid>
                </Paper>

                {/*<ButtonAppBar/>*/}
            </React.Fragment>
        );
    }

}

export default HomePage;