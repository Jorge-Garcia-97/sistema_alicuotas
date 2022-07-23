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
import { GrCircleInformation } from 'react-icons/gr';
import { AiOutlineDollarCircle } from 'react-icons/ai';

export const RegistroCuotaExt = props => {
  const { isOpenCuota, setIsOpenCuota, setCuota, cuotas } = props;
  const [inputs, setInputs] = useState({
    detalle_cuota: '',
    valor_cuota: '',
    estado_cuota: '',
  });

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const actionGuardar = async () => {
    const inputs_data = { ...inputs };
    const temp = [...cuotas];
    if (inputs_data.detalle_cuota !== '' && inputs_data.valor_cuota !== '') {
      let cuota = {
        detalle_cuota: inputs_data.detalle_cuota,
        valor_cuota: inputs_data.valor_cuota,
        estado_cuota: 'PENDIENTE',
      };
      temp.push(cuota);
      setCuota(temp);
      setIsOpenCuota(false);
      setInputs({});
    }
  };

  const onClose = () => {
    setIsOpenCuota(false);
  };

  return (
    <>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenCuota}
        onClose={onClose}
        size={'xl'}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={'blackAlpha.50'}>
            Registro de nueva cuota
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="px-3 my-2">
              <FormControl isRequired mt={3}>
                <FormLabel htmlFor="detalle_cuota">
                  Detalle de la cuota:{' '}
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={GrCircleInformation} color="gray.50" />}
                  />
                  <Input
                    id="detalle_cuota"
                    name="detalle_cuota"
                    type="text"
                    value={inputs.detalle_cuota}
                    onChange={e =>
                      setInputs({ ...inputs, detalle_cuota: e.target.value })
                    }
                    variant="flushed"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={3}>
                <FormLabel htmlFor="valor_cuota">Valor de la cuota: </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon as={AiOutlineDollarCircle} color="gray.900" />
                    }
                  />
                  <Input
                    id="valor_cuota"
                    name="valor_cuota"
                    type="number"
                    value={inputs.valor_cuota}
                    onChange={e =>
                      setInputs({ ...inputs, valor_cuota: e.target.value })
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
