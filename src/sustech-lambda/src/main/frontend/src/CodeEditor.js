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
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/styles/hljs';


class CodeEditor extends Component{
  constructor(props){
    super(props);
    this.state = {
      syntax:'python',
      code:'import numpy as np\n k = np.array([1,2,3])' 
    }
  }

  handleChange = name=> event => {
    this.setState({
      [name]:event.target.value,
    });
  };

  render() {
    return (
      <div className="Editor">
      <h1> Editor </h1>
      <SyntaxHighlighter 
      language={this.state.syntax}
      onChange={this.handleChange('code')}
      >{this.state.code}
      </SyntaxHighlighter> 
      </div>
    )
  }
}
export default CodeEditor