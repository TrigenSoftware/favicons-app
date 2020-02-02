package main

import (
	"github.com/TrigenSoftware/favicons-app/ImageProcessor/image"
	"github.com/TrigenSoftware/favicons-app/ImageProcessor/wasm"
	"github.com/TrigenSoftware/favicons-app/ImageProcessor/zip"
	"syscall/js"
)

func renderIcon(this js.Value, args []js.Value) interface{} {

	buffer := wasm.BufferFromJS(args[0])
	source, _ := image.DecodeBuffer(buffer)
	params := args[1]
	result := image.RenderIcon(
		source,
		params.Get("width").Int(),
		params.Get("height").Int(),
		params.Get("offset").Int(),
		params.Get("background").String(),
	)
	resultBuffer, _ := image.EncodeImage(result)
	resultBytes := wasm.BufferToJS(resultBuffer)

	return resultBytes
}

func createArchive(this js.Value, args []js.Value) interface{} {

	zipWriter, archive := zip.Create()
	files := args[0]
	filesCount := files.Length()

	var file js.Value
	var fileBuffer []byte
	var fileName string

	for i := 0; i < filesCount; i++ {

		file = files.Index(i)
		fileBuffer = wasm.BufferFromJS(
			file.Get("contents"),
		)
		fileName = file.Get("path").String()

		zip.AddBytes(zipWriter, fileName, fileBuffer)
	}

	zipWriter.Close()

	resultBytes := wasm.BufferToJS(archive)

	return resultBytes
}

func getImageInfo(this js.Value, args []js.Value) interface{} {

	buffer := wasm.BufferFromJS(args[0])
	width, height, format := image.GetImageInfo(buffer)
	result := js.Global().
		Get("Object").
		New()

	result.Set("width", width)
	result.Set("height", height)
	result.Set("format", format)

	return result
}

func main() {

	done := make(chan struct{})

	namespace := js.Global().
		Get("Object").
		New()

	namespace.Set("renderIcon", js.FuncOf(renderIcon))
	namespace.Set("createArchive", js.FuncOf(createArchive))
	namespace.Set("getImageInfo", js.FuncOf(getImageInfo))

	js.Global().Set("ImageProcessor", namespace)
	<-done
}
