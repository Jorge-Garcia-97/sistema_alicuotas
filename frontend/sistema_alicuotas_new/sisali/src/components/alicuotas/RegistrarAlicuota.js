import React, { useEffect, useRef, useState } from 'react';
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
  Select,
  InputLeftElement,
  InputGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
} from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/toast';
import { CalendarIcon } from '@chakra-ui/icons';
import { savePagos } from '../../services/Post';
import moment from 'moment';
import { get } from '../../services/Get';

export const RegistrarAlicuota = props => {
  const { stateChanger, isOpen, setIsOpen, propiedades } = props;
  const [inputs, setInputs] = useState({
    mes: '',
    dateMax: '',
  });
  const [dataProp, setDataProp] = useState([]);
  const [checked, setChecked] = useState([]);
  const { ToastContainer, toast } = createStandaloneToast();

  useEffect(() => {
    if (propiedades) {
      let tmp = [];
      setDataProp(propiedades);
      for (let i = 0; i < propiedades.length; i++) {
        tmp.push(true);
      }
      setChecked(tmp);
    }
    return () => {
      setDataProp([]);
      setChecked([]);
      setInputs({
        mes: '',
        dateMax: '',
      });
    };
  }, [isOpen]);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onClose = () => {
    setIsOpen(false);
  };

  const actionGuardar = () => {
    const propiedades = [...dataProp];
    const checks = [...checked];
    const inputs_data = { ...inputs };
    let banderas = [];
    if (inputs_data.mes != '' && inputs.dateMax != '') {
      propiedades.map(async (item, index) => {
        if (checks[index]) {
          let data_to_send = {
            mes_alicuota: inputs_data.mes,
            valor_alicuota: 60,
            valor_pendiente_alicuota: 0,
            dateMax: moment(inputs_data.dateMax).format('YYYY-MM-DD'),
            estado_alicuota: 'PENDIENTE',
            id_propiedad: item.id_propiedad,
          };
          console.log(data_to_send);
          const response = await savePagos(data_to_send);
          if (response) {
            banderas.push(true);
          } else {
            banderas.push(false);
          }
        }
      });
      const bandera_boolean = banderas.some(item => item === false);
      const bandera_type = banderas.some(item => item === undefined);
      if (bandera_boolean || bandera_type) {
        toast({
          title: 'Error',
          description: 'Se encontró un error al registrar la alicuota.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
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

  const handleCheckall = () => {
    let tmp = [...checked];
    if (checked.length > 0) {
      if (tmp[0]) {
        for (let i = 0; i < tmp.length; i++) {
          tmp[i] = false;
        }
      } else {
        for (let i = 0; i < tmp.length; i++) {
          tmp[i] = true;
        }
      }
      setChecked(tmp);
    }
  };

  const handleCheck = index => {
    let tmp = [...checked];
    if (tmp[index]) {
      tmp[index] = false;
    } else {
      tmp[index] = true;
    }
    setChecked(tmp);
  };

  const handleChangeMonth = async event => {
    setInputs({ ...inputs, mes: event.target.value });
    const response = await get(`pagoalicuota/mes/${event.target.value}`);
    const data = [...dataProp];
    let tmp = [];
    let aux = [];
    if (data.length > 0) {
      if (response.length > 0) {
        var data_temp = [];
        response.forEach(res => {
          data_temp.push(res.id_propiedad);
        });
        data_temp.forEach(d => {
          var index_to_delete = data.findIndex(item => item.id_propiedad === d);
          data.splice(index_to_delete, 1);
        });
        setDataProp(data);
        for (let i = 0; i < data.length; i++) {
          aux.push(true);
        }
        setChecked(aux);
      } else {
        setDataProp(propiedades);
        for (let i = 0; i < propiedades.length; i++) {
          tmp.push(true);
        }
        setChecked(tmp);
      }
    } else {
      setDataProp(propiedades);
      for (let i = 0; i < propiedades.length; i++) {
        tmp.push(true);
      }
      setChecked(tmp);
    }
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
            Registro de nuevo pago
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="d-flex px-3 mt-2">
              <FormControl isRequired className="me-1">
                <FormLabel htmlFor="mes">Mes</FormLabel>
                <InputGroup>
                  <Select
                    placeholder="Selecciona una opción"
                    id="mes"
                    name="mes"
                    value={inputs.mes}
                    onChange={e => handleChangeMonth(e)}
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
              <FormControl isRequired className="ms-1">
                <FormLabel htmlFor="mes">Fecha máxima de pago</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.300" />}
                  />
                  <Input
                    id="maxDate"
                    name="maxDate"
                    value={inputs.dateMax}
                    onChange={e =>
                      setInputs({ ...inputs, dateMax: e.target.value })
                    }
                    className="form-control"
                    type="date"
                    placeholder="Fecha máxima de pago"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="px-3 mt-3">
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Propietario</Th>
                      <Th>Número de casa</Th>
                      <Th>Seleccionar</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dataProp.length > 0 ? (
                      <>
                        <Tr bgColor={'blackAlpha.50'}>
                          <Td colSpan={2} textAlign={'center'}>
                            Seleccionar todos
                          </Td>
                          <Td>
                            <Checkbox onChange={handleCheckall} defaultChecked>
                              Todos
                            </Checkbox>
                          </Td>
                        </Tr>
                        {dataProp.map((item, i) => (
                          <Tr key={i}>
                            <Td>
                              {item.nombre_propietario +
                                ' ' +
                                item.apellido_propietario}
                            </Td>
                            <Td>{item.numero_casa}</Td>
                            <Td>
                              <Checkbox
                                isChecked={checked[i]}
                                onChange={() => handleCheck(i)}
                              >
                                Añadir
                              </Checkbox>
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
            </div>
          </ModalBody>
          <ModalFooter mt={3} bgColor={'blackAlpha.50'}>
            <Button colorScheme="telegram" mr={3} onClick={actionGuardar}>
              Guardar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};
