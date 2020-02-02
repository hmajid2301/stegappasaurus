module.exports = {
  Configuration: jest.fn(),
  Client: jest.fn(() => ({notify: jest.fn()})),
};
