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
  Icon,
  Select,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { GrCircleInformation } from 'react-icons/gr';
import { createStandaloneToast } from '@chakra-ui/toast';
import { saveSolicitud } from '../../services/Post';

export const RegistroSolicitud = props => {
  const { stateChanger, isOpen, setIsOpen, propiedades } = props;
  const [inputs, setInputs] = useState({
    tipo_solicitud: '',
    detalle_solicitud: '',
    fecha_solicitud: '',
    id_propiedad: '',
  });
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { ToastContainer, toast } = createStandaloneToast();

  const actionGuardar = async () => {
    const inputs_data = { ...inputs };
    if (
      inputs_data.tipo_solicitud !== '' &&
      inputs_data.detalle_solicitud !== '' &&
      inputs_data.fecha_solicitud !== '' &&
      inputs_data.id_propiedad !== ''
    ) {
      const resp = await saveSolicitud(inputs_data);
      if (resp) {
        toast({
          title: 'Registro realizado con éxito',
          description: 'Se registró la solicitud.',
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
          description: 'Se encontró un error al crear la solicitud.',
          status: 'error',
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
          <ModalHeader bgColor={'blackAlpha.50'}>
            Registro de Nueva Solicitud
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="px-3 my-2">
              <FormControl isRequired mt={1}>
                <FormLabel htmlFor="fecha_solicitud">Fecha: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.700" />}
                  />
                  <Input
                    id="fecha_solicitud"
                    name="fecha_solictud"
                    value={inputs.fecha_solicitud}
                    onChange={e =>
                      setInputs({ ...inputs, fecha_solicitud: e.target.value })
                    }
                    className="form-control"
                    type="date"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor="id_propiedad">
                  Propietario/Propiedad:{' '}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={GrCircleInformation} color="gray.50" />}
                  />
                  <Select
                    className="ps-5"
                    placeholder="Selecciona una opción"
                    id="id_propiedad"
                    value={inputs.id_propiedad}
                    name="id_propiedad"
                    onChange={e => {
                      setInputs({ ...inputs, id_propiedad: e.target.value });
                    }}
                    variant="flushed"
                  >
                    {propiedades.map((item, i) => (
                      <option key={i} value={item.id_propiedad}>
                        {'Casa: ' +
                          item.numero_casa +
                          ' - ' +
                          item.nombre_propietario +
                          ' ' +
                          item.apellido_propietario}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor="tipo_solicitud">
                  Tipo de Solicitud:{' '}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={GrCircleInformation} color="gray.50" />}
                  />
                  <Select
                    className="ps-5"
                    placeholder="Selecciona una opción"
                    id="tipo_solicitud"
                    value={inputs.tipo_solicitud}
                    name="tipo_solicitud"
                    onChange={e => {
                      setInputs({ ...inputs, tipo_solicitud: e.target.value });
                    }}
                    variant="flushed"
                  >
                    <option value={'RESERVACION'}>RESERVACIÓN</option>
                    <option value={'PRESTACION'}>
                      PRESTACIÓN DE EQUIPOS/MATERIALES
                    </option>
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor="detalle_solicitud">
                  Detalle de la Solicitud:{' '}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={GrCircleInformation} color="gray.50" />}
                  />
                  <Input
                    id="detalle_solicitud"
                    name="detalle_solicitud"
                    type="text"
                    value={inputs.detalle_solicitud}
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        detalle_solicitud: e.target.value,
                      })
                    }
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
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
        <ToastContainer />
      </Modal>
    </>
  );
};
