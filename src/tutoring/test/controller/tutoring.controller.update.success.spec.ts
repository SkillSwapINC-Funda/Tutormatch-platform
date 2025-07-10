import {
  setupTestModule,
  controller,
  mockTutoringSessionService,
  tutoringSessionService,
} from '../setup-tutoring-session-controller.spec';

import { CreateTutoringSessionDto } from '../../application/dtos/create-tutoring-session.dto';

describe('TutoringSessionController - update success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should update a tutoring session successfully', async () => {
    const sessionId = 'session-789';

    // Solo usamos campos válidos del DTO
    const updateData: Partial<CreateTutoringSessionDto> = {
      title: 'Updated Mathematics Tutoring',
      description: 'Updated description with new content',
      price: 30.00,
      availableTimes: [
        {
          dayOfWeek: 1,
          startTime: '10:00',
          endTime: '11:00',
        }
      ]
    };

    const existingSession = {
      id: sessionId,
      tutorId: 'tutor-123',
      courseId: 'course-456',
      title: 'Mathematics Tutoring',
      description: 'Advanced calculus and algebra support',
      price: 25.00,
      isActive: true,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    const existingTimes = [
      {
        id: 'time-1',
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
      }
    ];

    const updatedSession = {
      ...existingSession,
      title: updateData.title,
      description: updateData.description,
      price: updateData.price,
      updatedAt: '2023-01-02T00:00:00.000Z',
      availableTimes: [
        {
          id: 'time-2',
          dayOfWeek: 'Tuesday',
          startTime: '10:00',
          endTime: '11:00',
        }
      ]
    };

    // Mock the service methods
    mockTutoringSessionService.findById.mockResolvedValueOnce(existingSession);
    mockTutoringSessionService.update.mockResolvedValue(updatedSession);
    mockTutoringSessionService.getAvailableTimes.mockResolvedValue(existingTimes);
    mockTutoringSessionService.deleteAvailableTime.mockResolvedValue(undefined);
    mockTutoringSessionService.addAvailableTime.mockResolvedValue(undefined);
    mockTutoringSessionService.findById.mockResolvedValueOnce(updatedSession);

    const result = await controller.update(sessionId, updateData);

    process.stdout.write('\n========== UPDATE SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Session ID: ${sessionId}\n`);
    process.stdout.write(`📝 Update Data:\n${JSON.stringify(updateData, null, 2)}\n`);
    process.stdout.write(`✅ Result:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('=========================================\n\n');

    expect(tutoringSessionService.findById).toHaveBeenCalledWith(sessionId);
    expect(tutoringSessionService.update).toHaveBeenCalledWith(sessionId, {
      title: updateData.title,
      description: updateData.description,
      price: updateData.price,
    });

    expect(tutoringSessionService.getAvailableTimes).toHaveBeenCalledWith(sessionId);
    expect(tutoringSessionService.deleteAvailableTime).toHaveBeenCalledWith('time-1');

    if (updateData.availableTimes?.length) {
      expect(tutoringSessionService.addAvailableTime).toHaveBeenCalledWith(sessionId, updateData.availableTimes[0]);
    }

    expect(tutoringSessionService.findById).toHaveBeenCalledTimes(2);
    expect(result).toEqual(updatedSession);
  });
});
