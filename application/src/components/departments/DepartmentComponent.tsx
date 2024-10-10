import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import { Container, Image, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { slideInDown, fadeInDown } from "react-animations";

interface DepartmentProps {
    departmentId: number,
    name: string,
    groupName: string,
    modifiedDate: string
}

const DepartmentComponent: React.FC<DepartmentProps> = ({ departmentId, name, groupName, modifiedDate }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>{departmentId}: {name}</Card.Title>
                            <Card.Text>
                                Group: {groupName}
                                <br />
                                Modified: {new Date(modifiedDate).toLocaleDateString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DepartmentComponent;