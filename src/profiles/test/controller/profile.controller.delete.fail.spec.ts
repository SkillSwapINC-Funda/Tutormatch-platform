import { setupTestModule, controller, mockProfileService, profileService } from '../setup-profile-controller.spec';

describe('ProfileController - delete fail', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should throw an error when profile not found', async () => {
    const profileId = 'non-existent-id';
    const errorMessage = `Profile with ID ${profileId} not found`;
    
    mockProfileService.delete.mockRejectedValue(new Error(errorMessage));

    process.stdout.write('\n========================== DELETE PROFILE NOT FOUND TEST ==========================\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);

    try {
      await controller.delete(profileId);
    } catch (err: any) {
      process.stdout.write(`🚫 Error message: ${err.message}\n`);
      process.stdout.write('===============================================================================\n\n');
      expect(err.message).toBe(errorMessage);
      expect(profileService.delete).toHaveBeenCalledWith(profileId);
      expect(profileService.delete).toHaveBeenCalledTimes(1);
      return;
    }

    throw new Error('Expected profile deletion to fail but it succeeded');
  });

  it('should throw an error when profile has dependencies', async () => {
    const profileId = '550e8400-e29b-41d4-a716-446655440000';
    const errorMessage = 'Cannot delete profile: Profile has active dependencies (courses, enrollments, etc.)';
    
    const profileWithDependencies = {
      id: profileId,
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

    mockProfileService.delete.mockRejectedValue(new Error(errorMessage));

    process.stdout.write('\n========================== DELETE PROFILE WITH DEPENDENCIES TEST ==========================\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);
    process.stdout.write(`🗑️  Profile with dependencies:\n${JSON.stringify(profileWithDependencies, null, 2)}\n`);

    try {
      await controller.delete(profileId);
    } catch (err: any) {
      process.stdout.write(`🚫 Error message: ${err.message}\n`);
      process.stdout.write('========================================================================================\n\n');
      expect(err.message).toBe(errorMessage);
      expect(profileService.delete).toHaveBeenCalledWith(profileId);
      expect(profileService.delete).toHaveBeenCalledTimes(1);
      return;
    }

    throw new Error('Expected profile deletion to fail but it succeeded');
  });

  it('should throw an error when database error occurs', async () => {
    const profileId = '550e8400-e29b-41d4-a716-446655440000';
    const errorMessage = 'Database connection error';
    
    mockProfileService.delete.mockRejectedValue(new Error(errorMessage));

    process.stdout.write('\n========================== DELETE PROFILE DATABASE ERROR TEST ==========================\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);

    try {
      await controller.delete(profileId);
    } catch (err: any) {
      process.stdout.write(`🚫 Error message: ${err.message}\n`);
      process.stdout.write('======================================================================================\n\n');
      expect(err.message).toBe(errorMessage);
      expect(profileService.delete).toHaveBeenCalledWith(profileId);
      expect(profileService.delete).toHaveBeenCalledTimes(1);
      return;
    }

    throw new Error('Expected profile deletion to fail but it succeeded');
  });
});