import React from 'react';
import './Privacy.css'
import { Card } from 'react-bootstrap';

export default function Privacy() {
    return (
        <div>
            <div className="Privacy">
                <Card style={{ padding: 30 }}>
                    <h2>Privacy Policy</h2>
                    <br />

                    <h4>User Data</h4>
                    <p>
                        MyDeskTour requests user data in order to build profiles and maintain the database of desks for each user.
                        This user data is requested and authenticated entirely through Auth0.</p>
                    <p>
                        When signed in, users can view all of the information stored through Auth0 in the settings page.
                    </p>
                    <p>MyDeskTour will never send emails to users without expressed permission.</p>
                    <p>
                        MyDeskTour will never share user data or any user information publicly or with any third party without expressed permission.
                    </p>
                    <p>MyDeskTour makes good faith efforts to store user data securely, but can make no guarantees.</p>

                    <h4>User Data</h4>
                    <p>MyDeskTour does use Google Analytics to capture metrics relevant to the website's performance.</p>
                    <h4>Product Services</h4>
                    <p>MyDeskTour uses Rainforest API to retrieve Amazon product data.</p>
                    <p>
                        As of August 2020, MyDeskTour is not affiliated with Amazon or any related product services.
                        MyDeskTour does however reserve the right to establish affiliation with Amazon or any related product services,
                        and profit from purchases made through product links and redirects.
                    </p>
                    <h4>Advertisements</h4>
                    <p>
                        As of August 2020, MyDeskTour does not feature any advertisements on the website.
                        MyDeskTour does however reserve the right to feature advertisements on the website.
                    </p>

                </Card>
            </div>
        </div>
    );
}