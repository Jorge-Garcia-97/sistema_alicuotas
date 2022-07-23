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
import moment from 'moment';
import { BiDollarCircle, BiUserCircle } from 'react-icons/bi';
import { BsPhone, BsEnvelope } from 'react-icons/bs';

export const InformacionPago = props => {
  const { isOpen, setIsOpen, data } = props;
  const [state, setState] = useState({
    id_detalle_comprobante: 0,
    forma_pago: '',
    concepto_comprobante: '',
    comprobante_id_comprobante: 0,
    cuota_extraordinaria_id_cuota_extraordinaria: 0,
    multas_id_multas: 0,
    id_comprobante: 12,
    codigo_comprobante: '',
    fecha_comprobante: '',
    mes_alicuota: '',
    fecha_maxima_alicuota: '',
    valor_alicuota: 0,
    valor_pendiente_alicuota: 0,
    id_pago_alicuota: 0,
    numero_casa: 0,
    nombre_propietario: '',
    apellido_propietario: '',
    celular_propietario: '',
    correo_propietario: '',
    fecha_multa: '',
    motivo_multa: '',
    valor_multa: 0,
    estado_multa: '',
    detalle_cuota: '',
    valor_cuota: 0,
    estado_cuota: '',
  });

  useEffect(() => {
    if (data) {
    //   setInputs({
    //     date: data.fecha_maxima_alicuota,
    //     mes: data.mes_alicuota,
    //     fecha_pago: moment(new Date()).format('YYYY-MM-DD'),
    //     propietario: data.nombre_propietario + ' ' + data.apellido_propietario,
    //     valor: parseFloat(data.valor_alicuota),
    //     propiedad: data.id_propiedad,
    //     numero_casa: data.numero_casa,
    //     codigo: `00-${data.id_pago_alicuota}`,
    //     id_pago_alicuota: data.id_pago_alicuota,
    //     telefono: data.celular_propietario,
    //     correo: data.correo_propietario,
    //     metodo_pago: '',
    //     valor_pagado: 0,
    //     valor_pendiente: 0,
    //     concepto: '',
    //   });
    }
    return () => {
    //   setInputs({
    //     date: '',
    //     mes: '',
    //     fecha_pago: '',
    //     propietario: '',
    //     valor: '',
    //     propiedad: '',
    //     numero_casa: '',
    //     codigo: '',
    //     id_pago_alicuota: '',
    //     telefono: '',
    //     correo: '',
    //     metodo_pago: '',
    //     valor_pagado: 0,
    //     valor_pendiente: 0,
    //     concepto: '',
    //   });
    };
  }, [isOpen]);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'6xl'}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'blackAlpha.50'}>
            Información del Pago
          </ModalHeader>
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
              <FormControl className="me-1 ms-1">
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
              <FormControl className="ms-1">
                <FormLabel htmlFor="fecha_pago">Fecha de pago: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.500" />}
                  />
                  <Input
                    id="fecha_pago"
                    name="fecha_pago"
                    value={moment(inputs.fecha_pago).format('YYYY-MM-DD')}
                    readOnly
                    className="form-control"
                    type="date"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="d-flex px-3 mt-2">
              <FormControl className="me-1">
                <FormLabel htmlFor="nombre">Nombres y apellidos: </FormLabel>
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
              <FormControl className="ms-1 me-1">
                <FormLabel htmlFor="telefono">Teléfono: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BsPhone} color="gray.500" />}
                  />
                  <Input
                    id="telefono"
                    name="telefono"
                    type="text"
                    value={inputs.telefono}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="ms-1">
                <FormLabel htmlFor="correo">Correo: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BsEnvelope} color="gray.500" />}
                  />
                  <Input
                    id="correo"
                    name="correo"
                    type="text"
                    value={inputs.correo}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="d-flex mt-3 w-100">
              <div className="me-1 w-50">
                <div className="d-flex justify-content-between">
                  <h1 className="fw-bold mt-3 mb-2">Detalle de Multas</h1>
                </div>
                <Divider />
                <div>
                  <TableContainer>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Fecha</Th>
                          <Th>Motivo</Th>
                          <Th isNumeric>Valor</Th>
                          <Th>Estado</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Td>{multas.fecha_multa}</Td>
                        <Td>{multas.motivo_multa}</Td>
                        <Td isNumeric>{multas.valor_multa}</Td>
                        <Td>{multas.estado_multa}</Td>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
              <div className="ms-1 w-50">
                <div className="d-flex justify-content-between">
                  <h1 className="fw-bold mt-3 mb-2">Cuota Extraordinaria</h1>
                </div>
                <Divider />
                <div>
                  <TableContainer>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Detalle</Th>
                          <Th isNumeric>Valor</Th>
                          <Th>Estado</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Td>{cuota.detalle_cuota}</Td>
                        <Td isNumeric>{cuota.valor_cuota}</Td>
                        <Td>{cuota.estado_cuota}</Td>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
            <h1 className="fw-bold mt-4 mb-2">Información del Pago</h1>
            <Divider />
            <div className="d-flex px-3 mt-2">
              <FormControl isRequired className="me-1">
                <FormLabel htmlFor="metodo_pago">Forma de pago: </FormLabel>
                <InputGroup></InputGroup>
              </FormControl>
              <FormControl isRequired className="me-1">
                <FormLabel htmlFor="valor_pagado">Total a cancelar: </FormLabel>
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
                    isReadOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="d-flex px-3 mt-3">
              <div className="flex-grow-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="correo">Comprobante de pago</FormLabel>
                </FormControl>
              </div>
              <div className="">
                <FormControl>
                  <div className="d-flex justify-content-end">
                    <FormLabel className="mt-2" htmlFor="valor_mensual">
                      Total por mensualidad:{' '}
                    </FormLabel>
                    <InputGroup className="w-25">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={BiDollarCircle} color="gray.500" />}
                      />
                      <Input
                        id="valor_mensual"
                        name="valor_mensual"
                        type="number"
                        value={totales.valor_mensual}
                        readOnly
                        variant="flushed"
                      />
                    </InputGroup>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="d-flex justify-content-end">
                    <FormLabel className="mt-2" htmlFor="valor_multas">
                      Total por multas:{' '}
                    </FormLabel>
                    <InputGroup className="w-25">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={BiDollarCircle} color="gray.500" />}
                      />
                      <Input
                        id="valor_multas"
                        name="valor_multas"
                        type="number"
                        value={totales.valor_multas}
                        readOnly
                        variant="flushed"
                      />
                    </InputGroup>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="d-flex justify-content-end">
                    <FormLabel className="mt-2" htmlFor="valor_cuotas">
                      Total por cuotas ext.:{' '}
                    </FormLabel>
                    <InputGroup className="w-25">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={BiDollarCircle} color="gray.500" />}
                      />
                      <Input
                        id="valor_cuotas"
                        name="valor_cuotas"
                        type="number"
                        value={totales.valor_cuotas}
                        readOnly
                        variant="flushed"
                      />
                    </InputGroup>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="d-flex justify-content-end">
                    <FormLabel className="mt-2" htmlFor="valor_multa_fecha">
                      Multa por retraso:{' '}
                    </FormLabel>
                    <InputGroup className="w-25">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={BiDollarCircle} color="gray.500" />}
                      />
                      <Input
                        id="valor_multa_fecha"
                        name="valor_multa_fecha"
                        type="number"
                        value={totales.valor_multa_fecha}
                        readOnly
                        variant="flushed"
                      />
                    </InputGroup>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="d-flex justify-content-end">
                    <FormLabel className="mt-2" htmlFor="valor_pendiente">
                      Saldo pendiente:{' '}
                    </FormLabel>
                    <InputGroup className="w-25">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={BiDollarCircle} color="gray.500" />}
                      />
                      <Input
                        id="valor_pendiente"
                        name="valor_pendiente"
                        type="number"
                        value={totales.valor_pendiente}
                        readOnly
                        variant="flushed"
                      />
                    </InputGroup>
                  </div>
                </FormControl>
                <FormControl>
                  <div className="d-flex justify-content-end">
                    <FormLabel className="mt-2" htmlFor="valor_total">
                      Total:{' '}
                    </FormLabel>
                    <InputGroup className="w-25">
                      <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={BiDollarCircle} color="gray.500" />}
                      />
                      <Input
                        id="valor_total"
                        name="valor_total"
                        type="number"
                        value={totales.valor_total}
                        readOnly
                        variant="flushed"
                      />
                    </InputGroup>
                  </div>
                </FormControl>
              </div>
            </div>
          </ModalBody>
          <ModalFooter mt={3} bgColor={'blackAlpha.50'}>
            <Button colorScheme="blue" mr={3} onClick={guardarRegistro}>
              Guardar
            </Button>
            <Button colorScheme="red" onClick={onOpenConfirmation}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
        <RegistroMultas
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setMultas={setMultas}
        />
        <RegistroCuotaExt
          isOpenCuota={isOpenCuota}
          setIsOpenCuota={setIsOpenCuota}
          setCuota={setCuota}
        />
      </Modal> */}
    </>
  );
};
