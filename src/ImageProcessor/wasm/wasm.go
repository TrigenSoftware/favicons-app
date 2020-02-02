package wasm

import (
	"bytes"
	"syscall/js"
)

// Uint8Array to create JS Uint8Array instance.
func Uint8Array(config interface{}) js.Value {
	return js.Global().
		Get("Uint8Array").
		New(config)
}

// BufferFromJS to create buffer from JS value.
func BufferFromJS(from js.Value) []byte {

	jsBytes := Uint8Array(from)
	bytes := make([]byte, jsBytes.Length())

	js.CopyBytesToGo(bytes, jsBytes)

	return bytes
}

// BufferToJS to create JS Uint8Array from buffer.
func BufferToJS(from *bytes.Buffer) js.Value {

	jsBytes := Uint8Array(from.Len())

	js.CopyBytesToJS(jsBytes, from.Bytes())
	from.Reset()

	return jsBytes
}
