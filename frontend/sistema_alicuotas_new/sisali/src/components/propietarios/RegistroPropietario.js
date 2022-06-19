import React, { useRef } from 'react';
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
} from '@chakra-ui/react';

export const RegistroPropietario = props => {
  const { stateChanger, isOpen, setIsOpen } = props;

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro de nuevo Usuario</ModalHeader>
          <ModalCloseButton />
          <div className="row">
            <div className="col-sm-6">
              <ModalBody>
                <FormControl>
                  <FormLabel>Nombres</FormLabel>
                  <Input ref={initialRef} placeholder="Nombres" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Apellidos</FormLabel>
                  <Input placeholder="Apellidos" />
                </FormControl>
              </ModalBody>
            </div>
            <div className="col-sm-6">
              <ModalBody>
                <FormControl>
                  <FormLabel>Cédula</FormLabel>
                  <Input ref={initialRef} placeholder="Cédula" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input placeholder="Teléfono" />
                </FormControl>
              </ModalBody>
            </div>
          </div>
          <ModalBody>
            <FormControl>
              <FormLabel>Correo</FormLabel>
              <Input ref={initialRef} placeholder="Correo" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
