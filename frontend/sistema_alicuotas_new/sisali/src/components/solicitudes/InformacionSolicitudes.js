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
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';
import { editEstadoSolicitud } from '../../services/Post';
import { createStandaloneToast } from '@chakra-ui/toast';
import { useSelector } from 'react-redux';

export const InformacionSolicitudes = props => {
  const { stateChanger, solicitudes } = props;
  const [state, setState] = useState([]);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isOpenDenegation, setIsOpenDenegation] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [solicitud, setSolicitud] = useState();
  const { ToastContainer, toast } = createStandaloneToast();
  const { isAdmin, rol } = useSelector(state => state.auth);
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    if (solicitudes) {
      setState(solicitudes);
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

  const actualizarSolicitud = async () => {
    // console.log(solicitud, solicitud.id_solicitudes);
    const response = await editEstadoSolicitud(
      solicitud,
      solicitud.id_solicitudes
    );
    if (response) {
      toast({
        title: 'Registro realizado con éxito',
        description: 'Se actualizó la información de la solicitud.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      stateChanger(true);
      onCloseConfirmation();
      onCloseDenegation();
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

  const aprobarSolicitud = item => {
    const sol = { ...item };
    sol.estado_solicitud = 'APROBADA';
    setSolicitud(sol);
    setIsOpenConfirmation(true);
  };

  const denegarSolicitud = item => {
    const sol = { ...item };
    sol.estado_solicitud = 'RECHAZADA';
    setSolicitud(sol);
    setIsOpenDenegation(true);
  };

  const cancelarSolicitud = item => {
    const sol = { ...item };
    sol.estado_solicitud = 'CANCELADA';
    setSolicitud(sol);
    setIsOpenCancel(true);
  };

  const onCloseConfirmation = () => {
    setIsOpenConfirmation(false);
  };

  const onCloseDenegation = () => {
    setIsOpenDenegation(false);
  };

  const onCloseCancel = () => {
    setIsOpenCancel(false);
  };

  return (
    <>
      <TableContainer paddingTop={2}>
        <Table variant="striped" colorScheme="blackAlpha" size={'sm'}>
          <TableCaption>Sistema de pago de alicuotas San Marino</TableCaption>
          <Thead>
            <Tr>
              <Th>Usuario</Th>
              <Th>Propiedad</Th>
              <Th>Tipo Solicitud</Th>
              <Th>Fecha</Th>
              <Th>Detalle Solicitud</Th>
              <Th>Estado Solicitud</Th>
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
                    <Td>{item.tipo_solicitud}</Td>
                    <Td>
                      {moment(item.fecha_solicitud).format('YYYY-MM-DD hh:mm')}
                    </Td>
                    <Td>{item.detalle_solicitud}</Td>
                    <Td>{item.estado_solicitud}</Td>
                    <Td>
                      {item.estado_solicitud == 'PENDIENTE' ? (
                        <div>
                          {!isReadOnly ? (
                            <>
                              <Button
                                size="sm"
                                colorScheme={'teal'}
                                onClick={() => aprobarSolicitud(item)}
                                rightIcon={<CheckCircleIcon />}
                              >
                                Aprobar
                              </Button>
                              <Button
                                size="sm"
                                className="ms-2"
                                colorScheme={'red'}
                                onClick={() => denegarSolicitud(item)}
                                rightIcon={<Icon as={FaTrash} />}
                              >
                                Denegar
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              className="ms-2"
                              colorScheme={'red'}
                              onClick={() => cancelarSolicitud(item)}
                              rightIcon={<Icon as={FaTrash} />}
                            >
                              Cancelar Solicitud
                            </Button>
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
                <Td colSpan={5}>No hay datos</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Verificar solicitud */}
      <Modal
        blockScrollOnMount={true}
        isCentered
        isOpen={isOpenConfirmation}
        onClose={onCloseConfirmation}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'teal.100'}>Aprobar Solicitud</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              ¿Está seguro de querer aprobar la solicitud? <br />
            </Text>
            <Text mb="1rem">Esta acción no puede ser cancelada.</Text>
          </ModalBody>
          <ModalFooter bgColor={'teal.100'}>
            <Button colorScheme="orange" mr={3} onClick={actualizarSolicitud}>
              Aceptar
            </Button>
            <Button colorScheme="red" onClick={onCloseConfirmation}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Rechazar solicitud */}
      <Modal
        blockScrollOnMount={true}
        isCentered
        isOpen={isOpenDenegation}
        onClose={onCloseDenegation}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'red.100'}>Rechazar Solicitud</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              ¿Está seguro de querer rechazar la solicitud? <br />
            </Text>
            <Text mb="1rem">Esta acción no puede ser cancelada.</Text>
          </ModalBody>
          <ModalFooter bgColor={'red.100'}>
            <Button colorScheme="orange" mr={3} onClick={actualizarSolicitud}>
              Aceptar
            </Button>
            <Button colorScheme="red" onClick={onCloseDenegation}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Cancelar solicitud */}
      <Modal
        blockScrollOnMount={true}
        isCentered
        isOpen={isOpenCancel}
        onClose={onCloseCancel}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'blackAlpha.50'}>
            Cancelar Solicitud
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              ¿Está seguro de querer cancelar la solicitud? <br />
            </Text>
            <Text mb="1rem">Esta acción no puede ser cancelada.</Text>
          </ModalBody>
          <ModalFooter bgColor={'blackAlpha.50'}>
            <Button colorScheme="orange" mr={3} onClick={actualizarSolicitud}>
              Aceptar
            </Button>
            <Button colorScheme="red" onClick={onCloseCancel}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
};
