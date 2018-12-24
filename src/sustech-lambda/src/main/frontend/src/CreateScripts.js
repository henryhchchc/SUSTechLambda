import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import {List, withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { types } from 'util';
import green from '@material-ui/core/colors/green';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";


const isDebug = true; 
const apiHost = isDebug?"http://localhost:8080":"";

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
    float:'right'
    // position:'absolute',
    // bottom:0,
    // right:300,
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
    padding: '5%'
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
    <TextField
        id="title"
        // label="Title"
        value={title}
        onChange={handleChange('title')}
        placeholder="Input your title here"
        helperText="Please Input your title"
        margin="normal"
        fullWidth
        item
    />
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
                        style={{marginLeft:2}}
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
const ResultDisplay = (props) => {
    let {mode, result} = props
    if (mode == "Viewing"|| mode =="Running") {
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
        const {mode, param_list, setChange, button} = props;
        this.state = {
            mode:mode,
            param_list:param_list,
            pt_temp:"STTRING",
            pn_temp:"param_DEFAULT"
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
            this.props.setSnackBar("Error", "You cannot have duplicate parameter", true)
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
                value: 'STRING',
                label: 'String'
            },
            {
                value: 'NUMBER',
                label: 'Number'
            },
        ]
        let new_param = {
            param_name: "",
            param_value: "",
            param_type: "STRING"
        };
        return (
            <div >
                <TextField
                    id="param-edit-name"
                    placeholder="Param Name"
                    onChange={(event) => {
                        this.setState({pn_temp:event.target.value})
                    }}
                    margin="normal"
                />
                <TextField
                select
                value={this.state.pt_temp}
                onChange={(event)=>{
                    this.setState({pt_temp:event.target.value})
                }}
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
                    onClick={() =>{
                        new_param.param_name=this.state.pn_temp
                        new_param.param_type=this.state.pt_temp
                        this.setState({pn_temp:"DEFAULT"})
                        this.setState({pt_temp:"STRING"})
                        this.handleAddParam(new_param)
                    }
                    }
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
                    <this.DisplayParamEdit/>
                    <this.SingleParamEdit/>
                    <br/>
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


    // Unused Codes here
    // ParamUpdate=()=>
    // {
    //     this.state.param_list.map(item => {
    //             if (! this.InputValidCheck(item.param_value, item.param_type)) {
    //                alert("Error")
    //             }
    //     })
    // }

    // Input paramter
    SingleParamInput = ({param}) => {
        return (
            <div style={param_editor_edit}>
            <span>
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
            return(
                <div className="param">
                < this.EditParam/> 
                </div>
            )
        }
        if (this.state.mode == "Viewing" || this.state.mode == "Running") {
            return (
                <div>
                <this.InputParam />
                </div>
            )

        }
    }
}


const SnackBarDisplay = (props, setHandle) =>{
    let color = "#8A2BE2"
    if (props.type == "Info"){
        color = "#8A2BE2"
    }else
    if (props.type == "Error"){
        color = "#ff1a24"
    }else 
    if (props.type == "Success") {
        color = "#99FF66"
    }
    return (
        <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={props.open}
        onClick={()=>{setHandle(props.type, props.info,false)}}
        onClose={()=>{setHandle(props.type, props.info,false)}}
        autoHideDuration={3700}
        >
        <SnackbarContent
            style={{backgroundColor:color}}
            message={props.info}
        />
        </Snackbar>
    )
}

class CreateScripts extends Component {

    // Constructor 
    constructor(props) {
        super(props);
        //FIXME: Unchecked codes for initialization
        let name = "Untitled Script"
        let description = "#TODO"
        let parameters = []
        let language = "bash"
        let code = "# Input your code here :>"
        let result = null 
        let {token, mode, id, task_id} = props;
        if (mode == null) { mode = "Editing"}
        if (id == null)   { id = "NULL" }
        else{
            let inform = this.getScripts(id)
            if (inform != null){
                let {id, name, description, content, author} = inform
                let {language, code, parameters} = content
            }
        }
        if (task_id != null) { result = this.getResult(task_id)}
        this.state = {
            title: name,
            description: description,
            scripts: code,
            syntax: language, 
            param_list: parameters,
            result: result,
            mode: mode,
            id: id,
            token: token,
            task_id : task_id,
            sb_info:{
                type:"default",
                info:"NULL",
                open:false
            }
        }


    }

    // Trigger a snack bar
    setSnackBar= (type, info, open) =>{
        this.setState({
            sb_info:{
                type:type,
                info:info,
                open:open
            }
        })
    }

    // Query Scripts 
    getScripts = (id) => {
        let url = `${apiHost}/api/scripts/`
        const message = {
            "page_idx":{id},
            "page_size":{id}
        };

        const myRequest = new Request(url, {
            method: 'GET', 
            body: JSON.stringify(message), 
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });
        fetch(myRequest)
            .then(response => {
                console.log(response.status)
                if (response.status === 401) {
                    this.setSnackBar("Error","Script ID Not Found", true)
                } else if (response.status == 200) {
                    return response.body
                }else {
                    let error_msg = "Error Code:"+ response.status
                    this.setSnackBar("Error",error_msg, true)
                    return null
                }
            })
    }

        // Query Result
        // TODO: Unimplemented code here 
        getResult = (id) => {
            let url = `${apiHost}/api/scripts/`
            const message = {
                "page_idx":{id},
                "page_size":{id}
            };
    
            const myRequest = new Request(url, {
                method: 'GET', 
                body: JSON.stringify(message), 
                headers:{
                    'Authorization': `Bearer ${this.state.token}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });
            fetch(myRequest)
                .then(response => {
                    console.log(response.status)
                    if (response.status === 401) {
                        this.setSnackBar("Error","Script ID Not Found", true)
                    } else if (response.status == 200) {
                        return response.body
                    }else {
                        let error_msg = "Error Code:"+ response.status
                        this.setSnackBar("Error",error_msg, true)
                        return null
                    }
                })
        }
        
    // Create Scripts & Update
    setScripts = (props, id) => {
        let url = `${apiHost}/api/scripts`
        let mode = "create"
        if  ( id == "NULL" ) {  url = `${apiHost}/api/scripts`; }
        else { 
            url = `${apiHost}/api/scripts/${id}`; 
            mode = "update";
        }
  
        const {title,description, scripts, syntax, param_list} = props;
        let param_msg = []
        param_list.map(param=>(
            param_msg.push({
                "name": param.param_name,
                "type": param.param_type,
            })
        )
        );
        const message = 
        {
            "content": {
              "code": scripts,
              "language": syntax,
              "parameters": param_msg,
            },
            "description": description,
            "name": title
        };

        const myRequest = new Request(url, {
            method: 'POST', 
            body: JSON.stringify(message), 
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        fetch(myRequest)
            .then(response => {
                console.log(response.status)
                if (response.status === 401) {
                    this.setSnackBar("Error","Error: Script ID Not Found", true)
                } else if (response.status == 201) {
                    // Created Success
                    const {id, name, description, content, author}=response.body; 
                    if (mode == "create") {
                        this.setState({id:{id}})
                    }
                    this.setSnackBar("Success","Script save sucess", true)
                }
                else if (response.status == 200) {
                    this.setSnackBar("Success","Code update sucess", true)
                }else {
                    let error_msg = "Error Code:"+ response.status
                    this.setSnackBar("Error",error_msg, true)
                }
            })
    }


    // Run a script 
    InputValidCheck = (param) => 
    {
        let {value, param_type} = param
        if (param_type == "NUMBER") {
            if (!isNaN(value)) {
                return true;
            }
            else {
                return false;
            }
        }
        else{
            return true;
        }
    }

    runScript=(param_list, id)=>{
        let url = `${apiHost}/api/scripts/${id}/run`
        let param_msg = []
        let param_valid = true
        param_list.map(param=>{
            if (this.InputValidCheck(param)){
                param_msg.push({
                    "name": param.param_name,
                    "type": param.param_type,
                    "value": param.param_value
                })
        }
        else{
            param_valid=false
            let error_msg = "Input parameter:" + param.param_name + " is not a number"
            this.setSnackBar("Error", error_msg, true)
        }
    });
        if (param_valid){
            this.setSnackBar("Success", "Parameter check success", true)
            const message = {param_msg}
            const myRequest = new Request(url, {
                method: 'POST', 
                body: JSON.stringify(message), 
                headers:{
                    'Authorization': `Bearer ${this.state.token}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            });
            fetch(myRequest)
                .then(response => {
                    console.log(response.status)
                    if (response.status === 401) {
                        this.setSnackBar("Error","Script id not found", true)
                    } else if (response.status == 200) {
                        // FIXME: Unfinished code for running 
                        this.setSnackBar("Success","Script start runing", true)
                        let result = response.body;
                    }else {
                        let error_msg = "Error Code:"+ response.status
                        this.setSnackBar("Error",error_msg, true)
                    }
                })
            }
    }



/** Buttons For Shift ***/
    modeShift = (new_mode) => {
        this.setState({mode: new_mode});
    }

    buttonShift = () => {
        if (this.state.mode == "Editing") {
            this.modeShift("Viewing");
            this.setScripts(this.state, this.state.id);
            this.setSnackBar("Info", "Switch to Viewing Mode",true)
        }
        if (this.state.mode == "Viewing") {
            this.modeShift("Editing")
            this.setSnackBar("Info", "Switch to Editing Mode",true)
        }
    }

    executeCurrentScripts = () => {
        this.runScript(this.state.param_list, this.state.id)
    }

    /** Button Display **/
    ButtonDisplay = () => {
        if (this.state.mode == "Editing") {
            return (
                <div style={button}>
                    <Button variant="contained" color="secondary" onClick={()=>this.buttonShift()}>
                    <SaveIcon />
                        Edit Mode
                    </Button>
                </div>
            );
        }

        if (this.state.mode == "Viewing") {
            return (
                <div style={button}>
                <Button variant="contained" color="secondary" onClick={()=>this.buttonShift()}>
                <SaveIcon />
                    Edit Mode
                </Button>
                <Button variant="contained" color="primary" >
                    Publish
                    <CloudUploadIcon />
                </Button>
                <Button variant="contained" color="default" onClick={()=>this.executeCurrentScripts()}>
                Execute
                </Button>
                </div>
            );
        }
        if (this.state.mode == "Running") {
            return(
                <div>
                <Button variant="contained" color="default" onClick={()=>this.executeCurrentScripts()}>
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
            {SnackBarDisplay(this.state.sb_info, this.setSnackBar)}
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
            <ResultDisplay props={this.state}/>
            <ParamEditor 
                mode = {this.state.mode}
                param_list = {this.state.param_list} 
                setChange = {this.setChange}
                button={this.ButtonDisplay}
                setSnackBar={this.setSnackBar}
                />
                <this.ButtonDisplay />
            </div>
        )
    }
}


export default withStyles(styles)(CreateScripts);