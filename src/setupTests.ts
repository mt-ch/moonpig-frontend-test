import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

// CRA's jsdom predates these globals, and react-router v7 needs them
Object.assign(globalThis, { TextEncoder, TextDecoder });
