package zip

import (
	"archive/zip"
	"bytes"
)

// Create zip archive.
func Create() (*zip.Writer, *bytes.Buffer) {

	archive := new(bytes.Buffer)
	zipWriter := zip.NewWriter(archive)

	return zipWriter, archive
}

// Add file buffer to zip archive.
func Add(
	zip *zip.Writer,
	name string,
	contents *bytes.Buffer,
) error {

	file, err := zip.Create(name)

	if err != nil {
		return err
	}

	_, err = file.Write(contents.Bytes())

	if err != nil {
		return err
	}

	return nil
}

// AddBytes to add file bytes to zip archive.
func AddBytes(
	zip *zip.Writer,
	name string,
	contents []byte,
) error {

	file, err := zip.Create(name)

	if err != nil {
		return err
	}

	_, err = file.Write(contents)

	if err != nil {
		return err
	}

	return nil
}

