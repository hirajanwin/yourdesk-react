import React, { useEffect } from 'react';
import { Navbar, Nav, Image, Badge } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useAuth0 } from "../../util/react-auth0-spa";
import './Header.css';
import { FaSearch, FaChartLine, FaShare, FaRegQuestionCircle, FaUserAlt } from 'react-icons/fa';
import { useMutation } from '@apollo/react-hooks';
import { GoSignIn, GoSignOut } from "react-icons/go";
import { TRY_CREATE_USER } from '../../util/api';

function Header() {
    const { isAuthenticated, loginWithPopup, logout, user, loading } = useAuth0();
    let [tryCreateUser] = useMutation(TRY_CREATE_USER);
    let light = true;

    useEffect(() => {
        if (user) {
            let { sub, name, picture, nickname } = user;
            tryCreateUser({
                variables: {
                    user_id: sub,
                    name: name,
                    picture: picture,
                    nickname: nickname,
                }
            })
        }
    }, [user])


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
            {<a href={`/profile/${user.sub}`}><Image style={{ width: "40px", height: "40px" }} src={user_img} alt="" roundedCircle /></a>}
        </div>

    );
    const SignedOut = (!isAuthenticated && <Nav.Link onClick={handleSignIn}> <GoSignIn /> Sign In</Nav.Link>);

    return (
        <Navbar collapseOnSelect expand="lg" bg={light ? "white" : "dark"} variant={light ? "light" : "dark"} className="Header">
            <Navbar.Brand href="/" className="HeaderLogo" style={{ fontSize: "170%" }}>
                My Desk Tour
                <Badge
                    style={{ marginLeft: 8, fontFamily: "arial", display: "inline", fontSize: "50%" }}
                    variant="danger" size="sm">Beta</Badge>
            </Navbar.Brand>
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