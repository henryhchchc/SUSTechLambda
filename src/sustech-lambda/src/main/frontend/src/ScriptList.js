import React, {Component} from 'react';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const isDebug = true;

const apiHost = isDebug?"http://localhost:8080":"";

class ScriptList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            scripts: [{
                "content": {
                    "code": "string",
                    "language": "string",
                    "parameters": [
                        {
                            "name": "string",
                            "type": "STRING"
                        }
                    ]
                },
                "description": "string",
                "name": "string"
            }],
            selectedPr: null
        };
    }

    componentDidMount() {

        let url = `${apiHost}/api/scripts?page_idx=0&page_size=100`


        const myRequest = new Request(url, {
            method: 'GET',  headers: {
                'Authorization' : `Bearer ${this.state.token}`
            }
        });
        fetch(url)
            .then(res => res.json())
            .then(prs => {this.setState({ scripts: prs.content })});
    }

    selectPr(pr,index) {
        return () => {
            this.setState({
                selectedPr: pr
            }, function () {
                this.props.setScriptValue(pr,index);
            });
        }
    }

    render() {
        return (
            <div className="app-root">
                <List style={{width:500}}>
                    {
                        this.state.scripts.map((pr, index) =>
                            <ListItem button key={pr.name} onClick={this.selectPr(pr,index)}>
                                <ListItemText primary={pr.name} secondary={pr.description}/>
                            </ListItem>
                        )
                    }
                </List>
            </div>
        );
    }


}
export default ScriptList