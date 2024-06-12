import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Map } from './map';

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
            message: '',
            userData: {},
            listings: [],
        };
        this.getUserData = this.getUserData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleLogOut() {
        localStorage.removeItem("token");
        window.location.reload(); // Refresh the page to reset the state
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

            localStorage.setItem("token", data);

            this.setState({ message: 'Login successful!'}, () => {
                this.getUserData(); // Fetch user data after login
                this.getAllListings(); // Fetch all listings after login
            });
        } catch (error) {
            console.error('Error during login:', error);
            this.setState({ message: 'Login failed. Please try again later.' });
        }
    }

    async handleDelete(listingId) {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`https://localhost:7186/api/listing/deleteListing/${listingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete: ' + response.statusText);
            }

            // Update state after deleting the listing
            this.setState(prevState => ({
                listings: prevState.listings.filter(listing => listing.listingId !== listingId)
            }));
        } catch (error) {
            console.error('Error during delete:', error);
        }
    }


    async getUserData() {
        const token = localStorage.getItem("token");

        const response = await fetch("https://localhost:7186/api/auth/getuser", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        this.setState({ userData: data });
    }

    async componentDidMount() {
        if (localStorage.getItem("token")) {
            await this.getUserData();
            await this.getAllListings();
        }
    }

    async getAllListings() {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7186/api/listing/getall", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        this.setState({ listings: data });
    }

    render() {
        const { listings, userName, password, message, userData } = this.state;

        if (localStorage.getItem("token")) {

            // Filter the listings to show only those posted by the logged-in user
            const userPosts = listings.filter(listing => listing.postedBy === userData.userName);

            return (
                <div className="profile-container">
                    <h1>Your Profile</h1>
                    <Form>
                        <div className="profile-details">
                            <div className="profile-item">
                                <label>Username:</label>
                                <span>{userData.userName}</span>
                            </div>
                            <div className="profile-item">
                                <label>First Name:</label>
                                <span>{userData.firstName}</span>
                            </div>
                            <div className="profile-item">
                                <label>Last Name:</label>
                                <span>{userData.lastName}</span>
                            </div>
                            <div className="profile-item">
                                <label>Email:</label>
                                <span>{userData.email}</span>
                            </div>
                        </div>
                        <Button type="button" onClick={this.handleLogOut} className="logout-button">
                            Log Out
                        </Button>
                    </Form>
                    <ul>
                        {userPosts.map(listing => (
                            <li key={listing.listingId} className="listing-item">
                                <div className="listing-details">
                                    <h2>{listing.itemType}</h2>
                                    <p><strong>Posted By:</strong> {listing.postedBy}</p>
                                    <p><strong>Message:</strong> {listing.message}</p>
                                    <p><strong>Address:</strong> {listing.address}</p>
                                    <Button className="logout-button" onClick={() => this.handleDelete(listing.listingId)}>Delete Listing</Button>
                                </div>
                                <div className="listing-map">
                                    <Map center={[listing.latitude, listing.longitude]} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return (
            <div>
                <h1 id="tableLabel">Please Login</h1>
                <p>If you don't have an account, please <a href="registration">Register</a></p>
                <form onSubmit={this.handleLogin}>
                    <div>
                        <label>Username:</label>
                        <Input type="text"
                               name="userName"
                               value={userName}
                               onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange} />
                    </div>
                    <Button type="submit" style={{ marginTop: '10px' }}>Log In</Button>
                </form>
                {message && <p>{message}</p>}
            </div>
        );
    }
}

export default LogIn;
