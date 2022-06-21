import { get } from "../webServices/Get";

async function validarExistencia(dato, idEmpresa, name) {
  try {
    var validador = undefined;
    if (name === "cedula") {
      validador = await get(`empleado/cedula/${dato}/${idEmpresa}`);
      console.log(validador);
      if (Object.keys(validador).length > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (name === "ruc-cliente") {
      validador = await get(`cliente/ruc/${dato}/${idEmpresa}`);
      if (Object.keys(validador).length > 0) {
        return true;
      } else {
        return false;
      }
    }

    if (name === "ruc-proveedor") {
      validador = await get(`proveedor/ruc/${dato}/${idEmpresa}`);
      if (Object.keys(validador).length > 0) {
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {
    return false;
  }
}

const validadorIdentidades = (numero) => {
  var suma = 0;
  var residuo = 0;
  var pri = false;
  var pub = false;
  var nat = false;
  var numeroProvincias = 24;
  var modulo = 11;
  var digitoVerificador = 0;
  var d1, d2, d3, d4, d5, d6, d7, d8, d9, d10;
  var p1, p2, p3, p4, p5, p6, p7, p8, p9;

  /* Verifico que el campo no contenga letras */
  var ok = 1;
  for (let i = 0; i < numero.length && ok == 1; i++) {
    var n = parseInt(numero.charAt(i));
    if (isNaN(n)) ok = 0;
  }
  if (ok == 0) {
    return false;
  }

  if (numero.length < 10) {
    return false;
  }

  /* Los primeros dos digitos corresponden al codigo de la provincia */
  var provincia = numero.substr(0, 2);
  if (provincia < 1 || provincia > numeroProvincias) {
    return false;
  }

  /* Aqui almacenamos los digitos de la cedula en variables. */
  d1 = numero.substr(0, 1);
  d2 = numero.substr(1, 1);
  d3 = numero.substr(2, 1);
  d4 = numero.substr(3, 1);
  d5 = numero.substr(4, 1);
  d6 = numero.substr(5, 1);
  d7 = numero.substr(6, 1);
  d8 = numero.substr(7, 1);
  d9 = numero.substr(8, 1);
  d10 = numero.substr(9, 1);

  /* El tercer digito es: */
  /* 9 para sociedades privadas y extranjeros   */
  /* 6 para sociedades publicas */
  /* menor que 6 (0,1,2,3,4,5) para personas naturales */
  if (d3 == 7 || d3 == 8) {
    return false;
  }

  /* Solo para personas naturales (modulo 10) */
  if (d3 < 6) {
    nat = true;
    p1 = d1 * 2;
    if (p1 >= 10) p1 -= 9;
    p2 = d2 * 1;
    if (p2 >= 10) p2 -= 9;
    p3 = d3 * 2;
    if (p3 >= 10) p3 -= 9;
    p4 = d4 * 1;
    if (p4 >= 10) p4 -= 9;
    p5 = d5 * 2;
    if (p5 >= 10) p5 -= 9;
    p6 = d6 * 1;
    if (p6 >= 10) p6 -= 9;
    p7 = d7 * 2;
    if (p7 >= 10) p7 -= 9;
    p8 = d8 * 1;
    if (p8 >= 10) p8 -= 9;
    p9 = d9 * 2;
    if (p9 >= 10) p9 -= 9;
    modulo = 10;
  } else if (d3 == 6) {

  /* Solo para sociedades publicas (modulo 11) */
  /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    pub = true;
    p1 = d1 * 3;
    p2 = d2 * 2;
    p3 = d3 * 7;
    p4 = d4 * 6;
    p5 = d5 * 5;
    p6 = d6 * 4;
    p7 = d7 * 3;
    p8 = d8 * 2;
    p9 = 0;
  } else if (d3 == 9) {

  /* Solo para entidades privadas (modulo 11) */
    pri = true;
    p1 = d1 * 4;
    p2 = d2 * 3;
    p3 = d3 * 2;
    p4 = d4 * 7;
    p5 = d5 * 6;
    p6 = d6 * 5;
    p7 = d7 * 4;
    p8 = d8 * 3;
    p9 = d9 * 2;
  }

  suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
  residuo = suma % modulo;

  /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
  digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

  /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
  if (pub == true) {
    if (digitoVerificador != d9) {
      return false;
    }
    /* El ruc de las empresas del sector publico terminan con 0001*/
    if (numero.substr(9, 4) != "0001") {
      return false;
    }
  } else if (pri == true) {
    if (digitoVerificador != d10) {
      return false;
    }
    if (numero.substr(10, 3) != "001") {
      return false;
    }
  } else if (nat == true) {
    if (digitoVerificador != d10) {
      return false;
    }
    if (numero.length > 10 && numero.substr(10, 3) != "001") {
      return false;
    }
  }
  return true;
};

// const validarCedula = (cedula) => {
//   //Preguntamos si la cedula consta de 10 digitos
//   if (cedula.length == 10) {
//     //Obtenemos el digito de la region que sonlos dos primeros digitos
//     var digito_region = cedula.substring(0, 2);
//     //Pregunto si la region existe ecuador se divide en 24 regiones
//     if (digito_region >= 1 && digito_region <= 24) {
//       // Extraigo el ultimo digito
//       var ultimo_digito = cedula.substring(9, 10);
//       //Agrupo todos los pares y los sumo
//       var pares =
//         parseInt(cedula.substring(1, 2)) +
//         parseInt(cedula.substring(3, 4)) +
//         parseInt(cedula.substring(5, 6)) +
//         parseInt(cedula.substring(7, 8));
//       //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
//       var numero1 = cedula.substring(0, 1);
//       var numero1 = numero1 * 2;
//       if (numero1 > 9) {
//         var numero1 = numero1 - 9;
//       }
//       var numero3 = cedula.substring(2, 3);
//       var numero3 = numero3 * 2;
//       if (numero3 > 9) {
//         var numero3 = numero3 - 9;
//       }
//       var numero5 = cedula.substring(4, 5);
//       var numero5 = numero5 * 2;
//       if (numero5 > 9) {
//         var numero5 = numero5 - 9;
//       }
//       var numero7 = cedula.substring(6, 7);
//       var numero7 = numero7 * 2;
//       if (numero7 > 9) {
//         var numero7 = numero7 - 9;
//       }
//       var numero9 = cedula.substring(8, 9);
//       var numero9 = numero9 * 2;
//       if (numero9 > 9) {
//         var numero9 = numero9 - 9;
//       }
//       var impares = numero1 + numero3 + numero5 + numero7 + numero9;
//       //Suma total
//       var suma_total = pares + impares;
//       //extraemos el primero digito
//       var primer_digito_suma = String(suma_total).substring(0, 1);
//       //Obtenemos la decena inmediata
//       var decena = (parseInt(primer_digito_suma) + 1) * 10;
//       //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
//       var digito_validador = decena - suma_total;
//       //Si el digito validador es = a 10 toma el valor de 0
//       if (digito_validador == 10) var digito_validador = 0;
//       //Validamos que el digito validador sea igual al de la cedula
//       if (digito_validador == ultimo_digito) {
//         return true;
//       } else {
//         return false;
//       }
//     } else {
//       return false;
//     }
//   } else {
//     return false;
//   }
// };

// function validarRuc(ruc) {
//   if (ruc.length == 13) {
//     var digito_region = ruc.substring(0, 2);
//     if (digito_region >= 1 && digito_region <= 24) {
//       var ultimo_digito = ruc.substring(9, 10);
//       var pares =
//         parseInt(ruc.substring(1, 2)) +
//         parseInt(ruc.substring(3, 4)) +
//         parseInt(ruc.substring(5, 6)) +
//         parseInt(ruc.substring(7, 8));
//       var numero1 = ruc.substring(0, 1);
//       var numero1 = numero1 * 2;
//       if (numero1 > 9) {
//         var numero1 = numero1 - 9;
//       }
//       var numero3 = ruc.substring(2, 3);
//       var numero3 = numero3 * 2;
//       if (numero3 > 9) {
//         var numero3 = numero3 - 9;
//       }
//       var numero5 = ruc.substring(4, 5);
//       var numero5 = numero5 * 2;
//       if (numero5 > 9) {
//         var numero5 = numero5 - 9;
//       }
//       var numero7 = ruc.substring(6, 7);
//       var numero7 = numero7 * 2;
//       if (numero7 > 9) {
//         var numero7 = numero7 - 9;
//       }
//       var numero9 = ruc.substring(8, 9);
//       var numero9 = numero9 * 2;
//       if (numero9 > 9) {
//         var numero9 = numero9 - 9;
//       }
//       var impares = numero1 + numero3 + numero5 + numero7 + numero9;
//       var suma_total = pares + impares;
//       var primer_digito_suma = String(suma_total).substring(0, 1);
//       var decena = (parseInt(primer_digito_suma) + 1) * 10;
//       var digito_validador = decena - suma_total;
//       if (digito_validador == 10) var digito_validador = 0;
//       if (digito_validador == ultimo_digito) {
//         var valores_ruc =
//           parseInt(ruc.substring(10, 11)) +
//           parseInt(ruc.substring(11, 12)) +
//           parseInt(ruc.substring(12, 13));
//         if (valores_ruc === 1) {
//           return true;
//         } else {
//           return false;
//         }
//       } else {
//         return false;
//       }
//     } else {
//       return false;
//     }
//   } else {
//     return false;
//   }
// }

function validarTelefonos(dato) {
  try {
    var alph = /^[0]{1}[2-9]{1}[0-9]{0,8}$/;
    if (alph.test(dato)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function validarLetras(dato) {
  try {
    var alph =
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+[.]*$/;
    if (alph.test(dato)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function validarCorreo(dato) {
  try {
    var alph = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (alph.test(dato)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function validarNumeros(dato) {
  try {
    var alph = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
    if (alph.test(dato)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

export {
  validarTelefonos,
  validarLetras,
  validarCorreo,
  validarNumeros,
  validarExistencia,
  validadorIdentidades
};
