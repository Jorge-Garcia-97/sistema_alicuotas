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

export const EditarPropietario = (props) => {
  const { stateChanger, editOpen, setEditOpen } = props;

  //const initialRef = useRef(null);
  //const finalRef = useRef(null);

  const onClose = () => {
    setEditOpen(false);
  };

  return (
    <>
      <Modal
        //initialFocusRef={initialRef}
        //finalFocusRef={finalRef}
        editOpen={editOpen}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Propietario</ModalHeader>
          <ModalCloseButton />
          <div className="row">
            <div className="col-sm-6">
              <ModalBody>
                <FormControl>
                  <FormLabel>Nombres</FormLabel>
                  <Input placeholder="Nombres" />
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
                  <Input placeholder="Cédula" />
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
              <Input placeholder="Correo" />
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
