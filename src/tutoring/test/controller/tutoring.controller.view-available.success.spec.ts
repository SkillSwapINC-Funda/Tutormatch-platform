import { setupTestModule, controller, mockTutoringSessionService, tutoringSessionService } from '../setup-tutoring-session-controller.spec';

describe('TutoringSessionController - view available sessions success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should get available tutoring sessions (active sessions only)', async () => {
    const availableSessions = [
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
        tutor: {
          id: 'tutor-123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@upc.edu.pe',
          rating: 4.8
        },
        course: {
          id: 'course-456',
          name: 'Calculus I',
          code: 'MAT101'
        },
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
        tutor: {
          id: 'tutor-456',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@upc.edu.pe',
          rating: 4.9
        },
        course: {
          id: 'course-789',
          name: 'Physics I',
          code: 'PHY101'
        },
        availableTimes: [
          {
            id: 'time-3',
            dayOfWeek: 'Tuesday',
            startTime: '10:00',
            endTime: '11:30',
          }
        ]
      }
    ];

    mockTutoringSessionService.findAll.mockResolvedValue(availableSessions);

    const result = await controller.findAll();

    process.stdout.write('\n========== VIEW AVAILABLE SESSIONS SUCCESS TEST ==========\n');
    process.stdout.write(`✅ Found ${availableSessions.length} available sessions\n`);
    process.stdout.write(`📚 Available Sessions Summary:\n`);

    availableSessions.forEach((session, index) => {
      process.stdout.write(`  ${index + 1}. ${session.title} - ${session.tutor.firstName} ${session.tutor.lastName}\n`);
      process.stdout.write(`     Course: ${session.course.name} (${session.course.code})\n`);
      process.stdout.write(`     Price: $${session.pricePerHour}/hour | Duration: ${session.duration}min\n`);
      process.stdout.write(`     Modality: ${session.modality} | Rating: ${session.tutor.rating}⭐\n`);
      process.stdout.write(`     Available Times: ${session.availableTimes.length} slots\n`);
      process.stdout.write(`     ───────────────────────────────────────────────────────\n`);
    });

    process.stdout.write('===========================================================\n\n');

    expect(tutoringSessionService.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(availableSessions);
    expect(result).toHaveLength(2);
    // Validamos que todas las sesiones tengan al menos un horario disponible
    expect(result.every(session => session.availableTimes.length > 0)).toBe(true);
  });

  it('should filter available sessions by course', async () => {
    const courseId = 'course-456';
    const courseSpecificSessions = [
      {
        id: 'session-1',
        tutorId: 'tutor-123',
        courseId: 'course-456',
        title: 'Mathematics Tutoring - Beginner',
        description: 'Basic calculus and algebra',
        pricePerHour: 20.00,
        duration: 60,
        modality: 'virtual',
        isActive: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        tutor: {
          id: 'tutor-123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@upc.edu.pe',
          rating: 4.8
        },
        course: {
          id: 'course-456',
          name: 'Calculus I',
          code: 'MAT101'
        },
        availableTimes: [
          {
            id: 'time-1',
            dayOfWeek: 'Monday',
            startTime: '09:00',
            endTime: '10:00',
          }
        ]
      },
      {
        id: 'session-3',
        tutorId: 'tutor-789',
        courseId: 'course-456',
        title: 'Mathematics Tutoring - Advanced',
        description: 'Advanced calculus and linear algebra',
        pricePerHour: 35.00,
        duration: 90,
        modality: 'presencial',
        isActive: true,
        createdAt: '2023-01-03T00:00:00.000Z',
        updatedAt: '2023-01-03T00:00:00.000Z',
        tutor: {
          id: 'tutor-789',
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@upc.edu.pe',
          rating: 4.9
        },
        course: {
          id: 'course-456',
          name: 'Calculus I',
          code: 'MAT101'
        },
        availableTimes: [
          {
            id: 'time-4',
            dayOfWeek: 'Friday',
            startTime: '15:00',
            endTime: '16:30',
          }
        ]
      }
    ];

    mockTutoringSessionService.findByCourseId.mockResolvedValue(courseSpecificSessions);

    const result = await controller.findAll(undefined, courseId);

    process.stdout.write('\n========== VIEW AVAILABLE SESSIONS BY COURSE TEST ==========\n');
    process.stdout.write(`🧪 Course ID: ${courseId}\n`);
    process.stdout.write(`✅ Found ${courseSpecificSessions.length} sessions for this course\n`);
    process.stdout.write(`📚 Course: ${courseSpecificSessions[0].course.name} (${courseSpecificSessions[0].course.code})\n`);
    process.stdout.write(`💰 Price Range: $${Math.min(...courseSpecificSessions.map(s => s.pricePerHour))} - $${Math.max(...courseSpecificSessions.map(s => s.pricePerHour))}/hour\n`);
    process.stdout.write(`🎓 Available Tutors:\n`);

    courseSpecificSessions.forEach((session, index) => {
      process.stdout.write(`  ${index + 1}. ${session.tutor.firstName} ${session.tutor.lastName} (${session.tutor.rating}⭐)\n`);
      process.stdout.write(`     ${session.title} - $${session.pricePerHour}/hour\n`);
    });

    process.stdout.write('=============================================================\n\n');

    expect(tutoringSessionService.findByCourseId).toHaveBeenCalledWith(courseId);
    expect(tutoringSessionService.findByCourseId).toHaveBeenCalledTimes(1);
    expect(result).toEqual(courseSpecificSessions);
    expect(result).toHaveLength(2);
    expect(result.every(session => session.courseId === courseId)).toBe(true);
  });
});