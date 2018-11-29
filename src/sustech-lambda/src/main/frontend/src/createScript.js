import React, {Component} from 'react';
import ButtonAppBar from "./Navigation Bar";
import TextField from '@material-ui/core/TextField';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import { List } from '@material-ui/core';

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

// const param_list = [
//     {
//         param_name: "param1",
//         param_type: "int",
//         param_value: 2
//     },
//     {
//         param_name: "param2",
//         param_type: "float",
//         param_value: 2.2
//     }
// ]

const param_list = []

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
    checkDuplicateName = (param_name) => {
        const filter_list = this.state.param_list.filter((item) => item.param_name == param_name)
        if (filter_list.length > 0) {
            alert("You cannot add duplicate paramter");
            return false;
        }
        return true;
    }   

    handleAddParam = (param_name, param_type) =>{
        let new_param = {
            param_name: param_name,
            param_value: null,
            param_type: param_type
        };
        if (this.checkDuplicateName(param_name)){
            let curent_param_list = this.state.param_list;
            curent_param_list.push(new_param);
            this.setState(
                {param_list: curent_param_list,}
            )
        }
    }

    handleAddParam = (param_name, param_value, param_type) =>{
        let new_param = {
            param_name: param_name,
            param_value: param_value,
            param_type: param_type
        };
        if (this.checkDuplicateName(param_name)){
            let curent_param_list = this.state.param_list;
            curent_param_list.push(new_param);
            this.setState(
                {param_list: curent_param_list,}
            )
        }
    }

    handleAddParam = (new_param) =>{
        if (this.checkDuplicateName(new_param.param_name)){
            let curent_param_list = this.state.param_list;
            curent_param_list.push(new_param);
            this.setState(
                {param_list: curent_param_list,}
            )
        }
    }

    // Editing paramter
    SingleParamEdit = () =>
    {
        const var_type_list = [
          {  
              value: 'String '
          },
          {
              value: 'Number '
          },
          {
              value: 'longString'
          }
        ]
        let new_param = {
            param_name:"origin_param_name",
            param_value: "origin_init_value",
            param_type:"String"
        };
        return (
            <div>
                <TextField
                    id = "param-edit-name"
                    label= "Parameter Name"
                    placeholder="Param Name"
                    onChange={(event)=>{new_param.param_name=event.target.value;}}
                    margin="normal"
                />
                <TextField
                id="param-edit-type"
                select
                label="Type"
                onChange={(event)=>{new_param.param_type=event.target.value;}}
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
              <Button 
              variant="fab" 
              color="default" 
              aria-label="Add-param" 
              onClick={()=>this.handleAddParam(new_param)}
              >
                  <AddIcon/>
            </Button>
           </div>
        );
    }


    handleDelParam(param_name){
        // FIXME: String comparision failed
        let new_param_list = this.state.param_list
        new_param_list.map(item=>
            {
                if (item.param_name == param_name) {
                    new_param_list.pop(item);
                    this.setState({param_list:new_param_list})
                    return true;
                }
            }
            )
        alert("parameter to be deleted not found")
        return false;
    }
    
    // Display all paramter Edit mode 
    DisplayParamEdit = () =>
    <div className="currentParamListEdit">
        {this.state.param_list.map(item =>
            <div key={item.param_name}>
            <span> 
            {item.param_name} 
            {item.param_type}
                          <Button 
              variant="fab" 
              color="default" 
              aria-label="Add-param" 
              onClick={()=> this.handleDelParam(item.param_name)}
              >
                  --
            </Button>
             </span>
            <br/>
            </div>
        )}
    </div>

    // Editing paramter
    EditParam = () =>
    {
        return (
            <div className="editParam">
            <h3>Parameter</h3>
            <form>
                <this.DisplayParamEdit/>
                <this.SingleParamEdit />
                <br/>
            </form>
            </div>
        );
    }

    DisplayParamInput = () =>
    <div className="currentParamListEdit">
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
    
    InputValidCheck = (value, type) =>{
        // FIXME: Comparision failed
        if (type == "Number") {
            alert(value)
            // alert(isNaN(value))
            if (!isNaN(value)) {
                alert("Success");
                return true;
            }
            else {
                alert("Please input a number!");
                return false;
            }
        }
    }
    // Input paramter
    SingleParamInput = ({param}) =>
    {
        const name_label = param.param_name + '-value-edit'
        const type_label = param.param_name + '-type'
        return (
            <div>
            <span>
            <form>
                <TextField
                id={type_label}
                disabled
                label="Select"
                value={param.param_type}
                placeholder="type"
                margin="normal"
                variant="outlined"
                >{param.param_type}</TextField>
                <TextField
                    id = {name_label}
                    label= "Value"
                    placeholder="value"
                    variant="outlined"
                    onChange={(event)=>{
                        param.value=event.target.value;
                        this.state.param_list.map(item => {
                            if (item.param_name == param.param_name){
                                if (this.InputValidCheck(param.param_value, param.param_type)) {item.param_value = param.value;}
                            }
                        })
                    }}
                    margin="normal"
                />
            </form>
            </span>
            <br/>
            <this.DisplayParamInput/>
           </div>
        );
    }

    // Viewing & Input the paramter
    InputParam = () => 
        <div className="paramList">
        {this.state.param_list.map(item =>{
        return (
            <div key={item.param_name}> 
            <this.SingleParamInput param={item} />
            </div>
       )
        })}
        </div>

    // main method of displaying parameter
    ParamDisplay=()=>{
        if (this.state.mode == "Editing") {return <this.EditParam/>}
        if (this.state.mode == "Viewing") {return <this.InputParam/>}
    }

/************************* Result Displaying ******************************/
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