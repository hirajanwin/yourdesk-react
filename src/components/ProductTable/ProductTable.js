import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

export default function ProductTable(props) {
    let { products } = props;
    return (
        <Table responsive>
        <thead>
            <tr>
            <th>#</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Category</th>
            <th>Image</th>
            <th>Price</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
                products.map((product, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{product.brand}</td>
                        <td>{product.model}</td>
                        <td>{product.category}</td>
                        <td><Image width="60px" src={product.img}/></td>
                        <td>${product.price}</td>
                        <td>  <Button href={product.url} target ="_blank" variant="success">See it on Amazon</Button>{' '}</td>
                    </tr>

                ))
            }
        </tbody>
        </Table>        
    );
}