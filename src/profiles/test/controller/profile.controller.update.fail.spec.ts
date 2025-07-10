import { setupTestModule, controller, mockProfileService, profileService } from '../setup-profile-controller.spec';
import { UpdateProfileDto } from '../../application/dtos/update-profile.dto';

describe('ProfileController - update fail', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should throw an error when profile not found', async () => {
    const profileId = 'non-existent-id';
    const updateProfileDto: UpdateProfileDto = {
      firstName: 'Jane',
      lastName: 'Smith',
    };

    const errorMessage = `Profile with ID ${profileId} not found`;
    mockProfileService.update.mockRejectedValue(new Error(errorMessage));

    process.stdout.write('\n========================== UPDATE PROFILE NOT FOUND TEST ==========================\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);
    process.stdout.write(`🧪 Update Profile DTO: ${JSON.stringify(updateProfileDto, null, 2)}\n`);

    try {
      await controller.update(profileId, updateProfileDto);
    } catch (err: any) {
      process.stdout.write(`🚫 Error message: ${err.message}\n`);
      process.stdout.write('===============================================================================\n\n');
      expect(err.message).toBe(errorMessage);
      expect(profileService.update).toHaveBeenCalledWith(profileId, updateProfileDto);
      expect(profileService.update).toHaveBeenCalledTimes(1);
      return;
    }

    throw new Error('Expected profile update to fail but it succeeded');
  });

  it('should throw an error when validation fails', async () => {
    const profileId = '550e8400-e29b-41d4-a716-446655440000';
    const updateProfileDto: UpdateProfileDto = {
      phone: 'invalid-phone',
      semesterNumber: -1,
    };

    const errorMessage = 'Validation failed: Invalid phone format and semester number must be positive';
    mockProfileService.update.mockRejectedValue(new Error(errorMessage));

    process.stdout.write('\n========================== UPDATE PROFILE VALIDATION FAIL TEST ==========================\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);
    process.stdout.write(`🧪 Update Profile DTO: ${JSON.stringify(updateProfileDto, null, 2)}\n`);

    try {
      await controller.update(profileId, updateProfileDto);
    } catch (err: any) {
      process.stdout.write(`🚫 Error message: ${err.message}\n`);
      process.stdout.write('======================================================================================\n\n');
      expect(err.message).toBe(errorMessage);
      expect(profileService.update).toHaveBeenCalledWith(profileId, updateProfileDto);
      expect(profileService.update).toHaveBeenCalledTimes(1);
      return;
    }

    throw new Error('Expected profile update to fail but it succeeded');
  });
});