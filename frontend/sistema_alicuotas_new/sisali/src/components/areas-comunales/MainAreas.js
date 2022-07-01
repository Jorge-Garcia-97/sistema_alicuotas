import { get } from '../../services/Get';
import { Spinner } from '@chakra-ui/react';
import user from '../../img/usuario.png';
import { Button } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import React ,{ useEffect, useState } from 'react';

export const MainAreas = () => {
  const [areas, setAreas] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);


  useEffect(() => {
    async function cargarData() {
      const imgs = [];
      try {
        const areas = await get(`areas`);
        areas.map(async item => {
          let img_name = await get(`area/imagen/${item.id_area_comunal}`);
          imgs.push(img_name.name);
        });
        setAreas(areas);
        setImagenes(imgs);
        setRefresh(false);
        setCargando(false);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Algo ha salido mal',
        });
      }
    }
    cargarData();
    setCargando(true);    
  }, [refresh, setAreas]);

  const openModal = () => {
    setIsOpen(true);
  };

  const openEditModal = () => {
    //console.log(imagenes);
    setEditOpen(true);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: true,
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

  return (
    <>
      {cargando === true ? (
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-auto">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid p-1">
          <div className="pb-1 ps-1 mb-2 border-bottom d-flex justify-content-between">
            <h1 className="display-6 fw-bold">
              <i className="fa fa-users me-1" />
              Areas Comunales
            </h1>
            <Button
              colorScheme="teal"
              className="px-3"
              variant="solid"
              onClick={openModal}
            >
              Agregar
              <i className="fa fa-plus-circle ms-1" />
            </Button>
          </div>
          <div className="row">
            {areas.length > 0 ? (
              <>
                {areas.map((item, i) => (
                  <div className="col-lg-3 col-md-4 col-sm-12" key={i}>
                    <div className="card w-100">
                      {[...imagenes][i] ? (
                        <img
                          src={`http://localhost:4000/${[...imagenes][i]}`}
                          alt={'Imagen referencial'}
                          style={{ maxHeight: '300px' }}
                          className="d-block mx-auto w-100 h-100"
                        />
                      ) : (
                        <img
                          src={user}
                          alt={'Imagen referencial'}
                          style={{ maxHeight: '300px' }}
                          className="d-block mx-auto w-100 h-100"
                        />
                      )}
                      <div className="card-body text-center border-top">
                        <h1 className="card-title fw-bold">
                          {item.nombre_area +
                            ' ' +
                            item.detalle_area}
                        </h1>
                        <Button
                          colorScheme="blue"
                          className="mt-2"
                          onClick={openEditModal}
                        >
                          Editar Datos <i className="fa fa-info-circle ms-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1>No hay datos a mostrar</h1>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
