import axios from "axios"
import { BorzoiAPIEndpoints } from "./BorzoiAPIEndpoints"
import { BorzoiSampler } from "./BorzoiSampler"
import { BorzoiUpscaler } from "./BorzoiUpscaler"
import { BorzoiModels } from "./BorzoiModels"
import { BorzoiInferences } from "./BorzoiInferences"
import BorzoiPayload from "./BorzoiPayload"
import BorzoiPayloadBuilder from "./BorzoiPayloadBuilder"
import { OutputPayload } from "./OutputPayload"

export default class Borzoi {
    apiUrl: any
    private _isAlive: boolean
    samplers: BorzoiSampler[]
    upscalers: BorzoiUpscaler[]
    models: BorzoiModels[]

    constructor(options: any) {
        this.apiUrl = options.url
        this._isAlive = false
        this.samplers = []
        this.upscalers = []
        this.models = []
    }

    private _decodeBase64(img: string) {
        return Buffer.from(img.split(';base64,').pop() || img, 'base64')
    }
    private _encodeBase64(img: string) {
        const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!img.match(urlPattern)) return null
        const imgb64 = axios.get(img, {responseType: 'arraybuffer'})
        .then((res) => Buffer.from(res.data).toString('base64'))
        return imgb64
    }

    async _makeRequest(endpoint: BorzoiAPIEndpoints, method: string, data: any | null) {
        try {
            if(method == "GET") {
                const response = await axios.get(`${this.apiUrl}${endpoint}`)
                return response
            } else if(method == "POST") {
                if(!data) throw new Error("Can't POST null data.")
                
                const res = await axios.get(`${this.apiUrl}${endpoint}`, data)
                return res
            }  
        } catch (error) {
            console.log("Error! "+error)
        }   
    }

    async initializeConnection() {
        console.log(`🛰️  | Trying connection with Stable Diffusion WebUI API...`)
        try {
            const res = await this._makeRequest(BorzoiAPIEndpoints.Ping, "GET", null)
            if(res?.status == 200) {
                console.log(`🛰️  | OK, Server response was a great OK. (200)\n🛰️  | Connection allowed, you should can operate now.`)
                this._isAlive = true
            } else {
                console.log(`🛰️  | Unfortunately, the WebUI server wasn't great for connection. Code: ${res?.status}`)
            }
            const serverRamInfo = await this._makeRequest(BorzoiAPIEndpoints.Memory, "GET", null)
            console.log(`🛰️  | The server has ${serverRamInfo?.data.ram}MB of RAM.`)
            
            console.log(`🛰️  | Filling Essential data...`)
            const samplersInfo = await this._makeRequest(BorzoiAPIEndpoints.Samplers, "GET", null)
            samplersInfo?.data.forEach((s: any) => this.samplers.push(new BorzoiSampler(s)))
            const upscalersInfo = await this._makeRequest(BorzoiAPIEndpoints.Upscalers, "GET", null)
            upscalersInfo?.data.forEach((u: any) => this.upscalers.push(new BorzoiUpscaler(u)))
            const modelsInfo = await this._makeRequest(BorzoiAPIEndpoints.Models, "GET", null)
            modelsInfo?.data.forEach((m: any) => this.models.push(new BorzoiModels(m)))
            console.log(`🛰️  | Done.`)
            this._isAlive = true
        } catch(error) {
            console.log(error)
        }
    }

    async inference(payload: BorzoiPayloadBuilder) {
        if(!this._isAlive) throw new Error("Server isn't connected/checked!")
        const jsonPayload = payload.getPayloadInJSON()
        let operation;
        switch(payload.getInferenceType()) {
            case BorzoiInferences.Txt2img:
                operation = BorzoiAPIEndpoints.Txt2Img
                break
            case BorzoiInferences.Img2Img:
                operation = BorzoiAPIEndpoints.Img2Img
                break
            case BorzoiInferences.Upscale:
                operation = BorzoiAPIEndpoints.Upscalers
                break
        }
        const response = await this._makeRequest(operation, "POST", jsonPayload)
        return new OutputPayload(response)
    }
}