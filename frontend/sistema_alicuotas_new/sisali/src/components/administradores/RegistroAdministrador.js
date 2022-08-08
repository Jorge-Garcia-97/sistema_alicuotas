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
import { saveAdministrador, saveUsuario } from '../../services/Post';
import { EditIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { createStandaloneToast } from '@chakra-ui/toast';
import './style.css';
import {
  validadorIdentidades,
  validarCorreo,
  validarLetras,
  validarTelefonos,
} from '../propietarios/validaciones';
import { get } from '../../services/Get';

export const RegistroAdministrador = props => {
  const { stateChanger, isOpen, setIsOpen } = props;
  const [inputs, setInputs] = useState({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    estado: 'ACTIVO',
  });
  const { ToastContainer, toast } = createStandaloneToast();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    setInputs({
      nombre: '',
      cedula: '',
      correo: '',
      telefono: '',
      estado: 'ACTIVO',
    });
    return () => {
      setInputs({});
    };
  }, [isOpen]);

  const guardarRegistro = async () => {
    let data = { ...inputs };
    if (
      data.nombre !== '' &&
      data.cedula !== '' &&
      data.correo !== '' &&
      data.telefono !== ''
    ) {
      if (
        validarLetras(data.nombre) &&
        validarCorreo(data.correo) &&
        validarTelefonos(data.telefono)
      ) {
        if (validadorIdentidades(data.cedula)) {
          const if_exist = await get(`administrador/by-cedula/${data.cedula}`);
          if (if_exist.length == 0) {
            let data_user = {
              correo: data.correo,
              password: 'admin123',
            };
            const resp = await saveUsuario(data_user);
            if (resp.id > 0) {
              const response = await saveAdministrador(data, resp.id);
              if (response) {
                setIsOpen(false);
                stateChanger(true);
                toast({
                  title: 'Registro realizado con éxito',
                  description: 'Se registró el usuario administrador.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                  position: 'top-right',
                });
              } else {
                toast({
                  title: 'Error',
                  description:
                    'Se encontró un error al registrar el usuario administrador.',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                  position: 'top-right',
                });
              }
            } else {
              toast({
                title: 'Error',
                description:
                  'Se encontró un error al registrar el usuario administrador.',
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
          description:
            'Se deben ingresar datos correctos en los campos solicitados.',
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
          <ModalHeader>Registro de nuevo Administrador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="px-3">
              <div className="d-flex">
                <FormControl isRequired className="me-3">
                  <FormLabel htmlFor="nombre">Nombres: </FormLabel>
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
                <FormControl isRequired className="ms-3">
                  <FormLabel htmlFor="cedula">Cédula: </FormLabel>
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
              </div>
              <div className="d-flex">
                <FormControl mt={4} isRequired className="me-3">
                  <FormLabel htmlFor="correo">Correo: </FormLabel>
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
                <FormControl mt={4} isRequired className="ms-3">
                  <FormLabel htmlFor="telefono">Teléfono: </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="telefono"
                      name="telefono"
                      type="text"
                      value={inputs.telefono}
                      onChange={handleInputChange}
                      placeholder="Celular"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="telegram" mr={3} onClick={guardarRegistro}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
        <ToastContainer />
      </Modal>
    </>
  );
};