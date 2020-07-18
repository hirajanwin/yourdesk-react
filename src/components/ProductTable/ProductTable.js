import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

export default function ProductTable(props) {
    let { products } = props;
    return (
        <Table responsive>
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
                products.slice(0, 10).map((product, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{product.title}</td>
                        <td><Image width="60px" src={product.image}/></td>
                        <td>{product.prices.length > 0 ? "$" + product.prices[0].value : ""}</td>
                        <td>  <Button href={product.link} target ="_blank" variant="success">Buy</Button>{' '}</td>
                    </tr>

                ))
            }
        </tbody>
        </Table>        
    );
}
