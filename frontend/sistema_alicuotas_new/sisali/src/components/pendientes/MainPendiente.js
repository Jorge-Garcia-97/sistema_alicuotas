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
import React, { useEffect, useState } from 'react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { get } from '../../services/Get';
import { InformacionValoresPendientes } from './InformacionValoresPendientes';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import logo from '../../img/logo_san_marino.png';

export const MainPendiente = () => {
  const [state, setState] = useState({
    valores_pendientes: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();
  
  const [isOpenReporte, setIsOpenReporte] = useState(false);
  const { isAdmin, id, rol } = useSelector(state => state.auth);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [mes, setMes] = useState();

  useEffect(() => {
    setCargando(true);

    async function cargarData() {
      try {
        let response = [];
        const pendientes = await get(`valores_pendientes/estado/PENDIENTE`);
        const pagados = await get(`valores_pendientes/estado/PAGADO`);
        if (pendientes.length > 0) {
          pendientes.forEach(r => {
            response.push(r);
          });
        }
        if (pagados.length > 0) {
          pagados.forEach(r => {
            response.push(r);
          });
        }
        if (isAdmin) {
          setState({
            valores_pendientes: response,
          });
        } else {
          if (rol == 'Presidente' || rol == 'Vicepresidente') {
            setState({
              valores_pendientes: response,
            });
          } else {
            let temporal = [];
            response.map(item => {
              if (item.id_propietario == id) {
                temporal.push(item);
              }
            });
            setState({
              valores_pendientes: temporal,
            });
          }
        }
        setCargando(false);
        setRefresh(false);
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
    let bandera = isAdmin
      ? false
      : rol == 'Presidente'
      ? false
      : rol == 'Vicepresidente'
      ? false
      : true;
    setIsReadOnly(bandera);
  }, [refresh]);

  const generarReporte = async() => {
    const response = await get(`valores_pendientes/mes/${mes}`);
    print(response);
  }

  const print = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const header_info = [
      ['VALORES PENDIENTES REGISTRADOS', 'FECHA DE CREACIÓN', 'ESTADO', 'SUBTOTAL'],
    ];    

    let total_recaudar = 0;
    data.map((item) => {
      total_recaudar = total_recaudar + item.total_valor_pendiente;
    });

    const data1 = [];
    data.map((item, i) => {
      data1[i] = [
        item.nombre_propietario + ' ' + item.apellido_propietario + ' - Casa:' + item.numero_casa,
        moment(item.fecha_comprobante).format('YYYY-MM-DD'),
        item.estado_valor_pendiente,        
        Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        }).format(item.total_valor_pendiente),
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
    doc.text(`INFORME DE VALORES PENDIENTES RELACIONADOS AL MES DE ${mes}`, 15, 20);
    doc.autoTable({
      startY: 30,
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
    doc.addImage(logo, "PNG", 145, 5, 55, 20);
    doc.save(`SISALI-INFORME-${mes}.pdf`);
    onCloseReporte();
  };

  const openModalReporte = () => {
    setIsOpenReporte(true);
  };

  const onCloseReporte = () => {
    setIsOpenReporte(false);
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
              Valores Pendientes
            </h1>
            {!isReadOnly && (
              <div>
                
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
            <InformacionValoresPendientes
              {...state}
              stateChanger={setRefresh}
              isOpenModal={isOpenModal}
            />
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
                  <Text fontWeight="bold" className='my-1'>
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
                  <Button colorScheme="telegram" mr={3} onClick={generarReporte}>
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
