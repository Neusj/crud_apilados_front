import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const EditarLibro = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        isbn: '',
        nombre: '',
        autor: '',
        paginas: '',
        portada: null,
        editorial: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/getById/${id}`)
            .then(response => {
                const libroData = response.data.libro;
                setFormData({
                    isbn: libroData.isbn,
                    nombre: libroData.nombre,
                    autor: libroData.autor,
                    paginas: libroData.paginas,
                    portada: libroData.portada,
                    editorial: libroData.editorial,
                });
            })
            .catch(error => {
                console.error('Error al obtener datos del libro:', error);
            });
    }, [id]);

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



            await axios.put(`http://localhost:3000/update/${id}`, formDataToSend);
            alert('Libro actualizado exitosamente');
            setIsSubmitted(true);

        } catch (error) {
            console.error('Error al actualizar libro:', error);
            alert('Error al actualizar libro. Por favor, inténtalo de nuevo.');
        }
    };

    if (isSubmitted) {
        return <Navigate to={`/libro/detalle/${id}`} />;
    }
    
    return (
        <Container>
            <h1>Editar Libro</h1>
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
                <Button variant="primary" type="submit">
                    Actualizar Libro
                </Button>
            </Form>
        </Container>
    );
}

export default EditarLibro;
