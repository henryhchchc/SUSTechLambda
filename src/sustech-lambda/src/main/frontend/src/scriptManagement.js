import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Clear from "@material-ui/icons/Clear";
import Delete from "@material-ui/icons/Delete";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import CreateScripts from "./CreateScripts";
import Dialog from "@material-ui/core/Dialog/Dialog";
let counter = 0;
const isDebug = true;

const apiHost = isDebug ? "http://localhost:8080" : "";


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    {id: 'id', numeric: false, disablePadding: false, label: 'id'},
    {id: 'name', numeric: false, disablePadding: false, label: 'name'},
    {id: 'description', numeric: false, disablePadding: false, label: 'description'},
];
class EnhancedTable2Head extends React.Component {


    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                            checkedIcon={<Clear/>}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTable2Head.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTable2Toolbar = props => {

    const {numSelected, classes} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected to be deleted
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        All Scripts
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton arial-label='Delete' onClick={() => props.handleResetPassword()}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTable2Toolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTable2Toolbar = withStyles(toolbarStyles)(EnhancedTable2Toolbar);

const styles = theme => ({
    root: {
        width: '95%',
        marginLeft: 'auto',
        marginRight:'auto',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable2 extends React.Component {
    constructor(props) {
        super(props)
        let data = []
        data = [{
            "id": "df85f024-14a6-4dd8-9560-63b2586dc084",
            "name": "Script1",
            "description": "here is the first one",
            "content": {
                "language": "python",
                "code": "import numpy as np\nprint('haha')",
                "parameters": []
            },
            "author": {
                "id": "f03754e5-d977-4d32-a167-591ff09625f5",
                "userName": "zzx",
                "passwordHash": "$2a$10$Nnsd2i2B038B1bsU/emksOIUVwblfAdbMnFWKI07FV6yR2aQUXd7G",
                "displayName": "zzx",
                "roles": [
                    "USER",
                    "DESIGNER"
                ]
            }
        }]
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data: data,
            page: 0,
            rowsPerPage: 5,
            snakebarContent: '',
            alertAllFieled: false,
            type: props.type,
            showModal: false,
            selectedId: null,
        };
    }


    componentDidMount() {
        let url = ''
        url = `${apiHost}/api/scripts/?page_idx=0&page_size=100`
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${this.props.token}`)
        let myinit = {
            method: 'GET', headers: myHeaders, mode: 'cors', cache: 'default'
        }
        fetch(url, {method: 'GET', headers: myHeaders})
            .then(response => response.json().then(data => {
                this.setState({data: data.content})
            }))
    }

    handleResetPassword = () => {
        let selected = this.state.selected
        let result = true
        selected.map(
            pr => {
                let url = `${apiHost}/api/users/${pr.id}/reset-password`
                const myRequest = new Request(url, {
                    method: 'POST', headers: {
                        'Authorization': `Bearer ${this.props.token}`
                    }
                });
                fetch(myRequest)
                    .then(
                        response => {
                            if (response.status != 200) {
                                result = false
                            }
                        }
                    )
            }
        )
        if (result) {
            this.setState(
                {
                    snakebarContent: 'Reset Successfully',
                    alertAllFieled: true,
                    selected: []
                }
            )
        }


    }
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({selected: newSelected});
    };
    handleClick2 = (id) => {
        this.setState({
            selectedId:id,
            showModal: true,
        })
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <div>
                <Paper className={classes.root}>
                    <EnhancedTable2Toolbar numSelected={selected.length}
                                           handleResetPassword={this.handleResetPassword}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTable2Head
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                                type={this.state.type}
                            />
                            <TableBody>
                                {stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.id)} checkedIcon={<Clear/>}/>
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none" onClick={() => this.handleClick2(n.id)}>
                                                    {n.id}
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none" onClick={() => this.handleClick2(n.id)}>
                                                    {n.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none" onClick={() => this.handleClick2(n.id)}>
                                                    {n.description}
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 49 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={this.state.alertAllFieled}
                    onClose={() => {
                        this.setState({alertAllFieled: false})
                    }}
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

            </div>
        );
    }
}

EnhancedTable2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable2);