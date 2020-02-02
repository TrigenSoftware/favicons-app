build_wasm:
	GOOS=js GOARCH=wasm go build -ldflags "-s -w" -o main.wasm
	go-zopfli main.wasm

serve:
	goexec "http.ListenAndServe(\":8080\", gzipped.FileServer(http.Dir(\".\")))"
