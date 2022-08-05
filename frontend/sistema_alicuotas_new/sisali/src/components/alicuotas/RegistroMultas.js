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
import { CalendarIcon } from '@chakra-ui/icons';
import { GrCircleInformation } from 'react-icons/gr';
import { AiOutlineDollarCircle } from 'react-icons/ai';

export const RegistroMultas = props => {
  const { isOpen, setIsOpen, setMultas, multas } = props;
  const [inputs, setInputs] = useState({
    fecha_multa: '',
    motivo_multa: '',
    valor_multa: '',
    estado_multa: '',
  });

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const actionGuardar = async () => {
    const inputs_data = { ...inputs };
    const temp = [...multas];
    if (
      inputs_data.fecha_multa !== '' &&
      inputs_data.motivo_multa !== '' &&
      inputs_data.valor_multa !== ''
    ) {
      let multa = {
        fecha_multa: inputs_data.fecha_multa,
        motivo_multa: inputs_data.motivo_multa,
        valor_multa: inputs_data.valor_multa,
        estado_multa: 'PENDIENTE',
      }
      temp.push(multa);
      setMultas(temp);
      setIsOpen(false);
      setInputs({});
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
                <FormLabel htmlFor="motivo_multa">
                  Motivo de la multa:{' '}
                </FormLabel>
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
                    children={
                      <Icon as={AiOutlineDollarCircle} color="gray.900" />
                    }
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
            <Button colorScheme="telegram" mr={3} onClick={actionGuardar}>
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
