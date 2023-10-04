class Context {
  constructor() {
    this.width = 800;
    this.height = 600;
  }

  drawImage(img, x, y) {
    // Mocked drawImage implementation
  }

  getImageData(x, y, width, height) {
    // Mocked getImageData implementation
    return {
      data: new Uint8ClampedArray(width * height * 4),
      width,
      height,
    };
  }

  putImageData(imageData, x, y) {
    // Mocked putImageData implementation
  }

  toBlob(callback, type, quality) {
    // Mocked toBlob implementation
  }
}

class Canvas {
  constructor() {
    this.context = new Context();
  }

  getContext(type) {
    return this.context;
  }

  toDataURL(type, encoderOptions) {
    return 'data:image/png;base64,iVBORw...'; // Mocked data URL
  }
}

module.exports = Canvas;