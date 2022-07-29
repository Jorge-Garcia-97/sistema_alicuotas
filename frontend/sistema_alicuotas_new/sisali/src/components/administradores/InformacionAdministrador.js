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
import {
    DeleteIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
} from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import { editAdministrador } from '../../services/Post';
import { EliminarAdministrador} from './EliminarAdministrador';

export const InformacionAdministrador = props => {
  const { administrador, showInfo, setShowInfo, stateChanger } = props;
  const [state, setState] = useState([]);
  const [showInputFile, setShowInputFile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      Toast.fire({
        icon: 'success',
        title: 'Actualización exitoso',
      });
      stateChanger(true);
      onClose();
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Algo ha salido mal',
      });
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      container: 'container-popup',
      popup: 'popup',
    },
  });

  const onClose = () => {
    setShowInfo(false);
  };

  const onDelete = () => {
    setShowDeleteModal(true);
  };

  const openModalInputFile = () => {
    setShowInputFile(true);
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
            <div className="row">
              <div className="col-sm-4">
                
                <div className="w-100 text-center mt-3">
                  <Button
                    onClick={openModalInputFile}
                    colorScheme="blue"
                    className="w-100"
                  >
                  </Button>
                  
                  <Button
                    onClick={onDelete}
                    colorScheme="red"
                    className="mt-2 w-100"
                  >
                    <DeleteIcon color="gray.300" className="me-1" />{' '}
                    Eliminar
                  </Button>
                </div>
              </div>
              <div className="col-sm-8">
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
                      value={state.nombre_administrador}
                      onChange={handleInputChange}
                      placeholder="Nombres"
                      variant="flushed"
                    />
                  </InputGroup>
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
                      value={state.correo_propietario}
                      onChange={handleInputChange}
                      placeholder="Correo"
                      variant="flushed"
                    />
                  </InputGroup>
                  <FormLabel htmlFor="cedula" mt={3}>
                    Cédula
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="cedula"
                      name="cedula"
                      type="text"
                      value={state.cedula_propietario}
                      onChange={handleInputChange}
                      placeholder="Cedula"
                      variant="flushed"
                    />
                  </InputGroup>             
                  
                </FormControl>

                <div className="mt-3 w-100 text-center">
                  <Button onClick={onUpdate} colorScheme="purple">
                    <EditIcon color="gray.300" className="me-1" /> Actualizar
                    Información
                  </Button>
                </div>
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
      </Modal>
    </>
  );
};
