import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

if (!globalThis.TextEncoder) {
	globalThis.TextEncoder = TextEncoder;
}

if (!globalThis.TextDecoder) {
	globalThis.TextDecoder = TextDecoder;
}
