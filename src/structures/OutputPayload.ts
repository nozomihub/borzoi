export class OutputPayload { // The output payload.
  images: any;
  parameters: any;
  info: any;
  constructor(data: any) {
    this.images = data.images; // The image in base64
    this.parameters = data.parameters; // Inference parameters.
    this.info = data.info; // The information about the image.
  }
}
