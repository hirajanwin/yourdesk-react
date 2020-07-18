import React from 'react';
import { Table, Button, Image, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function ProductTable(props) {
    let { products } = props;

    const history = useHistory();

    const handleClick = (id) => {
        history.push("/product/" + id);
    }

    return (
        <Card>
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
                                <td style={{ maxWidth: 200 }}>{product.title.length > 40 ? product.title.slice(0, 40) + "..." : product.title}</td>
                                <td><Image width="60px" src={product.image} /></td>
                                <td>{product.prices.length > 0 ? "$" + product.prices[0].value : ""}</td>
                                <td>
                                    <Button onClick={() => handleClick(product._id)} target="_blank">Check it out!</Button> &nbsp;
                                    <Button href={product.link} target="_blank" variant="success">Buy</Button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </Table>
        </Card>
    );
}
