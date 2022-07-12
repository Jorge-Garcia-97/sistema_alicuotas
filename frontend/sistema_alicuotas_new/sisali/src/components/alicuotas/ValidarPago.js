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
  Input,
  InputLeftElement,
  InputGroup,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { CalendarIcon, EditIcon } from '@chakra-ui/icons';

export const ValidarPago = props => {
  const { stateChanger, isOpenValidarPago, setIsOpenValidarPago, data } = props;
  const [state, setState] = useState([]);
  const [inputs, setInputs] = useState({
    date: "",
    propietario: "",
    valor: "",
    propiedad: "",
    codigo: "",
    telefono: ""
  })

  useEffect(() => {
    return () => {};
  }, [isOpenValidarPago]);

  const actionGuardar = () => {
    console.log('Accion guardar');
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onClose = () => {
    setIsOpenValidarPago(false);
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

  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenValidarPago}
        onClose={onClose}
        size={'xl'}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'blackAlpha.50'}>Validar Pago</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="d-flex px-3 mt-2">
              <FormControl isRequired className="me-1">
                <FormLabel htmlFor="mes">Fecha de pago</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.300" />}
                  />
                  <Input
                    id="date"
                    name="date"
                    // value={inputs.date}
                    // onChange={e =>
                    //   setInputs({ ...inputs, date: e.target.value })
                    // }
                    className="form-control"
                    type="date"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired className="ms-1">
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
                    // value={inputs.propietario}
                    // onChange={handleInputChange}
                    placeholder="Nombres"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div>
                {JSON.stringify(data)}
            </div>
          </ModalBody>
          <ModalFooter mt={3} bgColor={'blackAlpha.50'}>
            <Button colorScheme="blue" mr={3} onClick={actionGuardar}>
              Guardar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
