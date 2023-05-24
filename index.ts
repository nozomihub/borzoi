import Borzoi from "./src/structures/Borzoi";
import { BorzoiInferences } from "./src/structures/BorzoiInferences";
import BorzoiPayloadBuilder from "./src/structures/BorzoiPayloadBuilder";

const borzoi = new Borzoi({
    url: "http://127.0.0.1:7860"
})
const payload = new BorzoiPayloadBuilder(BorzoiInferences.Txt2img)
.setPrompt("masterpiece, 1girl")
.setSteps(4)
borzoi.testConnection()
borzoi.inference(payload)