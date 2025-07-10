import { setupTestModule, controller, mockAuthService, authService } from '../setup-auth-controller.spec';
import { LoginDto } from '../../dto/login.dto';

describe('AuthController - login success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should login user successfully', async () => {
    const loginDto: LoginDto = {
      email: 'U202218167@upc.edu.pe',
      password: 'password123',
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

    mockAuthService.login.mockResolvedValue(expectedResult);

    const result = await controller.login(loginDto);

    // Logs limpios con process.stdout.write
    process.stdout.write('\n========== LOGIN SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Login DTO:\n${JSON.stringify(loginDto, null, 2)}\n`);
    process.stdout.write(`✅ Result:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('=========================================\n\n');

    expect(authService.login).toHaveBeenCalledWith(loginDto);
    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });
});
