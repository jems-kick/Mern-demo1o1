import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Info = (props) => {
    return (
        <div>
            <input type="text" onChange={props.outputvalue} value={props.value}></input>
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header><input type="text" onChange={props.outputvalue} value={props.value}></input></Card.Header>
                <Card.Body>
                    <Card.Title>Primary Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                        </Card.Text>
                </Card.Body>
            </Card>
            <br />
        </div>
    )
}

export default Info;