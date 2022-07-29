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
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { saveArea, saveImagenArea } from '../../services/Post';
import { EditIcon } from '@chakra-ui/icons';
import { createStandaloneToast } from '@chakra-ui/toast';
import { validarLetras } from '../propietarios/validaciones';

export const RegistroArea = props => {
  const { stateChanger, isOpen, setIsOpen } = props;
  const [inputs, setInputs] = useState({
    nombre_area: '',
    descripcion_area: '',
  });
  const [file, setfile] = useState(null);
  const { ToastContainer, toast } = createStandaloneToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const guardarArea = async () => {
    let data = { ...inputs };
    if (data.nombre_area !== '' && data.descripcion_area !== '') {
      if (
        validarLetras(data.nombre_area) &&
        validarLetras(data.descripcion_area)
      ) {
        const response = await saveArea(data);
        if (response.id > 0) {
          if (file) {
            const formdata = new FormData();
            formdata.append('image', file);
            let carga = await saveImagenArea(formdata, response.id);
            document.getElementById('fileinput').value = null;
            setfile(null);
            if (carga) {
              toast({
                title: 'Registro realizado con éxito',
                description: 'Se registró el área.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
              });
              setIsOpen(false);
              stateChanger(true);
            } else {
              toast({
                title: 'Error',
                description: 'Se encontró un error al cargar la imagen.',
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
          description: 'Se deben ingresar datos correctos en los campos solicitados.',
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
        motionPreset="slideInBottom"
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
      <ToastContainer />
    </>
  );
};
