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
import { savePropiedad } from '../../services/Post';
import { EditIcon } from '@chakra-ui/icons';
import { createStandaloneToast } from '@chakra-ui/toast';
import { validarNumeros } from '../propietarios/validaciones';
import { get } from '../../services/Get';

export const RegistroPropiedades = props => {
  const { stateChanger, isOpen, setIsOpen, propietarios } = props;
  const [inputs, setInputs] = useState({
    numero_casa: '',
    direccion_propiedad: '',
    propietario_id_propietario: '',
  });
  const { ToastContainer, toast } = createStandaloneToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const guardarRegistro = async () => {
    let data = { ...inputs };
    if (data.numero_casa_propiedad !== '' && data.direccion_propiedad !== '') {
      if (validarNumeros(data.numero_casa)) {
        if (
          parseInt(data.numero_casa) > 0 &&
          parseInt(data.numero_casa) <= 76
        ) {
          const casa_temp = await get(`propiedades/casa/${data.numero_casa}`);
          if (casa_temp.length == 0) {
            const resp = await savePropiedad(data);
            if (resp) {
              toast({
                title: 'Registro realizado con éxito',
                description: 'Se registró la propiedad.',
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
                description: 'Se encontró un error al crear la propiedad.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
              });
            }
          } else {
            toast({
              title: 'Error',
              description: 'Ya existe una propiedad con el número ingresado.',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            });
          }
        } else {
          toast({
            title: 'Cuidado',
            description: 'El número de casa debe estar entre 1 y 75.',
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
        }
      } else {
        toast({
          title: 'Cuidado',
          description:
            'Se deben ingresar datos correctos en los campos solicitados.',
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

  const onClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = e => {
    let tmpName = e.target.name;
    let tmpValue = e.target && e.target.value;
    let _tmp = { ...inputs };
    _tmp[`${tmpName}`] = tmpValue;
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
          <ModalHeader>Registro de nueva propiedad</ModalHeader>
          <ModalCloseButton />
          <div className="row">
            <div className="col-sm-6">
              <ModalBody>
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
                      value={inputs.numero_casa}
                      onChange={handleInputChange}
                      placeholder="Número de casa"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </ModalBody>
            </div>
            <div className="col-sm-6">
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel htmlFor="direccion_propiedad">Dirección</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      id="direccion_propiedad"
                      name="direccion_propiedad"
                      type="text"
                      value={inputs.direccion_propiedad}
                      onChange={handleInputChange}
                      placeholder="Dirección"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </ModalBody>
            </div>
          </div>
          <div className="container px-4">
            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="propietario_id_propietario">
                Propietario
              </FormLabel>
              <InputGroup>
                <Select
                  placeholder="Selecciona una opción"
                  id="propietario_id_propietario"
                  value={inputs.propietario_id_propietario}
                  name="propietario_id_propietario"
                  onChange={handleInputChange}
                  variant="flushed"
                >
                  {propietarios.map((item, i) => (
                    <option key={i} value={item.id_propietario}>
                      {' '}
                      {item.nombre_propietario +
                        ' ' +
                        item.apellido_propietario}{' '}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>
          </div>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={guardarRegistro}>
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
