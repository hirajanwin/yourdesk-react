import React from 'react';
import DeskTable from '../../components/DeskTable/DeskTable';
import ProductTable from '../../components/ProductTable/ProductTable';
import { GET_DESKS, GET_PRODUCTS } from '../../util/api';
import { useQuery } from '@apollo/react-hooks';

import './Charts.css';

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

export default function Charts() {
    const { data: dataDesks } = useQuery(GET_DESKS);
    const { data } = useQuery(GET_PRODUCTS);
    let topDesks = dataDesks ? dataDesks.deskMany.slice(0, 10) : [];
    let topProducts = data ? getRandomSample(data.productMany, 10) : [];

    return (
        <div className="Body">
            <div className="ChartsBody">
                <h5>Top Desks</h5>
                <DeskTable desks={topDesks} />
                <h5>Top Products</h5>
                <ProductTable products={topProducts} />
            </div>
        </div>
    );
}