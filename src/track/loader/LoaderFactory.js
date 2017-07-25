import XHRLoader from './XHRLoader';

export default class {
  static createLoader(src, audioContext, ee) {
    if (typeof (src) === 'string') {
      return new XHRLoader(src, audioContext, ee);
    }

    throw new Error('Unsupported src type');
  }
}
