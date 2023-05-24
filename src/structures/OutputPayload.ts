export class OutputPayload {
    images: any
    parameters: any
    info: any
    constructor(data: any) {
        this.images = data.images
        this.parameters = data.parameters
        this.info = data.info
    }
}