import React from 'react';

class MyFavorites extends React.Component{
    render(){
        return(
            <div>
                <h1>My Favorites</h1>
                {
                    this.props.myFavs.map(fav => {
                        return <p>{fav.title}</p>
                    })
                }
            </div>
        )
    }
}
export default MyFavorites;