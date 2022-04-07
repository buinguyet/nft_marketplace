import React from "react";
import {
    Col,
    Form,
    FormGroup,
    Modal,
    Row,
    Card
  } from "react-bootstrap";
import { ethers } from "ethers"
import './style.css';

const convertEthToUsdt= (value)=>{
    const usdt= value* 3196;
    const finalUsdt= usdt.toFixed(2);
    return finalUsdt;
}

const Detail= ({openDetail, onCloseModal, item})=> {
    return (
        <>
         <Modal show={openDetail} onHide={onCloseModal} centered>
            <Modal.Header style={{backgroundColor: "#8D8DAA", height: 40,}}>
            <Modal.Title style={{fontWeight: "bold", color: "white"}}>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <FormGroup>
                <Row style={{justifyContent: 'center' }}>
                <Card style={{ width: '18rem', marginBottom: 10 }}>
                    <Card.Img variant="top" src={item.image} />
                </Card>
                    <Col md={6} className="mb-3">
                    <Form.Label style={{fontWeight: "bold"}}>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={item.name}
                        disabled
                    />
                    </Col>

                    <Col md={6} className="mb-3">
                    <Form.Label style={{fontWeight: "bold"}}>Price</Form.Label>
                    <Form.Control
                        required
                        value={`${ethers.utils.formatEther(item.totalPrice)} ETH ~ ${convertEthToUsdt(ethers.utils.formatEther(item.totalPrice))} USDT`}
                        disabled
                    />
                    </Col>

                    <Col md={12} className="mb-3">
                    <Form.Label style={{fontWeight: "bold"}}>Price in USD</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        value={item.description}
                        disabled
                    />
                    </Col>
                </Row>
                </FormGroup>
            </Form>
            </Modal.Body>
        </Modal>
        </>
       
    );
}

export default Detail