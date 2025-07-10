// Función simulada para contactar a soporte técnico
async function contactSupport(email: string, message: string) {
  // Simula el envío de un mensaje de soporte
  return {
    success: true,
    to: email,
    messageSent: message,
  };
}

// Test con AAA (Arrange, Act, Assert)
describe('contactSupport', () => {
  it('debería enviar un mensaje correctamente al correo de soporte', async () => {
    // Arrange (Preparar)
    const soporteEmail = 'rlopezhuaman@gmail.com';
    const mensaje = 'Hola, tengo un problema con la plataforma.';

    // Act (Actuar)
    const resultado = await contactSupport(soporteEmail, mensaje);

    // Assert (Afirmar)
    expect(resultado).toBeDefined();
    expect(resultado.success).toBe(true);
    expect(resultado.to).toBe(soporteEmail);
    expect(resultado.messageSent).toBe(mensaje);
  });
});
