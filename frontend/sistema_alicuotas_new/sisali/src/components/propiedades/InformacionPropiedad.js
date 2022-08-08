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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { editPropiedad } from '../../services/Post';
import { EliminarPropiedad } from './EliminarPropiedad';
import { createStandaloneToast } from '@chakra-ui/toast';
import { validarNumeros } from '../propietarios/validaciones';
import casa from '../../img/casa_modelo.jpeg';
import { useSelector } from 'react-redux';

export const InformacionPropiedad = props => {
  const { propiedad, propietarios, showInfo, setShowInfo, stateChanger } =
    props;
  const [state, setState] = useState([]);
  const [statePropietarios, setStatePropietarios] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();
  const { isAdmin, rol } = useSelector(state => state.auth);
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    setState(propiedad);
    setStatePropietarios(propietarios);
    let bandera = isAdmin
      ? false
      : rol == 'Presidente'
      ? false
      : rol == 'Vicepresidente'
      ? false
      : true;
    setIsReadOnly(bandera);
    return () => {
      setState([]);
    };
  }, [showInfo]);

  const onUpdate = async () => {
    if (validarNumeros(state.numero_casa)) {
      const response = await editPropiedad(state, state.id_propiedad);
      if (response) {
        toast({
          title: 'Registro realizado con éxito',
          description: 'Se actualizó la información de la propiedad.',
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
          description: 'Se encontró un error al registrar la propiedad.',
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

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleInputChange = e => {
    let tmpName = e.target.name;
    let tmpValue = e.target && e.target.value;
    let _tmp = { ...state };
    _tmp[`${tmpName}`] = tmpValue;
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
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'blackAlpha.50'}>Información de la Propiedad</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="px-4">
              <div>
                <img
                  src={casa}
                  alt={'Imagen referencial'}
                  style={{ height: '250px', width: '100%' }}
                  className="d-block mx-auto mb-2 rounded"
                />
              </div>
              <div>
                <FormControl>
                  <FormLabel htmlFor="propietario">Propietario</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="propietario"
                      name="propietario"
                      type="text"
                      value={
                        state.nombre_propietario +
                        ' ' +
                        state.apellido_propietario
                      }
                      isReadOnly
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired={!isReadOnly} mt={3}>
                  <FormLabel htmlFor="numero_casa">Número de Casa</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      ref={initialRef}
                      id="numero_casa"
                      name="numero_casa"
                      type="text"
                      value={state.numero_casa}
                      onChange={handleInputChange}
                      isReadOnly={isReadOnly}
                      placeholder="Número de casa"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired={!isReadOnly} mt={3}>
                  <FormLabel htmlFor="direccion_propiedad">
                    Dirección de Propiedad
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="direccion_propiedad"
                      name="direccion_propiedad"
                      type="text"
                      value={state.direccion_propiedad}
                      onChange={handleInputChange}
                      isReadOnly={isReadOnly}
                      placeholder="Dirección de propiedad"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </div>
            </div>
            <div className="mt-4 w-100 text-center">
              {!isReadOnly && (
                <>
                  <Button onClick={onDelete} colorScheme="red" className="me-2">
                    <DeleteIcon color="gray.300" className="me-1" /> Eliminar
                  </Button>
                  <Button
                    onClick={onUpdate}
                    colorScheme="telegram"
                    className="ms-2"
                  >
                    <EditIcon color="gray.300" className="me-1" /> Actualizar
                    Información
                  </Button>
                </>
              )}
            </div>
          </ModalBody>
          <ModalFooter bgColor={'blackAlpha.50'}>
            <Button onClick={onClose} colorScheme={'red'}>Cerrar</Button>
          </ModalFooter>

          <EliminarPropiedad
            id_propiedad={state.id_propiedad}
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
