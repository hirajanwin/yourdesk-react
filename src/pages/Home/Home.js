import React from 'react';
import homeImg from '../../assets/home.png';
import DeskCard from '../../components/DeskCard/DeskCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import { GET_DESKS, GET_PRODUCTS } from '../../util/api';
import { useQuery } from '@apollo/react-hooks';
import './Home.css'

export default function Home() {
    const { data: dataDesks } = useQuery(GET_DESKS);
    const { data } = useQuery(GET_PRODUCTS);
    let featuredDesks = dataDesks ? dataDesks.deskMany.slice(0, 4) : [];
    let featuredProducts = data ? data.productMany.slice(0, 3) : [];

    return (
        <div className="home-body">
            <div className="Home">
                <img className="DeskImage" alt="" src={homeImg}/>
                <h3 className="HomeSubtitle">Check out the desks other people work, game, and study on.</h3>
                <div className="FeaturedList">
                    {featuredDesks.map((desk, i) => <DeskCard key={i} desk={desk}/>)}
                </div>
                <h3 className="HomeSubtitle">Get their honest opinion on the products that they love.</h3>
                <div className="FeaturedList">
                    {featuredProducts.map((product, i) => <ProductCard key={i} product={product}/>)}
                </div>
                <h3 className="HomeSubtitle">Share your desk!</h3>
                <br/>
            </div>
        </div>
    );
}