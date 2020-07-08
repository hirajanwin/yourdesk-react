import React from 'react';
import DeskTable from '../../components/DeskTable/DeskTable';
import ProductTable from '../../components/ProductTable/ProductTable';
import { GET_DESKS, GET_PRODUCTS } from '../../util/api';
import { useQuery } from '@apollo/react-hooks';

export default function Charts() {
    const { data: dataDesks } = useQuery(GET_DESKS);
    const { data } = useQuery(GET_PRODUCTS);
    let topDesks = dataDesks ? dataDesks.deskMany : [];
    let topProducts = data ? data.productMany : [];

    return (
        <div className="body">
            <p>NOTE: none of the data is actually being ranked, but I imagine this could be a cool feature later...</p>
            <p>Top Desks</p>
            <DeskTable desks={topDesks}/>
            <p>Top Products</p>
            <ProductTable products={topProducts}/>
        </div>
    );
}