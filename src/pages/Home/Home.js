import React from 'react';
import newHomeImg from '../../assets/new-home.png';
import newHomeMobileImg from '../../assets/new-home-mobile.png';
import { Button } from 'react-bootstrap';
import DeskCard from '../../components/DeskCard/DeskCard';
import DeskComponent from '../../components/DeskComponent/DeskComponent';
import ProductCard from '../../components/ProductCard/ProductCard';
import { GET_DESKS, GET_PRODUCTS } from '../../util/api';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import './Home.css'

function getRandom(length) { return Math.floor(Math.random() * (length)); }

function getRandomSample(array, size) {
    var length = array.length;
    for (var i = size; i--;) {
        var index = getRandom(length);
        var temp = array[index];
        array[index] = array[i];
        array[i] = temp;
    }
    return array.slice(0, size);
}

export default function Home() {
    const { data: dataDesks } = useQuery(GET_DESKS);
    const { data } = useQuery(GET_PRODUCTS);
    let featuredDesks = dataDesks ? dataDesks.deskMany.filter(desk => desk.hashtags.includes("featured")) : [];
    let featuredProducts = data ? getRandomSample(data.productMany, 5) : [];
    featuredDesks = featuredDesks.filter(desk => desk !== undefined);
    var w = window.innerWidth;

    const history = useHistory();

    const handleClick = () => {
        history.push("/explore");
    }

    return (
        <div className="home-body">
            <div className="Home">
                <div className="Splash">
                    <div className="HeroTitle">
                        <h1>My Desk Tour</h1>
                        <div>
                            <h2>A place to share and get inspired by each other's desks!</h2>
                            <h5><i>WFH is hard. Don't make it harder with a bad desk setup!</i></h5>
                            <Button onClick={handleClick}>Explore</Button>
                        </div>
                    </div>
                    <img className="DeskImage" alt="" src={w > 600 ? newHomeImg : newHomeMobileImg} />
                </div>

                <h4 className="HomeSubtitle">Check out the desks other people work, game, and study on.</h4>
                <div className="FeaturedList">
                    {featuredDesks.map((desk, i) => <DeskCard key={i} desk={desk} />)}
                </div>
                <h4 className="HomeSubtitle">Get their honest opinion on the products that they love.</h4>
                <div className="FeaturedList">
                    {featuredProducts.map((product, i) => <ProductCard key={i} product={product} />)}
                </div>
                {/* Render in sample desk only if on desktop */}
                {(w > 600) && <h4 className="HomeSubtitle">Show off your desk!</h4>}
                {(w > 600) && <DeskComponent desk={featuredDesks[1]} />}
            </div>
        </div>
    );
}