import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const DetalleLibro = ({ match }) => {
    const [libro, setLibro] = useState(null);
    const [rutaFoto, setRutaFoto] = useState('');
    const { id } = useParams();

    useEffect(() => {

        axios.get(`http://localhost:3000/getById/${id}`)
            .then(response => {
                setLibro(response.data.libro);
                let photo = response.data.libro.portada.slice(31)
                setRutaFoto(`${photo}`);
            })
            .catch(error => {
                console.error('Error al obtener datos del libro:', error);
            });
    }, [id]);

    if (!libro) {
        return <div>Cargando...</div>;
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col className="text-center">
                    <h1>Detalle del Libro</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12} md={6} lg={4} className="d-flex align-items-stretch">
                    <Card className="mb-3" style={{ backgroundColor: '#e6f7e6', width: '100%' }}>
                        <Card.Body>
                            <Card.Title>{libro.nombre}</Card.Title>
                            <Card.Text>
                                <img src={rutaFoto} alt="Foto Personal" style={{ maxWidth: '100px' }} /><br />
                                <strong>ISBN:</strong> {libro.isbn}<br />
                                <strong>Autor:</strong> {libro.autor}<br />
                                <strong>Editorial:</strong> {libro.editorial}<br />
                                <strong>Cantidad de páginas:</strong> {libro.paginas}<br />
                                
                                <NavLink to={`/libro/actualizar/${libro._id}`}>
                                    <strong className='text-success btn'>Actualizar</strong>
                                </NavLink><br/>
                                <NavLink to={`/libro/eliminar/${libro._id}`}>
                                    <strong className='text-danger btn'>Eliminar</strong>
                                </NavLink>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleLibro;
