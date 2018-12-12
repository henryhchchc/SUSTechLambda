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
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render(){

        const { classes } = this.props;

        const sideList = (
            <div >
                <List>
                    {['Repository', 'Starred'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <MailIcon /> : <StarsIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>

            </div>
        );

        const fullList = (
            <div >
                <List>
                    {['Repository', 'Starred'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <MailIcon /> : <StarsIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
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

            </div>
        )
    }

}



export default Hamburger
