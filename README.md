# Google Calendar Sync Script 🎉

**¿Cansado de saltar entre diversos calendarios y perderte eventos?** ¡Deja de sufrir y unifícalos todos con este script! 🗓️

## ¿Qué hace este script? 🤔

Google Calendar, en su configuración nativa, **no permite sincronizar eventos entre varios calendarios automáticamente**. Si gestionas múltiples calendarios (de trabajo, personales o de recursos), puede ser un dolor de cabeza mantenerse al día con todos los eventos. ¡Pero no te preocupes más! Este script está aquí para **sincronizar eventos desde varios calendarios de Google** en uno principal, todo sin esfuerzo manual.

### Características principales:

- **Sincronización automática** de eventos desde múltiples calendarios fuente hacia un calendario principal.
- **Elimina eventos** del calendario principal que ya no existen en los calendarios fuente, para mantener todo limpio y actualizado.
- Asigna diferentes colores a los eventos según el calendario de origen para una mejor visualización.
- Soporte para eventos recurrentes, invitados y más.

## ¡Atención! 🚧 Ongoing Project

Este es un **proyecto en desarrollo**, y aunque el script debería funcionar bien en la mayoría de los casos, **es posible que haya algunos bugs** o escenarios no contemplados.

Si encuentras algún problema o tienes sugerencias para mejorar el código, **¡todas las contribuciones son bienvenidas!** Siéntete libre de abrir un issue o enviar un pull request.

## Cómo usar este script 🛠️

### 1. Reemplaza los IDs de los calendarios

El script está diseñado para sincronizar eventos desde varios calendarios hacia uno principal. Deberás reemplazar los IDs de los calendarios fuente y del calendario principal en el código:

```jsx
javascript
Copy code
var sourceCalendars = [
  { id: 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_1', name: 'Nombre del Calendario 1', colorId: '2' },
  { id: 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_2', name: 'Nombre del Calendario 2', colorId: '5' }
  // Añade más calendarios si es necesario
];

var targetCalendar = 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_PRINCIPAL';

```

### 2. Configura el script

1. **Permisos**: Este script necesita permisos para acceder a los calendarios de Google. Asegúrate de autorizar los permisos necesarios cuando ejecutes el script.
2. **Configura la sincronización**: El script está configurado para sincronizar eventos hasta un año en el futuro. Si necesitas modificar el periodo, ajusta esta parte del código:
    
    ```jsx
    javascript
    Copy code
    future.setFullYear(future.getFullYear() + 1);  // Un año en el futuro
    
    ```
    

### 3. Ejecuta el script

- **Paso 1**: Abre Google Apps Script ([script.google.com](https://script.google.com/)) y crea un nuevo proyecto.
- **Paso 2**: Copia y pega el código del script.
- **Paso 3**: Ejecuta el script y autoriza los permisos para acceder a los calendarios.
- **Paso 4**: Configura un "Trigger" en Google Apps Script para que el script se ejecute automáticamente a intervalos regulares.

### 4. Revisa los logs

El script registrará en los logs los eventos que ha sincronizado, creado o eliminado. Puedes revisar la consola para asegurarte de que todo está funcionando correctamente.

## Sincronización y eliminación de eventos

Este script no solo agrega nuevos eventos al calendario principal, sino que también **elimina eventos** del calendario principal si ya no existen en los calendarios fuente. Así te aseguras de que tu calendario esté siempre limpio y actualizado.

## Recomendaciones 💡

- Configura el script para que se ejecute automáticamente cada día o semana utilizando los "Triggers" de Google Apps Script.
- Asegúrate de que los IDs de tus calendarios están bien configurados antes de ejecutar el script.

## Licencia 📝

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

---

## Contribuciones 🤝

Este es un **proyecto en curso**, por lo que siempre estamos abiertos a mejoras y correcciones. Si tienes alguna sugerencia, encuentras un bug o quieres colaborar, ¡siéntete libre de abrir un issue o enviar un pull request! 🎉
