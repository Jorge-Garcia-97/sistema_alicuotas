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
import user from '../../img/usuario.png';
import {
    DeleteIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
} from '@chakra-ui/icons';
import { editPropietario } from '../../services/Post';
import Swal from 'sweetalert2';
import { ModalFileInput } from './ModalFileInput';
import { EliminarPropietario } from './EliminarPropietario';

export const InformacionPropietario = props => {
  const { propietario, showInfo, setShowInfo, stateChanger } = props;
  const [state, setState] = useState([]);
  const [showInputFile, setShowInputFile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setState(propietario);
    return () => {
      setState([]);
    };
  }, [showInfo]);

  const onUpdate = async () => {
    console.log(state);
    const response = await editPropietario(state, state.id_propietario);
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
    _tmp[`${tmpName}_propietario`] = tmpValue;
    setState(_tmp);
  };

  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={showInfo}
        onClose={onClose}
        size={'4xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información del Propietario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="row">
              <div className="col-sm-4 bg-light rounded py-2">
                {state.imagen_propietario ? (
                  <img
                    src={`http://localhost:4000/${state.imagen_propietario}`}
                    alt={'Imagen referencial'}
                    style={{ height: '300px', width: '300px' }}
                    className="d-block mx-auto my-auto"
                  />
                ) : (
                  <img
                    src={user}
                    alt={'Imagen referencial'}
                    style={{ height: '300px', width: '300px' }}
                    className="d-block mx-auto my-auto"
                  />
                )}
                <div className="w-100 text-center mt-3">
                  <Button
                    onClick={openModalInputFile}
                    colorScheme="blue"
                    className="w-100"
                  >
                    <EditIcon color="gray.300" className="me-1" />
                    Foto
                  </Button>
                  {/* <Button
                    onClick={onClose}
                    colorScheme="green"
                    className="mt-2 w-100"
                  >
                    <PlusSquareIcon color="gray.300" className="me-1" />{' '}
                    Propiedad
                  </Button> */}

                  
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
              <div className="col-sm-8 px-5">
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
                      value={state.nombre_propietario}
                      onChange={handleInputChange}
                      placeholder="Nombres"
                      variant="flushed"
                    />
                  </InputGroup>
                  <FormLabel htmlFor="apellido" mt={3}>
                    Apellidos
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="apellido"
                      name="apellido"
                      type="text"
                      value={state.apellido_propietario}
                      onChange={handleInputChange}
                      placeholder="Apellidos"
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
                      placeholder="Apellidos"
                      variant="flushed"
                    />
                  </InputGroup>
                  <FormLabel htmlFor="celular" mt={3}>
                    Teléfono
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<PhoneIcon color="gray.300" />}
                    />
                    <Input
                      id="celular"
                      name="celular"
                      type="text"
                      value={state.celular_propietario}
                      onChange={handleInputChange}
                      placeholder="Teléfono"
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

          <ModalFileInput
            setShowInputFile={setShowInputFile}
            showInputFile={showInputFile}
            id_propietario={state.id_propietario}
            stateChanger={stateChanger}
            setShowInfo={setShowInfo}
          />

          <EliminarPropietario 
            id_propietario={state.id_propietario}
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
