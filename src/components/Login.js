import React from 'react';
import { Link } from 'react-router-dom';
import PasswordMask from 'react-password-mask';

class Login extends React.Component{
    state = {
        signUp: false,
        username: '',
        password: ''
    }

    toggleSignUp=()=>{
        this.setState({
            signUp: !this.state.signUp
        })
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        let {username , password} = this.state;
        return (
            <div className="login-page">
               { this.state.signUp ?
                <div>
                    <h2>Sign Up: </h2>
                    <input type="text" 
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => this.handleChange(e)}
                    />
                    <PasswordMask
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => this.handleChange(e)}
                        maxLength={10}
                        inputStyles={{width:'20%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                    }}
                    />
                    <p>Max password length: 10 characters</p>
                    <Link to={{pathname:`/profile`}}> 
                     <button onClick={()=>this.props.updateUsername(username)}>Submit</button>
                    </Link>
                </div>
                :
                <div> 
                    <h2>Login: </h2>
                    <input type="text" 
                            name="username"
                            placeholder="Login"
                            value={username}
                            onChange={(e) => this.handleChange(e)}
                        />
                    <br />
                    <PasswordMask
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => this.handleChange(e)}
                        maxLength={10}
                        inputStyles={{width:'20%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                    }}
                    />
                    <Link to={{pathname:`/profile`}}> 
                    <button onClick={()=>this.props.updateUsername(username)}>Submit</button>
                    </Link>
                    <br/>
                    <button onClick={this.toggleSignUp}>Create a new account</button>
                </div>               
                }
            </div>
        )
    }
}
export default Login;