import axios, { AxiosResponse } from 'axios'
import { BorzoiAPIEndpoints } from './BorzoiAPIEndpoints';
import { BorzoiSampler } from './BorzoiSampler';
import { BorzoiUpscaler } from './BorzoiUpscaler';
import { BorzoiModels } from './BorzoiModels';
import { BorzoiInferences } from './BorzoiInferences';
import BorzoiPayload from './BorzoiPayload';
import BorzoiPayloadBuilder from './BorzoiPayloadBuilder';
import { OutputPayload } from './OutputPayload';

export default class Borzoi {
  apiUrl: any;
  private _isAlive: boolean;
  samplers: BorzoiSampler[];
  upscalers: BorzoiUpscaler[];
  models: BorzoiModels[];
  prepareConnection: () => Promise<number>;
  /**
   * The base Borzoi Class that you are going to use, in order to interact with the API.
   * @param url {string} The Stable Diffusion WebUI API URL (can be localtunnel. cloudflare, etc.)
   */
  constructor(url: string) {
    this.apiUrl = url;
    this._isAlive = false;
    this.samplers = [];
    this.upscalers = [];
    this.models = [];
    this.prepareConnection = async () => this.testConnection();
  }
/**
 * A Convenient way to decoding Base64 offloading to another function.
 * @param img {string} the Base64 (with header) image
 * @returns {Buffer} a Buffer object with the image decoded
 */
  private _decodeBase64(img: string): Buffer {
    return Buffer.from(img.split(';base64,').pop() || img, 'base64');
  }
  /**
   * The other way around. encoding image to Base64.
   * @param img {string} The image url. in the future, it will be able to parse Buffer object.
   * @returns {Promise<string> | null} The encoded Base64 string.
   */
  private _encodeBase64(img: string): Promise<string> | null {
    const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!img.match(urlPattern)) return null;
    const imgb64 = axios
      .get(img, { responseType: 'arraybuffer' })
      .then((res: any) => Buffer.from(res.data).toString('base64'));
    return imgb64;
  }
  /**
   * This internal function offloads boring request functionality.
   * @param endpoint {BorzoiAPIEndpoints} The enum endpoint for the request.
   * @param method {string} The method (GET | POST) for the request.
   * @param data {any | null} if you are using POST action, please insert the data here. i will make a overload function later.
   * @returns {Promise<AxiosResponse>} The entire response.
   */
  async _makeRequest(endpoint: BorzoiAPIEndpoints, method: string, data: any | null): Promise<AxiosResponse | undefined> {
    try {
      if (method.toUpperCase() == 'GET') {
        const response = await axios.get(`${this.apiUrl}/${endpoint}`);
        return response;
      } else if (method.toUpperCase() == 'POST') {
        if (!data) throw new Error("Can't POST null data.");
        const res = await axios.get(`${this.apiUrl}/${endpoint}`, data);
        return res;
      }
    } catch (error) {
      console.log('Error! ' + error);
      return undefined;
    }
  }
  /**
   * Testing function that verify if its able to connect sucessfully with Stable Diffusion WebUI API.
   * @returns {Promise<number>} The internal http code for the test.
   */
  async testConnection(): Promise<number> {
    // console.log(`🛰️  | Trying connection with Stable Diffusion WebUI API...`);
    try {
      const res = await this._makeRequest(BorzoiAPIEndpoints.Ping, 'GET', null);
      if (res?.status == 200) {
        //console.log(
        // `🛰️  | OK, Server response was a great OK. (200)\n🛰️  | Connection allowed, you should can operate now.`,
        //);
        this._isAlive = true;
      } else {
        console.log(`🛰️  | Unfortunately, the WebUI server wasn't great for connection. Code: ${res?.status}`);
      }
      const serverRamInfo = await this._makeRequest(BorzoiAPIEndpoints.Memory, 'GET', null);
      //console.log(`🛰️  | The server has ${serverRamInfo?.data.ram}MB of RAM.`);

      //console.log(`🛰️  | Filling Essential data...`);
      const samplersInfo = await this._makeRequest(BorzoiAPIEndpoints.Samplers, 'GET', null);
      samplersInfo?.data.forEach((s: any) => this.samplers.push(new BorzoiSampler(s)));
      const upscalersInfo = await this._makeRequest(BorzoiAPIEndpoints.Upscalers, 'GET', null);
      upscalersInfo?.data.forEach((u: any) => this.upscalers.push(new BorzoiUpscaler(u)));
      const modelsInfo = await this._makeRequest(BorzoiAPIEndpoints.Models, 'GET', null);
      modelsInfo?.data.forEach((m: any) => this.models.push(new BorzoiModels(m)));
      //console.log(`🛰️  | Done.`);
      this._isAlive = true;
      if(res?.status) return res?.status;
      else return -1 // REDUNDANT AF
    } catch (error: any) {
      throw new Error(error.toString())
    }
  }
  /**
   * Using the WebUI API, Makes a Text-to-Image inference using Stable Diffusion.
   * Configure the payload, and wait for the response.
   * @param payload {BorzoiPayloadBuilder} this structure makes the life easier for me (and YOU!)
   * use the (BorzoiPayloadBuilder) for building the payload. 
   * it is necessary to have AT LEAST
   * a text prompt in the Payload in order to operate.
   * @returns {Promise<OutputPayload>} The image generated, with additional data.
   */
  async inference(payload: BorzoiPayloadBuilder): Promise<OutputPayload> {
    //if (!this._isAlive) throw new Error("Server isn't connected/checked!");
    if(!this._isAlive) {
      this.prepareConnection()
    }

    const jsonPayload = payload.getPayloadInJSON();
    let operation;
    switch (payload.getInferenceType()) {
      case BorzoiInferences.Txt2img:
        operation = BorzoiAPIEndpoints.Txt2Img;
        break;
      case BorzoiInferences.Img2Img:
        operation = BorzoiAPIEndpoints.Img2Img;
        break;
      case BorzoiInferences.Upscale:
        operation = BorzoiAPIEndpoints.Upscalers;
        break;
    }
    const response = await this._makeRequest(operation, 'POST', jsonPayload);
    return new OutputPayload(response);
  }
}
