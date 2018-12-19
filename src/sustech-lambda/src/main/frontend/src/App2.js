import React, {Component} from 'react';
import './App.css';
import HomePage from './HomePage'
import  PersonalPage from './PersonalPage'
import ScriptList from './ScriptList'
import ButtonAppBar from "./Navigation Bar";
import CreateScripts from './CreateScripts';

const isdebug = true

class App extends Component {
    render(){
        return (
            // <PersonalPage />
            <CreateScripts />
            );
    }
}

export default App;
