# Flows

Acceso
Landing, login, 2FA, recuperación, cambio de contraseña vencida, estados de error y entrada al sistema.

Registro
Wizard completo RF4, pasos, navegación adelante/atrás, estados intermedios, resumen y salida final.

Home / Dashboard
KPIs, fondos destacados, acciones rápidas, actividad reciente, alertas, navegación y estados bloqueados.

Notas de diseño vigentes:
- El KPI de retiro mensual se etiqueta como “Desinversión neta del periodo”; representa el total retirado por el usuario durante el mes, no una pérdida.
- En fondos destacados, cada fila debe mostrar un solo estado operativo en la columna derecha debajo del monto, usando `status-badge`.
- El botón de detalle `>` conserva una columna fija para no montarse sobre fondos con nombres o estados largos.

Mi Portafolio
Cuentas, fondos por cuenta, acciones por fila, menús de overflow, filtros y navegación a detalle.

Detalle de Fondo
Resumen, titulares, condiciones, beneficiarios, firmantes y acciones disponibles según estado.

Nuevo Fondo + Confirmación de Depósito
Selección de producto, validaciones visibles, instrucciones bancarias, carga de comprobante y retorno.

Nueva Inversión
Selección de fondo, monto, cuenta origen, resumen, confirmación y resultado.

Recompra
Listado elegible, restricciones, monto, cuenta destino, confirmación y salida.

Movimientos
Tabla, filtros, estados, débitos/créditos/saldos y exportación simulada.

Perfil y Configuración
