import React, {Component} from 'react';

const scriptA = {
    'title'\]]]]]]]]]]]]]]]]]]]]]]]]]]]]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]\]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]\]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
}
class ScriptList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            scriptes: [],
            selectedPr: null
        };
    }

    componentDidMount() {
        var page = this.props.pagevalue

        fetch()
            .then(res => res.json())
            .then(prs => {this.setState({ pullRequests: prs.content });this.props.setPage(prs.content,prs.totalPages,"GitHub")});

    }

    selectPr(pr,index) {
        return () => {
            this.setState({
                selectedPr: pr
            }, function () {
                this.props.setValue(pr, "GitHub",index);
            });
        }
    }
    select(pr){
        if(pr["categories"].length>0){
            return(
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>)
        }
    }

    render() {

        return (
            <div className="app-root">
                <List>
                    {
                        this.state.pullRequests.map((pr, index) =>
                            <ListItem button key={pr.id} onClick={this.selectPr(pr, index)}>

                                {this.select(pr)}
                                <ListItemText primary={pr.title} secondary={pr.repoName}/>
                            </ListItem>
                        )
                    }
                </List>
            </div>
        );
    }


}
export default ScriptList