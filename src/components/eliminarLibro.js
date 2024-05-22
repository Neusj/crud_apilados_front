import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const EliminarLibro = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleDelete = () => {
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(response => {
                console.log('Libro eliminado exitosamente:', response.data);
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error al eliminar libro:', error);
            });
    };

    if (isSubmitted) {
        return <Navigate to="/libro/listar" />;
    }


    return (
        <Container>
            <h1>Eliminar Libro</h1>
            <Button variant="danger" onClick={handleShow}>Eliminar Libro</Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este libro?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default EliminarLibro;
