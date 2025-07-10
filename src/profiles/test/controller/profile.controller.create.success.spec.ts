import { setupTestModule, controller, mockProfileService, profileService } from '../setup-profile-controller.spec';
import { CreateProfileDto } from '../../application/dtos/create-profile.dto';

describe('ProfileController - create success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should create a new profile successfully', async () => {
    const createProfileDto: CreateProfileDto = {
      email: 'U202218167@upc.edu.pe',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      gender: 'male',
      semesterNumber: 5,
      role: 'student',
      id: '',
    };

    const expectedResult = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'U202218167@upc.edu.pe',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      gender: 'male',
      semesterNumber: 5,
      role: 'student',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    mockProfileService.create.mockResolvedValue(expectedResult);

    const result = await controller.create(createProfileDto);

    // Logs limpios con process.stdout.write
    process.stdout.write('\n========== CREATE PROFILE SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Create Profile DTO:\n${JSON.stringify(createProfileDto, null, 2)}\n`);
    process.stdout.write(`✅ Result:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('================================================\n\n');

    expect(profileService.create).toHaveBeenCalledWith(createProfileDto);
    expect(profileService.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });
});