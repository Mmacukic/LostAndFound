import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1>Welcome to Lost & Found!</h1>
                <p>Your go-to platform for reuniting lost items with their owners.</p>

                <ul>
                    <li><strong>Report Lost or Found Items:</strong> Create a listing for items you have lost or found to help others locate them.</li>
                    <li><strong>Search for Items:</strong> Browse through the listings to find or report items in your area.</li>
                    <li><strong>Register and Log In:</strong> Sign up to manage your listings and communicate with other users.</li>
                    <li><strong>Message Other Users:</strong> Contact users who have posted listings to arrange item returns or pickups.</li>
                </ul>

                <p>Here are some features to help you get started:</p>

                <ul>
                    <li><strong>Easy Registration:</strong> Create an account to start posting and managing your lost and found items.</li>
                    <li><strong>Detailed Listings:</strong> Add photos, descriptions, and locations to your posts to make them more effective.</li>
                    <li><strong>User Messaging:</strong> Use our built-in messaging system to communicate securely with other users.</li>
                    <li><strong>Location-Based Search:</strong> Find lost items based on their location using our integrated map feature.</li>
                </ul>

                <p>To begin using Lost & Found, consider these steps:</p>

                <ul>
                    <li><strong>Register or Log In:</strong> Access all features by registering an account or logging in.</li>
                    <li><strong>Post a Listing:</strong> If you've lost or found an item, create a detailed listing to notify others.</li>
                    <li><strong>Search Listings:</strong> Look through existing posts to see if someone has reported an item you lost or found.</li>
                    <li><strong>Contact Users:</strong> Use the messaging system to connect with other users about their listings.</li>
                </ul>


                <p>We hope you find what you're looking for. Together, we can make a difference in reuniting lost items with their rightful owners!</p>
            </div>
        );
    }
}

export default Home;
