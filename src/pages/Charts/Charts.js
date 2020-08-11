import React from 'react';
import DeskTable from '../../components/DeskTable/DeskTable';
import ProductTable from '../../components/ProductTable/ProductTable';
import { GET_DESKS, GET_PRODUCTS } from '../../util/api';
import { useQuery } from '@apollo/react-hooks';

import './Charts.css';

function getRandom(length) { return Math.floor(Math.random() * (length)); }


export default function Charts() {
    const { data: dataDesks } = useQuery(GET_DESKS, {
        variables: {
            filter: {}
        },
    });
    const { data } = useQuery(GET_PRODUCTS,
        {
            variables: {
                limit: 10
            }
        });
    let topDesks = dataDesks ? dataDesks.deskMany : [];
    let topProducts = data ? data.productMany : [];

    return (
        <div className="ContentBody">
            <div className="ChartsBody">
                <h5>Top Desks</h5>
                <DeskTable desks={topDesks} />
                <h5>Top Products</h5>
                <ProductTable products={topProducts} />
            </div>
        </div>
    );
}