import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputLeftElement,
  FormControl,
  InputGroup,
  FormLabel,
  Icon,
  Select,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import moment from 'moment';
import { BiDollarCircle } from 'react-icons/bi';
import { editPagos } from '../../services/Post';
import Swal from 'sweetalert2';

export const EditarAlicuota = props => {
  const { stateChanger, isOpen, setIsOpen, data } = props;
  const [state, setState] = useState({});
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    if (data) {
      setState({
        id_alicuota: data.id_pago_alicuota,
        mes_alicuota: data.mes_alicuota,
        fecha_maxima_alicuota: moment(data.fecha_maxima_alicuota).format(
          'YYYY-MM-DD'
        ),
        valor_alicuota: data.valor_alicuota,
      });
    }

    return () => {
      setState({});
    };
  }, [isOpen]);

  const actionGuardar = async () => {
    const to_send = { ...state };
    if (
      to_send.fecha_maxima_alicuota !== '' &&
      to_send.valor_alicuota !== '' &&
      to_send.mes_alicuota !== ''
    ) {
      const response_update = await editPagos(to_send, to_send.id_alicuota);
      if (response_update) {
        Toast.fire({
          icon: 'success',
          title: 'Registro exitoso',
        });
        stateChanger(true);
        setIsOpen(false);
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
        });
      }
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Debes ingresar datos en todos los campos',
      });
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      container: 'container-popup',
      popup: 'popup',
    },
  });

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
            Editar Información del Pago
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="mes">Mes</FormLabel>
              <InputGroup>
                <Select
                  placeholder="Selecciona una opción"
                  id="mes"
                  name="mes"
                  value={state.mes_alicuota}
                  onChange={e =>
                    setState({ ...state, mes_alicuota: e.target.value })
                  }
                  variant="flushed"
                  className="ps-2"
                >
                  <option value="ENERO">ENERO</option>
                  <option value="FEBRERO">FEBRERO</option>
                  <option value="MARZO">MARZO</option>
                  <option value="ABRIL">ABRIL</option>
                  <option value="MAYO">MAYO</option>
                  <option value="JUNIO">JUNIO</option>
                  <option value="JULIO">JULIO</option>
                  <option value="AGOSTO">AGOSTO</option>
                  <option value="SEPTIEMBRE">SEPTIEMBRE</option>
                  <option value="OCTUBRE">OCTUBRE</option>
                  <option value="NOVIEMBRE">NOVIEMBRE</option>
                  <option value="DICIEMBRE">DICIEMBRE</option>
                </Select>
              </InputGroup>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor="fecha_maxima">
                Fecha máxima de pago:{' '}
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CalendarIcon color="gray.500" />}
                />
                <Input
                  id="fecha_maxima"
                  name="fecha_maxima"
                  type="date"
                  value={state.fecha_maxima_alicuota}
                  onChange={e =>
                    setState({
                      ...state,
                      fecha_maxima_alicuota: e.target.value,
                    })
                  }
                  className="form-control"
                  variant="flushed"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor="valor">Valor Mensualidad: </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={BiDollarCircle} color="gray.500" />}
                />
                <Input
                  id="valor"
                  name="valor"
                  type="number"
                  value={state.valor_alicuota}
                  onChange={e =>
                    setState({
                      ...state,
                      valor_alicuota: e.target.value,
                    })
                  }
                  variant="flushed"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter mt={3} bgColor={'blackAlpha.50'}>
            <Button colorScheme="telegram" mr={3} onClick={actionGuardar}>
              Actualizar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
