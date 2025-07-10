import { setupTestModule, controller, mockAuthService, authService } from '../setup-auth-controller.spec';
import { RegisterDto } from '../../dto/register.dto';

describe('AuthController - register fail', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should throw an error when registration fails', async () => {
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

    const errorMessage = 'User already exists';
    mockAuthService.register.mockRejectedValue(new Error(errorMessage));

    await expect(controller.register(registerDto)).rejects.toThrow(errorMessage);
    expect(authService.register).toHaveBeenCalledWith(registerDto);
    expect(authService.register).toHaveBeenCalledTimes(1);
  });
});
