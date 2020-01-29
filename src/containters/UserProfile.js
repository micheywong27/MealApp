import React from 'react';
import MyPosts from './MyPosts'
import MyFavorites from './MyFavorites'

class UserProfile extends React.Component{
    render(){
        return(
            <div className="profile">
                <h1>Michelle's Profile</h1>
                <br />
                <MyPosts />
                <MyFavorites myFavs={this.props.myFavs}
                            addToFavs={this.props.addToFavs}
                            removeFromFavs={this.props.removeFromFavs}/>
            </div>
        )
    }
}
export default UserProfile;