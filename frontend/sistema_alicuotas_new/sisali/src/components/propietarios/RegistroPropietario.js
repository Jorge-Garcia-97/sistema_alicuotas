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
  Select,
} from '@chakra-ui/react';
import { saveImagenPropietario, savePropietario, saveUsuario } from '../../services/Post';
import { get } from '../../services/Get';

export const RegistroPropietario = props => {
  const { numberPropietarios, stateChanger, isOpen, setIsOpen } = props;
  const [inputs, setInputs] = useState({
    id: '',
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
    usuario: '',
    rol: '',
  });

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const guardarRegistro = async () => {   
    setInputs({
      ...inputs,
      id: numberPropietarios + 1,
    });     
    const usuarios = await get('usuario');
    let numberIDS = usuarios.slice(-1);
    let data = {
      id: parseInt(numberIDS[0].id_usuario) + 1,
      correo: inputs.correo,
      password: 'admin123',
    };
    // console.log(data);
    // console.log({...inputs});
    const resp = await saveUsuario(data);
    if (resp.id > 0) {
      setInputs({
        ...inputs,
        usuario: resp.id,
      })
      const response = await savePropietario({...inputs});
      if (response.id > 0) {
        // if (imagenData) {
        //   await saveImagenPropietario(imagenData, response.id);
        // }
        setIsOpen(false);
        stateChanger(true);
      } else {
        console.log('Algo salió mal');
      }
    } else {
      console.log('Algo salió mal');
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  // const onSubmit = () => {
  //   if (file) {
  //     const formdata = new FormData();
  //     formdata.append("image", file);
  //     guardarRegistro({...inputs}, formdata);
  //     document.getElementById("fileinput").value = null;
  //     setfile(null);
  //   } 
  // }

  const handleInputChange = e => {
    let tmpName = e.target.name;
    let tmpValue = e.target && e.target.value;
    let _tmp = { ...inputs };
    _tmp[`${tmpName}`] = tmpValue;
    setInputs(_tmp);
  };

  const handleError = () => {};

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registro de nuevo Propietario</ModalHeader>
          <ModalCloseButton />
          <div className="row">
            <div className="col-sm-6">
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel htmlFor="nombre">Nombres</FormLabel>
                  <Input
                    ref={initialRef}
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={inputs.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombres"
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="cedula">Cédula</FormLabel>
                  <Input
                    id="cedula"
                    name="cedula"
                    type="text"
                    value={inputs.cedula}
                    onChange={handleInputChange}
                    placeholder="Cédula"
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="correo">Correo</FormLabel>
                  <Input
                    id="correo"
                    name="correo"
                    type="text"
                    value={inputs.correo}
                    onChange={handleInputChange}
                    placeholder="Correo"
                  />
                </FormControl>
              </ModalBody>
            </div>
            <div className="col-sm-6">
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel htmlFor="nombre">Apellidos</FormLabel>
                  <Input
                    id="apellido"
                    name="apellido"
                    type="text"
                    value={inputs.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellidos"
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="text"
                    value={inputs.telefono}
                    onChange={handleInputChange}
                    placeholder="Teléfono"
                  />
                </FormControl>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="rol">Rol</FormLabel>
                  <Select
                    placeholder="Selecciona una opción"
                    id="rol"
                    value={inputs.rol}
                    name="rol"
                    onChange={handleInputChange}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Propietario">Propietario</option>
                    <option value="Presidente">Presidente</option>
                    <option value="Vicepresidente">Vicepresidente</option>
                    <option value="Secretario">Secretario</option>
                    <option value="Tesorero">Tesorero</option>
                    <option value="Vocal">Vocal</option>
                  </Select>
                </FormControl>
              </ModalBody>
            </div>
          </div>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={guardarRegistro}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
