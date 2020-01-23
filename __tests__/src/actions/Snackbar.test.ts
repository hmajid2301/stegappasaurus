import Snackbar from '~/actions/Snackbar';

describe('Snackbar', () => {
  test('1', () => {
    const spy = jest.spyOn(Snackbar, 'show');
    Snackbar.show({
      text: 'This app does not have permission to access the camera roll.',
    });
    expect(spy).toHaveBeenCalled();
  });

  test('2', () => {
    const spy = jest.spyOn(Snackbar, 'show');
    Snackbar.show({
      buttonText: 'Open Album',
      onButtonPress: jest.fn(),
      text: 'Image saved to photo album.',
    });
    expect(spy).toHaveBeenCalled();
  });
});
