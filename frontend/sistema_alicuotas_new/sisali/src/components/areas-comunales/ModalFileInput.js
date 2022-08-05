import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { editImagenArea } from '../../services/Post';

export const ModalFileInput = (props) => {
  const {
    showInputFile,
    setShowInputFile,
    id_area_comunal,
    stateChanger,
    setShowInfo,
  } = props;
  const [file, setfile] = useState(null);

  const cargarImagen = async () => {
    const formdata = new FormData();
    formdata.append('image', file);
    const response = await editImagenArea(formdata, id_area_comunal);
    if (response) {
      onClose();
      setShowInfo(false);
      stateChanger(true);
    }
  };

  const selectedHandler = e => {
    setfile(e.target.files[0]);
  };

  const onClose = () => {
    setShowInputFile(false);
  };

  return (
    <>
      <Modal isOpen={showInputFile} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actualizar Imagen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="correo">Imagen</FormLabel>
              <input
                id="fileinput"
                onChange={selectedHandler}
                className="form-control"
                type="file"
              />
            </FormControl>
            <div className="w-100 mt-3 text-center">
              <Button onClick={cargarImagen} colorScheme="telegram">
                <EditIcon color="gray.300" className="me-1" /> Actualizar Imagen
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
