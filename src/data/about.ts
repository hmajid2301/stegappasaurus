import meta from '~/../app.json';
import {AboutItem} from '~/components/AboutList/AboutList';

const about = (color: any): AboutItem[] => [
  {
    icon: {
      color,
      name: 'versions',
      type: 'octicon',
    },
    title: `Version ${meta.version}`,
    url: 'https://github.com/hmajid2301/Stegappasaurus',
  },
  {
    icon: {
      color,
      name: 'code-fork',
      type: 'font-awesome',
    },
    title: 'Fork this Project on GitHub',
    url: 'https://github.com/hmajid2301/Stegappasaurus',
  },
  {
    icon: {
      color,
      name: 'gitlab',
      type: 'font-awesome',
    },
    title: 'Personal GitLab',
    url: 'https://gitlab.com/hmajid2301',
  },
  {
    icon: {
      color,
      name: 'web',
      type: 'material-community',
    },
    title: 'Personal Website',
    url: 'https://haseebmajid.dev',
  },
  {
    icon: {
      color,
      name: 'rate-review',
      type: 'material',
    },
    title: 'Rate the app',
  },
  {
    icon: {
      color,
      name: 'paypal',
      type: 'font-awesome',
    },
    title: 'Buy me a coffee',
    url: 'https://www.paypal.me/hmajid2301',
  },
];

export default about;
