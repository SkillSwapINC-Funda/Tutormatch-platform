import { setupTestModule, controller } from '../setup-auth-controller.spec';

describe('AuthController', () => {
  beforeEach(async () => {
    await setupTestModule();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
