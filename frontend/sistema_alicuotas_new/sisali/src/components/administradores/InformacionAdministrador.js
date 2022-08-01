import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { createStandaloneToast } from '@chakra-ui/toast';
import { editAdministrador } from '../../services/Post';
import { EliminarAdministrador } from './EliminarAdministrador';

export const InformacionAdministrador = props => {
  const { administrador, showInfo, setShowInfo, stateChanger } = props;
  const [state, setState] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();

  useEffect(() => {
    setState(administrador);
    return () => {
      setState([]);
    };
  }, [showInfo]);

  const onUpdate = async () => {
    console.log(state);
    const response = await editAdministrador(state, state.id_administrador);
    if (response) {
      toast({
        title: 'Registro realizado con éxito',
        description: 'Se registró el usuario administrador.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      stateChanger(true);
      onClose();
    } else {
      toast({
        title: 'Error',
        description:
          'Hubo un error al actualizar la información del usuario administrador.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const onClose = () => {
    setShowInfo(false);
  };

  const onDelete = () => {
    setShowDeleteModal(true);
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleInputChange = e => {
    let tmpName = e.target.name;
    let tmpValue = e.target && e.target.value;
    let _tmp = { ...state };
    _tmp[`${tmpName}_administrador`] = tmpValue;
    setState(_tmp);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={showInfo}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información del Administrador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="px-4">
              <FormControl>
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
                    value={state.nombre_administrador}
                    onChange={handleInputChange}
                    placeholder="Nombres"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
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
                    value={state.cedula_administrador}
                    readOnly
                    placeholder="Cedula"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="celular" mt={3}>
                  Celular
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EditIcon color="gray.300" />}
                  />
                  <Input
                    id="celular"
                    name="celular"
                    type="text"
                    value={state.celular_administrador}
                    onChange={handleInputChange}
                    placeholder="Celular"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="correo" mt={3}>
                  Correo
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                  />
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    value={state.correo_administrador}
                    onChange={handleInputChange}
                    placeholder="Correo"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <div className="mt-3 w-100 text-center">
                <Button onClick={onUpdate} colorScheme="purple">
                  <EditIcon color="gray.300" className="me-1" /> Actualizar
                  Información
                </Button>
                <Button
                  onClick={onDelete}
                  colorScheme="red"
                  className="ms-3"
                >
                  <DeleteIcon color="gray.300" className="me-1" /> Eliminar
                </Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
          <EliminarAdministrador
            id_administrador={state.id_administrador}
            stateChanger={stateChanger}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            setShowInfo={setShowInfo}
          />
        </ModalContent>
        <ToastContainer />
      </Modal>
    </>
  );
};
