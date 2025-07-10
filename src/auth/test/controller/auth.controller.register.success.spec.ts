import { setupTestModule, controller, mockAuthService, authService } from '../setup-auth-controller.spec';
import { RegisterDto } from '../../dto/register.dto';

describe('AuthController - register success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const registerDto: RegisterDto = {
      email: 'U202218167@upc.edu.pe',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      gender: 'male',
      semesterNumber: 1,
      role: 'student',
    };

    const expectedResult = {
      user: {
        id: '123',
        email: 'U202218167@upc.edu.pe',
        created_at: '2023-01-01T00:00:00.000Z',
      },
      session: {
        access_token: 'mock_token',
        refresh_token: 'mock_refresh_token',
      },
    };

    mockAuthService.register.mockResolvedValue(expectedResult);

    const result = await controller.register(registerDto);

    expect(authService.register).toHaveBeenCalledWith(registerDto);
    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });
});
