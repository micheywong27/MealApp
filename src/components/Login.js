import React from 'react';

class Login extends React.Component{
    render(){
        return (
            <div>
                <h2>Login: </h2>
                <input type="text" 
                                name="login"
                                placeholder="Login" 
                                />
                                <br />
                <button type="submit">Submit</button>
                <br />
                <h2>Sign Up: </h2>
                <input type="text" 
                                name="login"
                                placeholder="Sign up" 
                                />
                <br />
                <button type="submit">Submit</button>
            </div>
        )
    }
}
export default Login;