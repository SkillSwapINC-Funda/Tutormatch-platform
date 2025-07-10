import { setupTestModule, controller, mockAuthService, authService } from '../setup-auth-controller.spec';
import { LoginDto } from '../../dto/login.dto';

describe('AuthController - login fail', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should throw an error when login fails', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    const errorMessage = 'Invalid credentials, email must end in @upc.edu.pe';
    mockAuthService.login.mockRejectedValue(new Error(errorMessage));

    process.stdout.write('\n========================== LOGIN FAIL TEST ==========================\n');
    process.stdout.write(`🧪 Login DTO: ${JSON.stringify(loginDto, null, 2)}\n`);

    try {
      await controller.login(loginDto);
    } catch (err: any) {
      process.stdout.write(`🚫 Error message: ${err.message}\n`);
      process.stdout.write('=====================================================================\n\n');
      expect(err.message).toBe(errorMessage);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(authService.login).toHaveBeenCalledTimes(1);
      return;
    }

    throw new Error('Expected login to fail but it succeeded');
  });
});
