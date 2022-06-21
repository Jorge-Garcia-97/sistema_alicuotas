export const calcularConciliacion = (pendientes, gastos, efectivo_final, efectivo_inicial, depositos, transferencias, total_previsto) => {
    let temp_total = 0;
    let temp_total_venta = 0;
    let temp_total_caja = 0;
    let temp_faltante = 0;
    let temp_sobrante = 0;
    let temp_caja_previsto = 0;
    
    temp_total_caja = efectivo_inicial + efectivo_final + depositos + transferencias;
    temp_caja_previsto = efectivo_inicial + total_previsto;
    temp_total_venta = efectivo_final + depositos + transferencias;
    temp_total = temp_total_venta + pendientes + efectivo_inicial + gastos;
    
    if (temp_total > temp_caja_previsto) {
      temp_sobrante = temp_total - temp_caja_previsto;
    } else if (temp_total < temp_caja_previsto) {
      temp_faltante = temp_caja_previsto - temp_total;
    } else if (temp_total == temp_caja_previsto) {
      temp_sobrante = 0;
      temp_faltante = 0;
    }

    let tempReturn = {temp_total_caja, temp_total_venta, gastos, temp_faltante, temp_sobrante, temp_caja_previsto, total_previsto};
    return tempReturn;
    
}