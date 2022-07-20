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
  InputGroup,
  FormLabel,
  FormControl,
  Divider,
  Select,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { CalendarIcon, EditIcon } from '@chakra-ui/icons';
import moment from 'moment';
import { BiDollarCircle, BiUserCircle } from 'react-icons/bi';
import { GrCircleInformation } from 'react-icons/gr';
import { RegistroMultas } from './RegistroMultas';
import { RegistroCuotaExt } from './RegistroCuotaExt';
import { get } from '../../services/Get';

export const ValidarPago = props => {
  const { stateChanger, isOpenValidarPago, setIsOpenValidarPago, data } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCuota, setIsOpenCuota] = useState(false);
  const [inputs, setInputs] = useState({
    date: '',
    mes: '',
    propietario: '',
    valor: '',
    propiedad: '',
    numero_casa: '',
    codigo: '',
    telefono: '',
    metodo_pago: '',
    valor_pagado: 0,
    valor_pendiente: 0,
    concepto: '',
    multa: {
      id_multas: 0,
      fecha_multa: "",
      motivo_multa: "",
      valor_multa: 0,
      estado_multa: ""
    },
    cuota_extraordinaria: {
      id_cuota: 0,
      detalle_cuota: "",
      valor_cuota: 0,
      estado_cuota: ""
    },
  });

  useEffect(() => {
    if (data) {
      setInputs({
        date: data.fecha_maxima_alicuota,
        mes: data.mes_alicuota,
        propietario: data.nombre_propietario + ' ' + data.apellido_propietario,
        valor: parseFloat(data.valor_alicuota),
        propiedad: data.id_propiedad,
        numero_casa: data.numero_casa,
        codigo: `00-${data.id_pago_alicuota}`,
        telefono: data.celular_propietario,
        metodo_pago: '',
        valor_pagado: 0,
        valor_pendiente: 0,
        concepto: '',
        multa: {
          id_multas: 0,
          fecha_multa: "",
          motivo_multa: "",
          valor_multa: 0,
          estado_multa: ""
        },
        cuota_extraordinaria: {
          id_cuota: 0,
          detalle_cuota: "",
          valor_cuota: 0,
          estado_cuota: ""
        },
      });
    }
    return () => {
      setInputs({
        date: '',
        mes: '',
        propietario: '',
        valor: '',
        propiedad: '',
        numero_casa: '',
        codigo: '',
        telefono: '',
        metodo_pago: '',
        valor_pagado: 0,
        valor_pendiente: 0,
        concepto: '',
        multa: {
          id_multas: 0,
          fecha_multa: "",
          motivo_multa: "",
          valor_multa: 0,
          estado_multa: ""
        },
        cuota_extraordinaria: {
          id_cuota: 0,
          detalle_cuota: "",
          valor_cuota: 0,
          estado_cuota: ""
        },
      });
    };
  }, [isOpenValidarPago]);

  const actionGuardar = () => {
    console.log('Accion guardar');
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onClose = () => {
    setIsOpenValidarPago(false);
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

  const openRegistroMulta = () => {
    setIsOpen(true);
  };

  const openModalCuota = () => {
    setIsOpenCuota(true);
  };

  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenValidarPago}
        onClose={onClose}
        size={'6xl'}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'blackAlpha.50'}>Validar Pago</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="fw-bold mb-2">Información General</h1>
            <Divider />
            <div className="d-flex px-3 mt-2">
              <FormControl className="me-1">
                <FormLabel htmlFor="mes">Correspondiente a: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.500" />}
                  />
                  <Input
                    id="mes"
                    name="mes"
                    type="text"
                    value={inputs.mes}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="me-1">
                <FormLabel htmlFor="date">Fecha máxima de pago: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.500" />}
                  />
                  <Input
                    id="date"
                    name="date"
                    value={moment(inputs.date).format('YYYY-MM-DD')}
                    readOnly
                    className="form-control"
                    type="date"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="me-1">
                <FormLabel htmlFor="date">Fecha de pago: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.500" />}
                  />
                  <Input
                    id="date"
                    name="date"
                    value={moment(inputs.date).format('YYYY-MM-DD')}
                    readOnly
                    className="form-control"
                    type="date"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="nombre">Propietario: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BiUserCircle} color="gray.500" />}
                  />
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={inputs.propietario}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="d-flex mt-2 w-100">
              <div className="me-1 w-50">
                <div className="d-flex justify-content-between">
                  <h1 className="fw-bold mt-3 mb-2">Detalle de Multas</h1>
                  <Button
                    colorScheme="teal"
                    className="px-3 mt-2 mb-1"
                    variant="solid"
                    size={'sm'}
                    onClick={openRegistroMulta}
                  >
                    Agregar
                    <i className="fa fa-plus-circle ms-1" />
                  </Button>
                </div>
                <Divider />
                <div>
                {inputs.multa.id_multas > 0 ? (
                    <>
                      <TableContainer>
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Fecha</Th>
                              <Th>Motivo</Th>
                              <Th>Valor</Th>
                              <Th>Estado</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Td>{inputs.multa.fecha_multa}</Td>
                            <Td>{inputs.multa.motivo_multa}</Td>
                            <Td>{inputs.multa.valor_multa}</Td>
                            <Td>{inputs.multa.estado_multa}</Td>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </>
                  ) : (
                    <>
                      <p>No se registran cuotas extraordinarias</p>
                    </>
                  )}
                </div>
              </div>
              <div className="ms-1 w-50">
                <div className="d-flex justify-content-between">
                  <h1 className="fw-bold mt-3 mb-2">Cuota Extraordinaria</h1>
                  <Button
                    colorScheme="teal"
                    className="px-3 mt-2 mb-1"
                    variant="solid"
                    size={'sm'}
                    onClick={openModalCuota}
                  >
                    Agregar
                    <i className="fa fa-plus-circle ms-1" />
                  </Button>
                </div>
                <Divider />
                <div>
                  {inputs.cuota_extraordinaria.id_cuota > 0 ? (
                    <>
                      <TableContainer>
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Detalle</Th>
                              <Th>Valor</Th>
                              <Th>Estado</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Td>{inputs.cuota_extraordinaria.detalle_cuota}</Td>
                            <Td>{inputs.cuota_extraordinaria.valor_cuota}</Td>
                            <Td>{inputs.cuota_extraordinaria.estado_cuota}</Td>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </>
                  ) : (
                    <>
                      <p>No se registran cuotas extraordinarias</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <h1 className="fw-bold mt-4 mb-2">Información del Pago</h1>
            <Divider />
            <div className="d-flex px-3 mt-2">
              <FormControl className="me-1">
                <FormLabel htmlFor="valor">Valor a pagar: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BiDollarCircle} color="gray.500" />}
                  />
                  <Input
                    id="valor"
                    name="valor"
                    type="text"
                    value={inputs.valor}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired className="me-1">
                <FormLabel htmlFor="metodo_pago">Forma de pago: </FormLabel>
                <InputGroup>
                  <Select
                    placeholder="Selecciona una opción"
                    id="metodo_pago"
                    name="metodo_pago"
                    value={inputs.metodo_pago}
                    onChange={e =>
                      setInputs({ ...inputs, metodo_pago: e.target.value })
                    }
                    variant="flushed"
                    className="ps-2"
                  >
                    <option value="EFECTIVO">EFECTIVO</option>
                    <option value="DEPÓSITO">DEPÓSITO</option>
                    <option value="CHEQUE">CHEQUE</option>
                    <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl isRequired className="me-1">
                <FormLabel htmlFor="valor_pagado">Saldo entregado: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BiDollarCircle} color="gray.500" />}
                  />
                  <Input
                    id="valor_pagado"
                    name="valor_pagado"
                    type="number"
                    value={inputs.valor_pagado}
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        valor_pagado: parseFloat(e.target.value),
                        valor_pendiente:
                          inputs.valor - parseFloat(e.target.value),
                      })
                    }
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="me-1">
                <FormLabel htmlFor="valor_pendiente">
                  Saldo pendiente:{' '}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BiDollarCircle} color="gray.500" />}
                  />
                  <Input
                    id="valor_pendiente"
                    name="valor_pendiente"
                    type="number"
                    value={inputs.valor_pendiente}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="d-flex px-3 mt-2">
              <FormControl isRequired className="me-1">
                <FormLabel htmlFor="concepto">Concepto del Pago: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon as={GrCircleInformation} color="gray.500" />
                    }
                  />
                  <Input
                    id="concepto"
                    name="concepto"
                    type="text"
                    value={inputs.concepto}
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        concepto: e.target.value,
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
        <RegistroMultas
          stateChanger={stateChanger}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          inputsPadre={inputs}
          setInputsPadre={setInputs}
        />
        <RegistroCuotaExt
          stateChanger={stateChanger}
          isOpenCuota={isOpenCuota}
          setIsOpenCuota={setIsOpenCuota}
          inputsPadre={inputs}
          setInputsPadre={setInputs}
        />
      </Modal>
    </>
  );
};
