import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Profile from "./Profile";
import ControlledExpansionPanels from "./ControlledAccordion";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class ScrollableTabsButtonForce extends React.Component {
    state = {
        value: 0,
        photo: require('./scss/jane-doe.jpg'),
        profileFields: {
            firstName: 'RainyTong',
            jobTitle: 'Web Developer',
            birthday: null,
            bio: null
        }
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" >
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        scrollable
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Information" icon={<PhoneIcon />} />
                        <Tab label="Repositories" icon={<ShoppingBasket />} />
                        <Tab label="Stars" icon={<FavoriteIcon />} />
                        <Tab label="Followers" icon={<PersonPinIcon />} />
                        <Tab label="Following" icon={<ThumbUp />} />
                        <Tab label="Item Six" icon={<HelpIcon />} />
                        <Tab label="Item Seven" icon={<ThumbDown />} />

                    </Tabs>
                </AppBar>
                {value === 0 &&
                <TabContainer >
                    <Profile profileFields={this.state.profileFields} photo={this.state.photo} />
                </TabContainer>
                }
                {value === 1 && <TabContainer>
                    <ControlledExpansionPanels/>
                </TabContainer>}
                {value === 2 && <TabContainer>Repositories</TabContainer>}
                {value === 3 && <TabContainer>Stars</TabContainer>}
                {value === 4 && <TabContainer>Followers</TabContainer>}
                {value === 5 && <TabContainer>Following</TabContainer>}
                {value === 6 && <TabContainer>Item Six</TabContainer>}

            </div>
        );
    }
}

ScrollableTabsButtonForce.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
