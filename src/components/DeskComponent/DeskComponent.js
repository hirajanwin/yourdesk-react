import React from 'react';
import Canvas from '../../components/Canvas/Canvas';
import ProductList from '../../components/ProductList/ProductList';
import DeskDetails from '../../components/DeskDetails/DeskDetails';
import CommentSection from '../../components/Util/CommentSection';
import { useDispatch } from 'react-redux';
import { addDeskProduct, clearAllDeskProducts } from '../../redux/actions';
import './DeskComponent.css'

export default function DeskComponent({ desk, commentSection }) {
    const dispatch = useDispatch();

    if (desk) {
        dispatch(clearAllDeskProducts());
        desk.desk_products.forEach(dp => {
            dispatch(addDeskProduct(dp, true, false));
        });
    }

    return (
        <div>
            {
                desk &&
                <>
                    <div className="NewBody">
                        <DeskDetails desk={desk} />
                        <div className="DeskMain">
                            <Canvas show={true} image={desk.img} />
                            <CommentSection desk={desk} show={commentSection} />
                        </div>
                        <ProductList show={true} clickable />
                    </div>
                </>
            }
        </div>
    )
}