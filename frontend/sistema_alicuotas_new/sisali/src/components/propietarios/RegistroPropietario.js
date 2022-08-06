import React, { useEffect, useRef, useState } from 'react';
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
import { createStandaloneToast } from '@chakra-ui/toast';
import './style.css';
import {
  validadorIdentidades,
  validarCorreo,
  validarLetras,
  validarTelefonos,
} from './validaciones';
import { get } from '../../services/Get';

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
  const { ToastContainer, toast } = createStandaloneToast();

  useEffect(() => {
    setInputs({
      nombre: '',
      apellido: '',
      cedula: '',
      correo: '',
      telefono: '',
      rol: '',
    });
    return () => {
      setInputs({});
    }
  }, [isOpen])
  

  const guardarRegistro = async () => {
    let data = { ...inputs };
    if (
      data.apellido !== '' &&
      data.nombre !== '' &&
      data.cedula !== '' &&
      data.correo !== '' &&
      data.rol !== '' &&
      data.telefono !== ''
    ) {
      if (
        validarLetras(data.apellido) &&
        validarLetras(data.nombre) &&
        validarCorreo(data.correo) &&
        validarTelefonos(data.telefono)
      ) {
        if (validadorIdentidades(data.cedula)) {
          const if_exist = await get(`propietario/by-cedula/${data.cedula}`);
          if (if_exist.length == 0) {
            let data_user = {
              correo: data.correo,
              password: 'admin123',
            };
            const resp = await saveUsuario(data_user);
            if (resp.id > 0) {
              const response = await savePropietario(data, resp.id);
              if (response.id > 0) {
                if (file) {
                  const formdata = new FormData();
                  formdata.append('image', file);
                  let carga = await saveImagenPropietario(
                    formdata,
                    response.id
                  );
                  document.getElementById('fileinput').value = null;
                  setfile(null);
                  if (carga) {
                    setIsOpen(false);
                    stateChanger(true);
                    toast({
                      title: 'Registro realizado con éxito',
                      description: 'Se registró el propietario.',
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                      position: 'top-right',
                    });
                  } else {
                    toast({
                      title: 'Error',
                      description: 'Se encontró un error al cargar la imagen.',
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                      position: 'top-right',
                    });
                  }
                }
              } else {
                toast({
                  title: 'Error',
                  description:
                    'Se encontró un error al registrar el propietario.',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                  position: 'top-right',
                });
              }
            } else {
              toast({
                title: 'Error',
                description: 'Se encontró un error al registrar el usuario.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
              });
            }
          } else {
            var usuario_temp = if_exist[0];
            if (usuario_temp.estado_propietario === 'ACTIVO') {
              toast({
                title: 'Error',
                description:
                  'Ya existe un usuario con el número de cédula ingresado.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
              });
            } else {
              toast({
                title: 'Error',
                description:
                  'Ya existe un usuario deshabilitado con el número de cédula ingresado. Por favor solicite al administrador que elimine el registro mencionado o que lo actualice.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
              });
            }
          }
        } else {
          toast({
            title: 'Error',
            description: 'El número de cédula ingresado no es válido.',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
        }
      } else {
        toast({
          title: 'Cuidado',
          description: 'Se deben ingresar datos correctos en los campos solicitados.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } else {
      toast({
        title: 'Cuidado',
        description: 'Se deben ingresar todos los datos solicitados.',
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const selectedHandler = e => {
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
        motionPreset="slideInBottom"
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
                      type="text"
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
                      <option value="Propietario">Propietario</option>
                      <option value="Arrendatario">Arrendatario</option>
                      <option value="Presidente">Presidente</option>
                      <option value="Vicepresidente">Vicepresidente</option>
                      <option value="Secretario">Secretario</option>
                      <option value="Tesorero">Tesorero</option>
                      <option value="Vocal">Vocal Principal</option>
                      <option value="Vocal-sup">Vocal Suplente</option>
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
            <Button colorScheme="telegram" mr={3} onClick={guardarRegistro}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};
