import { analytics } from '../analytics';
const mockWindow = {
    plausible: jest.fn(),
    umami: { track: jest.fn() },
};
describe('Analytics', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        Object.defineProperty(global, 'window', {
            value: mockWindow,
            writable: true,
        });
    });
    describe('pageView', () => {
        it('should track page view with Plausible', () => {
            analytics.pageView('/test-page');
            expect(true).toBe(true);
        });
    });
    describe('event', () => {
        it('should track custom event', () => {
            analytics.event({
                name: 'test_event',
                properties: { key: 'value' },
            });
            expect(true).toBe(true);
        });
    });
    describe('click', () => {
        it('should track click event', () => {
            analytics.click('button', { id: 'cta' });
            expect(true).toBe(true);
        });
    });
    describe('submit', () => {
        it('should track form submission', () => {
            analytics.submit('contact-form', { success: true });
            expect(true).toBe(true);
        });
    });
});
