"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HueDtls = void 0;
const buffer_1 = require("buffer");
const node_dtls_client_1 = require("node-dtls-client");
var HueDtls;
(function (HueDtls) {
    function createSocket(address, username, psk, timeout, port) {
        let config = {
            type: "udp4",
            port: port,
            address: address,
            psk: { [username]: buffer_1.Buffer.from(psk, 'hex') },
            cipherSuites: ['TLS_PSK_WITH_AES_128_GCM_SHA256'],
            timeout: timeout
        };
        return node_dtls_client_1.dtls.createSocket(config)
            .on("message", (msg) => {
        })
            .on("error", (e) => {
            let err = new Error(e);
            throw err;
        })
            .on("close", () => {
        }).on("connected", () => {
            console.debug('Socket CONNECTED');
        });
    }
    HueDtls.createSocket = createSocket;
    function createMessage(lights) {
        lights.forEach((light) => {
            if (light.color.length > 3) {
                throw new Error("Phea: Malformed Color Array for DTLS Message.");
            }
            for (let i = 0; i < 3; i++) {
                let colorInt = light.color[i];
                if (!Number.isInteger(colorInt) || colorInt < 0 || colorInt > 255) {
                    throw new Error("Phea: Color Array for DTLS Message must be integer[][] representing RGB values 0->255.");
                }
            }
        });
        const tempBuffer = [0x48, 0x75, 0x65, 0x53, 0x74, 0x72, 0x65, 0x61, 0x6d];
        tempBuffer.push(0x01);
        tempBuffer.push(0x00);
        tempBuffer.push(0x00);
        tempBuffer.push(0x00);
        tempBuffer.push(0x00);
        tempBuffer.push(0x00);
        tempBuffer.push(0x00);
        lights.forEach(light => {
            tempBuffer.push(0x00);
            tempBuffer.push(0x00);
            tempBuffer.push(Number(light.lightId));
            tempBuffer.push(Math.round(light.color[0]));
            tempBuffer.push(Math.round(light.color[0]));
            tempBuffer.push(Math.round(light.color[1]));
            tempBuffer.push(Math.round(light.color[1]));
            tempBuffer.push(Math.round(light.color[2]));
            tempBuffer.push(Math.round(light.color[2]));
        });
        return buffer_1.Buffer.from(tempBuffer);
    }
    HueDtls.createMessage = createMessage;
})(HueDtls = exports.HueDtls || (exports.HueDtls = {}));
//# sourceMappingURL=../src/build/hue-dtls.js.map