import { setupTestModule, controller, mockProfileService, profileService } from '../setup-profile-controller.spec';
import { CreateProfileDto } from '../../application/dtos/create-profile.dto';

describe('ProfileController - create fail', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should throw an error when profile creation fails', async () => {
    const createProfileDto: CreateProfileDto = {
      email: 'invalid-email@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      gender: 'male',
      semesterNumber: 5,
      role: 'student',
      id: '',
    };

    const errorMessage = 'Email must end with @upc.edu.pe domain';
    mockProfileService.create.mockRejectedValue(new Error(errorMessage));

    process.stdout.write('\n========================== CREATE PROFILE FAIL TEST ==========================\n');
    process.stdout.write(`🧪 Create Profile DTO: ${JSON.stringify(createProfileDto, null, 2)}\n`);

    try {
      await controller.create(createProfileDto);
    } catch (err: any) {
      process.stdout.write(`🚫 Error message: ${err.message}\n`);
      process.stdout.write('===========================================================================\n\n');
      expect(err.message).toBe(errorMessage);
      expect(profileService.create).toHaveBeenCalledWith(createProfileDto);
      expect(profileService.create).toHaveBeenCalledTimes(1);
      return;
    }

    throw new Error('Expected profile creation to fail but it succeeded');
  });

  it('should throw an error when profile already exists', async () => {
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

    const errorMessage = 'Profile with this email already exists';
    mockProfileService.create.mockRejectedValue(new Error(errorMessage));

    process.stdout.write('\n========================== CREATE PROFILE DUPLICATE TEST ==========================\n');
    process.stdout.write(`🧪 Create Profile DTO: ${JSON.stringify(createProfileDto, null, 2)}\n`);

    try {
      await controller.create(createProfileDto);
    } catch (err: any) {
      process.stdout.write(`🚫 Error message: ${err.message}\n`);
      process.stdout.write('===============================================================================\n\n');
      expect(err.message).toBe(errorMessage);
      expect(profileService.create).toHaveBeenCalledWith(createProfileDto);
      expect(profileService.create).toHaveBeenCalledTimes(1);
      return;
    }

    throw new Error('Expected profile creation to fail but it succeeded');
  });
});