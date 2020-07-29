import React, { Component } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  padding: 30px;
`
const BrandName = styled.div`
  font-weight: bold;
  position: relative;
  padding-top: 3px;
  padding-right: 2px;
  padding-left: 2px;
  text-align: center;
`

const ItemDescripton = styled.div`
  position: relative;
  padding-top: 3px;
  padding-right: 2px;
  padding-left: 2px;
  text-align: center;
`

const Row = styled.div`
  
  @media (max-width: 960px){
      position: relative;
      padding-top: 3px;
      padding-right: 2px;
      padding-left: 2px;
      text-align: center;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
  
    }
  
    @media (min-width: 960px){
      position: relative;
      padding-top: 3px;
      padding-right: 2px;
      padding-left: 2px;
      text-align: center;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      }
  }
`

const Ul = styled.ul`
  list-style-type: none
`

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
          <div>
          <Row>
            { data.map((product, index) => 
              <Ul key={index}>
                  <li>
                      <Image alt = "model picture" src={product.images.cutOut} />
                      <BrandName>{product.brand.name}</BrandName>
                      <ItemDescripton>{product.shortDescription}</ItemDescripton>
                  </li>
              </Ul>  
              )
            }
          </Row>    
      </div>
    )
  }
}

export default App;
