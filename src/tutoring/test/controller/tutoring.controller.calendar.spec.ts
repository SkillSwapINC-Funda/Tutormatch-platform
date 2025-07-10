describe('Simulación de calendario de disponibilidad', () => {
  const availableTimes = [
    { dayOfWeek: 1, startTime: '09:00', endTime: '10:00' }, // Lunes
    { dayOfWeek: 3, startTime: '14:00', endTime: '15:00' }, // Miércoles
    { dayOfWeek: 5, startTime: '16:30', endTime: '18:00' }, // Viernes
  ];

  const dayMap: Record<number, string> = {
    0: 'Domingo',
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
  };

  function simulateCalendar({ availableTimes }: { availableTimes: any }) {
    let calendar: Record<string, string[]> = {};

    for (const time of availableTimes) {
      const day = dayMap[time.dayOfWeek];
      if (!calendar[day]) calendar[day] = [];
      calendar[day].push(`${time.startTime} - ${time.endTime}`);
    }

    return calendar;
  }

  it('debería simular el calendario correctamente', () => {
    // 🔸 Arrange
    const inputTimes = availableTimes;

    // 🔸 Act
    const simulatedCalendar = simulateCalendar({ availableTimes: inputTimes });

    // 🔸 Assert
    console.log('\n📅 Calendario semanal de disponibilidad:\n');
    for (const [day, slots] of Object.entries(simulatedCalendar)) {
      console.log(`🗓️ ${day}:`);
      slots.forEach(slot => console.log(`   🕒 ${slot}`));
    }
    console.log('\n✅ Calendario generado correctamente\n');

    expect(Object.keys(simulatedCalendar)).toContain('Lunes');
    expect(simulatedCalendar['Lunes']).toContain('09:00 - 10:00');
    expect(simulatedCalendar['Miércoles']).toContain('14:00 - 15:00');
    expect(simulatedCalendar['Viernes']).toContain('16:30 - 18:00');
  });
});