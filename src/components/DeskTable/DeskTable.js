import React from 'react';
import { Table, Button, Image, Card } from 'react-bootstrap';

export default function DeskTable(props) {
    let { desks } = props;
    return (
        <Card>

            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>User</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        desks.filter(desk => (desk && desk.user)).map((desk, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><a href={"/desk/" + desk.user.user_id + "/" + desk._id}>{desk.name}</a></td>
                                    <td>{desk.user.name}</td>
                                    <td><Image width="80px" src={desk.img} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Card>
    );
}