import {
  setupTestModule,
  controller,
  mockTutoringSessionService,
  tutoringSessionService,
} from '../setup-tutoring-session-controller.spec';

import { CreateTutoringSessionDto } from '../../application/dtos/create-tutoring-session.dto';

describe('TutoringSessionController - create fail', () => {
  beforeEach(async () => {
    await setupTestModule();  // Configura el entorno de pruebas (módulo NestJS simulado)
    jest.clearAllMocks();     // Limpia cualquier mock anterior
  });

  it('should throw an error when creating a tutoring session fails', async () => {
    // Datos DTO con un tutorId inválido
    const createTutoringSessionDto: CreateTutoringSessionDto = {
      tutorId: 'invalid-tutor',
      courseId: 'course-456',
      title: 'Mathematics Tutoring',
      description: 'Advanced calculus and algebra support',
      availableTimes: [],
      price: 50,
      whatTheyWillLearn: ['Derivatives', 'Integrals'],
      imageUrl: undefined,
    };

    const errorMessage = 'Tutor not found';

    // Simula que el servicio lanza un error
    mockTutoringSessionService.create.mockRejectedValue(new Error(errorMessage));

    // Expectativa: que se lance el error esperado
    await expect(controller.create(createTutoringSessionDto)).rejects.toThrow(errorMessage);

    // Verifica que el servicio haya sido llamado con los datos correctos
    expect(tutoringSessionService.create).toHaveBeenCalledWith(createTutoringSessionDto);
    expect(tutoringSessionService.create).toHaveBeenCalledTimes(1);
  });
});
