import React, { useRef, useState } from 'react';
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
import { saveArea, saveImagenArea } from '../../services/Post';
import { EditIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';

export const RegistroArea = props => {
  const { stateChanger, isOpen, setIsOpen } = props;
  const [inputs, setInputs] = useState({
    nombre_area: '',
    descripcion_area: '',
  });
  const [file, setfile] = useState(null);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const guardarArea = async () => {
    let data = { ...inputs };
    if (data.nombre_area !== '' && data.descripcion_area !== '') {
      const response = await saveArea(data);
      console.log(response.id);
      if (response.id > 0) {
        if (file) {
          const formdata = new FormData();
          formdata.append('image', file);
          let carga = await saveImagenArea(formdata, response.id);
          document.getElementById('fileinput').value = null;
          setfile(null);
          if (carga) {
            Toast.fire({
              icon: 'success',
              title: 'Registro exitoso',
            });
            setIsOpen(false);
            stateChanger(true);
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Algo ha salido mal',
            });
          }
        }
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
        });
      }
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Necesitas llenar todos los datos',
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
    _tmp[`${tmpName}_area`] = tmpValue;
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
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro de una nueva Area Comunal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="nombre">Nombre del Área Comunal</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EditIcon color="gray.300" />}
                />
                <Input
                  ref={initialRef}
                  id="nombre"
                  name="nombre"
                  type="tel"
                  value={inputs.nombre_area}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  variant="flushed"
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="descripcion">
                Descripción del Área Comunal
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EditIcon color="gray.300" />}
                />
                <Input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  value={inputs.descripción_area}
                  onChange={handleInputChange}
                  placeholder="Descripción"
                  variant="flushed"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <div className="container px-4">
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="imagen">Imagen</FormLabel>
              <input
                id="fileinput"
                onChange={selectedHandler}
                className="form-control"
                type="file"
              />
            </FormControl>
          </div>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={guardarArea}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
