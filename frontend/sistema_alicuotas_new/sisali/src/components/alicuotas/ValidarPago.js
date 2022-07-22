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
  Text,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { CalendarIcon } from '@chakra-ui/icons';
import moment from 'moment';
import { BiDollarCircle, BiUserCircle } from 'react-icons/bi';
import { BsPhone, BsEnvelope } from 'react-icons/bs';
import { GrCircleInformation } from 'react-icons/gr';
import { RegistroMultas } from './RegistroMultas';
import { RegistroCuotaExt } from './RegistroCuotaExt';
import { editEstadoPagos, editValorPendientePago, saveComprobante, saveDetalleComprobante, saveImagenEvidencia } from '../../services/Post';

export const ValidarPago = props => {
  const { stateChanger, isOpenValidarPago, setIsOpenValidarPago, data } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isOpenCuota, setIsOpenCuota] = useState(false);
  const [file, setfile] = useState(null);
  const [inputs, setInputs] = useState({
    date: '',
    mes: '',
    fecha_pago: '',
    propietario: '',
    valor: '',
    propiedad: '',
    numero_casa: '',
    codigo: '',
    id_pago_alicuota: '',
    telefono: '',
    correo: '',
    metodo_pago: '',
    valor_pagado: 0,
    valor_pendiente: 0,
    concepto: '',
  });
  const [multas, setMultas] = useState({
    id_multas: 0,
    fecha_multa: '',
    motivo_multa: '',
    valor_multa: 0,
    estado_multa: '',
  });
  const [cuota, setCuota] = useState({
    id_cuota: 0,
    detalle_cuota: '',
    valor_cuota: 0,
    estado_cuota: '',
  });
  const [totales, setTotales] = useState({
    valor_pagado: 0,
    valor_pendiente: 0,
    valor_multas: 0,
    valor_multa_fecha: 0,
    valor_cuotas: 0,
    valor_mensual: 0,
    valor_total: 0,
  });

  useEffect(() => {
    if (data) {
      setInputs({
        date: data.fecha_maxima_alicuota,
        mes: data.mes_alicuota,
        fecha_pago: moment(new Date()).format('YYYY-MM-DD'),
        propietario: data.nombre_propietario + ' ' + data.apellido_propietario,
        valor: parseFloat(data.valor_alicuota),
        propiedad: data.id_propiedad,
        numero_casa: data.numero_casa,
        codigo: `00-${data.id_pago_alicuota}`,
        id_pago_alicuota: data.id_pago_alicuota,
        telefono: data.celular_propietario,
        correo: data.correo_propietario,
        metodo_pago: '',
        valor_pagado: 0,
        valor_pendiente: 0,
        concepto: '',
      });
    }
    return () => {
      setInputs({
        date: '',
        mes: '',
        fecha_pago: '',
        propietario: '',
        valor: '',
        propiedad: '',
        numero_casa: '',
        codigo: '',
        id_pago_alicuota: '',
        telefono: '',
        correo: '',
        metodo_pago: '',
        valor_pagado: 0,
        valor_pendiente: 0,
        concepto: '',
      });
      setMultas({
        id_multas: 0,
        fecha_multa: '',
        motivo_multa: '',
        valor_multa: 0,
        estado_multa: '',
      });
      setCuota({
        id_cuota: 0,
        detalle_cuota: '',
        valor_cuota: 0,
        estado_cuota: '',
      });
      setTotales({
        valor_pagado: 0,
        valor_pendiente: 0,
        valor_multas: 0,
        valor_multa_fecha: 0,
        valor_cuotas: 0,
        valor_mensual: 0,
        valor_total: 0,
      });
    };
  }, [isOpenValidarPago]);

  useEffect(() => {
    let multa_fecha = 0;
    let exceso = moment(inputs.fecha_pago).diff(inputs.date, 'days');
    if (exceso > 1 && exceso < 29) {
      multa_fecha = 6;
    }
    if (exceso >= 30 && exceso < 90) {
      multa_fecha = 12;
    }
    if (exceso >= 90) {
      multa_fecha = 30;
    }
    setTotales({
      valor_pagado: parseFloat(inputs.valor_pagado),
      valor_pendiente:
        parseFloat(multas.valor_multa) +
          multa_fecha +
          parseFloat(inputs.valor) +
          parseFloat(cuota.valor_cuota) -
          parseFloat(inputs.valor_pagado) >
        0
          ? parseFloat(multas.valor_multa) +
            multa_fecha +
            parseFloat(inputs.valor) +
            parseFloat(cuota.valor_cuota) -
            parseFloat(inputs.valor_pagado)
          : 0,
      valor_multas: parseFloat(multas.valor_multa),
      valor_multa_fecha: multa_fecha,
      valor_cuotas: parseFloat(cuota.valor_cuota),
      valor_mensual: parseFloat(inputs.valor),
      valor_total:
        parseFloat(multas.valor_multa) +
        parseFloat(inputs.valor) +
        parseFloat(cuota.valor_cuota) +
        multa_fecha,
    });
    multa_fecha = 0;
  }, [inputs, multas, cuota]);

  const guardarRegistro = async () => {
    let inputs_to_send = {...inputs};
    let multas_to_send = {...multas};
    let cuota_to_send = {...cuota};
    if (inputs_to_send.concepto !== "" && inputs_to_send.valor_pagado > 0 && inputs_to_send.metodo_pago !== "")  {
      let comprobante_to_send = {
        codigo_comprobante: inputs_to_send.codigo,
        fecha_comprobante: inputs_to_send.fecha_pago,
      };      
      const resp = await saveComprobante(comprobante_to_send);
      if (resp.id > 0) {
        let detalle_comprobante_to_send = {
          forma_pago: inputs_to_send.metodo_pago,
          concepto_comprobante: inputs_to_send.concepto,
          id_pago_alicuota: inputs_to_send.id_pago_alicuota,
          id_comprobante: resp.id,
          id_cuota_extraordinaria: cuota_to_send.id_cuota > 0 ? cuota_to_send.id_cuota : undefined,
          id_multas: multas_to_send.id_multas > 0 ? multas_to_send.id_multas : undefined,
        };
        const response = await saveDetalleComprobante(detalle_comprobante_to_send);
        if (response.id > 0) {
          if (file) {
            const formdata = new FormData();
            formdata.append("image", file);
            const carga = await saveImagenEvidencia(formdata, response.id);
            document.getElementById("fileinput").value = null;
            setfile(null);
            if (carga) {              
              let data = {
                estado_alicuota: "PAGADO",
                valor_pendiente_alicuota: inputs_to_send.valor_pendiente,
              }
              const acutalizar_estado_pago = await editEstadoPagos(data, inputs_to_send.id_pago_alicuota);
              const acutalizar_valor_pago = await editValorPendientePago(data, inputs_to_send.id_pago_alicuota);
              if(acutalizar_estado_pago && acutalizar_valor_pago){
                Toast.fire({
                  icon: 'success',
                  title: 'Registro exitoso'
                });
                setIsOpenValidarPago(false);
                stateChanger(true);
              }               
            }else{
              Toast.fire({
                icon: 'error',
                title: 'Algo ha salido mal'
              })
            }
          }        
        } else {
          Toast.fire({
            icon: 'error',
            title: 'Algo ha salido mal'
          })
        }
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Algo ha salido mal'
        })
      }
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Necesitas llenar todos los datos'
      })
    }
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onCloseModal = () => {
    setIsOpenConfirmation(false);
    setIsOpenValidarPago(false);
  };

  const onOpenConfirmation = () => {
    setIsOpenConfirmation(true);
  };

  const onCloseConfirmation = () => {
    setIsOpenConfirmation(false);
  };

  const selectedHandler = (e) => {
    setfile(e.target.files[0]);
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
        onClose={onOpenConfirmation}
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
                  {multas.id_multas == 0 && (
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
                  )}
                </div>
                <Divider />
                <div>
                  {multas.id_multas > 0 ? (
                    <>
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
                  {cuota.id_cuota == 0 && (
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
                  )}
                </div>
                <Divider />
                <div>
                  {cuota.id_cuota > 0 ? (
                    <>
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
                    onChange={e =>
                      setInputs({
                        ...inputs,
                        valor_pagado: e.target.value ? e.target.value : 0,
                      })
                    }
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="d-flex px-3 mt-3">
              <div className="flex-grow-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="correo">Comprobante de pago</FormLabel>
                  <input
                    id="fileinput"
                    onChange={selectedHandler}
                    className="form-control"
                    type="file"
                  />
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

        {/* Verificar cancelación */}
        <Modal
          blockScrollOnMount={true}
          isCentered
          isOpen={isOpenConfirmation}
          onClose={onCloseConfirmation}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cancelar Validación</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold" mb="1rem">
                ¿Está seguro de querer cancelar? <br />
              </Text>
              <Text mb="1rem">
                Se perderán todos los datos registrados para esta validación.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={onCloseModal}>
                Aceptar
              </Button>
              <Button colorScheme="red" onClick={onCloseConfirmation}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Modal>
    </>
  );
};
