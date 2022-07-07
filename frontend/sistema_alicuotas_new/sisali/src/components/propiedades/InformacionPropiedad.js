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
  Select,
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import {
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { editPropiedad} from '../../services/Post';
import Swal from 'sweetalert2';
import { EliminarPropiedad } from './EliminarPropiedad';
//import { ModalFileInput } from './ModalFileInput';
//import { EliminarPropietario } from './EliminarPropietario';

export const InformacionPropiedad = (props) => {

  const { propiedad, propietarios, showInfo, setShowInfo, stateChanger } = props;
  const [state, setState] = useState([]);
  const [statePropietarios, setStatePropietarios] = useState([]);
  const [showInputFile, setShowInputFile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setState(propiedad);
    setStatePropietarios(propietarios);
    console.log(state);
    return () => {
      setState([]);
    };
  }, [showInfo]);


  const onUpdate = async () => {
    console.log(state);
    const response = await editPropiedad(state, state.id_propiedad);
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
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información del Propietario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="row">
              <div className="col-sm-4">
                
                <div className="w-100 text-center mt-3">
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
                      placeholder="Número de casa"
                      variant="flushed"
                    />
                  </InputGroup>
                  <FormLabel htmlFor="direccion_propiedad" mt={3}>
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
                      placeholder="Dirección de propiedad"
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


          <EliminarPropiedad
            id_propiedad={state.id_propiedad}
            stateChanger={stateChanger}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            setShowInfo={setShowInfo}
          />
        </ModalContent>
      </Modal>
    
    </>
  )
}
