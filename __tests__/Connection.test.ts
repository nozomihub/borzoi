import Borzoi from "../src/structures/Borzoi";

test('Borzoi WebUI API', async () => {
    const code = await new Borzoi({url: "http://127.0.0.1:7860"}).testConnection()

    expect(code).toBe(200)
})