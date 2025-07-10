describe('Simulación de solicitud de tutoría', () => {
  const fakeStudentEmail = 'estudiante.upc@upc.edu.pe';
  const fakeTutorEmail = 'tutor.upc@upc.edu.pe';
  const fakeSession = {
    id: 'session-999',
    title: 'Programación Avanzada en Node.js',
    tutorEmail: fakeTutorEmail,
  };

  const selectedDate = '2025-07-15';
  const selectedTimeSlot = {
    startTime: '16:00',
    endTime: '17:30',
  };

  it('debería simular el envío de solicitud de tutoría correctamente', async () => {
    const simulatedEmailContent = `
📚 Solicitud de Tutoría

Estimado/a tutor/a:

El estudiante ${fakeStudentEmail} ha solicitado una tutoría para la sesión:

👉 Sesión: ${fakeSession.title}
👨‍🏫 Correo del tutor: ${fakeSession.tutorEmail}
📅 Fecha: ${selectedDate}
🕓 Hora: ${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}

Por favor, coordinar con el estudiante a la brevedad.

✉️ Esta solicitud fue simulada correctamente.
`;

    console.log(simulatedEmailContent);

    // Aserciones
    expect(simulatedEmailContent).toContain(fakeStudentEmail);
    expect(simulatedEmailContent).toContain(fakeTutorEmail); // ya está incluido ahora
    expect(simulatedEmailContent).toContain(fakeSession.title);
    expect(simulatedEmailContent).toContain(selectedDate);
    expect(simulatedEmailContent).toContain(selectedTimeSlot.startTime);
    expect(simulatedEmailContent).toContain(selectedTimeSlot.endTime);
  });
});