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
import { DeleteIcon, EditIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { editPropietario } from '../../services/Post';
import { ModalFileInput } from './ModalFileInput';
import { EliminarPropietario } from './EliminarPropietario';
import { createStandaloneToast } from '@chakra-ui/toast';
import { validarCorreo, validarLetras, validarTelefonos } from './validaciones';
import { useSelector } from 'react-redux';

export const InformacionPropietario = props => {
  const { propietario, showInfo, setShowInfo, stateChanger } = props;
  const [state, setState] = useState([]);
  const [showInputFile, setShowInputFile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();
  const { isAdmin, rol } = useSelector(state => state.auth);
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    setState(propietario);
    let bandera = isAdmin ? false : rol == 'Presidente' ? false : rol == 'Vicepresidente' ? false : true;
    setIsReadOnly(bandera);
    return () => {
      setState([]);
    };
  }, [showInfo]);

  const onUpdate = async () => {
    if (
      validarLetras(state.nombre_propietario) &&
      validarLetras(state.apellido_propietario) &&
      validarCorreo(state.correo_propietario) &&
      validarTelefonos(state.celular_propietario)
    ) {
      const response = await editPropietario(state, state.id_propietario);
      if (response) {
        toast({
          title: 'Registro realizado con éxito',
          description: 'Se actualizó la información del propietario.',
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
          description: 'Se encontró un error al registrar el propietario.',
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
  };

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
          <ModalHeader bgColor={'blackAlpha.50'}>Información del Propietario</ModalHeader>
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
                    colorScheme="telegram"
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
                  {isAdmin ? (
                    <Button
                      onClick={onDelete}
                      colorScheme="red"
                      className="mt-2 w-100"
                    >
                      <DeleteIcon color="gray.300" className="me-1" /> Eliminar
                    </Button>
                  ) : (
                    <>
                      {rol == 'Presidente' && (
                        <Button
                          onClick={onDelete}
                          colorScheme="red"
                          className="mt-2 w-100"
                        >
                          <DeleteIcon color="gray.300" className="me-1" />{' '}
                          Eliminar
                        </Button>
                      )}
                      {rol == 'Vicepresidente' && (
                        <Button
                          onClick={onDelete}
                          colorScheme="red"
                          className="mt-2 w-100"
                        >
                          <DeleteIcon color="gray.300" className="me-1" />{' '}
                          Eliminar
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="col-sm-8 px-5">
                <FormControl isRequired={!isReadOnly}>
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
                      isReadOnly={isReadOnly}
                      placeholder="Nombres"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired={!isReadOnly}>
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
                      isReadOnly={isReadOnly}
                      placeholder="Apellidos"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <div className="d-flex">
                  <FormControl className='me-2'>
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
                        readOnly
                        placeholder="Cedula"
                        variant="flushed"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl className='ms-2'>
                    <FormLabel htmlFor="cedula" mt={3}>
                      Rol
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
                        value={state.rol_propietario}
                        readOnly
                        placeholder="Cedula"
                        variant="flushed"
                      />
                    </InputGroup>
                  </FormControl>
                </div>
                <FormControl isRequired>
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
                </FormControl>
                <FormControl isRequired>
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
                  <Button onClick={onUpdate} colorScheme="telegram">
                    <EditIcon color="gray.300" className="me-1" /> Actualizar
                    Información
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter bgColor={'blackAlpha.50'}>
            <Button onClick={onClose} colorScheme={'red'}>Cerrar</Button>
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
      <ToastContainer />
    </>
  );
};
