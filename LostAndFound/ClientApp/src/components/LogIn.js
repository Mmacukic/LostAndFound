import { Component } from 'react';
import {Registration} from "./Registration";
import {Button, Input} from "reactstrap";

export class LogIn extends Component {
    static displayName = LogIn.name;

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

 

    async handleLogin(event) {
        event.preventDefault();
        const { userName, password } = this.state;

        try {
            const response = await fetch('https://localhost:7186/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, password })
            });

            if (!response.ok) {
                throw new Error('Failed to login: ' + response.statusText);
            }

            const data = await response.text(); // Assuming the response is plain text token
            console.log('Login response:', data);

            localStorage.setItem("token", data);
            console.log('Token set in localStorage:', localStorage.getItem('token'));

            this.setState({ message: 'Login successful!' + '\n' + data });
        } catch (error) {
            console.error('Error during login:', error);
            this.setState({ message: 'Login failed. Please try again later.' });
        }
    }


    render() {
        const { userName, password, message } = this.state;

        return (
            <div>
                <h1 id="tableLabel">Please Login</h1>
                <p>If you don't have an account, please <a href="registration" >Register</a></p>
                <form onSubmit={this.handleLogin}>
                    <div>
                        <label>Username:</label>
                        <Input  type="text"
                                name="userName"
                                value={userName}
                                onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}/>
                    </div>
                    <Button type={"submit"}>Log In</Button>
                </form>
                {message && <p>{message}</p>}
            </div>
        );
    }
}
