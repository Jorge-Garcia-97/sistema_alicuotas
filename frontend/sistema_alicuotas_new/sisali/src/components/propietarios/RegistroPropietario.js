import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import {
  saveImagenPropietario,
  savePropietario,
  saveUsuario,
} from '../../services/Post';
import { EditIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import './style.css';

export const RegistroPropietario = props => {
  const { stateChanger, isOpen, setIsOpen } = props;
  const [inputs, setInputs] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
    rol: '',
  });
  const [file, setfile] = useState(null);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const guardarRegistro = async () => {
    let data = {...inputs};
    if (data.apellido !== "" && data.nombre !== "" && data.cedula !== "" && data.correo !== "" && data.rol !=="" && data.telefono !== "") {
      let data = {
        correo: inputs.correo,
        password: 'admin123',
      };
      const resp = await saveUsuario(data);
      if (resp.id > 0) {
        const response = await savePropietario({ ...inputs }, resp.id);
        if (response.id > 0) {
          if (file) {
            const formdata = new FormData();
            formdata.append("image", file);
            let carga = await saveImagenPropietario(formdata, response.id);
            document.getElementById("fileinput").value = null;
            setfile(null);
            if (carga) {
              Toast.fire({
                icon: 'success',
                title: 'Registro exitoso'
              })
              setIsOpen(true);
              stateChanger(true);
            }else{
              Toast.fire({
                icon: 'error',
                title: 'Algo ha salido mal'
              })
            }
          }        
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Algo ha salido mal'
          })
        }
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Algo ha salido mal'
        })
      }
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Algo ha salido mal'
      })
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
      container: 'container-popup',
      popup: 'popup'
    }
  });

  const selectedHandler = (e) => {
    setfile(e.target.files[0]);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = e => {
    let tmpName = e.target.name;
    let tmpValue = e.target && e.target.value;
    let _tmp = { ...inputs };
    _tmp[`${tmpName}`] = tmpValue;
    setInputs(_tmp);
  };

  // const handleError = () => {};

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro de nuevo Propietario</ModalHeader>
          <ModalCloseButton />
          <div className="row">
            <div className="col-sm-6">
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel htmlFor="nombre">Nombres</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      ref={initialRef}
                      id="nombre"
                      name="nombre"
                      type="tel"
                      value={inputs.nombre}
                      onChange={handleInputChange}
                      placeholder="Nombres"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="cedula">Cédula</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="cedula"
                      name="cedula"
                      type="text"
                      value={inputs.cedula}
                      onChange={handleInputChange}
                      placeholder="Cédula"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="correo">Correo</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EmailIcon color="gray.300" />}
                    />
                    <Input
                      id="correo"
                      name="correo"
                      type="text"
                      value={inputs.correo}
                      onChange={handleInputChange}
                      placeholder="Correo"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </ModalBody>
            </div>
            <div className="col-sm-6">
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel htmlFor="nombre">Apellidos</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="apellido"
                      name="apellido"
                      type="text"
                      value={inputs.apellido}
                      onChange={handleInputChange}
                      placeholder="Apellidos"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<PhoneIcon color="gray.300" />}
                    />
                    <Input
                      id="telefono"
                      name="telefono"
                      type="text"
                      value={inputs.telefono}
                      onChange={handleInputChange}
                      placeholder="Teléfono"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="rol">Rol</FormLabel>
                  <InputGroup>
                    <Select
                      placeholder="Selecciona una opción"
                      id="rol"
                      value={inputs.rol}
                      name="rol"
                      onChange={handleInputChange}
                      variant="flushed"
                    >
                      <option value="Administrador">Administrador</option>
                      <option value="Propietario">Propietario</option>
                      <option value="Presidente">Presidente</option>
                      <option value="Vicepresidente">Vicepresidente</option>
                      <option value="Secretario">Secretario</option>
                      <option value="Tesorero">Tesorero</option>
                      <option value="Vocal">Vocal</option>
                    </Select>
                  </InputGroup>
                </FormControl>
              </ModalBody>
            </div>
          </div>
          <div className="container px-4">            
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="correo">Imagen</FormLabel>
              <input
                id="fileinput"
                onChange={selectedHandler}
                className="form-control"
                type="file"
              />
            </FormControl>
          </div>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={guardarRegistro}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>          
        </ModalContent>
      </Modal>
    </>
  );
};
