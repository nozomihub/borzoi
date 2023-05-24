## In Development - Borzoi, a simple way to communicate with Stable Diffusion WebUI API!
_WARNING: This code was created by a non-professional software programmer, so i love feedbacks, etc._
It's just a thing that i created to test/extend/consume the API in a external program, just discord bots or other thing, in a simple way.
I'm not skilled or anything, but i will try.
## Requirements
* Axios
* and nothing more;
## Installation
    npm i --save github:nozomihub/borzoi
    # OR
    yarn add https://github.com/nozomihub/borzoi
## Things that i added by now:
* Text-to-image inference
    * One drawback is that you have to decode the base64 image later. i will change that. gimme time.
    * it has a convenient Class Builder.
## Things i need to add later:
* Image-to-image inference
    * It's theoretically easy, just extends one class, add more things...
    * I have a internal Buffer-to-Base64. i'm just lazy right now.
* Lora support
    * Of course i want Mai Sakurajima, with a blue bikini in the beach. i need Lora, okay?
* Upscaling
    * Images are nice, but in 1024x1024 are way better.
* Options for blacklisting nsfw/some words
    * The age of consent is 18 years old.
## Code Example:
```js
const borzoi = require("borzoi")

    const bor = new borzoi.Borzoi("http://127.0.0.1:8080")
    const payload = new borzoi.BorzoiPayloadBuilder(0)
        .setPrompt("masterpiece, solo, 1girl")
        .setSteps(5)
    bor.inference(payload).then(res => console.log(res))
```
