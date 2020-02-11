import React from 'react';

class GroceryItem extends React.Component{
    render(){
        return(
            <div>
                <h2>♦ {this.props.item}</h2>
            </div>
        )
    }
}
export default GroceryItem;