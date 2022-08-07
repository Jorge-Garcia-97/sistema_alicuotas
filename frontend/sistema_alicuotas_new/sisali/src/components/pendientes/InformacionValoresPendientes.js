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
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { AiOutlineDollar } from 'react-icons/ai';
import moment from 'moment';
import { createStandaloneToast } from '@chakra-ui/toast';
import { useSelector } from 'react-redux';
import { editEstadoValorPendiente } from '../../services/Post';

export const InformacionValoresPendientes = props => {
  const { stateChanger, valores_pendientes } = props;
  const [state, setState] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { ToastContainer, toast } = createStandaloneToast();
  const { isAdmin, rol } = useSelector(state => state.auth);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [valorPendiente, setValorPendiente] = useState();

  useEffect(() => {
    if (valores_pendientes) {
      setState(valores_pendientes);
    }
    let bandera = isAdmin
      ? false
      : rol == 'Presidente'
      ? false
      : rol == 'Vicepresidente'
      ? false
      : true;
    setIsReadOnly(bandera);
    return () => {
      setState([]);
    };
  }, []);

  const actualizarValor = async () => {
    // console.log(solicitud, solicitud.id_solicitudes);
    const response = await editEstadoValorPendiente(
      valorPendiente,
      valorPendiente.id_valor_pendiente
    );
    if (response) {
      toast({
        title: 'Registro realizado con éxito',
        description: 'Se actualizó la información del pago.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      stateChanger(true);
      onCloseModal();
    } else {
      toast({
        title: 'Error',
        description: 'Se encontró un error al registrar el cambio.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const aprobarPago = item => {
    const pago = { ...item };
    pago.estado_valor_pendiente = 'PAGADO';
    setValorPendiente(pago);
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <TableContainer paddingTop={2}>
        <Table variant="striped" colorScheme="blackAlpha" size={'sm'}>
          <TableCaption>Sistema de pago de alicuotas San Marino</TableCaption>
          <Thead>
            <Tr>
              <Th>USUARIO</Th>
              <Th>PROPIEDAD</Th>
              <Th>REFERENTE A</Th>
              <Th>DETALLE</Th>
              <Th>FECHA</Th>
              <Th>TOTAL</Th>
              <Th>ESTADO</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.length > 0 ? (
              <>
                {state.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      {item.nombre_propietario +
                        ' ' +
                        item.apellido_propietario}
                    </Td>
                    <Td>Casa: {item.numero_casa}</Td>
                    <Td>
                      {item.codigo_comprobante +
                        ' - ' +
                        item.concepto_comprobante}
                    </Td>
                    <Td>{item.detalle_valor_pendiente}</Td>
                    <Td>
                      {moment(item.fecha_comprobante).format('YYYY-MM-DD')}
                    </Td>
                    <Td>
                      <Icon as={AiOutlineDollar} className="me-1" />
                      {item.total_valor_pendiente}
                    </Td>
                    <Td>{item.estado_valor_pendiente}</Td>
                    <Td>
                      {item.estado_valor_pendiente == 'PENDIENTE' ? (
                        <div>
                          {!isReadOnly ? (
                            <Button
                              size="sm"
                              colorScheme={'teal'}
                              onClick={() => aprobarPago(item)}
                              rightIcon={<CheckCircleIcon />}
                            >
                              Marcar como Pagado
                            </Button>
                          ) : (
                            <span>Sin acciones</span>
                          )}
                        </div>
                      ) : (
                        <span>Sin acciones</span>
                      )}
                    </Td>
                  </Tr>
                ))}
              </>
            ) : (
              <Tr>
                <Td colSpan={6}>No hay datos</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Aprobar pago */}
      <Modal
        blockScrollOnMount={true}
        isCentered
        isOpen={isOpenModal}
        onClose={onCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'blackAlpha.50'}>
            Actualizar Estado del Pago
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              ¿Se ha cancelado por completo el valor pendiente? <br />
            </Text>
            <Text mb="1rem">Esta acción no puede ser revertida.</Text>
          </ModalBody>
          <ModalFooter bgColor={'blackAlpha.50'}>
            <Button colorScheme="orange" mr={3} onClick={actualizarValor}>
              Si, se ha pagado por completo
            </Button>
            <Button colorScheme="red" onClick={onCloseModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};
