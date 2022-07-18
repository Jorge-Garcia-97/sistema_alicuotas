import { AtSignIcon, UnlockIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { autenticacion } from '../reducer/auth';
import './LoginScreen.css';

export const LoginScreen = () => {
  const [state, setState] = useState({ usuario: '', password: '' });
  const dispatch = useDispatch();

  function inicioSesion(event) {
    event.preventDefault();
    dispatch(autenticacion(state.usuario, state.password));
  }

  const initialRef = useRef(null);

  return (
    <>
      <div className="vh-100 vw-100 gradient-form">
        <div className="container w-100 h-100">
          <div className="d-flex w-100 h-100 align-items-center justify-content-center">
            <div className="p-5 shadow rounded bg-white">
              <h1 className="display-5 fw-bold">Sistema de Alicuotas</h1>
              <form method="post" onSubmit={inicioSesion}>
                <FormControl isRequired>
                  <FormLabel htmlFor="usuario" mt={4}>
                    Nombre de usuario o correo
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<AtSignIcon color="gray.300" />}
                    />
                    <Input
                      ref={initialRef}
                      id="usuario"
                      name="usuario"
                      type="text"
                      value={state.usuario}
                      onChange={e =>
                        setState({ ...state, usuario: e.target.value })
                      }
                      placeholder="usuarioejemplo@dominio.com"
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password" mt={4}>
                    Contraseña
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<UnlockIcon color="gray.300" />}
                    />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={state.password}
                      onChange={e =>
                        setState({ ...state, password: e.target.value })
                      }
                      variant="flushed"
                    />
                  </InputGroup>
                </FormControl>
                <div className="text-center pt-1 mb-4 pb-1">
                  <Button colorScheme="telegram" type="submit" mt={5}>
                    Iniciar Sesión
                  </Button>
                </div>
              </form>
              <Divider mt={3} />
              <div className="text-center pt-2">
                <h1>&copy; SISALI 2022 </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
