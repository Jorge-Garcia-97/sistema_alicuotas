import React from 'react';
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
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteAreaComunal } from '../../services/Post';

export const EliminarArea = (props) => {
  const {
    id_area_comunal,
    stateChanger,
    showDeleteModal,
    setShowDeleteModal,
    setShowInfo,
  } = props;

  const onDelete = async () => {
    const response = await deleteAreaComunal(id_area_comunal);
    if (response) {
      onClose();
      setShowInfo(false);
      stateChanger(true);
    }
  };

  const onClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Modal isOpen={showDeleteModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h3>¿Desea eliminar el usuario?</h3>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              <DeleteIcon color="gray.300" className="me-1" /> Confirmar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
