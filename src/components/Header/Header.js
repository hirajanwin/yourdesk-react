import React from 'react';
import { Navbar, Nav, Badge, Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useAuth0 } from "../../react-auth0-spa";
import './Header.css';

function Header() {
    const { isAuthenticated, loginWithPopup, logout, user } = useAuth0();
    let light = true;

    const handleSignIn = () => {
        loginWithPopup();
    }
    const handleSignOut = () => {
        logout();
    }

    const SignedIn = (isAuthenticated && 
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <div className="vl"/>
            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
            <div className="vl"/>
            &nbsp;
            { <Image style={{paddingLeft: 10}} style={{width: "40px", height: "40px"}} src={(user && user.picture) ? user.picture : ""} alt="" roundedCircle/>}
        </div>);
    const SignedOut = (!isAuthenticated && <Nav.Link onClick={handleSignIn}>Sign In</Nav.Link>);
    
    return (
        <Navbar collapseOnSelect expand="lg" bg={light ? "white" : "dark"} variant={light ? "light" : "dark"} className="Header">
            <Navbar.Brand href="/" style={{fontSize: "170%"}}>Desk Tour <Badge variant="danger">Beta</Badge> </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/explore" className="HeaderNav">Explore</Nav.Link>
                    <Nav.Link href="/charts" className="HeaderNav">Charts</Nav.Link>
                    <Nav.Link href="/share" className="HeaderNav">Share</Nav.Link>
                    <Nav.Link href="/about" className="HeaderNav">About</Nav.Link>
                </Nav>
                <Nav>
                    { isAuthenticated ? SignedIn : SignedOut }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Header);