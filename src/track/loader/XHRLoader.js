import Loader from './Loader';

export default class extends Loader {

  /**
   * XHR加载
   */
  load() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.src, true);
      xhr.responseType = 'arraybuffer';
      xhr.send();

      xhr.addEventListener('progress', (e) => {
        super.fileProgress(e);
      });

      xhr.addEventListener('load', (e) => {
        const decoderPromise = super.fileLoad(e);

        decoderPromise.then((audioBuffer) => {
          resolve(audioBuffer);
        });
      });

      xhr.addEventListener('error', () => {
        reject(Error(`Track ${this.src} failed to load`));
      });
    });
  }
}
