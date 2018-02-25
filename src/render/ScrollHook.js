// 播放过程滚动设置
import { secondsToPixels } from '../utils/conversions';

export default class {
  constructor(playlist) {
    this.playlist = playlist;
  }

  hook(node) {
    const playlist = this.playlist;
    if (!playlist.isScrolling) {
      const el = node;

      if (playlist.isAutomaticScroll) {
        const rect = node.getBoundingClientRect();
        const cursorRect = node.querySelector('.cursor').getBoundingClientRect();

        if (cursorRect.right > rect.right || cursorRect.right < 0) {
          playlist.scrollLeft = playlist.playbackSeconds;
        }
      }

      const left = secondsToPixels(
          playlist.scrollLeft,
          playlist.samplesPerPixel,
          playlist.sampleRate,
      );

      el.scrollLeft = left;
    }
  }
}
