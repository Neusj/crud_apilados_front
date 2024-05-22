import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BusquedaPersonalizada = () => {
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroAutor, setFiltroAutor] = useState('');
    const [filtroEditorial, setFiltroEditorial] = useState('');
    const [resultados, setResultados] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/getCustom`, {
                params: {
                    nombre: filtroNombre,
                    autor: filtroAutor,
                    editorial: filtroEditorial
                }
            });
            setResultados(response.data);
        } catch (error) {
            console.error('Error al buscar libros:', error);
        }
    };

    return (
        <Container>
            <h1>Busqueda Personalizada</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="filtroNombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" value={filtroNombre} onChange={(e) => setFiltroNombre(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="filtroAutor">
                    <Form.Label>Autor:</Form.Label>
                    <Form.Control type="text" value={filtroAutor} onChange={(e) => setFiltroAutor(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="filtroEditorial">
                    <Form.Label>Editorial:</Form.Label>
                    <Form.Control type="text" value={filtroEditorial} onChange={(e) => setFiltroEditorial(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-4'>
                    Buscar
                </Button>
            </Form>
            {resultados.length > 0 && (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}> {/* Establece el ancho máximo y centra los elementos */}
                    <h2>Resultados de la Búsqueda:</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {resultados.map((libro) => (
                            <li key={libro._id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                                <p>Nombre: {libro.nombre}</p>
                                <p>ISBN: {libro.isbn}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
};

export default BusquedaPersonalizada;
