/// <reference types="node" />
import { LightState } from "./phea-light-state";
import { Socket } from "dgram";
export declare namespace HueDtls {
    function createSocket(address: string, username: string, psk: string, timeout: number, port: number): Socket;
    function createMessage(lights: LightState[]): Buffer;
}
