import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    // the only way that worked around the CORS policy
    // was adding cors-anywhere
    // normally I would fetch just the farfetch url 
    fetch('https://cors-anywhere.herokuapp.com/https://www.farfetch.com/uk/plpslice/listing-api/query?setId=9645&view=180&gender=Men', { 
        method: 'GET',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(jsonResponse => { return jsonResponse.json() })
    .then(data => this.setState({ data : data.listing.products }))
    .catch(err => { console.log(err)})
  }

  render() {
    const { data } = this.state
        return (
        
    )
  }
}

export default App;
