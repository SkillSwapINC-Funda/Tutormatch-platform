import { setupTestModule, controller, mockTutoringSessionService, tutoringSessionService } from '../setup-tutoring-session-controller.spec';

describe('TutoringSessionController - view session details success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should get complete tutoring session details', async () => {
    const sessionId = 'session-detailed-123';
    const sessionDetails = {
      id: 'session-detailed-123',
      tutorId: 'tutor-456',
      courseId: 'course-789',
      title: 'Advanced Mathematics Tutoring',
      description: 'Comprehensive support for advanced calculus, linear algebra, and differential equations. Ideal for engineering students.',
      pricePerHour: 40.00,
      duration: 120,
      modality: 'virtual',
      isActive: true,
      createdAt: '2023-01-15T10:00:00.000Z',
      updatedAt: '2023-01-20T14:30:00.000Z',
      tutor: {
        id: 'tutor-456',
        firstName: 'Dr. Sarah',
        lastName: 'Williams',
        email: 'sarah.williams@upc.edu.pe',
        phone: '+51-999-123-456',
        rating: 4.95,
        totalSessions: 150,
        experience: '5 years of teaching experience',
        specialties: ['Calculus', 'Linear Algebra', 'Differential Equations']
      },
      course: {
        id: 'course-789',
        name: 'Advanced Mathematics',
        code: 'MAT301',
        credits: 4,
        faculty: 'Engineering',
        semester: 'Fall 2023'
      },
      availableTimes: [
        {
          id: 'time-1',
          dayOfWeek: 'Monday',
          startTime: '09:00',
          endTime: '11:00',
          isBooked: false
        },
        {
          id: 'time-2',
          dayOfWeek: 'Wednesday',
          startTime: '14:00',
          endTime: '16:00',
          isBooked: false
        },
        {
          id: 'time-3',
          dayOfWeek: 'Friday',
          startTime: '10:00',
          endTime: '12:00',
          isBooked: true
        }
      ],
      materials: [
        {
          id: 'material-1',
          title: 'Calculus Fundamentals Guide',
          type: 'PDF',
          url: 'https://example.com/calculus-guide.pdf',
          description: 'Essential calculus concepts and examples'
        },
        {
          id: 'material-2',
          title: 'Linear Algebra Exercises',
          type: 'Document',
          url: 'https://example.com/linear-algebra-exercises.docx',
          description: 'Practice problems with solutions'
        }
      ],
      reviews: [
        {
          id: 'review-1',
          studentId: 'student-123',
          rating: 5,
          comment: 'Excellent tutor! Very clear explanations and patient.',
          createdAt: '2023-01-10T16:00:00.000Z',
          student: {
            firstName: 'Carlos',
            lastName: 'Rodriguez'
          }
        },
        {
          id: 'review-2',
          studentId: 'student-456',
          rating: 5,
          comment: 'Helped me understand complex concepts easily. Highly recommended!',
          createdAt: '2023-01-18T11:30:00.000Z',
          student: {
            firstName: 'Maria',
            lastName: 'Garcia'
          }
        }
      ],
      stats: {
        totalBookings: 45,
        averageRating: 4.95,
        completionRate: 98,
        responseTime: '< 2 hours'
      }
    };

    mockTutoringSessionService.findById.mockResolvedValue(sessionDetails);

    const result = await controller.findById(sessionId);

    process.stdout.write('\n========== VIEW SESSION DETAILS SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Session ID: ${sessionId}\n`);
    process.stdout.write(`📚 Session: ${sessionDetails.title}\n`);
    process.stdout.write(`👨‍🏫 Tutor: ${sessionDetails.tutor.firstName} ${sessionDetails.tutor.lastName}\n`);
    process.stdout.write(`📖 Course: ${sessionDetails.course.name} (${sessionDetails.course.code})\n`);
    process.stdout.write(`💰 Price: $${sessionDetails.pricePerHour}/hour\n`);
    process.stdout.write(`⏱️ Duration: ${sessionDetails.duration} minutes\n`);
    process.stdout.write(`🌐 Modality: ${sessionDetails.modality}\n`);
    process.stdout.write(`⭐ Rating: ${sessionDetails.tutor.rating}/5.0\n`);
    process.stdout.write(`📊 Stats:\n`);
    process.stdout.write(`   - Total Bookings: ${sessionDetails.stats.totalBookings}\n`);
    process.stdout.write(`   - Completion Rate: ${sessionDetails.stats.completionRate}%\n`);
    process.stdout.write(`   - Response Time: ${sessionDetails.stats.responseTime}\n`);
    process.stdout.write(`🗓️ Available Times: ${sessionDetails.availableTimes.length} slots\n`);

    sessionDetails.availableTimes.forEach((time, index) => {
      const status = time.isBooked ? '🔴 Booked' : '🟢 Available';
      process.stdout.write(`   ${index + 1}. ${time.dayOfWeek} ${time.startTime}-${time.endTime} ${status}\n`);
    });

    process.stdout.write(`📋 Materials: ${sessionDetails.materials.length} items\n`);
    sessionDetails.materials.forEach((material, index) => {
      process.stdout.write(`   ${index + 1}. ${material.title} (${material.type})\n`);
    });

    process.stdout.write(`💬 Reviews: ${sessionDetails.reviews.length} reviews\n`);
    sessionDetails.reviews.forEach((review, index) => {
      process.stdout.write(`   ${index + 1}. ${review.rating}⭐ by ${review.student.firstName} ${review.student.lastName}\n`);
      process.stdout.write(`      "${review.comment}"\n`);
    });

    process.stdout.write('=========================================================\n\n');

    expect(tutoringSessionService.findById).toHaveBeenCalledWith(sessionId);
    expect(tutoringSessionService.findById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(sessionDetails);
    expect(result.id).toBe(sessionId);
    expect(result.availableTimes).toHaveLength(3);
    expect(result.materials).toHaveLength(2);
    expect(result.reviews).toHaveLength(2);
  });

  it('should get session details with materials', async () => {
    const sessionId = 'session-123';

    const sessionMaterials = [
      {
        id: 'material-1',
        sessionId: 'session-123',
        title: 'Algebra Basics',
        type: 'PDF',
        url: 'https://example.com/algebra-basics.pdf',
        description: 'Introduction to algebraic concepts',
        createdAt: '2023-01-10T00:00:00.000Z'
      },
      {
        id: 'material-2',
        sessionId: 'session-123',
        title: 'Practice Problems',
        type: 'Document',
        url: 'https://example.com/practice-problems.docx',
        description: 'Solved examples and practice exercises',
        createdAt: '2023-01-12T00:00:00.000Z'
      }
    ];

    mockTutoringSessionService.getMaterials.mockResolvedValue(sessionMaterials);

    const result = await controller.getMaterials(sessionId);

    process.stdout.write('\n========== GET SESSION MATERIALS SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Session ID: ${sessionId}\n`);
    process.stdout.write(`📋 Found ${sessionMaterials.length} materials:\n`);

    sessionMaterials.forEach((material, index) => {
      process.stdout.write(`   ${index + 1}. ${material.title} (${material.type})\n`);
      process.stdout.write(`      Description: ${material.description}\n`);
      process.stdout.write(`      URL: ${material.url}\n`);
      process.stdout.write(`      Created: ${material.createdAt}\n`);
      process.stdout.write(`      ───────────────────────────────────────\n`);
    });

    process.stdout.write('=========================================================\n\n');

    expect(tutoringSessionService.getMaterials).toHaveBeenCalledWith(sessionId);
    expect(tutoringSessionService.getMaterials).toHaveBeenCalledTimes(1);
    expect(result).toEqual(sessionMaterials);
    expect(result).toHaveLength(2);
  });

  it('should get session details with reviews', async () => {
    const sessionId = 'session-123';

    const sessionReviews = [
      {
        id: 'review-1',
        sessionId: 'session-123',
        studentId: 'student-123',
        rating: 5,
        comment: 'Outstanding tutoring session! The tutor was very knowledgeable and patient.',
        createdAt: '2023-01-15T10:30:00.000Z',
        student: {
          id: 'student-123',
          firstName: 'Ana',
          lastName: 'Lopez',
          email: 'ana.lopez@upc.edu.pe'
        }
      },
      {
        id: 'review-2',
        sessionId: 'session-123',
        studentId: 'student-456',
        rating: 4,
        comment: 'Good session, clear explanations but could use more practice examples.',
        createdAt: '2023-01-18T14:45:00.000Z',
        student: {
          id: 'student-456',
          firstName: 'Luis',
          lastName: 'Martinez',
          email: 'luis.martinez@upc.edu.pe'
        }
      }
    ];

    mockTutoringSessionService.getReviews.mockResolvedValue(sessionReviews);

    const result = await controller.getReviews(sessionId);

    process.stdout.write('\n========== GET SESSION REVIEWS SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Session ID: ${sessionId}\n`);
    process.stdout.write(`💬 Found ${sessionReviews.length} reviews:\n`);

    const averageRating = sessionReviews.reduce((sum, review) => sum + review.rating, 0) / sessionReviews.length;
    process.stdout.write(`⭐ Average Rating: ${averageRating.toFixed(1)}/5.0\n`);
    process.stdout.write(`📝 Reviews:\n`);

    sessionReviews.forEach((review, index) => {
      process.stdout.write(`   ${index + 1}. ${review.rating}⭐ by ${review.student.firstName} ${review.student.lastName}\n`);
      process.stdout.write(`      "${review.comment}"\n`);
      process.stdout.write(`      Date: ${review.createdAt}\n`);
      process.stdout.write(`      ───────────────────────────────────────\n`);
    });

    process.stdout.write('=======================================================\n\n');

    expect(tutoringSessionService.getReviews).toHaveBeenCalledWith(sessionId);
    expect(tutoringSessionService.getReviews).toHaveBeenCalledTimes(1);
    expect(result).toEqual(sessionReviews);
    expect(result).toHaveLength(2);
  });

  it('should get session available times', async () => {
    const sessionId = 'session-123';

    const availableTimes = [
      {
        id: 'time-1',
        sessionId: 'session-123',
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
        isBooked: false,
        createdAt: '2023-01-01T00:00:00.000Z'
      },
      {
        id: 'time-2',
        sessionId: 'session-123',
        dayOfWeek: 'Wednesday',
        startTime: '14:00',
        endTime: '15:00',
        isBooked: false,
        createdAt: '2023-01-01T00:00:00.000Z'
      },
      {
        id: 'time-3',
        sessionId: 'session-123',
        dayOfWeek: 'Friday',
        startTime: '16:00',
        endTime: '17:00',
        isBooked: true,
        createdAt: '2023-01-01T00:00:00.000Z'
      }
    ];

    mockTutoringSessionService.getAvailableTimes.mockResolvedValue(availableTimes);

    const result = await controller.getAvailableTimes(sessionId);

    process.stdout.write('\n========== GET AVAILABLE TIMES SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Session ID: ${sessionId}\n`);
    process.stdout.write(`🗓️ Found ${availableTimes.length} time slots:\n`);

    const availableCount = availableTimes.filter(time => !time.isBooked).length;
    const bookedCount = availableTimes.filter(time => time.isBooked).length;

    process.stdout.write(`✅ Available: ${availableCount} slots\n`);
    process.stdout.write(`❌ Booked: ${bookedCount} slots\n`);
    process.stdout.write(`📅 Time Slots:\n`);

    availableTimes.forEach((time, index) => {
      const status = time.isBooked ? '🔴 Booked' : '🟢 Available';
      process.stdout.write(`   ${index + 1}. ${time.dayOfWeek} ${time.startTime} - ${time.endTime} ${status}\n`);
    });

    process.stdout.write('=======================================================\n\n');

    expect(tutoringSessionService.getAvailableTimes).toHaveBeenCalledWith(sessionId);
    expect(tutoringSessionService.getAvailableTimes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(availableTimes);
    expect(result).toHaveLength(3);
  });
});