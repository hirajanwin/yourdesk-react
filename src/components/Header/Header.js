import React from 'react';
import { Navbar, Nav, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useAuth0 } from "../../util/react-auth0-spa";
import './Header.css';
import { FaSearch, FaChartLine, FaShare, FaRegQuestionCircle, FaUserAlt } from 'react-icons/fa';
import { GoSignIn, GoSignOut } from "react-icons/go";

function Header() {
    const { isAuthenticated, loginWithPopup, logout, user, loading } = useAuth0();
    let light = true;

    const handleSignIn = () => {
        loginWithPopup();
    }
    const handleSignOut = () => {
        logout();
    }

    let user_img = (user && user.picture) ? user.picture : "";

    const SignedIn = (isAuthenticated && user &&
        <div className="SignedIn" >
            <Nav.Link href={`/profile/${user.sub}`}><FaUserAlt /> Profile</Nav.Link>
            <Nav.Link onClick={handleSignOut}> <GoSignOut /> Sign Out</Nav.Link>
            &nbsp;
            {<Image style={{ width: "40px", height: "40px" }} src={user_img} alt="" roundedCircle />}
        </div>

    );
    const SignedOut = (!isAuthenticated &&
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>We won't send you any emails!</Tooltip>}
        >
            <Nav.Link onClick={handleSignIn}> <GoSignIn /> Sign In</Nav.Link>
        </OverlayTrigger>);

    return (
        <Navbar collapseOnSelect expand="lg" bg={light ? "white" : "dark"} variant={light ? "light" : "dark"} className="Header">
            <Navbar.Brand href="/" className="HeaderLogo" style={{ fontSize: "170%" }}>My Desk Tour</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/explore" className="HeaderNav"><FaSearch /> Explore</Nav.Link>
                    <Nav.Link href="/charts" className="HeaderNav"><FaChartLine /> Charts</Nav.Link>
                    <Nav.Link href="/share" className="HeaderNav"><FaShare /> Share</Nav.Link>
                    <Nav.Link href="/about" className="HeaderNav"><FaRegQuestionCircle /> About</Nav.Link>
                </Nav>
                <Nav>
                    {!loading && (isAuthenticated ? SignedIn : SignedOut)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Header);