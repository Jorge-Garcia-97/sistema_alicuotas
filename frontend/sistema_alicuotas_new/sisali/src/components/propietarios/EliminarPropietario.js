import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { deletePropietario } from '../../services/Post';

export const EliminarPropietario = props => {
  const { id_propietario, stateChanger, showDeleteModal, setShowDeleteModal, setShowInfo } =
    props;

  const onDelete = async () => {
    const response = await deletePropietario(id_propietario);
    if (response) {
        onClose();
        setShowInfo(false);
        stateChanger(true);        
    }
  }

  const onClose = () => {
    setShowDeleteModal(false);
  }

  return (
    <>
      <Modal isOpen={showDeleteModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Propietario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h3>¿Desea eliminar el propietario?</h3>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              <DeleteIcon color="gray.300" className="me-1" /> Confirmar
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
