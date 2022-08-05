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

export const InformacionValoresPendientes = (props) => {
    const { stateChanger, valores_pendientes } = props;
  const [state, setState] = useState([]);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isOpenDenegation, setIsOpenDenegation] = useState(false);
  const [valorPendiente, setValorPendiente] = useState();
  const { ToastContainer, toast } = createStandaloneToast();

  useEffect(() => {
    if (valores_pendientes) {
      setState(valores_pendientes);
    }
    return () => {
      setState([]);
    };
  }, []);

//   const actualizarSolicitud = async (props) => {
//     // console.log(solicitud, solicitud.id_solicitudes);
//     const response = await editEstadoSolicitud(solicitud, solicitud.id_solicitudes)
//     if (response) {
//         toast({
//           title: 'Registro realizado con éxito',
//           description: 'Se actualizó la información de la solicitud.',
//           status: 'success',
//           duration: 9000,
//           isClosable: true,
//           position: 'top-right',
//         });
//         stateChanger(true);
//         onCloseConfirmation();
//         onCloseDenegation();
//       } else {
//         toast({
//           title: 'Error',
//           description: 'Se encontró un error al registrar el cambio.',
//           status: 'error',
//           duration: 9000,
//           isClosable: true,
//           position: 'top-right',
//         });
//       }
//   }

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
                    <Td>{item.codigo_comprobante + ' - ' + item.concepto_comprobante}</Td>
                    <Td>{item.detalle_valor_pendiente}</Td>
                    <Td>{moment(item.fecha_comprobante).format('YYYY-MM-DD')}</Td>                    
                    <Td><Icon as={AiOutlineDollar} className='me-1' />{item.total_valor_pendiente}</Td>
                    <Td>{item.estado_valor_pendiente}</Td>
                    <Td>
                      {item.estado_valor_pendiente == 'PENDIENTE' && (
                        <div>
                          <Button
                            size="sm"
                            colorScheme={'teal'}
                            // onClick={() => aprobarSolicitud(item)}
                            rightIcon={<CheckCircleIcon />}
                          >
                            Actualizar
                          </Button>                          
                        </div>
                      )}
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
      {/* <Modal
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
        </Modal>       */}
    </>
  )
}
