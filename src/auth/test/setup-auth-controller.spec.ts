import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

export const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
};

export let controller: AuthController;
export let authService: AuthService;

export async function setupTestModule() {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AuthController],
    providers: [
      {
        provide: AuthService,
        useValue: mockAuthService,
      },
    ],
  }).compile();

  controller = module.get<AuthController>(AuthController);
  authService = module.get<AuthService>(AuthService);
}
