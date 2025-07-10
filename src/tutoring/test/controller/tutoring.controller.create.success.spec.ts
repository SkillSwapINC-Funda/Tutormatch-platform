import { setupTestModule, controller, mockTutoringSessionService, tutoringSessionService } from '../setup-tutoring-session-controller.spec';
import { CreateTutoringSessionDto } from '../../application/dtos/create-tutoring-session.dto';

describe('TutoringSessionController - create success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should create a new tutoring session successfully', async () => {
    const createTutoringSessionDto: CreateTutoringSessionDto = {
      tutorId: 'tutor-123',
      courseId: 'course-456',
      title: 'Mathematics Tutoring',
      description: 'Advanced calculus and algebra support',
      price: 25.00,
      availableTimes: [
        {
          dayOfWeek: 1,
          startTime: '09:00',
          endTime: '10:00',
        },
        {
          dayOfWeek: 3,
          startTime: '14:00',
          endTime: '15:00',
        }
      ],
      whatTheyWillLearn: ['Limits', 'Derivatives'],
      imageUrl: 'https://example.com/session.jpg'
    };


    const expectedResult = {
      id: 'session-789',
      tutorId: 'tutor-123',
      courseId: 'course-456',
      title: 'Mathematics Tutoring',
      description: 'Advanced calculus and algebra support',
      pricePerHour: 25.00,
      duration: 60,
      modality: 'virtual',
      isActive: true,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      availableTimes: [
        {
          id: 'time-1',
          dayOfWeek: 'Monday',
          startTime: '09:00',
          endTime: '10:00',
        },
        {
          id: 'time-2',
          dayOfWeek: 'Wednesday',
          startTime: '14:00',
          endTime: '15:00',
        }
      ]
    };

    mockTutoringSessionService.create.mockResolvedValue(expectedResult);

    const result = await controller.create(createTutoringSessionDto);

    expect(tutoringSessionService.create).toHaveBeenCalledWith(createTutoringSessionDto);
    expect(tutoringSessionService.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });
});