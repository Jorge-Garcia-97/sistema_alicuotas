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
  saveAdministrador,
  saveUsuario,
} from '../../services/Post';
import { EditIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import './style.css';

export const RegistroAdministrador= props => {
  const { stateChanger, isOpen, setIsOpen } = props;
  const [inputs, setInputs] = useState({
    nombre: '',
    celular: '',
    correo: '',
    celular: '',
    estado: '',
  });
  const [file, setfile] = useState(null);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const guardarRegistro = async () => {
    let data = {...inputs};
    if (data.nombre !== "" && data.celular !== "" && data.correo !== "" && data.celular !=="" && data.estado !== "") {
      let data_user = {
        correo: data.correo,
        password: 'admin123',
      };
      const resp = await saveUsuario(data_user);
      if (resp.id > 0) {
        const response = await saveAdministrador(data, resp.id);
        if (response.id > 0) {
            if (response) {
              Toast.fire({
                icon: 'success',
                title: 'Registro exitoso'
              })
              setIsOpen(false);
              stateChanger(true);
            }else{
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
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Necesitas llenar todos los datos'
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

  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro de nuevo Administrador</ModalHeader>
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
                      type="text"
                      value={inputs.nombre}
                      onChange={handleInputChange}
                      placeholder="Nombres"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="celular">Celular</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="celular"
                      name="celular"
                      type="text"
                      value={inputs.celular}
                      onChange={handleInputChange}
                      placeholder="Celular"
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
              </ModalBody>
            </div>
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
