import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../interfaces/controllers/profile.controller';
import { ProfileService } from '../application/services/profile.service';

export const mockProfileService = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export let controller: ProfileController;
export let profileService: ProfileService;

export async function setupTestModule() {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [ProfileController],
    providers: [
      {
        provide: ProfileService,
        useValue: mockProfileService,
      },
    ],
  }).compile();

  controller = module.get<ProfileController>(ProfileController);
  profileService = module.get<ProfileService>(ProfileService);
}