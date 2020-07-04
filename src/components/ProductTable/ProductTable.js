import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

export default function ProductTable(props) {
    let { products } = props;
    return (
        <Table responsive>
        <thead>
            <tr>
            <th>#</th>
            <th>Title</th>
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
                        <td>{product.title}</td>
                        <td><Image width="60px" src={product.image}/></td>
                        <td>{product.prices.length > 0 ? "$" + product.prices[0].value : ""}</td>
                        <td>  <Button href={product.url} target ="_blank" variant="success">See it on Amazon</Button>{' '}</td>
                    </tr>

                ))
            }
        </tbody>
        </Table>        
    );
}