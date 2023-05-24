export class BorzoiModels {
    title: string
    modelName: string
    hash: string
    sha256: string
    filename: string
    config: string
    constructor(model: any) {
        this.title = model.title
        this.modelName = model.model_name
        this.hash = model.hash
        this.sha256 = model.sha256
        this.filename = model.filename
        this.config = model.config
    }
}