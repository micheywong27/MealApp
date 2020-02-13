import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
    render(){
        return(
            <div className='navbar'>
                <h1 className="logo">Mealed<span aria-labelledby="knife" role="img">🍴</span></h1>
                <Link to='/recipes' className='navlink'><div>Trending Recipes</div></Link>
                <Link to='/form' className='navlink' onClick={() => this.props.resetIsSubmitted()}><div>Add a recipe</div></Link>
                <Link to='/profile' className='navlink' onClick={() => this.props.getMyRecipes()}><div>My Profile</div></Link>
                <Link to='/calendar' className='navlink'  onClick={() => this.props.getEvents()}><div>My Calendar</div></Link>
            </div>
        )
    }
}
export default Navbar;