export class BorzoiUpscaler { // Represents the upscaler in the code.
  name: string;
  modelName: string;
  modelPath: string;
  modelUrl: string;
  scale: number;
  constructor(upscaler: any) {
    this.name = upscaler.name;
    this.modelName = upscaler.model_name;
    this.modelPath = upscaler.model_path;
    this.modelUrl = upscaler.model_url;
    this.scale = upscaler.scale;
  }
}
