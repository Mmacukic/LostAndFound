import { Component } from 'react';
import {Button, Input} from "reactstrap";

export class Registration extends Component {
    static displayName = Registration.name;

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
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    async handleRegister(event) {
        event.preventDefault();
        const { userName, password , firstName, lastName, email} = this.state;

        const response = await fetch('https://localhost:7186/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password, firstName, lastName, email })
        });

        const data = await response.json();
        if (response.ok) {
            this.setState({ message: 'Registration successful!' });
        } else{
            this.setState({ message: data || 'Registration failed' });
        }
    }
    

    render() {
        const { userName, password, message , firstName, lastName, email} = this.state;

        return (
            <div>
                <h1 id="tableLabel">Please Register</h1>
                <form onSubmit={this.handleRegister}>
                    <div>
                        <label>Username:</label>
                        <Input
                            type="text"
                            name="userName"
                            value={userName}
                            onChange={this.handleChange}></Input>
                    </div>
                    <div>
                        <label>First Name:</label>
                        <Input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={this.handleChange}></Input>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <Input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={this.handleChange}></Input>
                    </div>
                    <div>
                        <label>Email:</label>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}></Input>
                    </div>
                    <div>
                        <label>Password:</label>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}></Input>
                    </div>
          

                </form>
                <Button type={"submit"} onClick={this.handleRegister} style={{marginTop: '10px'}}>Register</Button>
                {message && <p>{message}</p>}
            </div>
        );
    }
}
