import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#f44336',
        },
    },
});
const styles = {
    root: {
        flexGrow: 1,

    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        borderColor:'#ffffff',
        marginLeft: 1160,
    },
};

function ButtonAppBar(props) {
    const { classes } = props;
    return (

        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
            <AppBar position="fixed" color = 'primary' >
                <Toolbar >
                    <Button variant={"outlined"} style={styles.menuButton}>
                        <Typography style={{color:'#ffffff'}}>
                        Login in
                        </Typography>
                    </Button>
                    <Button variant={"outlined"} style={{borderColor:'#ffffff',marginLeft: 10}} >
                        <Typography style={{color:'#ffffff'}}>
                            Login in
                        </Typography>
                    </Button>
                </Toolbar>

            </AppBar>
            </MuiThemeProvider>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);