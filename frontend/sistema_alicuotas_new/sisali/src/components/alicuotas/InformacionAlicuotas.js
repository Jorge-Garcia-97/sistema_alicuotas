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
import { CheckCircleIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

export const InformacionAlicuotas = props => {
  const { alicuotas, setIsOpenValidarPago, setData } = props;
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
    const resp = findDuplicates(alicuotas);
    setDataProp(resp);
    setState(alicuotas);
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

  const openValidarPago = (item) => {
    setData(item);
    setIsOpenValidarPago(true);
  }

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
              <Th>Valores pendientes</Th>
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
                    <Td isNumeric>{'$ ' + item.valor_pendiente_alicuota}</Td>
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
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            colorScheme={'red'}
                            ml={2}
                            rightIcon={<DeleteIcon />}
                          >
                            Borrar
                          </Button>
                        </>
                      ) : (
                        <span>Sin acciones</span>
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
