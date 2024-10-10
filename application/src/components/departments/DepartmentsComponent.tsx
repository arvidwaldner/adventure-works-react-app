import React, { Component, useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import { Container, Image, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { slideInDown, fadeInDown } from "react-animations";
import DepartmentComponent from './DepartmentComponent';
import axios from "axios";

interface Department {
    departmentId: number,
    name: string,
    groupName: string,
    modifiedDate: string
}

const DepartmentsComponent: React.FC= () => {

    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('secret')
            .then((response) => {
                setDepartments(response.data as Department[]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            {departments.map(department => (
                <Container>
                    <DepartmentComponent key={department.departmentId} departmentId={department.departmentId} name={department.name} groupName={department.groupName} modifiedDate={department.modifiedDate} />
                </Container>
            ))}
        </Container>
    );
}

export default DepartmentsComponent;