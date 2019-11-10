import {IFAQ} from '~/components/FAQList';

const questions: IFAQ[] = [
  {
    content: 'Yes the app is 100% free and fully open source.',
    title: 'Is Stegappasaurus mobile application free?',
  },
  {
    content: 'At the moment just Android.',
    title: 'What OS is the application available on?',
  },
  {
    content:
      "Simple answer no, all the data is stored on the user's (your device).",
    title: 'Do you store any data?',
  },
  {
    content: `Steganography is the art/science of hiding data in plain sight. In the context of this \
app, it allows you to hide messages (text) within images. You do this by encoding the image with \
the text data. You can then share the image with other people and they can decode the image \
(retrieve the original message) using this app.`,
    title: 'What is steganography?',
  },
  {
    content: `At the moment just LSB (least significant bit).`,
    title: 'What algorithms do you use?',
  },
  {
    content: `Not quite, encryption, involves obscuring information whereas steganography is concerned with hiding it. \
With encryption if you have the encrypted message you cannot retrieve the original message. \n\n \
Whereas with steganography if you know where to look you can retrieve the original message, it is \
not obscured in any way. However, with encryption, it is obvious you are trying to hide something \
but with steganography you can hide your message inside of an "innocent" looking image, with a third \
party without anyone noticing.\n\n \
You can combine the two "techniques", encrypt your data before encoding it into an image, then simply \
decrypt the message after decoding it from the image for added security. This involves a shared secret \
"password" between you and the person you are sending the image to.`,
    title: 'So is it the same as encryption?',
  },
  {
    content: `This app uses different steganography algorithms to encode the RGB (Red, Green, Blue) pixel values \
with the text data in such a way that the original data can be retrieved at a later date.\n\n \
After the image has been encoded you can save the image, then you can share this image and you use this app \
to decode and get the originally encoded message.\n\n \
In general each algorithm will encode the size of the message, this is so that when decoding the image we \
know when to stop. Each character in the message usually uses 8 bits in the images, this is because we \
encode it using the UTF-8 representation of the letter, symbol or emoji.`,
    title: 'How does this app work?',
  },
];

export default questions;
