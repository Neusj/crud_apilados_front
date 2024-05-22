
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavbarExample from './layouts/navbar';
import AgregarLibro from './components/agregarLibro';
import Contact from './components/contact';
import Home from './components/home';
import ListarTodos from './components/listarTodos';
import DetalleLibro from './components/detalleLibro';
import EliminarLibro from './components/eliminarLibro';
import EditarLibro from './components/actualizarLibro';
import BusquedaPersonalizada from './components/busquedaPersonalizada';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<NavbarExample/>}>
            <Route index element = {<Home/>}></Route>
            <Route path='libro/nuevo' element = {<AgregarLibro/>}></Route>
            <Route path='libro/listar' element = {<ListarTodos/>}></Route>
            <Route path='libro/detalle/:id' element = {<DetalleLibro/>}></Route>
            <Route path='libro/eliminar/:id' element = {<EliminarLibro/>}></Route>
            <Route path='libro/actualizar/:id' element = {<EditarLibro/>}></Route>
            <Route path='libro/busquedaPersonalizada' element = {<BusquedaPersonalizada/>}></Route>

            {/*Para rutas que no esten registradas redirecciona al home*/}
            <Route path='*' element={<Navigate replace to={'/'}/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
