import BorzoiPayload from './BorzoiPayload';
import Borzoi from './Borzoi';
import { BorzoiInferences } from './BorzoiInferences';
import { BorzoiUpscaler } from './BorzoiUpscaler';
import { BorzoiSampler } from './BorzoiSampler';

export default class BorzoiPayloadBuilder {
  private inferenceType: BorzoiInferences;
  private payload: BorzoiPayload;
  constructor(inferenceType: BorzoiInferences) {
    this.inferenceType = inferenceType;
    this.payload = new BorzoiPayload();
  }
  /**
   * Returns the payload protected by [private]
   * @returns The builded payload.
   */
  getPayload() {
    return this.payload;
  }
  /**
   * Returns the inference type builded with the payload.
   * @returns {BorzoiInferences} The inference type.
   */
  getInferenceType() {
    return this.inferenceType;
  }
  /**
   * Returns a string representing the entire object.
   * @returns {string} a JSON object with the payload.
   */
  getPayloadInJSON() {
    return JSON.stringify(this.payload);
  }
  /**
   * Enables the use of Highres. Fix for the inference.
   * @param value {boolean} the value.
   */
  setEnableHighres(value: boolean) {
    this.payload.enable_hr = true;
    return this;
  }

  setDenoisingStrength(value: number) {
    this.payload.denoising_strength = value;
    return this;
  }

  setFirstPhaseResolution(width: number, height: number) {
    this.payload.firstphase_width = width;
    this.payload.firstphase_height = height;
    return this;
  }

  setHighresScale(value: number) {
    this.payload.hr_scale = value;
    return this;
  }

  setHighresUpscaler(value: BorzoiUpscaler) {
    this.payload.hr_upscaler = value.name;
    return this.payload;
  }

  setSecondPassSteps(value: number) {
    this.payload.hr_second_pass_steps = value;
    return this;
  }

  setResizeRes(width: number, height: number) {
    this.payload.hr_resize_x = width;
    this.payload.hr_resize_y = height;
    return this;
  }

  setPrompt(value: string) {
    this.payload.prompt = value;
    return this;
  }

  setNegativePrompt(value: string) {
    this.payload.prompt = value;
    return this;
  }

  addStyle(value: string) {
    this.payload.styles.push(value);
    return this;
  }

  setSeed(value: number) {
    this.payload.seed = value;
    return this;
  }

  setSubseed(value: number) {
    this.payload.subseed = value;
    return this;
  }

  setSubseedStrength(value: number) {
    this.payload.subseed_strength = value;
    return this;
  }

  setResizeSeed(width: number, height: number) {
    this.payload.seed_resize_from_w = width;
    this.payload.seed_resize_from_h = height;
    return this;
  }

  setSampler(value: BorzoiSampler) {
    this.payload.sampler_name = value.name;
    this.payload.sampler_index = value.name;
    return this;
  }

  setBatchSize(value: number) {
    this.payload.batch_size = value;
    return this;
  }

  setIterations(value: number) {
    this.payload.n_iter = value;
    return this;
  }

  setSteps(value: number) {
    this.payload.steps = value;
    return this;
  }

  setGuidanceScale(value: number) {
    this.payload.cfg_scale = value;
    return this;
  }

  setResolution(width: number, height: number) {
    this.payload.width = width;
    this.payload.height = height;
    return this;
  }

  allowSaveImages(value: boolean) {
    this.payload.save_images = value;
    return this;
  }

  allowSendImages(value: boolean) {
    this.payload.send_images = value;
    return this;
  }

  disableSavingSamples(value: boolean) {
    this.payload.do_not_save_samples = value;
    return this;
  }

  disableSavingGrid(value: boolean) {
    this.payload.do_not_save_grid = value;
    return this;
  }
}
