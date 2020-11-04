import React, { Component } from 'react'
import Main from './Items';

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
      }
    
      componentDidMount() {
          fetch("https://api.blst.co.id/dashboard/sales-by-region")
            .then(res => res.json())
            .then(parsedJSON => parsedJSON.data.map(data => (
              {
                province: `${data.province}`,
                province_id: `${data.province_id}`,
                city: `${data.city}`,
                city_id: `${data.city_id}`,
                total: `${data.total}`,
    
              }
            )))
            .then(items => this.setState({
              items,
              isLoaded: false
            }))
            .catch(error => console.log('parsing failed', error))
        }
    
        render() {
            return(
                <Main items={this.state.items} />
            )
    
        }
}

export default Data;