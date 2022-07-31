import { CalendarIcon } from '@chakra-ui/icons';
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
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { GrCircleInformation } from 'react-icons/gr';
import { createStandaloneToast } from '@chakra-ui/toast';
import moment from 'moment';

export const VerReserva = props => {
  const { isOpen, setIsOpen, reserva } = props;
  const { ToastContainer, toast } = createStandaloneToast();
  const onClose = () => {
    setIsOpen(false);
  };
  const [inputs, setInputs] = useState({
    fecha_fin: '',
    fecha_inicio: '',
    valor_alquiler: 0,
    valor_garantia: 0,
    motivo_reservacion: '',
    propiedad: '',
    area: '',
  });
  useEffect(() => {
    if (reserva) {
      setInputs({
        fecha_fin: reserva.fecha_fin,
        fecha_inicio: reserva.fecha_inicio,
        valor_alquiler: reserva.valor_alquiler,
        valor_garantia: reserva.valor_garantia,
        motivo_reservacion: reserva.motivo_reservacion,
        propiedad: reserva.numero_casa,
        area: reserva.nombre_area,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Error al cargar la información de la reserva.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }

    return () => {
      setInputs({});
    };
  }, [isOpen]);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
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
            Información de la Reservación
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="px-3 my-2">
              <div className="d-flex">
                <FormControl mt={1} className="me-2">
                  <FormLabel htmlFor="fecha_inicio">Fecha de inicio:</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CalendarIcon color="gray.700" />}
                    />
                    <Input
                      id="fecha_inicio"
                      name="fecha_inicio"
                      value={moment(inputs.fecha_inicio).format(
                        'YYYY-MM-DD hh:mm:ss'
                      )}
                      readOnly
                      type="text"
                      placeholder="Fecha de inicio"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={1} className="ms-2">
                  <FormLabel htmlFor="fecha_fin">
                    Fecha de finalización:
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CalendarIcon color="gray.700" />}
                    />
                    <Input
                      id="fecha_fin"
                      name="fecha_fin"
                      value={moment(inputs.fecha_fin).format(
                        'YYYY-MM-DD hh:mm:ss'
                      )}
                      readOnly
                      type="text"
                      placeholder="Fecha de finalización"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </div>
              <div className="d-flex">
                <FormControl className="me-2" mt={3}>
                  <FormLabel htmlFor="area">Área a Reservar:</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon as={GrCircleInformation} color="gray.50" />
                      }
                    />
                    <Input
                      id="area"
                      name="area"
                      value={inputs.area}
                      readOnly
                      type="text"
                      placeholder="Fecha de finalización"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl className="ms-2" mt={3}>
                  <FormLabel htmlFor="propiedad">Propiedad:</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon as={GrCircleInformation} color="gray.50" />
                      }
                    />
                    <Input
                        id="propiedad"
                        name="propiedad"
                        value={inputs.propiedad}
                        readOnly
                        type="text"
                        placeholder="Fecha de finalización"
                        variant="flushed"
                      />
                  </InputGroup>
                </FormControl>
              </div>
              <div className="d-flex">
                <FormControl mt={3} className="me-2">
                  <FormLabel htmlFor="valor_garantia">
                    Valor de la garantía:{' '}
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon as={AiOutlineDollarCircle} color="gray.900" />
                      }
                    />
                    <Input
                      id="valor_garantia"
                      name="valor_garantia"
                      type="number"
                      value={inputs.valor_garantia}
                      readOnly
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={3} className="ms-2">
                  <FormLabel htmlFor="valor_alquiler">
                    Valor de alquiler:{' '}
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon as={AiOutlineDollarCircle} color="gray.900" />
                      }
                    />
                    <Input
                      id="valor_alquiler"
                      name="valor_alquiler"
                      type="number"
                      value={inputs.valor_alquiler}
                      readOnly
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </div>
              <FormControl mt={3}>
                <FormLabel htmlFor="motivo_reservacion">
                  Motivo de la reservación:{' '}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={GrCircleInformation} color="gray.50" />}
                  />
                  <Input
                    id="motivo_reservacion"
                    name="motivo_reservacion"
                    type="text"
                    value={inputs.motivo_reservacion}
                    readOnly
                    placeholder="Motivo para la reservación"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
          </ModalBody>
          <ModalFooter mt={3} bgColor={'blackAlpha.50'}>
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
