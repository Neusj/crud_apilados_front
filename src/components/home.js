import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Home = () => {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/getAll')
            .then(response => {
                
                //Para mostrar los últimos registros agregados
                const latestLibros = response.data.slice(-3);
                setLibros(latestLibros);
            })
            .catch(error => {
                console.error('Error al obtener datos de libros:', error);
            });
    }, []);

    return(
        <Container>
            <Row className="mt-5">
                <Col className="text-center">
                    <h1>Bienvenido al gestor de libros de<br/> Librería Apilados</h1>
                </Col>
                <NavLink to={'/libro/busquedaPersonalizada'}>
                    <strong className='text-primary btn'>Busqueda personalizada</strong>
                </NavLink>
            </Row>
            <Row className="mt-3">
                {libros.map(libro => (
                    <Col key={libro._id} xs={12} md={6} lg={4} className="d-flex align-items-stretch">
                         <Card className="mb-3" style={{ backgroundColor: '#e6f7e6', width: '100%' }}>
                            <Card.Body>
                                <Card.Title>{libro.nombre}</Card.Title>
                                <Card.Text>
                                    <img src={libro.portada.slice(31)} alt="Foto Personal" style={{ maxWidth: '100px' }} /><br />
                                    <strong>Autor:</strong> {libro.autor}<br />
                                    <strong>Editorial:</strong> {libro.editorial}<br />
                                    <NavLink to={`/libro/detalle/${libro._id}`}>
                                        <strong className='text-primary btn'>Ver más...</strong>
                                    </NavLink>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
