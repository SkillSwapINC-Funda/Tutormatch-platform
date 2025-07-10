import { Test, TestingModule } from '@nestjs/testing';
import { TutoringSessionController } from '../interfaces/controllers/tutoring-session.controller';
import { TutoringSessionService } from '../application/services/tutoring-session.service';

export const mockTutoringSessionService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByTutorId: jest.fn(),
  findByCourseId: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  addMaterial: jest.fn(),
  updateMaterial: jest.fn(),
  deleteMaterial: jest.fn(),
  getMaterials: jest.fn(),
  addReview: jest.fn(),
  updateReview: jest.fn(),
  deleteReview: jest.fn(),
  getReviews: jest.fn(),
  addAvailableTime: jest.fn(),
  updateAvailableTime: jest.fn(),
  deleteAvailableTime: jest.fn(),
  getAvailableTimes: jest.fn(),
};

export let controller: TutoringSessionController;
export let tutoringSessionService: TutoringSessionService;

export async function setupTestModule() {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [TutoringSessionController],
    providers: [
      {
        provide: TutoringSessionService,
        useValue: mockTutoringSessionService,
      },
    ],
  }).compile();

  controller = module.get<TutoringSessionController>(TutoringSessionController);
  tutoringSessionService = module.get<TutoringSessionService>(TutoringSessionService);
}