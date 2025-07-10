import { setupTestModule, controller, mockTutoringSessionService, tutoringSessionService } from '../setup-tutoring-session-controller.spec';

describe('TutoringSessionController - delete success', () => {
  beforeEach(async () => {
    await setupTestModule();
    jest.clearAllMocks();
  });

  it('should delete a tutoring session successfully', async () => {
    const sessionId = 'session-789';

    mockTutoringSessionService.delete.mockResolvedValue(undefined);

    const result = await controller.delete(sessionId);

    process.stdout.write('\n========== DELETE SUCCESS TEST ==========\n');
    process.stdout.write(`🧪 Session ID: ${sessionId}\n`);
    process.stdout.write(`✅ Session deleted successfully\n`);
    process.stdout.write('=========================================\n\n');

    expect(tutoringSessionService.delete).toHaveBeenCalledWith(sessionId);
    expect(tutoringSessionService.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});