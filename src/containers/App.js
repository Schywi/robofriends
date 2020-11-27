import React,{Component} from 'react';
import './App.css';
import CardList from '../components/CardList'
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundry';


class App extends Component { 
    constructor(){
        super();
        this.state ={
            robots: [ ],
            searchfield: ""
        }
    }

    //  Make the http request
    componentDidMount(){
        fetch("http://jsonplaceholder.typicode.com/users")
        .then(response => response.json() )
        .then(users => {this.setState({robots:users})});
    }


    // Search change function
    onSearchChange =  (event) => {
        this.setState({searchfield: event.target.value})
        
    }

    render() {
        const {robots,searchfield} = this.state;
        const filteredRobots = robots.filter(robot => {
            return  robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        console.log(filteredRobots)
        // if statment 
        return !robots.length? 
          <h1 > Loading...</h1>: 
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                              <CardList robots={filteredRobots}/> 
                        </ErrorBoundary>
                            </Scroll>
                   
                </div>
          )
   
        
    }
   
}


export default App;