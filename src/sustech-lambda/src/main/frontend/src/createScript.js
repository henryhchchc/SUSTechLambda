import React, {Component} from 'react';
import ButtonAppBar from "./Navigation Bar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Collapse from "@material-ui/core/Collapse/Collapse";
import Profile from "./Profile";
import ScriptList from "./ScriptList";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';
import CodeEditor from './CodeEditor';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

const param_list = [
    {
        param_name: "param1",
        param_type: "int",
        param_value: 22
    },
    {
        param_name: "param2",
        param_type: "float",
        param_value: 2.2
    }
]

class CreateScripts extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "Unamed Script ",
            description: null,
            scripts:'import numpy as np\n import torch \n a = np.array([1,2,3])',
            syntax:'python',
            param_list:param_list,
            param1:null,
            param2:null,
            param3:null,
            result:"No Result Found",
            mode:"Editing"
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]:event.target.value,
        });
    };


    // Parameter for displaying 

    // Viewing & Input the paramter
    ShowParam = () => 
    <div className="paramList">
    {this.state.param_list.map(item =>{
        return (
            <div key={item.param_name}>
            <span> {item.param_name} </span>
            <span> {item.param_type} </span>
            <span> {item.param_value} </span>
            </div>
       )
    })}
    </div>

    // Editing paramter
    EditParam = () =>
    <div className="editParam">
    <form>
        <TextField
            id="param1"
            label="Parameter1:"
            value={this.state.param1}
            onChange={this.handleChange('param1')}
            margin="normal"
        />
    <br/>
        <TextField
            id="param2"
            label="Parameter2:"
            value={this.state.param2}
            onChange={this.handleChange('param2')}
            margin="normal"
        />
    <br/>
        <TextField
            id="param3"
            label="Parameter3:"
            value={this.state.param3}
            onChange={this.handleChange('param3')}
            margin="normal"
        /> 
    </form>
    </div>

    // main method of displaying parameter
    ParamDisplay=()=>{
        if (this.state.mode == "Editing") {return this.EditParam()}
        if (this.state.mode == "Viewing") {return this.ShowParam()}
    }

    // For result displaying
    ResutlDisplay=()=>{
        if (this.state.mode == "Viewing"){
        return (
        <div className="result">
        <h2>Result</h2>
        <TextField 
        id="result"
        label="result"
        value={this.state.result}
        margin="normal"
        fullWidth
        rows="3"
        rowsMax="20"
        multiline
    />
    </div>);}
        else{
            return(
                <br/>
            )
        }
    }
   
    // Mode Shifting
    modeShift = (new_mode) =>{
      this.setState({mode: new_mode});
    }

    buttonShift = () => {
        if (this.state.mode == "Editing") {this.modeShift("Viewing")};
        if (this.state.mode == "Viewing") {this.modeShift("Editing")};
    }
    ButtonDisplay = () =>{
        const lower_right = {float:'right'};
        if (this.state.mode == "Editing"){
            return(
                <Button 
                variant="fab" 
                color="primary" 
                aria-label="Add" 
                style={lower_right} 
                onClick={()=>this.buttonShift()}
                >
                    <AddIcon/>
            </Button>
            );
        }

        if (this.state.mode == "Viewing"){
            return(
                <Button 
                variant="fab" 
                color="primary" 
                aria-label="Add" 
                style={lower_right} 
                onClick={()=>this.buttonShift()}
                >
                    <AddIcon/>
            </Button>
            );
        }
        
    }

    EditorDisplay = () =>{
        const syntax_ = {float:'right'};
        if (this.state.mode == "Editing"){
            return(
                <div className="Editor">
                <TextField 
                    id="code"
                    label="Edit Scripts"
                    placeholder="Input your scripts here"  
                    value={this.state.scripts}
                    onChange={this.handleChange('scripts')}
                    margin="normal"
                    fullWidth
                    rows="6"
                    rowsMax="50"
                    multiline
                />
                <input type="text"
                    onChange={this.handleChange('syntax')}
                    value={this.state.syntax}
                    style={syntax_}
                />
                </div>
            );
        }
        if (this.state.mode == "Viewing"){
            return(
                <div className="Editor">
                <h3> Edit Script >  </h3>
                <SyntaxHighlighter 
                language={this.state.syntax}
                >{this.state.scripts}
                </SyntaxHighlighter> 
                <br/>
                </div>
            );
        }
    }


    // render method 
    render() {
        const lower_right = {float:'right'};
        return(
            <div className="Basic Infrom">
            <ButtonAppBar login={true}/>
            <h1>"blank"</h1>
            <h1>{this.state.title}</h1>
            <h2>{this.state.mode} Mode</h2>
            <form>
            <TextField
                id="title"
                label="Title"
                value={this.state.title}
                onChange={this.handleChange('title')}
                placeholder="Input your title here"
                margin="normal"
                fullWidth
            />
            <TextField 
                id="description"
                label="Description"
                placeholder="Input your description here"  
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
                fullWidth
                rows="3"
                rowsMax="20"
                multiline
            />
            <br/>
            <this.EditorDisplay />
            <br/>
            </form>
            <br/>
            <this.ParamDisplay />
            <this.ResutlDisplay/>
            <Button 
              variant="fab" 
              color="primary" 
              aria-label="Add" 
              style={lower_right} 
              onClick={()=>this.buttonShift()}
              >
                  <AddIcon/>
             </Button>
        </div>

            )
    }
}

export default CreateScripts