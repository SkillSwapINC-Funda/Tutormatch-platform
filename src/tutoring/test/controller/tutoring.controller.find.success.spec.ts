import { setupTestModule, controller, mockTutoringSessionService, tutoringSessionService } from '../setup-tutoring-session-controller.spec';

describe('TutoringSessionController - find success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should find all tutoring sessions successfully', async () => {
    const expectedSessions = [
      {
        id: 'session-1',
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
      },
      {
        id: 'session-2',
        tutorId: 'tutor-456',
        courseId: 'course-789',
        title: 'Physics Tutoring',
        description: 'Mechanics and thermodynamics',
        pricePerHour: 30.00,
        duration: 90,
        modality: 'presencial',
        isActive: true,
        createdAt: '2023-01-02T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      }
    ];

    mockTutoringSessionService.findAll.mockResolvedValue(expectedSessions);

    const result = await controller.findAll();

    process.stdout.write('\n========== FIND ALL SUCCESS TEST ==========\n');
    process.stdout.write(`✅ Found ${expectedSessions.length} sessions\n`);
    process.stdout.write(`📚 Sessions:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('===========================================\n\n');

    expect(tutoringSessionService.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedSessions);
  });

  it('should find tutoring sessions by tutor ID successfully', async () => {
    const tutorId = 'tutor-123';
    const expectedSessions = [
      {
        id: 'session-1',
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
      }
    ];

    mockTutoringSessionService.findByTutorId.mockResolvedValue(expectedSessions);

    const result = await controller.findAll(tutorId);

    process.stdout.write('\n========== FIND BY TUTOR SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Tutor ID: ${tutorId}\n`);
    process.stdout.write(`✅ Found ${expectedSessions.length} sessions\n`);
    process.stdout.write(`📚 Sessions:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('=================================================\n\n');

    expect(tutoringSessionService.findByTutorId).toHaveBeenCalledWith(tutorId);
    expect(tutoringSessionService.findByTutorId).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedSessions);
  });

  it('should find tutoring sessions by course ID successfully', async () => {
    const courseId = 'course-456';
    const expectedSessions = [
      {
        id: 'session-1',
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
      }
    ];

    mockTutoringSessionService.findByCourseId.mockResolvedValue(expectedSessions);

    const result = await controller.findAll(undefined, courseId);

    process.stdout.write('\n========== FIND BY COURSE SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Course ID: ${courseId}\n`);
    process.stdout.write(`✅ Found ${expectedSessions.length} sessions\n`);
    process.stdout.write(`📚 Sessions:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('==================================================\n\n');

    expect(tutoringSessionService.findByCourseId).toHaveBeenCalledWith(courseId);
    expect(tutoringSessionService.findByCourseId).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedSessions);
  });

  it('should find a tutoring session by ID successfully', async () => {
    const sessionId = 'session-123';
    const expectedSession = {
      id: 'session-123',
      tutorId: 'tutor-456',
      courseId: 'course-789',
      title: 'Chemistry Tutoring',
      description: 'Organic chemistry fundamentals',
      pricePerHour: 35.00,
      duration: 75,
      modality: 'virtual',
      isActive: true,
      createdAt: '2023-01-03T00:00:00.000Z',
      updatedAt: '2023-01-03T00:00:00.000Z',
      availableTimes: [
        {
          id: 'time-1',
          dayOfWeek: 'Friday',
          startTime: '16:00',
          endTime: '17:15',
        }
      ],
      materials: [],
      reviews: []
    };

    mockTutoringSessionService.findById.mockResolvedValue(expectedSession);

    const result = await controller.findById(sessionId);

    process.stdout.write('\n========== FIND BY ID SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Session ID: ${sessionId}\n`);
    process.stdout.write(`✅ Session found:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('==============================================\n\n');

    expect(tutoringSessionService.findById).toHaveBeenCalledWith(sessionId);
    expect(tutoringSessionService.findById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedSession);
  });
});