import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  FormControl,
  InputGroup,
  Select,
} from '@chakra-ui/react';
import moment from 'moment';
import { CheckCircleIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import { get } from '../../services/Get';

export const InformacionAlicuotas = props => {
  const {
    alicuotas,
    setIsOpenValidarPago,
    setData,
    setData_Cuotas,
    setData_Multas,
    setIsOpenInformacionPago,
    setIsOpenEditarPago,
    setDataImagen,
    setData_Valores
  } = props;
  const [state, setState] = useState([]);
  const [filtroMes, setFiltroMes] = useState();
  const [filtroPropietario, setFiltroPropietario] = useState();
  const [filtroEstado, setFiltroEstado] = useState();
  const [dataProp, setDataProp] = useState([]);

  useEffect(() => {
    const findDuplicates = arr => {
      const uniqueArray = arr.filter((value, index) => {
        const _value = value;
        return (
          index ===
          arr.findIndex(obj => {
            return obj.id_propietario === _value.id_propietario;
          })
        );
      });

      return uniqueArray;
    };
    if (alicuotas !== undefined && alicuotas !== null){
      const resp = findDuplicates(alicuotas);
      setDataProp(resp);
      setState(alicuotas);
    }    
  }, []);

  const handleFiltroMes = mes => {
    const data = alicuotas;
    if (mes !== 'INICIAL') {
      const data_filter = data.filter(item => item.mes_alicuota == mes);
      console.log(data_filter);
      if (data_filter.length > 0) {
        setState(data_filter);
      }
    } else {
      setState(alicuotas);
    }
    setFiltroMes(mes);
  };

  const handleFiltroName = propietario => {
    const data = alicuotas;
    if (propietario !== 'INICIAL') {
      const data_filter = data.filter(
        item => item.id_propietario == propietario
      );
      if (data_filter.length > 0) {
        setState(data_filter);
      }
    } else {
      setState(alicuotas);
    }
    setFiltroPropietario(propietario);
  };

  const handleFiltroEstado = estado => {
    const data = alicuotas;
    if (estado !== 'INICIAL') {
      const data_filter = data.filter(item => item.estado_alicuota == estado);
      if (data_filter.length > 0) {
        setState(data_filter);
      }
    } else {
      setState(alicuotas);
    }
    setFiltroEstado(estado);
  };

  const openValidarPago = item => {
    setData(item);
    setIsOpenValidarPago(true);
  };

  const openInformacionPago = async item => {
    try {
      const data_detalles = await get(
        `detalle_comprobante/alicuota/${item.id_pago_alicuota}`
      );
      if (data_detalles) {
        let to_send = {
          forma_pago: data_detalles[0].forma_pago,
          concepto_comprobante: data_detalles[0].concepto_comprobante,
          codigo_comprobante: data_detalles[0].codigo_comprobante,
          fecha_comprobante: data_detalles[0].fecha_comprobante,
          mes_alicuota: data_detalles[0].mes_alicuota,
          fecha_maxima_alicuota: data_detalles[0].fecha_maxima_alicuota,
          valor_alicuota: data_detalles[0].valor_alicuota,
          numero_casa: data_detalles[0].numero_casa,
          nombre_propietario: data_detalles[0].nombre_propietario,
          apellido_propietario: data_detalles[0].apellido_propietario,
          celular_propietario: data_detalles[0].celular_propietario,
          correo_propietario: data_detalles[0].correo_propietario,
          subtotal_detalle_comprobante: data_detalles[0].subtotal_detalle_comprobante,
          subtotal_multas_detalle_comprobante: data_detalles[0].subtotal_multas_detalle_comprobante,
          subtotal_cuotas_detalle_comprobante: data_detalles[0].subtotal_cuotas_detalle_comprobante,
          total_detalle_comprobante: data_detalles[0].total_detalle_comprobante,
        };
        setData(to_send);
        const data_cuotas = await get(
          `cuota_extra/detalle/${data_detalles[0].id_detalle_comprobante}`
        );
        const data_multas = await get(
          `multa/detalle/${data_detalles[0].id_detalle_comprobante}`
        );
        const data_valores_pendientes = await get(
          `valor_pendiente/comprobante/${data_detalles[0].id_detalle_comprobante}`
        );
        if (data_multas.length > 0) {
          const multas_to_send = [];
          data_multas.map(multa => {
            let data_multa_temp = {
              fecha_multa: multa.fecha_multa,
              motivo_multa: multa.motivo_multa,
              valor_multa: multa.valor_multa,
            };
            multas_to_send.push(data_multa_temp);
          });
          setData_Multas(multas_to_send);
        }        
        if (data_valores_pendientes.length > 0) {
          const valores_to_send = [];
          data_valores_pendientes.map(valor => {
            let data_valores_temp = {
              total_valor_pendiente: valor.total_valor_pendiente,
              detalle_valor_pendiente: valor.detalle_valor_pendiente,
            };
            valores_to_send.push(data_valores_temp);
          });
          setData_Valores(valores_to_send);
        }
        if (data_cuotas.length > 0) {
          const cuotas_to_send = [];
          data_cuotas.map(cuota => {
            let data_cuota_temp = {
              detalle_cuota: cuota.detalle_cuota,
              valor_cuota: cuota.valor_cuota,
            };
            cuotas_to_send.push(data_cuota_temp);
          });
          setData_Cuotas(cuotas_to_send);
        }
        const response_imagen = await get(
          `imagen_evidencia/imagen/${data_detalles[0].id_detalle_comprobante}`
        );
        setDataImagen(response_imagen.name);
        setIsOpenInformacionPago(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openEditarPago = async item => {
    setData(item);
    setIsOpenEditarPago(true);
  };

  return (
    <>
      <TableContainer paddingTop={2}>
        <Table variant="striped" colorScheme="blackAlpha" size={'sm'}>
          <TableCaption>Sistema de pago de alicuotas San Marino</TableCaption>
          <Thead>
            <Tr>
              <Th>mes</Th>
              <Th>Propietario</Th>
              <Th>Número de casa</Th>
              <Th>Valor</Th>
              <Th>Fecha Máxima de pago</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.length > 0 ? (
              <>
                <Tr>
                  <Td>
                    <FormControl>
                      <InputGroup>
                        <Select
                          placeholder="Filtrar por"
                          id="mes"
                          name="mes"
                          size={'xs'}
                          value={filtroMes}
                          onChange={e => handleFiltroMes(e.target.value)}
                          variant="flushed"
                          className="ps-2"
                        >
                          <option value="INICIAL">TODO EL AÑO</option>
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
                  </Td>
                  <Td>
                    <FormControl>
                      <InputGroup>
                        <Select
                          placeholder="Filtrar por"
                          id="mes"
                          name="mes"
                          size={'xs'}
                          value={filtroPropietario}
                          onChange={e => handleFiltroName(e.target.value)}
                          variant="flushed"
                          className="ps-2"
                        >
                          <option value="INICIAL">
                            TODOS LOS PROPIETARIOS
                          </option>
                          {dataProp.map((item, i) => (
                            <option key={i} value={item.id_propietario}>
                              {(
                                item.nombre_propietario +
                                ' ' +
                                item.apellido_propietario
                              ).toUpperCase()}
                            </option>
                          ))}
                        </Select>
                      </InputGroup>
                    </FormControl>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>
                    <FormControl>
                      <InputGroup>
                        <Select
                          placeholder="Filtrar por"
                          id="mes"
                          name="mes"
                          size={'xs'}
                          value={filtroEstado}
                          onChange={e => handleFiltroEstado(e.target.value)}
                          variant="flushed"
                          className="ps-2"
                        >
                          <option value="INICIAL">INICIAL</option>
                          <option value="PAGADO">PAGADO</option>
                          <option value="PENDIENTE">PENDIENTE</option>
                        </Select>
                      </InputGroup>
                    </FormControl>
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                {state.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.mes_alicuota}</Td>
                    <Td>
                      {item.nombre_propietario +
                        ' ' +
                        item.apellido_propietario}
                    </Td>
                    <Td isNumeric>{item.numero_casa}</Td>
                    <Td isNumeric>{'$ ' + item.valor_alicuota}</Td>
                    <Td>
                      {moment(item.fecha_maxima_alicuota).format('YYYY-MM-DD')}
                    </Td>
                    <Td>{item.estado_alicuota}</Td>
                    <Td>
                      {item.estado_alicuota == 'PENDIENTE' ? (
                        <>
                          <Button
                            size="sm"
                            colorScheme={'green'}
                            onClick={() => openValidarPago(item)}
                            rightIcon={<CheckCircleIcon />}
                          >
                            Validar Pago
                          </Button>
                          <Button
                            size="sm"
                            colorScheme={'yellow'}
                            ml={2}
                            rightIcon={<EditIcon />}
                            onClick={() => openEditarPago(item)}
                          >
                            Editar
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          colorScheme={'telegram'}
                          onClick={() => openInformacionPago(item)}
                          rightIcon={<InfoIcon />}
                        >
                          Revisar Pago
                        </Button>
                      )}
                    </Td>
                  </Tr>
                ))}
              </>
            ) : (
              <Tr>
                <Td colSpan={7}>No hay datos</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
