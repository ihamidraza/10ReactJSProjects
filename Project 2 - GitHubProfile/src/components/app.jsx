import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/profile.jsx';
import Search from './github/search.jsx';

class App extends Component{
    constructor(props){
        super(props);
        
        this.state={
            username: 'ihamidraza',
            userData: [],
            userRepos:[],
            perPage: 5

        };
    };

    // Get data from Github
    getUserData(){
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userData: data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null})
                alert(err);
            }.bind(this)
        })
    }

    // Get user repos from Github
    getUserRepos(){
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'/repos?perpage='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userRepos: data});
             
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null})
                alert(err);
            }.bind(this)
        })
    }

    handleFormSubmit(username){
        this.setState({username: username}, function(){
            this.getUserData();
            this.getUserRepos();
        });
    }

    componentDidMount(){
        this.getUserData();
        this.getUserRepos();
    }

    render(){
        return(
            <div>
            <Search onFormSubmit={this.handleFormSubmit.bind(this)} />
            <Profile  {...this.state}/>
            </div>
        )
    }
    
}
App.propTypes = {
        clientId: React.PropTypes.string,
        clientSecret: React.PropTypes.string
    };
    App.defaultProps={
        clientId: '4240fb782d36f488d72b',
        clientSecret:'97457b1f77bb353b7054d55d5e6776bf93aa28bc'
    };


export default App