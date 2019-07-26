import {
    EventRecord,
    Extrinsic,
    Method,
} from '@plugnet/types';
import { numberToU8a, u8aToString } from '@plugnet/util';

export function getEventType(e: EventRecord): string {
    return e.event.section + '.' + e.event.method;
}

export function getExtrinsicType(ex: Extrinsic): string {
    const { method, section } = Method.findFunction(ex.method.callIndex);
    return section + '.' + method;
}

export function u256ToString(data: number): string {
    const u8a: Uint8Array = numberToU8a(data);
    let str: string = u8aToString(u8a);
    if (!isAscii(str)) {
        str = null;
    }
    return str;
}

function isAscii(s: string): boolean {
    return /^[\x20-\x7F]*$/.test(s);
}

export function getTransactionFee(baseFee: number, byteFee: number, byte: number): string {
    return (baseFee + byte * byteFee).toString();
}