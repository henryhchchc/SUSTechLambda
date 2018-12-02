import React, {Component} from 'react';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";


class ScriptList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            scripts: [{
                'id':0,
                'title':'THIS IS A GREAT ONE',
                'description':'XXXXXXXX',
                'code':'xxxxxxxx',
                'parameter':['a','b','c']
            }],
            selectedPr: null
        };
    }

    componentDidMount() {
        // var page = this.props.pagevalue
        //
        // fetch()
        //     .then(res => res.json())
        //     .then(prs => {this.setState({ pullRequests: prs.content });this.props.setPage(prs.content,prs.totalPages,"GitHub")});
        // this.setState({
        //     scriptes: [scriptA]
        // })
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
                            <ListItem button key={pr.id} onClick={this.selectPr(pr,index)}>
                                <ListItemText primary={pr.title} secondary={pr.description}/>
                            </ListItem>
                        )
                    }
                </List>
            </div>
        );
    }


}
export default ScriptList