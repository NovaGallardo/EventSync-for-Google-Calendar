function syncCalendars() {
  var sourceCalendars = [    { id: 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_1', name: 'Nombre del Calendario 1', colorId: '2' },     { id: 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_2', name: 'Nombre del Calendario 2', colorId: '5' },    { id: 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_3', name: 'Nombre del Calendario 3', colorId: '6' },    { id: 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_4', name: 'Nombre del Calendario 4', colorId: '7' },    { id: 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_5', name: 'Nombre del Calendario 5', colorId: '8' }  ];

  var targetCalendar = 'REEMPLAZA_ESTO_CON_ID_CALENDARIO_PRINCIPAL';

  var now = new Date();
  var future = new Date();
  future.setFullYear(future.getFullYear() + 1);  // Un año en el futuro

  // Obtener eventos existentes del calendario principal
  var targetCal = CalendarApp.getCalendarById(targetCalendar);
  var targetEvents = targetCal.getEvents(now, future);
  var targetEventMap = createEventMapByUniqueId(targetEvents);  // Mapa de eventos por ID único

  // Coleccionar los IDs únicos de los eventos de los calendarios fuente
  var sourceEventIds = [];

  sourceCalendars.forEach(function(sourceCalendar) {
    var events = CalendarApp.getCalendarById(sourceCalendar.id).getEvents(now, future);
    events.forEach(function(event) {
      var uniqueId = generateUniqueId(event);  // Generar ID único a partir de las propiedades del evento
      sourceEventIds.push(uniqueId);

      // Si el evento no existe en el calendario principal, lo creamos
      if (!targetEventMap[uniqueId]) {
        var guests = event.getGuestList().map(function(guest) {
          return guest.getEmail();
        });

        var options = {
          description: "Evento sincronizado desde: " + sourceCalendar.name + "\n" + event.getDescription() + "\n[ID único: " + uniqueId + "]",
          location: event.getLocation(),
          colorId: sourceCalendar.colorId  // Asignar color al evento
        };

        if (guests.length > 0) {
          options.guests = guests.join(',');
        }

        // Crear evento en el calendario principal
        targetCal.createEvent(event.getTitle(), event.getStartTime(), event.getEndTime(), options)
                .setColor(sourceCalendar.colorId);

        Logger.log("Evento creado: " + event.getTitle() + " con ID único: " + uniqueId);
      } else {
        Logger.log("El evento ya existe con el ID único: " + uniqueId);
      }
    });
  });

  // Eliminar eventos que ya no existen en los calendarios fuente
  for (var uniqueId in targetEventMap) {
    if (sourceEventIds.indexOf(uniqueId) === -1) {
      var targetEvent = targetEventMap[uniqueId];
      targetEvent.deleteEvent();
      Logger.log("Evento eliminado con ID único: " + uniqueId);
    }
  }
}

// Función auxiliar para crear un mapa de eventos por ID único
function createEventMapByUniqueId(events) {
  var eventMap = {};
  events.forEach(function(event) {
    var description = event.getDescription();
    var match = description.match(/\[ID único: (.*?)\]/);  // Coincidir con el ID único en la descripción
    if (match && match[1]) {
      eventMap[match[1]] = event;  // Guardar evento por su ID único
    }
  });
  return eventMap;
}

// Función auxiliar para generar un ID único basado en el título del evento y la fecha de inicio
function generateUniqueId(event) {
  var title = event.getTitle();
  var startTime = event.getStartTime().toISOString();  // Formato ISO para consistencia
  var uniqueString = title + startTime;
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, uniqueString));
}
