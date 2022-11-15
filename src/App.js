import {Component} from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            makeups: [],
        };
    }

    componentDidMount() {
            fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
            .then(((response) => response.json()))
            .then((items) =>
                this.setState(
                    () => {
                        return {makeups: items};
                    },
                    () => {
                        console.log(this.state);
                    }
                ))
    }

    render() {
        return (
            <div className="App">
                <input className='search-box'
                       type='search'
                       placeholder='search item'
                       onChange={(event) => {
                           const searchString = event.target.value.toLowerCase();
                           const filteredItem = this.state.makeups.filter((makeup) => {
                               return makeup.name.toLowerCase().includes(searchString)
                           })
                           this.setState(() => {
                               return {makeups: filteredItem};
                           })
                       }}
                />

                {
                    this.state.makeups.slice(0, 10).map((makeup) => {
                        return (
                            <div key={makeup.id}>
                                <h4>{makeup.name}</h4>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
