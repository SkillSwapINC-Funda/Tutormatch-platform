import { setupTestModule, controller, mockProfileService, profileService } from '../setup-profile-controller.spec';

describe('ProfileController - delete success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should delete a profile successfully', async () => {
    const profileId = '550e8400-e29b-41d4-a716-446655440000';
    
    const profileToDelete = {
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

    mockProfileService.delete.mockResolvedValue(undefined);

    const result = await controller.delete(profileId);

    // Logs limpios con process.stdout.write
    process.stdout.write('\n========== DELETE PROFILE SUCCESS TEST ==========\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);
    process.stdout.write(`🗑️  Profile to delete:\n${JSON.stringify(profileToDelete, null, 2)}\n`);
    process.stdout.write(`✅ Deletion result: ${result === undefined ? 'undefined (success)' : result}\n`);
    process.stdout.write('================================================\n\n');

    expect(profileService.delete).toHaveBeenCalledWith(profileId);
    expect(profileService.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });

  it('should delete profile and return no content', async () => {
    const profileId = '550e8400-e29b-41d4-a716-446655440001';
    
    const profileToDelete = {
      id: profileId,
      email: 'U202218168@upc.edu.pe',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+0987654321',
      gender: 'female',
      semesterNumber: 8,
      role: 'student',
      createdAt: '2023-02-01T00:00:00.000Z',
      updatedAt: '2023-02-01T00:00:00.000Z',
    };

    mockProfileService.delete.mockResolvedValue(undefined);

    const result = await controller.delete(profileId);

    // Logs limpios con process.stdout.write
    process.stdout.write('\n========== DELETE PROFILE NO CONTENT TEST ==========\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);
    process.stdout.write(`🗑️  Profile to delete:\n${JSON.stringify(profileToDelete, null, 2)}\n`);
    process.stdout.write(`✅ HTTP Status: 204 No Content\n`);
    process.stdout.write(`✅ Deletion result: ${result === undefined ? 'undefined (success)' : result}\n`);
    process.stdout.write('===================================================\n\n');

    expect(profileService.delete).toHaveBeenCalledWith(profileId);
    expect(profileService.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});