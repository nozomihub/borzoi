const borzoi = require("./lib/index")

const bor = new borzoi.Borzoi("http://127.0.0.1:8080")
const payload = new borzoi.BorzoiPayloadBuilder(borzoi.BorzoiInferences.Txt2Img).setPrompt("masterpiece, 1girl").setSteps(5)
//console.log(payload.getInferenceType())
bor.inference(payload).then(res => console.log(res))