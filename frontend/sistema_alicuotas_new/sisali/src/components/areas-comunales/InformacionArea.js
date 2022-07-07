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
import Swal from 'sweetalert2';
import { ModalFileInput } from './ModalFileInput';
import { editArea } from '../../services/Post';
import { EliminarArea } from './EliminarArea';

export const InformacionArea = (props) => {
  const { area, showInfo, setShowInfo, stateChanger } = props;
  const [state, setState] = useState([]);
  const [showInputFile, setShowInputFile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setState(area);
    return () => {
      setState([]);
    };
  }, [showInfo]);

  const onUpdate = async () => {
    console.log(state);
    const response = await editArea(state, area.id_area_comunal);
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
    _tmp[`${tmpName}_area`] = tmpValue;
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
          <ModalHeader>Información del área comunal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="row">
              <div className="col-sm-4">
                {state.imagen_area ? (
                  <img
                    src={`http://localhost:4000/${state.imagen_area}`}
                    alt={'Imagen referencial'}
                    style={{ maxHeight: '200px', maxWidth: '300px' }}
                    className="d-block mx-auto w-100 h-100"
                  />
                ) : (
                  <img
                    src={user}
                    alt={'Imagen referencial'}
                    style={{ height: '300px', width: '300px' }}
                    className="d-block mx-auto w-100 h-100"
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
                  <Button
                    onClick={onDelete}
                    colorScheme="red"
                    className="mt-2 w-100"
                  >
                    <DeleteIcon color="gray.300" className="me-1" /> Eliminar
                  </Button>
                </div>
              </div>
              <div className="col-sm-8">
                <FormControl isRequired>
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
                      readOnly
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
    </>
  );
};
