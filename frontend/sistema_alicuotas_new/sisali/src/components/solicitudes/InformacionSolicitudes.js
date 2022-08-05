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

export const InformacionSolicitudes = props => {
  const { stateChanger, solicitudes} = props;
  const [state, setState] = useState([]);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isOpenDenegation, setIsOpenDenegation] = useState(false);
  const [solicitud, setSolicitud] = useState();
  const { ToastContainer, toast } = createStandaloneToast();

  useEffect(() => {
    if (solicitudes) {
      setState(solicitudes);
    }
    return () => {
      setState([]);
    };
  }, []);

  const actualizarSolicitud = async () => {
    // console.log(solicitud, solicitud.id_solicitudes);
    const response = await editEstadoSolicitud(solicitud, solicitud.id_solicitudes)
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
  }

  const aprobarSolicitud = (item) => {
    const sol = {...item}
    sol.estado_solicitud = 'APROBADA'
    setSolicitud(sol);
    setIsOpenConfirmation(true);
  } 

  const denegarSolicitud = (item) => {
    const sol = {...item}
    sol.estado_solicitud = 'RECHAZADA'
    setSolicitud(sol);
    setIsOpenDenegation(true);
  } 

  const onCloseConfirmation = () => {
    setIsOpenConfirmation(false);
  }

  const onCloseDenegation = () => {
    setIsOpenDenegation(false);
  }

  return (
    <>
      <TableContainer paddingTop={2}>
        <Table variant="striped" colorScheme="blackAlpha" size={'sm'}>
          <TableCaption>Sistema de pago de alicuotas San Marino</TableCaption>
          <Thead>
            <Tr>
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
                    <Td>{item.tipo_solicitud}</Td>
                    <Td>{moment(item.fecha_solicitud).format('YYYY-MM-DD')}</Td>
                    <Td>{item.detalle_solicitud}</Td>
                    <Td>{item.estado_solicitud}</Td>
                    <Td>
                      {item.estado_solicitud == 'PENDIENTE' && (
                        <div>
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
                        </div>
                      )}
                      {/* {item.estado_solicitud == 'APROBADA' && (
                        <div>
                          <p>Sin acciones a realizar</p>
                        </div>
                      )}
                      {item.estado_solicitud == 'RECHAZADA' && (
                        <div>
                          <p>Sin acciones a realizar</p>
                        </div>
                      )} */}
                    </Td>
                  </Tr>
                ))}
              </>
            ) : (
              <Tr>
                <Td colSpan={4}>No hay datos</Td>
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
            <ModalHeader>Rechazar Solicitud</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold" mb="1rem">
                ¿Está seguro de querer aprobar la solicitud? <br />
              </Text>
              <Text mb="1rem">
                Esta acción no puede ser cancelada.
              </Text>
            </ModalBody>
            <ModalFooter>
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
            <ModalHeader>Rechazar Solicitud</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold" mb="1rem">
                ¿Está seguro de querer rechazar la solicitud? <br />
              </Text>
              <Text mb="1rem">
                Esta acción no puede ser cancelada.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" mr={3} onClick={actualizarSolicitud}>
                Aceptar
              </Button>
              <Button colorScheme="red" onClick={onCloseDenegation}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ToastContainer />
    </>
  );
};
