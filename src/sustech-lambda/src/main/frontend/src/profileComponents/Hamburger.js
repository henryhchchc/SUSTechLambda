import React from 'react'
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import InboxIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider/Divider";

import MailIcon from '@material-ui/icons/Mail';
import StarsIcon from '@material-ui/icons/Stars';

import Drawer from "@material-ui/core/Drawer/Drawer";
import PropTypes from "prop-types";
import Form from "./Form";
import Nav from "./Nav";
import Grid from "@material-ui/core/Grid/Grid";
import ScriptList from "../ScriptList";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from "@material-ui/core/TextField/TextField";


// const Hamburger = () => (
//     <button className='hamburger'>
//         <span />
//         <span />
//         <span />
//     </button>
//
// )
class Hamburger extends React.Component{
    state = {
        tabValue: 100,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    handleRepo = () => {
        this.setState({
            [this.state.tabValue]: 0,
        });

    }

    handleStar = () => {
        this.setState({
            [this.state.tabValue]: 1,
        });
    }

    showContent = () => {

        if (this.state.tabValue === 0) {

            return this.showRepo()
        }
        if (this.state.tabValue === 1) {
            return this.showStar()
        }
    }

    showRepo = () => {
        alert(1)
    }

    showStar = () => {
        return(
            <div>
                star
            </div>
        )
    }

    render(){

        const { classes } = this.props;

        const sideList = (
            <div >
                <List>
                    {['Repository'].map((text, index) => (
                        <ListItem button key={text}  onClick={this.handleRepo}>
                            <ListItemIcon>{ <MailIcon /> }</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}

                    {['Starred'].map((text, index) => (
                        <ListItem button key={text} onClick={this.handleStar}>
                            <ListItemIcon>{ <StarsIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}

                    {/*{['Repository', 'Starred'].map((text, index) => (*/}
                        {/*<ListItem button key={text} value={index} onClick={this.showRepo}>*/}
                            {/*<ListItemIcon>{index % 2 === 0 ? <MailIcon /> : <StarsIcon />}</ListItemIcon>*/}
                            {/*<ListItemText primary={text} />*/}
                        {/*</ListItem>*/}
                    {/*))}*/}

                </List>

            </div>
        );




        return (
            <div>

                <button className='hamburger' onClick={this.toggleDrawer('right', true)}>
                    <span />
                    <span />
                    <span />
                </button>

                <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('right', false)}
                        onKeyDown={this.toggleDrawer('right', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>

                { this.showContent()}

            </div>



        )
    }

}



export default Hamburger
