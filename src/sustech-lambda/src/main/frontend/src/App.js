import React, {Component} from 'react';
import './App.css';
import HomePage from './HomePage'
import  PersonalPage from './PersonalPage'
import ScriptList from './ScriptList'
import CreateScript from './createScript'
class App extends Component {
    render() {
        return (
            <PersonalPage user = 'user'/>
            //<ScriptList/>
            // <CreateScript/>
            // <CodeEditor/>
            //<HomePage/>
        );
    }
}

export default App;
