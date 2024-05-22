import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const ListarTodos = () => {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/getAll')
            .then(response => {
                setLibros(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de libros:', error);
            });
    }, []);

    return (
        <Container>
            <Row className="mt-5">
                <Col className="text-center">
                    <h1>Libros disponibles</h1>
                </Col>
                <NavLink to={'/libro/busquedaPersonalizada'}>
                    <strong className='text-primary btn'>Busqueda personalizada</strong>
                </NavLink>
            </Row>
            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <Row className="mt-3">
                    {libros.map(libro => (
                        <Col key={libro._id} xs={12} md={6} lg={4} className="d-flex align-items-stretch">
                            <NavLink to={`/libro/detalle/${libro._id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <Card className="mb-3" style={{ backgroundColor: '#e6f7e6', width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{libro.nombre}</Card.Title>
                                        <Card.Text>
                                            <img src={libro.portada.slice(31)} alt="Foto Personal" style={{ maxWidth: '100px' }} /><br />
                                            <strong>Autor:</strong> {libro.autor}<br />
                                            <strong>Editorial:</strong> {libro.editorial}<br />
                                            <NavLink to={`/libro/detalle/${libro._id}`}>
                                                <strong className='text-primary btn'>Ver más...</strong>
                                            </NavLink><br/>
                                            <NavLink to={`/libro/actualizar/${libro._id}`}>
                                                <strong className='text-success btn'>Actualizar</strong>
                                            </NavLink><br/>
                                            <NavLink to={`/libro/eliminar/${libro._id}`}>
                                                <strong className='text-danger btn'>Eliminar</strong>
                                            </NavLink>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default ListarTodos;
