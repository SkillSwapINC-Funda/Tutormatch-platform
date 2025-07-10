import { setupTestModule, controller, mockProfileService, profileService } from '../setup-profile-controller.spec';
import { UpdateProfileDto } from '../../application/dtos/update-profile.dto';

describe('ProfileController - update success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should update a profile successfully', async () => {
    const profileId = '550e8400-e29b-41d4-a716-446655440000';
    
    const updateProfileDto: UpdateProfileDto = {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+0987654321',
      semesterNumber: 7,
    };

    const previousProfile = {
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

    const updatedProfile = {
      id: profileId,
      email: 'U202218167@upc.edu.pe',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+0987654321',
      gender: 'male',
      semesterNumber: 7,
      role: 'student',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T12:00:00.000Z',
    };

    mockProfileService.update.mockResolvedValue(updatedProfile);

    const result = await controller.update(profileId, updateProfileDto);

    // Logs limpios con process.stdout.write
    process.stdout.write('\n========== UPDATE PROFILE SUCCESS TEST ==========\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);
    process.stdout.write(`🧪 Update Profile DTO:\n${JSON.stringify(updateProfileDto, null, 2)}\n`);
    process.stdout.write(`📋 Previous Profile:\n${JSON.stringify(previousProfile, null, 2)}\n`);
    process.stdout.write(`✅ Updated Profile:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('================================================\n\n');

    expect(profileService.update).toHaveBeenCalledWith(profileId, updateProfileDto);
    expect(profileService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updatedProfile);
    expect(result.firstName).toBe('Jane');
    expect(result.lastName).toBe('Smith');
    expect(result.phone).toBe('+0987654321');
    expect(result.semesterNumber).toBe(7);
  });

  it('should update only specified fields', async () => {
    const profileId = '550e8400-e29b-41d4-a716-446655440000';
    
    const updateProfileDto: UpdateProfileDto = {
      phone: '+1111111111',
    };

    const previousProfile = {
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

    const updatedProfile = {
      ...previousProfile,
      phone: '+1111111111',
      updatedAt: '2023-01-01T12:00:00.000Z',
    };

    mockProfileService.update.mockResolvedValue(updatedProfile);

    const result = await controller.update(profileId, updateProfileDto);

    // Logs limpios con process.stdout.write
    process.stdout.write('\n========== UPDATE PROFILE PARTIAL SUCCESS TEST ==========\n');
    process.stdout.write(`🆔 Profile ID: ${profileId}\n`);
    process.stdout.write(`🧪 Update Profile DTO:\n${JSON.stringify(updateProfileDto, null, 2)}\n`);
    process.stdout.write(`📋 Previous Profile:\n${JSON.stringify(previousProfile, null, 2)}\n`);
    process.stdout.write(`✅ Updated Profile:\n${JSON.stringify(result, null, 2)}\n`);
    process.stdout.write('=========================================================\n\n');

    expect(profileService.update).toHaveBeenCalledWith(profileId, updateProfileDto);
    expect(profileService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updatedProfile);
    expect(result.phone).toBe('+1111111111');
    expect(result.firstName).toBe('John'); // Should remain unchanged
    expect(result.lastName).toBe('Doe'); // Should remain unchanged
  });
});