import React, { useRef, useState } from 'react';
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
  InputLeftElement,
  InputGroup,
  Icon,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { CalendarIcon } from '@chakra-ui/icons';
import { GrCircleInformation } from 'react-icons/gr';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { saveMultas } from '../../services/Post';

export const RegistroMultas = props => {
  const { stateChanger, isOpen, setIsOpen, inputsPadre, setInputsPadre } = props;
  const [inputs, setInputs] = useState({
    fecha_multa: '',
    motivo_multa: '',
    valor_multa: '',
    // estado_multa: '',
  });

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      container: 'container-popup',
      popup: 'popup',
    },
  });

  const actionGuardar = async () => {
    const inputs_data = { ...inputs };
    if (inputs_data.fecha_multa != " " && inputs_data.motivo_multa != " " && inputs_data.valor_multa != "") {
      const response = await saveMultas(inputs_data);
      if (response.id > 0) {
        Toast.fire({
          icon: 'success',
          title: 'Registro exitoso',
        });
        setIsOpen(false);               
        setInputsPadre({
          ...inputsPadre,
          multa: {
            id_multas: response.id,
            fecha_multa: inputs_data.fecha_multa,
            motivo_multa: inputs_data.motivo_multa,
            valor_multa: inputs_data.valor_multa,
            estado_multa: "PENDIENTE"
          }
        });
        stateChanger(true);
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
        });
      }
    }
  };

  const onClose = () => {
    setIsOpen(false);
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
            Registro de nueva multa
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="px-3 my-2">
              <FormControl isRequired mt={1}>
                <FormLabel htmlFor="fecha_multa">Fecha de la multa</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CalendarIcon color="gray.700" />}
                  />
                  <Input
                    id="fecha_multa"
                    name="fecha_multa"
                    value={inputs.fecha_multa}
                    onChange={e =>
                      setInputs({ ...inputs, fecha_multa: e.target.value })
                    }
                    className="form-control"
                    type="date"
                    placeholder="Fecha de la multa"
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={3}>
                <FormLabel htmlFor="motivo_multa">Motivo de la multa: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={GrCircleInformation} color="gray.50" />}
                  />
                  <Input
                    id="motivo_multa"
                    name="motivo_multa"
                    type="text"
                    value={inputs.motivo_multa}
                    onChange={e =>
                        setInputs({ ...inputs, motivo_multa: e.target.value })
                      }
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={3}>
                <FormLabel htmlFor="valor_multa">Valor de la multa: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={AiOutlineDollarCircle} color="gray.900" />}
                  />
                  <Input
                    id="valor_multa"
                    name="valor_multa"
                    type="number"
                    value={inputs.valor_multa}
                    onChange={e =>
                        setInputs({ ...inputs, valor_multa: e.target.value })
                      }
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
            </div>
          </ModalBody>
          <ModalFooter mt={3} bgColor={'blackAlpha.50'}>
            <Button colorScheme="blue" mr={3} onClick={actionGuardar}>
              Guardar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
