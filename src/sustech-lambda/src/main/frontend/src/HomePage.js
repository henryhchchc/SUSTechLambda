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

const style = {
    Paper:{
        background : `url(${require("./image/he.jpg")})`,
        height:1729,
    },
    button:{
        marginLeft: document.body.clientWidth/2-40,
    },
    caption:{

        margin:200,
        fontFamily: 'Arial',
        fontSize: 100,
        color:'#000000'
    },
    grid1: {
        height: 500,
        margin: "auto",
    },
    bootstrapRoot: {
        marginLeft: window.screen.availWidth/2-90,
        width:200,
        height:60,

        backgroundColor: "#000a12",
        borderColor: '#000a12',
        borderRadius:'30px 30px 30px 30px',
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
    }}
class HomePage extends Component {
    state={
        open:false
    }
    handleModal = a =>{
        this.setState({open: !this.state.open})
    }
    render() {

        return (
            <React.Fragment>
                <Paper style={style.Paper}>
                    <Grid container spacing={24} >
                        <Grid item alignContent={"center"} style={style.grid1}>
                            <Fade in={true} timeout={1000}>
                            <Typography  style={style.caption}    >
                                 SuStech Lambda
                            </Typography>
                            </Fade>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} >
                        <Grid item >
                            <Fade in={true} timeout={1000}>
                                <Button variant="contained" style={style.bootstrapRoot } onClick={()=>{this.setState({open:true})}}>
                                    <Typography style={{color:'#FFFFFF',fontFamily:'Arial',fontSize:20}}>
                                    Try it now!
                                    </Typography>
                                </Button>

                            </Fade>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24} >
                        <Grid item style={{margin:'auto',marginTop:80,borderStyle:'solid',borderWidth:5}} >
                            <Player autoPlay={true}
                                fluid = {false}
                                width = {800}
                            >
                                <source src={'http://media.w3.org/2010/05/bunny/movie.mp4'} />
                                <ControlBar autoHide={true} disableCompletely/>
                            </Player>
                        </Grid>
                    </Grid>
                    <Modal
                        open={this.state.open}
                        onClose={()=>{this.setState({open:false})}}
                    >

                            <Login type = {"in"} setToken={this.props.setToken} handleModal={this.handleModal}/>
                    </Modal>
                </Paper>
                {/*<ButtonAppBar/>*/}
            </React.Fragment>
        );
    }

}

export default HomePage;