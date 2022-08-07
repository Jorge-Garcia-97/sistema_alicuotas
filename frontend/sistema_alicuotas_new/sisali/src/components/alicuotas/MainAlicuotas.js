import React, { useEffect, useState } from 'react';
import {
  Spinner,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Select,
  InputGroup,
  FormControl,
  Modal,
} from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { get } from '../../services/Get';
import { InformacionAlicuotas } from './InformacionAlicuotas';
import { RegistrarAlicuota } from './RegistrarAlicuota';
import { ValidarPago } from './ValidarPago';
import { InformacionPago } from './InformacionPago';
import { EditarAlicuota } from './EditarAlicuota';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const MainAlicuotas = () => {
  const [state, setState] = useState({
    alicuotas: [],
    propiedades: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReporte, setIsOpenReporte] = useState(false);
  const [isOpenValidarPago, setIsOpenValidarPago] = useState(false);
  const [isOpenInformacionPago, setIsOpenInformacionPago] = useState(false);
  const [isOpenEditarPago, setIsOpenEditarPago] = useState(false);
  const [data, setData] = useState();
  const [dataImagen, setDataImagen] = useState();
  const [data_multas, setData_Multas] = useState();
  const [data_cuotas, setData_Cuotas] = useState();
  const [data_valores, setData_Valores] = useState();
  const { ToastContainer, toast } = createStandaloneToast();
  const { isAdmin, id, rol } = useSelector(state => state.auth);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [mes, setMes] = useState();

  useEffect(() => {
    setCargando(true);

    async function cargarData() {
      try {
        const response = await get(`pagoalicuota/`);
        const resp_propiedades = await get(`propiedades/ACTIVO`);
        setState({
          alicuotas: response,
          propiedades: resp_propiedades,
        });
        if (isAdmin) {
          setState({
            alicuotas: response,
            propiedades: resp_propiedades,
          });
        } else {
          if (rol == 'Presidente' || rol == 'Vicepresidente') {
            setState({
              alicuotas: response,
              propiedades: resp_propiedades,
            });
          } else {
            let temporal = [];
            response.map(item => {
              if (item.id_propietario == id) {
                temporal.push(item);
              }
            });
            setState({
              alicuotas: temporal,
              propiedades: resp_propiedades,
            });
          }
        }
        setCargando(false);
        setRefresh(false);
        let bandera = isAdmin
          ? false
          : rol == 'Presidente'
          ? false
          : rol == 'Vicepresidente'
          ? false
          : rol == 'Tesorero'
          ? false
          : true;
        setIsReadOnly(bandera);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Se encontró un error al cargar la información.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }

    cargarData();
  }, [refresh]);

  const openModal = () => {
    setIsOpen(true);
  };

  const openModalReporte = () => {
    setIsOpenReporte(true);
  };

  const onCloseReporte = () => {
    setIsOpenReporte(false);
  };

  const generarReporte = async () => {
    const response = await get(`pagoalicuota/mes/${mes}`);
    print(response);
  };

  const print = data => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const header_info = [['CUOTAS REGISTRADAS', 'ESTADO', 'SUBTOTAL']];

    let total_recaudar = 0;
    data.map(item => {
      total_recaudar = total_recaudar + item.valor_alicuota;
    });

    const data1 = [];
    data.map((item, i) => {
      data1[i] = [
        item.nombre_propietario +
          ' ' +
          item.apellido_propietario +
          ' - Casa:' +
          item.numero_casa,
        item.estado_alicuota,
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(item.valor_alicuota),
      ];
    });

    const totales1 = [
      [
        'TOTAL A RECAUDAR:',
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(total_recaudar),
      ],
    ];
    doc.text(`INFORME ECONÓMICO DEL MES DE ${mes}`, 15, 15);
    doc.autoTable({
      startY: 20,
      head: header_info,
      columnStyles: {
        2: { halign: 'right' },
      },
      body: data1,
    });
    doc.autoTable({
      startY: doc.lastAutoTable.finalY,
      margin: { left: 115, right: 15 },
      columnStyles: {
        0: { fontStyle: 'bold', halign: 'right' },
        1: { halign: 'right' },
      },
      body: totales1,
    });
    doc.save(`SISALI-INFORME-${mes}.pdf`);
    onCloseReporte();
  };

  return (
    <>
      {cargando === true ? (
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-auto">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid p-1">
          <div className="pb-1 ps-1 mb-2 border-bottom d-flex justify-content-between">
            <h1 className="fw-bold" style={{ fontSize: '25px' }}>
              <i className="fa fa-credit-card me-1" />
              Pago de alicuotas
            </h1>
            {!isReadOnly && (
              <div>
                <Button
                  colorScheme="telegram"
                  className="px-3"
                  variant="solid"
                  onClick={openModal}
                  size={'sm'}
                >
                  Agregar
                  <i className="fa fa-plus-circle ms-1" />
                </Button>
                <Button
                  colorScheme="teal"
                  className="px-3 ms-2"
                  variant="solid"
                  onClick={openModalReporte}
                  size={'sm'}
                >
                  Generar Reporte
                  <i className="fa fa-book ms-1" />
                </Button>
              </div>
            )}
          </div>
          <div className="container-fluid border shadow-sm">
            <InformacionAlicuotas
              {...state}
              setData={setData}
              setDataImagen={setDataImagen}
              setData_Cuotas={setData_Cuotas}
              setData_Multas={setData_Multas}
              setData_Valores={setData_Valores}
              setIsOpenValidarPago={setIsOpenValidarPago}
              setIsOpenInformacionPago={setIsOpenInformacionPago}
              setIsOpenEditarPago={setIsOpenEditarPago}
            />

            <RegistrarAlicuota
              {...state}
              stateChanger={setRefresh}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <ValidarPago
              data={data}
              stateChanger={setRefresh}
              isOpenValidarPago={isOpenValidarPago}
              setIsOpenValidarPago={setIsOpenValidarPago}
            />

            <EditarAlicuota
              data={data}
              stateChanger={setRefresh}
              isOpen={isOpenEditarPago}
              setIsOpen={setIsOpenEditarPago}
            />

            <InformacionPago
              data={data}
              dataImagen={dataImagen}
              data_cuotas={data_cuotas}
              data_multas={data_multas}
              data_valores={data_valores}
              isOpen={isOpenInformacionPago}
              setIsOpen={setIsOpenInformacionPago}
            />

            {/* Aprobar pago */}
            <Modal
              blockScrollOnMount={true}
              isCentered
              isOpen={isOpenReporte}
              onClose={onCloseReporte}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader bgColor={'blackAlpha.50'}>
                  Generar Reporte Mensual
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontWeight="bold" className="my-1">
                    Seleccione un mes para generar el Reporte
                  </Text>
                  <FormControl isRequired className="me-1 mb-2">
                    <InputGroup>
                      <Select
                        placeholder="Selecciona una opción"
                        id="mes"
                        name="mes"
                        value={mes}
                        onChange={e => setMes(e.target.value)}
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
                </ModalBody>
                <ModalFooter bgColor={'blackAlpha.50'}>
                  <Button
                    colorScheme="telegram"
                    mr={3}
                    onClick={generarReporte}
                  >
                    Generar
                  </Button>
                  <Button colorScheme="red" onClick={onCloseReporte}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
