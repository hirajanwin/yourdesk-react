import React, {useState} from 'react';
import deskImg from '../../assets/desk2.png';
import DeskCard from '../../components/DeskCard/DeskCard';
// import DeskComponent from '../../components/DeskComponent/DeskComponent';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Alert } from 'react-bootstrap';
import Fade from '../../components/Util/Fade';
import { GET_DESKS, GET_PRODUCTS } from '../../util/api';
import { useQuery } from '@apollo/react-hooks';
import './Home.css'

export default function Home() {
    const { data: dataDesks } = useQuery(GET_DESKS);
    const { data } = useQuery(GET_PRODUCTS);
    let featuredDesks = dataDesks ? dataDesks.deskMany.slice(0, 4) : [];
    let featuredProducts = data ? data.productMany.slice(0, 4) : [];
    const [showAlert, setShowAlert] = useState(true);

    return (
        <div className="body">
                {<Fade in={showAlert} component={<Alert onClick={() => setShowAlert(false)} variant={'warning'} dismissible>Warning, this site is still under heavy construction <span role="img">🚧👷‍♂️🚧</span></Alert>} />}
            <div className="Home">
                <div className="SplashText">
                    <h1 className="HomeTitle">If you spend a lot of time on your desk, make sure that you love it!</h1>
                </div>
                <img className="DeskImage" alt="" src={deskImg}/>
                <h3 className="HomeSubtitle">Check out the desks other people work/game/study on.</h3>
                <div className="FeaturedList">
                    {featuredDesks.map((desk, i) => <DeskCard key={i} desk={desk}/>)}
                </div>
                <h3 className="HomeSubtitle">Get their honest opinion on the products that they love.</h3>
                <div className="FeaturedList">
                    {featuredProducts.map((product, i) => <ProductCard key={i} product={product}/>)}
                </div>
                <h3 className="HomeSubtitle">Share your desk!</h3>
                {/* <DeskComponent desk={singleDesk}/> */}
            </div>
        </div>
    );
}