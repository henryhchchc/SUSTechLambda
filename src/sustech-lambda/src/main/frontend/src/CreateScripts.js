import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import {List, withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { types } from 'util';
import green from '@material-ui/core/colors/green';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Icon } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';
// import { Grid, Image } from 'semantic-ui-react'
import SnackbarContent from "@material-ui/core/SnackbarContent/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ErrorIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { Button, Segment } from 'semantic-ui-react'
import InputLabel from '@material-ui/core/InputLabel';


const isDebug = true;
const apiHost = isDebug?"http://localhost:8080":"";

const short_editor_edit= {
    width: '100%',
    // maxWidth: 700,
    height:'150px',
    fontFamily:['Comic Sans MS','cursive','sans-serif']
    // float:'left',
}

const short_editor_display= {
    width: '100%',
    // maxWidth: 700,
    height:'50px',
    fontFamily:['Comic Sans MS','cursive','sans-serif']
}

const long_editor= {
    width: '100%',
    fontFamily:['Comic Sans MS','cursive','sans-serif']
    // maxWidth: 700,
}

const script_editor= {
    width: '100%',
    // maxWidth: 700,
    height:'200px',
    fontFamily:['Comic Sans MS','cursive','sans-serif']
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
    fontFamily:['Comic Sans MS','cursive','sans-serif']
}

const page = {
    padding: '5%',
    fontFamily:['Comic Sans MS','cursive','sans-serif'],
}

const param_editor_edit= {
    width: '100%',
    height:'150px',
    float:'left',
    fontFamily:['Comic Sans MS','cursive','sans-serif']
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

const sleep=(numberMillis)=>
{
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

/**  Title Description and Editor **/
const EditTitle = ({title, handleChange}) =>
    <div className="short-editor">
        <TextField
            id="title"
            label="Script Title"
            variant="outlined"
            value={title}
            onChange={handleChange('title')}
            placeholder="Input your title here"
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
                <Typography style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}} component="h1" variant="h1" gutterBottom>{mode} Mode</Typography>
                <EditTitle
                    title={title}
                    handleChange={handleChange}
                />
            </div>
        );
    }
    if (mode == "Viewing" || mode == "Running"|| mode == "ViewingR" || mode == "RunningR" ) {
        return (<div style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}} ><Typography component="h1" variant="h1" gutterBottom>{title}</Typography></div>);
    }
}


/** Description Display and Editor  **/
const DescriptionEditor = ({description, handleChange}) =>
    <div>
        <h4 style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}}> Description </h4>
        <TextField
            id="description"
            // label="Description"
            placeholder="Input your description here"
            helperText="Please Input your description"
            variant="filled"
            value={description}
            onChange={handleChange('description')}
            margin="normal"
            fullWidth
            rows="3"
            rowsMax="20"
            multiline
        />
    </div>


const DescriptionDisplay = ({mode, description, handleChange}) => {
    if (mode == "Editing") {
        return (
            <div style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}} >
                <DescriptionEditor
                    description={description}
                    handleChange={handleChange}
                />
            </div>
        );
    }

    if (mode == "Viewing"|| mode == "Running" || mode == "ViewingR" || mode == "RunningR" ) {
        return (
            <div style={long_editor}>
                <Typography style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}}  component="h4" variant="h4"> Decriptioin ></Typography>
                <body style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}}>{description}</body>
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
                <h4 style={{fontFamily:['Comic Sans MS','cursive','sans-serif'] }}> Script </h4>
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
    if (mode == "Viewing" || mode=="ViewingR" || mode == "Running" || mode=="RunningR") {
        return (
            <div style={script_editor}>
                <h4 style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}} > Script > </h4>
                <SyntaxHighlighter
                    language={syntax}
                >{scripts}
                </SyntaxHighlighter>
            </div>
        );
    }
}

/** Result Display **/
const ResultDisplay = (props) => {
    let {mode, result} = props

    if (mode == "Viewing" | mode=="Running" || mode == "ViewingR" || mode == "RunningR" ) {
        if (result != null) {
            return (
                <div>
                    <h4 style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}}>Result></h4>
                    <body style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}}>{result }</body>
                    <br/>
                </div>);
        }
        else{
            return (
                <div>
                    <h4>Result></h4>
                    <body style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}}>[No Result Given At Present]</body>
                    <br/>
                </div>);
        }
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
                    helperText="Please select the type of pram"
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
                    inverted color="violet"
                    onClick={() =>{
                        new_param.param_name=this.state.pn_temp
                        new_param.param_type=this.state.pt_temp
                        this.setState({pn_temp:"DEFAULT"})
                        this.setState({pt_temp:"STRING"})
                        this.handleAddParam(new_param)
                    }
                    }
                >
                    <Icon disabled name='add' />
                    Add
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
                    inverted
                    color="red"
                    onClick={() => this.handleDelParam(item.param_name)}
                >
                <Icon disabled name='close' />
                  Del
            </Button>
             </span>
                    </div>
            )}
        </div>

    // Editing paramter
    EditParam = () => {
        return (
            <div className="editParam" style={param_editor_edit}>
                <h4 style={{fontFamily:['Comic Sans MS','cursive','sans-serif']}} >Parameter</h4>
                <this.DisplayParamEdit/>
                <this.SingleParamEdit/>
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
                    </div>
            )}
        </div>



    // Input paramter
    SingleParamInput = ({param}) => {
        return (
            <div>
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
            </div>
        );
    }

    // Viewing & Input the paramter
    InputParam = () =>
        <div className="paramList">
            {this.state.param_list.map(item => {
                return (
                    <div key={item.param_name}>
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
        if (this.state.mode == "Viewing" || this.state.mode == "Running" || mode == "ViewingR" || mode == "RunningR" ) {
            return (
                <div>
                    <this.InputParam />
                </div>
            )

        }
    }
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
        let code = "# This is a sample program for bash \np1=$1\nnum1=$2\necho ${p1}\necho ${num1}"
        let result = null
        let {token, mode, id, task_id} = props;
        if (id == null) {id = "NULL"}
        if (task_id == null) {task_id = "NULL"}
        // alert(props.id)
        // alert(props.task_id)
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
            setSnackBar: props.setSnackBar,
            runSuccess:false,
            sb_info:{
                type:"default",
                info:"NULL",
                open:false
            }
        }

        if (mode == null) { mode = "Editing"}
        if (id != "NULL"){
            let inform = this.getScripts(id)
        }
        if (task_id != "NULL") {
            let infrom = this.getResult(task_id)
        }


    }



    // Get Scripts
    getScripts = (id) => {
        let url = `${apiHost}/api/scripts/${id}`
        const message = {}

        const myRequest = new Request(url, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });

        fetch(myRequest)
            .then(response => response.json().then(prs => {
                    let {id, name, description, content, author} = prs
                    let {language, code, parameters} = content;


                    let param_list = []
                    parameters.map(param=>(
                        param_list.push({
                            param_name: param.name,
                            param_type: param.type,
                        })
                    ))

                    this.setState({
                        title: name,
                        description: description,
                        scripts: code,
                        syntax: language,
                        param_list: param_list,
                        id: id,
                        result:null
                    })
                }
                )
            )
    }

    // Query Result
    getResult = (id) => {
        // alert("start")
        let url = `${apiHost}/api/tasks/${id}`
        const myRequest = new Request(url, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });
        fetch(myRequest)
        // alert("get")
            .then(response => response.json().then(prs => {
                // alert("get")
                console.log(response.status)
                // alert(response.status)
                if (response.status === 401) {
                    this.props.setSnackBar("Error", "Script ID Not Found", true)
                } else if (response.status == 200) {
                    if (prs.status == "FINISHED") {
                        this.setState({result:prs.output})
                        this.props.setSnackBar("Success", "Script run finished", true)
                    }
                    else {
                        this.setState({result:"[Script Still Running, Please wait]"})
                        this.props.setSnackBar("Success", "Script start running, check the result in task list", true)
                    }

                } else {
                    let error_msg = "Error Code:" + response.status
                    this.props.setSnackBar("Error", error_msg, true)
                }
            }))
    }

    // Create Scripts & Update
    setScripts = (props, id) => {
        let url = `${apiHost}/api/scripts`
        let mode = "create"
        if  ( id == "NULL" ) {  url = `${apiHost}/api/scripts`; }
        else {
            // alert(id)
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

        let method = 'POST'
        if (mode == "update") {method = "PUT"}
        const myRequest = new Request(url, {
            method: method,
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
                    this.props.setSnackBar("Error","Error: Script ID Not Found", true)
                } else if (response.status == 201) {
                    // Created Success
                    const {id, name, description, content, author}=response.body;
                    if (mode == "create") {
                        this.setState({id:{id}})
                    }
                    // this.props.setSnackBar("Success","Script save sucess", true)
                }
                else if (response.status == 200 | response.status == 204 ) {
                    // this.props.setSnackBar("Success","Code update sucess", true)
                }else {
                    let error_msg = "Error Code:"+ response.status
                    this.props.setSnackBar("Error",error_msg, true)
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
        let parameters = []
        let param_valid = true
        param_list.map(param=>{
            if (this.InputValidCheck(param)){
                parameters.push({
                    "name": param.param_name,
                    "type": param.param_type,
                    "value": param.value
                })
            }
            else{
                param_valid=false
                let error_msg = "Parameter:" + param.param_name + "should be a number"
                this.props.setSnackBar("Error", error_msg, true)
            }
        });
        if (param_valid){
            // this.props.setSnackBar("Success", "Parameter check success", true)

            if (this.state.mode == "Viewing")
                this.setState({mode:"ViewingR"})
            else if (this.state.mode == 'Running')
                this.setState(({mode:"RunningR"}))

            const message =  parameters
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
                .then(response => {response.json().then(prs => {
                        console.log(response.status)
                        // alert(response.status)
                        if (response.status === 401) {
                            this.props.setSnackBar("Error", "Script id not found", true)
                        } else if (response.status == 201) {
                            // FIXME: Unfinished code for running
                            sleep(1000)
                            this.getResult(prs.id)
                        } else if (response.status == 500) {
                            this.props.setSnackBar("Error", "Parameter input format error")
                        }
                        else {
                            let error_msg = "Error Code:" + response.status
                            this.props.setSnackBar("Error", error_msg, true)
                        }

                        if (this.state.mode == "ViewingR")
                            this.setState({mode:"Viewing"})
                        else if (this.state.mode == 'RunningR')
                            this.setState(({mode:"Running"}))

                    }


                )})
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
            this.props.setSnackBar("Info", "Switch to Viewing Mode",true)
        }
        if (this.state.mode == "Viewing") {
            this.modeShift("Editing")
            this.props.setSnackBar("Info", "Switch to Editing Mode",true)
        }
    }

    executeCurrentScripts = () => {
        this.runScript(this.state.param_list, this.state.id)
    }
    publishCurrentScripts = () => {
        this.setScripts(this.state, this.state.id)
        this.props.setSnackBar("Success","Script publish success", true)
    }

    /** Button Display **/
    ButtonDisplay = () => {
        if (this.state.mode == "Editing") {
            return (
                <div style={button}>
                    <Button  color="blue" size='large' onClick={()=>this.buttonShift()}>
                        <Icon disabled name='save' />
                        Viewing Mode
                    </Button>
                </div>
            );
        }

        if (this.state.mode == "Viewing" ) {
            return (
                <div style={button}>
                    <Button  color="blue" size='large' onClick={()=>this.buttonShift()}>
                        <Icon disabled name='edit' />
                        Edit Mode
                    </Button>
                    <Button  color='green'  size='large' onClick={()=>this.publishCurrentScripts()} >
                        <Icon disabled name='cloud upload' />
                        Publish
                    </Button>
                    <Button  color='orange' size='large' onClick={()=>this.executeCurrentScripts()}>
                        <Icon disabled name='play' />
                        Execute
                    </Button>
                </div>
            );
        }
        if (this.state.mode == "ViewingR") {
            return (
                <div style={button}>
                    <Button  color="blue" size='large' onClick={()=>this.buttonShift()}>
                        <Icon disabled name='edit' />
                        Edit Mode
                    </Button>
                    <Button  color='green'  size='large' onClick={()=>this.publishCurrentScripts()} >
                        <Icon disabled name='cloud upload' />
                        Publish
                    </Button>
                    <Button  loading color='orange' size='large' onClick={()=>this.executeCurrentScripts()}>
                        <Icon disabled name='play' />
                        Execute
                    </Button>
                </div>
            );
        }
        if (this.state.mode == "Running") {
            return(
                <div>
                    <Button  color='orange' size='large' onClick={()=>this.executeCurrentScripts()}>
                        <Icon disabled name='play' />
                        Execute
                    </Button>
                </div>
            )
        }
        if (this.state.mode == "RunningR") {
            return(
                <div>
                    <Button  loading color='orange' size='large' onClick={()=>this.executeCurrentScripts()}>
                        <Icon disabled name='play' />
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
        if (name == "syntax"){
            if (!this.state.runSuccess){
                if (event.target.value == "python"){
                    this.setState({scripts:"def run(param):\n  ''' This is an example for code in python'''\n  # param here is a dictionary object\n  inform = param['text']\n  print(inform)\n"})
                }
                else if  (event.target.value == "bash"){
                    this.setState({scripts:"# This is a sample program for bash \np1=$1\nnum1=$2\necho ${p1}\necho ${num1}"})
                }
                else if  (event.target.value == "javascript"){
                    this.setState({scripts:"function run(param){\n  // This is an example program for JS.\n  // The most import thing here is that you must name your main function 'run' and take a    let para = param['para']\n   console.log(para);\n}\nmodule.exports = run"})
                }
            }
        }
    };

    setChange = (name, new_value) =>{
        this.setState({
            [name]: new_value
        })
    }

    render() {
        // alert(this.state.result)
        if ((this.props.id != this.state.id)&(this.props.id != null)) {
            this.getScripts(this.props.id)
        }

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
                <br/>
                <br/>
                <ResultDisplay mode={this.state.mode} result={this.state.result} setChange={this.setChange}/>
                <ParamEditor
                    mode = {this.state.mode}
                    param_list = {this.state.param_list}
                    setChange = {this.setChange}
                    button={this.ButtonDisplay}
                    setSnackBar={this.props.setSnackBar}
                />
                <this.ButtonDisplay />
            </div>
        )
    }
}


export default withStyles(styles)(CreateScripts);