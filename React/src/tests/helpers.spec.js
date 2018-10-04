import setAuthorization from '../helpers/setAuthorization';
import setStatus from '../helpers/setStatus';

describe('Helper functions test', () => {
  it('SetAuthorization', () => {
    const actual = setAuthorization();
    expect(actual).toBe(true);
  });

  it('setStatus', () => {
    const actual = setStatus();
    expect(actual).toBe(null);
  });
  it('setStatus', () => {
    const actual = setStatus('2');
    expect(actual).toBe('disapproved');
  });
  it('setStatus', () => {
    const actual = setStatus('3');
    expect(actual).toBe('resolved');
  });
  it('setStatus', () => {
    const actual = setStatus('0');
    expect(actual).toBe('pending');
  });
});
