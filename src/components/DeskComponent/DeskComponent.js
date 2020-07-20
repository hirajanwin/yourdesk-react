import React from 'react';
import Canvas from '../../components/Canvas/Canvas';
import ProductList from '../../components/ProductList/ProductList';
import DeskDetails from '../../components/DeskDetails/DeskDetails';
import { useDispatch } from 'react-redux';
import { addDeskProduct, clearAllDeskProducts } from '../../redux/actions';

export default function DeskComponent(props) {
    let {desk} = props;
    const dispatch = useDispatch();
    
    if (desk) {
        dispatch(clearAllDeskProducts());
        desk.desk_products.forEach(dp => {
            dispatch(addDeskProduct(dp, true, false));
        });
    }

    return (
        <div className="Body">
            {
                desk &&
                <div className="NewBody">
                    <DeskDetails desk={desk}/>
                    <Canvas show={true} image={desk.img}/>
                    <ProductList show={true} clickable/>
                </div>
            }
        </div>
    )
}