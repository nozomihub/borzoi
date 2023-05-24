const borzoi = require("./lib/index")

const bor = new borzoi.Borzoi("https://ab63bfa1ffb5cc0f65.gradio.live")
const payload = new borzoi.BorzoiPayloadBuilder(borzoi.BorzoiInferences.Txt2Img).setPrompt("masterpiece, 1girl").setSteps(5)
console.log(payload.getInferenceType())
//bor.inference().then(res => console.log(res))