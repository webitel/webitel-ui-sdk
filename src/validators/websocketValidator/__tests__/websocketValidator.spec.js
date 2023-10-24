import websocketValidator from '../websocketValidator';

describe('websocketValidator', () => {
  it('truthy case 1: localhost ws', () => {
    expect(websocketValidator('ws://localhost:8080')).toBe(true);
  });
  it('truthy case 2: localhost wss', () => {
    expect(websocketValidator('wss://localhost:8080')).toBe(true);
  });
  it('truthy case 3: ip ws', () => {
    expect(websocketValidator('ws://10.10.10.10:8080')).toBe(true);
  });
  it('truthy case 4: dns name', () => {
    expect(websocketValidator('wss://example.com')).toBe(true);
  });
  it('truthy case 5: dns name', () => {
    expect(websocketValidator('wss://example.com/ws')).toBe(true);
  });
  it('truthy case 6: dns name', () => {
    expect(websocketValidator('wss://socket.socket.com/v3/channel_123?api_key=123')).toBe(true);
  });
  it('falsy case 1: empty string', () => {
    expect(websocketValidator('')).toBe(false);
  });
  it('falsy case 2: ws+ws', () => {
    expect(websocketValidator('wss://example.com/wswss://example.com/ws')).toBe(false);
  });
});
