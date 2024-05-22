import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const AgregarLibro = () => {
    const [formData, setFormData] = useState({
        isbn: '',
        nombre: '',
        autor: '',
        paginas: '',
        portada: null,
        editorial: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        setFormData({ ...formData, portada: e.target.files[0] });
    };

    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        try {

            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            await axios.post('http://localhost:3000/add', formDataToSend);

            alert('Registro de libro exitoso');
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error al agregar libro:', error);
            alert('Error al agregar libro. Por favor, inténtalo de nuevo.');
        }
    };

    if (isSubmitted) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <h1 className="text-center">Agregar Nuevo Libro</h1>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="isbn">
                        <Form.Label>ISBN:</Form.Label>
                        <Form.Control type="text" name="isbn" value={formData.isbn} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="autor">
                        <Form.Label>Autor:</Form.Label>
                        <Form.Control type="text" name="autor" value={formData.autor} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="editorial">
                        <Form.Label>Editorial:</Form.Label>
                        <Form.Control type="text" name="editorial" value={formData.editorial} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="paginas">
                        <Form.Label>Páginas:</Form.Label>
                        <Form.Control type="number" name="paginas" value={formData.paginas} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="portada">
                        <Form.Label>Portada:</Form.Label>
                        <Form.Control type="file" name="portada" onChange={handleFileChange} required className="form-control-sm" />
                    </Form.Group>
                    
                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="primary" type="submit" style={{ minWidth: '150px' }}>
                            Agregar Libro
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default AgregarLibro