import React, {Component} from 'react';
import ButtonAppBar from "./Navigation Bar";
import TextField from '@material-ui/core/TextField';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import {List, withStyles} from '@material-ui/core';
// import "./CreateScripts_new.css";
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import PropTypes from 'prop-types';
import { types } from 'util';
import Zoom from '@material-ui/core/Zoom';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';



const short_editor_edit= {
    width: '100%',
    // maxWidth: 700,
    height:'150px',
    // float:'left',
}

const short_editor_display= {
    width: '100%',
    // maxWidth: 700,
    height:'50px',
}

const long_editor= {
    width: '100%',
    // maxWidth: 700,
}

const script_editor= {
    width: '100%',
    // maxWidth: 700,
    height:'200px',
}

const button = {
    bottom:'50px',
    float:'left',
}
const execute_button={
    float:'right',
}

const result_style = {
    width: '100%',
    // maxWidth: 700,
    height:'200px',
}

const page = {
    padding: '0%',
}

const param_editor_edit= {
    width: '100%',
    height:'150px',
    float:'left'
}


const param_list = []

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
});


/**  Title Description and Editor **/ 
const EditTitle = ({title, handleChange}) =>
<div className="short-editor">
<form>
    <TextField
        id="title"
        // label="Title"
        value={title}
        onChange={handleChange('title')}
        placeholder="Input your title here"
        helperText="Please Input your title"
        margin="normal"
        fullWidth
    />
</form>
</div>


const ScriptTitle = ({mode, title, handleChange}) => 
{
    if (mode == "Editing") {
        return (
            <div style={short_editor_edit}>
                <Typography component="h1" variant="h1" gutterBottom>{mode} Mode</Typography>
                <EditTitle
                    title={title}
                    handleChange={handleChange}
                />
            </div>
        );
    }
    if (mode == "Viewing" || mode == "Running") {
        return (<div style={short_editor_display}><Typography component="h1" variant="h1" gutterBottom>{title}</Typography></div>);
    }
}


/** Description Display and Editor  **/
const DescriptionEditor = ({description, handleChange}) =>
<form>
    <TextField
        id="description"
        // label="Description"
        placeholder="Input your description here"
        helperText="Please Input your description"
        value={description}
        onChange={handleChange('description')}
        margin="normal"
        fullWidth
        rows="3"
        rowsMax="20"
        multiline
    />
</form>


const DescriptionDisplay = ({mode, description, handleChange}) => {
if (mode == "Editing") {
    return (
        <div style={long_editor}>
            <DescriptionEditor
                description={description}
                handleChange={handleChange}
            />
        </div>
    );
}

if (mode == "Viewing"|| mode == "Running") {
    return (
        <div style={long_editor}>
            <Typography component="h2" variant="h2"> Decriptioin ></Typography>
            <Typography component="h4" variant="h4">{description}</Typography>
        </div>
    );
}
}

/** Script Editor  **/
const EditorDisplay = ({mode, scripts, syntax, handleChange}) => {
    const lang_type = [
        {
            value:'bash',
            label:'bash',
        },
        {
            value:'python',
            label:'python',
        },
        {
            value:'javascript',
            label:'javascript',
        }
    ]
    if (mode == "Editing") {
        return (
            <div style={script_editor}>
                <form>
                    <TextField
                        id="code"
                        helperText="Please input your scripts here"
                        placeholder="Input your scripts here"
                        value={scripts}
                        onChange={handleChange('scripts')}
                        margin="none"
                        fullWidth
                        rows="6"
                        rowsMax="25"
                        multiline
                    />
                    <TextField
                        select
                        // label='Select'
                        value={syntax}
                        onChange={handleChange('syntax')}
                        helperText="Please select the language"
                        margin="normal"
                        style={{float:'right'}}
                     >
                    {lang_type.map(option=>(
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                        ))
                    }
                </TextField>
                </form>
            </div>
        );
    }
    if (mode == "Viewing") {
        return (
            <div style={script_editor}>
                <h2> Script > </h2>
                <SyntaxHighlighter
                    language={syntax}
                >{scripts}
                </SyntaxHighlighter>
                <br/>
            </div>
        );
    }
    if (mode == "Running") {
        return (
            <div>
            </div>
        )
    }
}

/** Result Display **/
const ResultDisplay = ({mode, result}) => {
    if (mode == "Viewing"|| mode=="Running") {
        return (
            <div  style={result_style}>
                <h2>Result></h2>
                <TextField
                    id="result"
                    // label="result"
                    value={result}
                    margin="normal"
                    fullWidth
                    rows="3"
                    rowsMax="20"
                    multiline
                />
            </div>);
    }
    else {
        return (
            <br/>
        )
    }
}
/***  Parameter */
class ParamEditor extends Component {
    constructor(props){
        super(props);
        const {mode, param_list, setChange} = props;
        this.state = {
            mode:mode,
            param_list:param_list,
        }
        this.setChange = setChange;
    }

    handleChange = (name, event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    checkDuplicateName = (param_name) => {
        const filter_list = this.state.param_list.filter((item) => item.param_name == param_name)
        if (filter_list.length > 0) {
            alert("You cannot add duplicate paramter");
            return false;
        }
        return true;
    }

    handleAddParam = (param_name, param_type) => {
        let new_param = {
            param_name: param_name,
            param_value: null,
            param_type: param_type
        };
        if (this.checkDuplicateName(param_name)) {
            let current_param_list = this.state.param_list;
            current_param_list.push(new_param);
            this.setChange('param_list', current_param_list)
        }
    }

    handleAddParam = (param_name, param_value, param_type) => {
        let new_param = {
            param_name: param_name,
            param_value: param_value,
            param_type: param_type
        };
        if (this.checkDuplicateName(param_name)) {
            let current_param_list = this.state.param_list;
            current_param_list.push(new_param);
            this.setChange('param_list', current_param_list)
        }
    }

    handleAddParam = (new_param) => {
        if (this.checkDuplicateName(new_param.param_name)) {
            let current_param_list = this.state.param_list;
            current_param_list.push(new_param);
            this.setChange('param_list', current_param_list)
        }
    }

    // Editing paramter
    SingleParamEdit = () => {
        const var_type_list = [
            {
                value: 'String',
                label: 'String'
            },
            {
                value: 'Number',
                label: 'Number'
            },
        ]
        let new_param = {
            param_name: "",
            param_value: "",
            param_type: "String"
        };
        return (
            <div >
                <TextField
                    id="param-edit-name"
                    placeholder="Param Name"
                    onChange={(event) => {
                        new_param.param_name = event.target.value;
                    }}
                    margin="normal"
                />
                <TextField
                select
                onChange={(event) => {
                    new_param.param_type = event.target.value;
                }}
                value="Param_Type"
                helperText="Please select the parameter type"
                margin="normal"
                >
                    {var_type_list.map(option=>(
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                        ))
                    }
                </TextField>
                <Button
                    variant="fab"
                    color="default"
                    aria-label="Add-param"
                    onClick={() => this.handleAddParam(new_param)}
                >
                    <AddIcon/>
                </Button>
            </div>
        );
    }


    handleDelParam = (param_name) => {
        let new_param_list = this.state.param_list
        let flag = false
        new_param_list.map(item => {
                if (item.param_name == param_name) {
                    new_param_list.pop(item);
                    this.setChange('param_list', new_param_list)
                    flag = true;
                }
            }
        )
        if (!flag)
            alert("parameter to be deleted not found")
        // return false;
    }

    // Display all paramter Edit mode 
    DisplayParamEdit = () =>
        <div className="textField">
            {this.state.param_list.map(item =>
                    <div key={item.param_name}>
            <span> 
                <TextField
                    value={item.param_name}
                    margin="normal"
                />
                <TextField
                    value={item.param_type}
                    margin="normal"
                />
                <Button
                    variant="fab"
                    color="default"
                    aria-label="Add-param"
                    onClick={() => this.handleDelParam(item.param_name)}
                >
                  Del
            </Button>
             </span>
                        <br/>
                    </div>
            )}
        </div>

    // Editing paramter
    EditParam = () => {
        return (
            <div className="editParam" style={param_editor_edit}>
                <h4>Parameter</h4>
                <form>
                    <this.DisplayParamEdit/>
                    <this.SingleParamEdit/>
                    <br/>
                </form>
            </div>
        );
    }

    DisplayParamInput = () =>
        <div className="textField">
            {this.state.param_list.map(item =>
                    <div key={item.param_name}>
            <span> 
                {item.param_name}
                {item.param_value}  
            </span>
                        <br/>
                    </div>
            )}
        </div>

    InputValidCheck = (value, type) => 
    {
        if (type.localeCompare("Number")) {
            if (!isNaN(value)) {
                return true;
            }
            else {
                alert("Please input a number!");
                return false;
            }
        }
        else{
            return true;
        }
    }

    ParamUpdate=()=>
    {
        this.state.param_list.map(item => {
            // if (item.param_name == param.param_name) {
                if (! this.InputValidCheck(item.param_value, item.param_type)) {
                   alert("Error")
                }
            // }
        })
    }
    // Input paramter
    SingleParamInput = ({param}) => {
        return (
            <div style={param_editor_edit}>
            <span>
            <form>
                <TextField
                    value={param.param_name}
                    margin="normal"
                />
                <TextField
                    value={param.param_type}
                    margin="normal"
                />
                <TextField
                    placeholder="value"
                    variant="outlined"
                    helperText="Please input vlaue for the parameter"
                    onChange={(event) => {
                        param.value = event.target.value;
                    }}
                    margin="normal"
                />
            </form>
            </span>
            </div>
        );
    }

    // Viewing & Input the paramter
    InputParam = () =>
        <div className="paramList">
            {this.state.param_list.map(item => {
                return (
                    <div key={item.param_name} style={param_editor_edit}>
                        <this.SingleParamInput param={item}/>
                    </div>
                )
            })}
        </div>
 

    // main method of displaying parameter
    render(){
        const {mode, param_list } = this.props;
        this.state.mode = mode
        this.state.param_list = param_list
        if (this.state.mode == "Editing") {
            return < this.EditParam/>
        }
        if (this.state.mode == "Viewing" || this.state.mode == "Running") {
            return < this.InputParam />
        }
    }
}


class CreateScripts extends Component {

    // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            title: "Untitled Script ",
            description: null,
            scripts: "# Input your codes here :>",
            syntax: 'bash',
            param_list: param_list,
            result: "No Result Found",
            mode: "Editing"
        }
    }

/** Buttons For Shift ***/
    modeShift = (new_mode) => {
        this.setState({mode: new_mode});
    }

    buttonShift = () => {
        // alert(this.state.mode)
        if (this.state.mode == "Editing") {
            this.modeShift("Viewing")
        }
        ;
        if (this.state.mode == "Viewing") {
            this.modeShift("Editing")
        }
        // if (this.state.mode == "Running") {
        //     this.modeShift("Editing")
        // }
        ;
    }


    /** Button Display **/
    ButtonDisplay = () => {
        if (this.state.mode == "Editing") {
            return (
                <div style={button}>
                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="Add"
                        style={button}
                        onClick={() => this.buttonShift()}
                    >
                        <AddIcon/>
                    </Button>
                </div>
            );
        }

        if (this.state.mode == "Viewing") {
            return (
                <div>
                <Button variant="contained" onClick={()=>this.buttonShift()}>
                <SaveIcon />
                    Edit Mode
                </Button>
                    <Button variant="contained" color="secondary" >
                    Delete
                <DeleteIcon />
                </Button>
                <Button variant="contained" color="primary" >
                    Publish
                    <CloudUploadIcon  />
                </Button>
                <Button variant="contained" color="default">
                Execute
                </Button>
                </div>
            );
        }
        if (this.state.mode == "Running") {
            return(
                <div>
                <Button variant="contained" color="default">
                    Execute
                </Button>
                </div>
            )
        }

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    setChange = (name, new_value) =>{
        this.setState({
            [name]: new_value 
        })
    }

    render() {
        return (
            <div style={page}>
            <ScriptTitle 
                mode={this.state.mode} 
                title={this.state.title}  
                handleChange={this.handleChange}  
            />
            <DescriptionDisplay
                mode={this.state.mode}
                description={this.state.description}
                handleChange={this.handleChange}
            />
            <EditorDisplay
                mode={this.state.mode}
                scripts={this.state.scripts}
                syntax={this.state.syntax}
                handleChange={this.handleChange}
            />
            <ResultDisplay
                mode={this.state.mode}
                result={this.state.result}
                button={this.ButtonDisplay}
            />
            <ParamEditor 
                mode = {this.state.mode}
                param_list = {this.state.param_list} 
                setChange = {this.setChange}
                />
            <this.ButtonDisplay />
            </div>
        )
    }
}


export default withStyles(styles)(CreateScripts);