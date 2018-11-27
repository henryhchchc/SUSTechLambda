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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
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

/************************* General ******************************/
    constructor(props){
        super(props);
        this.state = {
            title: "Untitled Script ",
            description: null,
            scripts:"# Input your codes here :>",
            syntax:'bash',
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


/************************* Parameter ******************************/

    
    // Editing paramter
    SingleParamEdit = ({param_name}) =>
    {
        const var_type_list = [
          {  
           value: 'String '
          },
          {
           value: 'Number '
          }
        ]
        const name_label = param_name + '-name'
        const type_label = param_name + '-type'
        return (
            <div>
                <TextField
                    id = {name_label}
                    label= {param_name}
                    value={this.state.param1}
                    placeholder="value"
                    onChange={this.handleChange('param1')}
                    margin="normal"
                />
                <TextField
                id={type_label}
                select
                label="Select"
                value={this.state.currency}
                onChange={this.handleChange('param1')}
                placeholder="type"
                margin="normal"
                variant="outlined"
              >
                { var_type_list.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
           </div>
        );
    }

    SingleParamInput = (param_name)=>{
    // FIXME: Unfnished codes here
        const var_type_list = [
            {  
             value: 'String '
            },
            {
             value: 'Number '
            }
          ]
          const name_label = param_name + '-name'
          const type_label = param_name + '-type'
        return (
            <div>
                <TextField
                    id = {name_label}
                    label= {param_name}
                    value={this.state.param1}
                    placeholder="value"
                    onChange={this.handleChange('param1')}
                    margin="normal"
                />
                <TextField
                id={type_label}
                select
                label="Select"
                value={this.state.currency}
                onChange={this.handleChange('param1')}
                placeholder="type"
                margin="normal"
                variant="outlined"
              >
                { var_type_list.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
           </div>
        );
    }

    EditParam = () =>
    {
        return (
            <div className="editParam">
            <h3>Parameter</h3>
            <form>
                <this.SingleParamEdit param_name="website_address" />
                <br/>
                <this.SingleParamEdit param_name="video_type" />
                <br/>
            </form>
            </div>
        );
    }

        // Viewing & Input the paramter
    InputParam = () => 
    // FIXME: Unfnished codes here
        <div className="paramList">
        {this.state.param_list.map(item =>{
        return (
            <div key={item.param_name}> 
            <this.SingleParamInput param_name={item.param_name} />
            </div>
       )
        })}
        </div>

    // main method of displaying parameter
    ParamDisplay=()=>{
        if (this.state.mode == "Editing") {return <this.EditParam/>}
        if (this.state.mode == "Viewing") {return <this.InputParam/>}
    }

    // For result displaying
    ResutlDisplay=()=>{
        if (this.state.mode == "Viewing"){
        return (
        <div className="result">
        <h2>Result ></h2>
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
   
    /************************* Button ******************************/
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
                <div>
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
            );
        }

        if (this.state.mode == "Viewing"){
            return(
             <div>
             <Button 
             variant="fab" 
             aria-label="Delete"
             style={lower_right}
             >
            <DeleteIcon />
            </Button>
           <Button 
                variant="fab" 
                color="primary" 
                aria-label="Pub" 
                style={lower_right}
                >
                Pub
           </Button>
           <Button 
                variant="fab" 
                color="secondary" 
                aria-label="Edit" 
                onClick={()=>this.buttonShift()}
                style={lower_right}
                >
                Edit
           </Button>
           </div>
            );
        }
        
    }

    /************************* Script Editor ******************************/
    EditorDisplay = () =>{
        const syntax_ = {float:'right'};
        if (this.state.mode == "Editing"){
            return(
                <div className="Editor">
                <form>
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
                </form>
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
                <h2> Script >  </h2>
                <SyntaxHighlighter 
                language={this.state.syntax}
                >{this.state.scripts}
                </SyntaxHighlighter> 
                <br/>
                </div>
            );
        }
    }

    // Title Editor
    EditTitle = () =>
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
        </form>
    
    /************************* Title ******************************/
    TitleDisplay = ()=>{
        if (this.state.mode == "Editing"){ 
            return ( 
                <div className="page title">
                <h1>{this.state.mode} Mode</h1>
                <this.EditTitle />
                </div>
                );
            }
        if (this.state.mode == "Viewing"){ return (<div className="page title"><h1>{this.state.title}</h1> </div>);}
    }

    /************************* Description ******************************/
    DescriptionEditor = () => 
        <form>
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
        </form>
    

    // Description display and editor
    DescriptionDisplay = () =>{
        if (this.state.mode == "Editing") {
            return (
                <div className="Description">
                <this.DescriptionEditor/>
                </div>
            );
        }
        
        if (this.state.mode == "Viewing") {
            return (
                <div className="Description">
                <h2> Decriptioin ></h2>
                <h4>{this.state.description}</h4>
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
            <this.TitleDisplay/>
            <this.DescriptionDisplay />
            <form>
            <br/>
            <this.EditorDisplay />
            <br/>
            </form>
            <br/>
            <this.ParamDisplay />
            <this.ResutlDisplay/>
            <this.ButtonDisplay/>
        </div>

            )
    }
}

export default CreateScripts