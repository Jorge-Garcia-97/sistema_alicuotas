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
import { GrCircleInformation } from 'react-icons/gr';
import { AiFillPrinter } from 'react-icons/ai';
import { CalendarIcon } from '@chakra-ui/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const InformacionPago = props => {
  const { isOpen, setIsOpen, data, data_multas, data_cuotas } = props;
  const [state, setState] = useState({
    forma_pago: '',
    concepto_comprobante: '',
    codigo_comprobante: '',
    fecha_comprobante: '',
    mes_alicuota: '',
    fecha_maxima_alicuota: '',
    valor_alicuota: 0,
    valor_pendiente_alicuota: 0,
    numero_casa: 0,
    nombre_propietario: '',
    apellido_propietario: '',
    celular_propietario: '',
    correo_propietario: '',
  });
  const [multas, setMultas] = useState([]);
  const [cuotas, setCuotas] = useState([]);
  const [totales, setTotales] = useState({
    valor_pagado: 0,
    valor_pendiente: 0,
    valor_multas: 0,
    valor_cuotas: 0,
    valor_mensual: 0,
    valor_total: 0,
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      setState({
        forma_pago: data.forma_pago,
        concepto_comprobante: data.concepto_comprobante,
        codigo_comprobante: data.codigo_comprobante,
        fecha_comprobante: data.fecha_comprobante,
        mes_alicuota: data.mes_alicuota,
        fecha_maxima_alicuota: data.fecha_maxima_alicuota,
        valor_alicuota: data.valor_alicuota,
        valor_pendiente_alicuota: data.valor_pendiente_alicuota,
        numero_casa: data.numero_casa,
        nombre_propietario: data.nombre_propietario,
        apellido_propietario: data.apellido_propietario,
        celular_propietario: data.celular_propietario,
        correo_propietario: data.correo_propietario,
      });
    }
    if (data_cuotas) {
      setCuotas(data_cuotas);
    }
    if (data_multas) {
      setMultas(data_multas);
    }
    return () => {
      setCuotas([]);
      setMultas([]);
    };
  }, [isOpen]);

  useEffect(() => {
    var temp_valor_multas = 0;
    var temp_valor_cuotas = 0;
    if (data_multas) {
      var multas_array = data_multas;
      multas_array.map(multa => {
        temp_valor_multas += parseFloat(multa.valor_multa);
      });
    }
    if (data_cuotas) {
      var cuotas_array = data_cuotas;
      cuotas_array.map(c => {
        temp_valor_cuotas += parseFloat(c.valor_cuota);
      });
    }
    setTotales({
      valor_pagado:
        parseFloat(temp_valor_multas) +
        parseFloat(temp_valor_cuotas) +
        parseFloat(state.valor_alicuota) -
        parseFloat(state.valor_pendiente_alicuota),
      valor_pendiente: parseFloat(state.valor_pendiente_alicuota),
      valor_multas: parseFloat(temp_valor_multas),
      valor_cuotas: parseFloat(temp_valor_cuotas),
      valor_mensual: parseFloat(state.valor_alicuota),
      valor_total:
        parseFloat(temp_valor_multas) +
        parseFloat(temp_valor_cuotas) +
        parseFloat(state.valor_alicuota),
    });
    return () => {
      setTotales({});
    };
  }, [isOpen]);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onClose = () => {
    setIsOpen(false);
  };

  const print = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const header_info = [
      ['COMPROBANTE', 'FECHA', 'PROPIETARIO', 'TELÉFONO', 'CORREO'],
    ];
    const header_mensualidad = [
      ['MES', 'FECHA MÁXIMA DE PAGO', 'VALOR MENSUALIDAD'],
    ];
    const header_cuotas = [['DESCRIPCIÓN CUOTAS EXTRAORDINARIAS', 'VALOR']];
    const header_multas = [['FECHA', 'DESCRIPCIÓN DE MULTAS', 'VALOR']];
    const header_pagos = [['CONCEPTO DE PAGO', 'MÉTODO DE PAGO', 'VALOR']];

    const data1 = [
      [
        state.codigo_comprobante,
        moment(state.fecha_comprobante).format('YYYY-MM-DD'),
        state.nombre_propietario + ' ' + state.apellido_propietario,
        state.celular_propietario,
        state.correo_propietario,
      ],
    ];

    const data2 = [
      [
        state.mes_alicuota,
        moment(state.fecha_maxima_alicuota).format('YYYY-MM-DD'),
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(state.valor_alicuota),
      ],
    ];

    const data3 = [];
    const cuotas_array = [...cuotas];
    cuotas_array.map((cuota, i) => {
      data3[i] = [
        cuota.detalle_cuota,
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(cuota.valor_cuota),
      ];
    });

    const data4 = [];
    const multas_array = [...multas];
    multas_array.map((multa, i) => {
      data4[i] = [
        moment(multa.fecha_multa).format('YYYY-MM-DD'),
        multa.motivo_multa,
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(multa.valor_multa),
      ];
    });

    const valores_finales = { ...totales };

    const data5 = [
      [
        state.concepto_comprobante,
        state.forma_pago,
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(valores_finales.valor_pagado),
      ],
    ];

    const totales1 = [
      [
        'TOTAL POR MENSUALIDAD:',
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(valores_finales.valor_mensual),
      ],
      [
        'TOTAL POR MULTAS:',
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(valores_finales.valor_multas),
      ],
      [
        'TOTAL POR CUOTAS:',
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(valores_finales.valor_cuotas),
      ],
      [
        'TOTAL SALDO PENDIENTE:',
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(valores_finales.valor_pendiente),
      ],
      [
        'TOTAL PAGADO:',
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(valores_finales.valor_pagado),
      ],
      [
        'TOTAL A PAGAR:',
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(valores_finales.valor_total),
      ],
    ];

    doc.text('REPORTE DE ALICUOTAS', 15, 15);
    doc.autoTable({
      startY: 20,
      head: header_info,
      body: data1,
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: header_mensualidad,
      body: data2,
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'left' },
        2: { halign: 'center' },
      },
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: header_cuotas,
      body: data3,
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'center' },
      },
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: header_multas,
      body: data4,
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'left' },
        2: { halign: 'center' },
      },
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: header_pagos,
      body: data5,
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'left' },
        2: { halign: 'center' },
      },
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      margin: { left: 115, right: 15 },
      columnStyles: {
        0: { fontStyle: 'bold', halign: 'right' },
        1: { halign: 'center' },
      },
      body: totales1,
    });
    doc.text('_______________________', 25, 250);
    doc.text('Firma Responsable', 35, 260);
    doc.text('_______________________', 125, 250);
    doc.text('Firma Propietario', 137, 260);
    doc.save(`sisali-${state.codigo_comprobante}.pdf`);
  };

  return (
    <>
      <Modal
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
          <ModalHeader bgColor={'blackAlpha.50'}>Revisar Pago</ModalHeader>
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
                    value={state.mes_alicuota}
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
                    value={moment(state.fecha_maxima_alicuota).format(
                      'YYYY-MM-DD'
                    )}
                    readOnly
                    type="text"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="ms-1 me-1">
                <FormLabel htmlFor="fecha_pago">Fecha de pago: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.500" />}
                  />
                  <Input
                    id="fecha_pago"
                    name="fecha_pago"
                    value={moment(state.fecha_comprobante).format('YYYY-MM-DD')}
                    readOnly
                    type="text"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="ms-1">
                <FormLabel htmlFor="valor">Valor Mensualidad: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BiDollarCircle} color="gray.500" />}
                  />
                  <Input
                    id="valor"
                    name="valor"
                    type="text"
                    value={state.valor_alicuota}
                    readOnly
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
                    value={
                      state.nombre_propietario +
                      ' ' +
                      state.apellido_propietario
                    }
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
                    value={state.celular_propietario}
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
                    value={state.correo_propietario}
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
                  {multas.length > 0 ? (
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
                            {multas.map((multa, i) => (
                              <Tr key={i}>
                                <Td>
                                  {moment(multa.fecha_multa).format(
                                    'YYYY-MM-DD'
                                  )}
                                </Td>
                                <Td>{multa.motivo_multa}</Td>
                                <Td isNumeric>{multa.valor_multa}</Td>
                                <Td>{multa.estado_multa}</Td>
                              </Tr>
                            ))}
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
                </div>
                <Divider />
                <div>
                  {cuotas.length > 0 ? (
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
                            {cuotas.map((c, i) => (
                              <Tr key={i}>
                                <Td>{c.detalle_cuota}</Td>
                                <Td isNumeric>{c.valor_cuota}</Td>
                                <Td>{c.estado_cuota}</Td>
                              </Tr>
                            ))}
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
                    value={state.concepto_comprobante}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="me-1">
                <FormLabel htmlFor="metodo_pago">Forma de pago: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon as={GrCircleInformation} color="gray.500" />
                    }
                  />
                  <Input
                    id="metodo_pago"
                    name="metodo_pago"
                    type="text"
                    value={state.forma_pago}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl className="me-1">
                <FormLabel htmlFor="valor_pagado">Total cancelado: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={BiDollarCircle} color="gray.500" />}
                  />
                  <Input
                    id="valor_pagado"
                    name="valor_pagado"
                    type="number"
                    value={totales.valor_pagado}
                    readOnly
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="d-flex px-3 mt-3">
              <div className="flex-grow-1"></div>
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
            <div className='w-100 text-center'>
              <Button colorScheme="telegram" onClick={print}>
                Imprimir Reporte <Icon className='ms-1' as={AiFillPrinter} color="white" />
              </Button>
            </div>
          </ModalBody>
          <ModalFooter mt={3} bgColor={'blackAlpha.50'}>
            <Button colorScheme="red" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

