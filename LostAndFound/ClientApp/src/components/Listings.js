// Listings.js
import React, {Component} from "react";
import {Button, Input} from "reactstrap";
import {Map} from "./map";
import MapCreate from "./mapCreateListing";
import {Link} from "react-router-dom"; // Import withRouterComponent

export class Listings extends Component {
    static displayName = Listings.name;

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            itemType: '',
            latitude: 0.0,
            longitude: 0.0,
            address: '',
            allListings: [],
            showCreateForm: true,
            searchQuerry : "",
            filteredListings : [],
            messageInputs : {},
            setInput : ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
        this.getAllListings = this.getAllListings.bind(this);
        this.handleRemoveForm = this.handleRemoveForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateForm = this.handleCreateForm.bind(this);
        this.HandleMakePost = this.HandleMakePost.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);

    }

    async getAllListings() {
        const token = localStorage.getItem("token");
        const {message, itemType, latitude, longitude, address} = this.state;
        const response = await fetch("https://localhost:7186/api/listing/getall", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        this.setState({allListings: data});
    }

    async HandleMakePost(event) {
        event.preventDefault();
        const {message, itemType, latitude, longitude, address} = this.state;
        const token = localStorage.getItem("token");

        const response = await fetch("https://localhost:7186/api/listing/makepost", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({message, itemType, latitude, longitude, address})
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            alert('Post submitted successfully!');
            this.setState({
                message: '',
                itemType: '',
                latitude: 0.0,
                longitude: 0.0,
                showCreateForm: true
            });
            await this.getAllListings();
        } else {
            alert('Failed to submit post.');
        }
    }

    async componentDidMount() {
        if (localStorage.getItem("token")) {
            await this.getAllListings();
        }
    }

    handleCreateForm(event) {
        event.preventDefault();
        this.setState({showCreateForm: false});
    }

    handleLocationChange(location) {
        console.log("Location:", location);
        this.setState({
            latitude: location.lat,
            longitude: location.lng,
        });
    }

    handleRemoveForm(event) {
        event.preventDefault();
        this.setState({showCreateForm: true});
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    // Implement search functionality
    // Implement search functionality
    handleSearch(event) {
        event.preventDefault();
        const {allListings, searchQuery} = this.state;
        const filteredListings = allListings.filter((listing) =>
            listing.itemType.toLowerCase().includes(searchQuery.toLowerCase())
        );
        this.setState({filteredListings});
    }

    // Update search query state
    handleChangeSearch(event) {
        this.setState({searchQuery: event.target.value});
    }

    // Reset search query and filtered listings
    resetSearch() {
        this.setState({searchQuery: "", filteredListings: []});
    }
    async handleSendMessage(listingId, event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const message = this.state.messageInputs[listingId];  // Extract the message string directly
        const response = await fetch(`https://localhost:7186/api/messages/sendMessage/${listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message })  // Send as a JSON string
        });

        if (!response.ok) {
            alert("Failed to send message");
        } else {
            alert("Message sent");
        }
    }


    handleMessageChange = (listingId, event) => {
        this.setState(prevState => ({
            messageInputs: {
                ...prevState.messageInputs,
                [listingId]: event.target.value
            }
        }));    
    };

    render() {
        const { address, allListings, filteredListings, showCreateForm, message, itemType, latitude, longitude, searchQuery, messageInputs } = this.state;
        return (
            <div className="post-form-container">
                <h1>Search for listings</h1>
                <Input
                    type="text"
                    placeholder="Search by item type"
                    value={searchQuery}
                    onChange={this.handleChangeSearch}
                />
                <Button onClick={this.handleSearch}>Search</Button>
                <Button onClick={this.resetSearch}>Reset</Button>
                {showCreateForm ? (
                    <Button onClick={this.handleCreateForm}>Report a found item</Button>
                ) : (
                    <form onSubmit={this.HandleMakePost}>
                        <h2>Create a Post</h2>

                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <Input
                                id="message"
                                name="message"
                                value={message}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="itemType">Item Type:</label>
                            <Input
                                type="text"
                                id="itemType"
                                name="itemType"
                                value={itemType}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="itemType">Address:</label>
                            <Input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="latitude"></label>
                            <Input
                                type="number"
                                id="latitude"
                                name="latitude"
                                hidden={true}
                                value={latitude}
                                onChange={this.handleChange}
                                step="0.0001"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitude"></label>
                            <Input
                                type="number"
                                id="longitude"
                                name="longitude"
                                value={longitude}
                                hidden={true}
                                onChange={this.handleChange}
                                step="0.0001"
                                required
                            />
                            <div className="listing-map">
                                <MapCreate onLocationChange={this.handleLocationChange}/>
                            </div>
                        </div>
                        <Button type="submit" className={"login-button"}>Submit</Button>
                        <Button onClick={this.handleRemoveForm} className={"logout-button"}>Cancel</Button>
                    </form>
                )}

                <ul>
                    {filteredListings.length > 0
                        ? filteredListings.map((listing) => (
                            <li key={listing.listingId} className="listing-item">
                                <div className="listing-details">
                                    <h2>{listing.itemType}</h2>
                                    <p><strong>Posted By:</strong> {listing.postedBy}</p>
                                    <p><strong>Message:</strong> {listing.message}</p>
                                    <p><strong>Address:</strong> {listing.address}</p>
                                        <Button className={"login-button"}>Message User</Button>
                                </div>
                                <div className="listing-map">
                                    <Map center={[listing.latitude, listing.longitude]}/>
                                </div>
                            </li>
                        ))
                        : allListings.map((listing) => (
                            <li key={listing.listingId} className="listing-item">
                                <div className="listing-details">
                                    <h2>{listing.itemType}</h2>
                                    <p><strong>Posted By:</strong> {listing.postedBy}</p>
                                    <p><strong>Message:</strong> {listing.message}</p>
                                    <p><strong>Address:</strong> {listing.address}</p>
                                    <form onSubmit={(event) => this.handleSendMessage(listing.listingId, event)}>
                                        
                                    <Button type="submit" className="login-button">
                                        Message User
                                    </Button>
                                        <Input  type="text"
                                                value={messageInputs[listing.listingId] || ''}
                                                onChange={(event) => this.handleMessageChange(listing.listingId, event)}
                                                placeholder="Type your message here"
                                                className="message-input"></Input>
                                    </form>
                                </div>
                                <div className="listing-map">
                                    <Map center={[listing.latitude, listing.longitude]}/>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}


