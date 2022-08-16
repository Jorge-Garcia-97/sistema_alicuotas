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
import { createStandaloneToast } from '@chakra-ui/toast';
import { ModalFileInput } from './ModalFileInput';
import { editArea } from '../../services/Post';
import { EliminarArea } from './EliminarArea';
import { validarLetras } from '../propietarios/validaciones';
import { useSelector } from 'react-redux';

export const InformacionArea = props => {
  const { area, showInfo, setShowInfo, stateChanger } = props;
  const [state, setState] = useState([]);
  const [showInputFile, setShowInputFile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();
  const { isAdmin, rol } = useSelector(state => state.auth);
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    setState(area);
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
    if (
      validarLetras(state.nombre_area) &&
      validarLetras(state.descripcion_area)
    ) {
      const response = await editArea(state, area.id_area_comunal);
      if (response) {
        toast({
          title: 'Registro realizado con éxito',
          description: 'Se actualizó la información del área.',
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
          description: 'Se encontró un error al registrar el área.',
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
    _tmp[`${tmpName}_area`] = tmpValue;
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
          <ModalHeader bgColor={'blackAlpha.50'}>
            Información del área comunal
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="row px-3">
              <div className="col-sm-5 bg-light rounded-0 rounded-top px-0">
                {state.imagen_area ? (
                  <img
                    src={`http://18.231.89.19:4000/${state.imagen_area}`}
                    alt={'Imagen referencial'}
                    style={{ height: '250px', width: '100%' }}
                    className="d-block mx-auto my-auto shadow-sm rounded-0 rounded-top"
                  />
                ) : (
                  <img
                    src={user}
                    alt={'Imagen referencial'}
                    style={{ height: '300px', width: '300px' }}
                    className="d-block mx-auto my-auto shadow-sm rounded-0 rounded-top"
                  />
                )}
                <div className="w-100 text-center">
                  {!isReadOnly && (
                    <>
                      <Button
                        onClick={openModalInputFile}
                        colorScheme="telegram"
                        className="w-100 rounded-0 rounded-bottom"
                      >
                        <EditIcon color="gray.300" className="me-1" />
                        Foto
                      </Button>
                      <Button
                        onClick={onDelete}
                        colorScheme="red"
                        className="w-100 mt-4"
                      >
                        <DeleteIcon color="gray.300" className="me-1" />{' '}
                        Eliminar Área
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="col-sm-7 px-5">
                <FormControl isRequired={!isReadOnly}>
                  <FormLabel htmlFor="nombre">Nombre</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={state.nombre_area}
                      readOnly={isReadOnly}
                      placeholder="Nombre"
                      variant="flushed"
                    />
                  </InputGroup>
                  <FormLabel htmlFor="descripcion" mt={3}>
                    Descripción
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      ref={initialRef}
                      id="descripcion"
                      name="descripcion"
                      type="text"
                      value={state.descripcion_area}
                      onChange={handleInputChange}
                      placeholder="Descripción"
                      variant="flushed"
                      readOnly={isReadOnly}
                    />
                  </InputGroup>
                </FormControl>
                <div className="mt-3 w-100 text-center">
                  {!isReadOnly && (
                    <Button onClick={onUpdate} colorScheme="telegram">
                      <EditIcon color="gray.300" className="me-1" /> Actualizar
                      Información
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter bgColor={'blackAlpha.50'}>
            <Button onClick={onClose} colorScheme={'red'}>
              Cerrar
            </Button>
          </ModalFooter>

          <ModalFileInput
            setShowInputFile={setShowInputFile}
            showInputFile={showInputFile}
            id_area_comunal={state.id_area_comunal}
            stateChanger={stateChanger}
            setShowInfo={setShowInfo}
          />

          <EliminarArea
            id_area_comunal={state.id_area_comunal}
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
