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
import { deletePropiedad } from '../../services/Post';

export const EliminarPropiedad = (props) => {

    const { id_propiedad, stateChanger, showDeleteModal, setShowDeleteModal, setShowInfo } = props;

    const onDelete = async () => {
        const response = await deletePropiedad(id_propiedad);
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h3>¿Desea eliminar está propiedad?</h3>
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
  )
}
