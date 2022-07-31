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
import { saveReserva } from '../../services/Post';
import { createStandaloneToast } from '@chakra-ui/toast';
import moment from 'moment';
import { get } from '../../services/Get';

export const CrearReservacion = props => {
  const { stateChanger, isOpen, setIsOpen, propiedades, areas } = props;
  const [inputs, setInputs] = useState({
    fecha_fin: '',
    fecha_inicio: '',
    valor_alquiler: 0,
    valor_garantia: 0,
    motivo_reservacion: '',
    propiedad: '',
    area: '',
  });
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { ToastContainer, toast } = createStandaloneToast();

  useEffect(() => {
    setInputs({
      fecha_fin: '',
      fecha_inicio: '',
      valor_alquiler: 0,
      valor_garantia: 0,
      motivo_reservacion: '',
      propiedad: '',
      area: '',
    });

    return () => {
      setInputs({});
    };
  }, [isOpen]);

  const actionGuardar = async () => {
    const to_send = { ...inputs };
    if (
      to_send.fecha_fin !== '' &&
      to_send.fecha_inicio !== '' &&
      to_send.valor_alquiler !== 0 &&
      to_send.valor_garantia != 0 &&
      to_send.motivo_reservacion !== '' &&
      to_send.propiedad !== '' &&
      to_send.area !== ''
    ) {
      // console.log(to_send)
      var response = await get(
        `reservacion/realizada/${to_send.propiedad}/${to_send.area}/${to_send.fecha_inicio}/${to_send.fecha_fin}`
      );
      if (response.length == 0) {
        response = await get(
          `reservacion/realizada-2/${to_send.propiedad}/${to_send.area}/${to_send.fecha_inicio}/${to_send.fecha_fin}`
        );
        if (response.length == 0) {
          response = await saveReserva(to_send);
          if (response) {
            toast({
              title: 'Registro realizado con éxito',
              description: 'Se registró el valor de la alicuota.',
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
              description: 'Se encontró un error al registrar la alicuota.',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top-right',
            });
          }
        } else {
          toast({
            title: 'Cuidado',
            description: 'Ya existe una reservación con los datos ingresados.',
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
        }
      } else {
        toast({
          title: 'Cuidado',
          description: 'Ya existe una reservación con los datos ingresados.',
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
          <ModalHeader bgColor={'blackAlpha.50'}>Reservación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="px-3 my-2">
              <div className="d-flex">
                <FormControl isRequired mt={1} className="me-2">
                  <FormLabel htmlFor="fecha_inicio">Fecha de inicio:</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CalendarIcon color="gray.700" />}
                    />
                    <Input
                      id="fecha_inicio"
                      name="fecha_inicio"
                      value={inputs.fecha_inicio}
                      onChange={e =>
                        setInputs({ ...inputs, fecha_inicio: e.target.value })
                      }
                      className="form-control"
                      type="datetime-local"
                      min={moment(new Date()).format('YYYY-MM-DD')}
                      placeholder="Fecha de inicio"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired mt={1} className="ms-2">
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
                      value={inputs.fecha_fin}
                      onChange={e =>
                        setInputs({ ...inputs, fecha_fin: e.target.value })
                      }
                      className="form-control"
                      type="datetime-local"
                      placeholder="Fecha de finalización"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </div>
              <div className="d-flex">
                <FormControl isRequired className="me-2" mt={3}>
                  <FormLabel htmlFor="area">Área a Reservar:</FormLabel>
                  <InputGroup>
                    <Select
                      placeholder="Selecciona una opción"
                      id="area"
                      name="area"
                      value={inputs.area}
                      onChange={e =>
                        setInputs({
                          ...inputs,
                          area: parseInt(e.target.value),
                        })
                      }
                      variant="flushed"
                      className="ps-2"
                    >
                      {areas.map((area, i) => (
                        <option value={area.id_area_comunal} key={i}>
                          {area.nombre_area}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired className="ms-2" mt={3}>
                  <FormLabel htmlFor="propiedad">Propiedad:</FormLabel>
                  <InputGroup>
                    <Select
                      placeholder="Selecciona una opción"
                      id="propiedad"
                      name="propiedad"
                      value={inputs.propiedad}
                      onChange={e =>
                        setInputs({
                          ...inputs,
                          propiedad: parseInt(e.target.value),
                        })
                      }
                      variant="flushed"
                      className="ps-2"
                    >
                      {propiedades.map((propiedad, i) => (
                        <option value={propiedad.id_propiedad} key={i}>
                          {'Casa: ' +
                            propiedad.numero_casa +
                            ' - ' +
                            propiedad.nombre_propietario +
                            ' ' +
                            propiedad.apellido_propietario}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                </FormControl>
              </div>
              <div className="d-flex">
                <FormControl isRequired mt={3} className="me-2">
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
                      onChange={e =>
                        setInputs({
                          ...inputs,
                          valor_garantia:
                            e.target.value !== ''
                              ? parseFloat(e.target.value)
                              : '',
                        })
                      }
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired mt={3} className="ms-2">
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
                      onChange={e =>
                        setInputs({
                          ...inputs,
                          valor_alquiler:
                            e.target.value !== ''
                              ? parseFloat(e.target.value)
                              : '',
                        })
                      }
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
              </div>
              <FormControl isRequired mt={3}>
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
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        motivo_reservacion: e.target.value,
                      })
                    }
                    placeholder="Motivo para la reservación"
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
