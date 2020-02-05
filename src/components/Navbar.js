import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
    render(){
        return(
            <div className='navbar'>
                <h1 className="logo">App Name</h1>
                <Link to='/recipes' className='link'><div>Recipes</div></Link>
                <Link to='/form' className='link' ><div>Add a recipe</div></Link>
                <Link to='/profile' className='link' ><div>My Profile</div></Link>
                <Link to='/calendar' className='link' ><div>My Calendar</div></Link>
            </div>
        )
    }
}
export default Navbar;