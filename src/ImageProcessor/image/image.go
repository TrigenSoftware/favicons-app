package image

import (
	"bytes"
	"image"
	"image/color"
	"image/png"
	"math"

	ico "github.com/biessek/golang-ico"
	"github.com/disintegration/imaging"
	"github.com/go-playground/colors"
)

// DecodeBuffer to get image from buffer.
func DecodeBuffer(buffer []byte) (image.Image, error) {
	reader := bytes.NewReader(buffer)
	return png.Decode(reader)
}

// EncodeImage to get buffer from image.
func EncodeImage(image image.Image) (*bytes.Buffer, error) {
	buffer := new(bytes.Buffer)
	err := png.Encode(buffer, image)
	return buffer, err
}

// EncodeIco to get buffer from ico.
func EncodeIco(image image.Image) (*bytes.Buffer, error) {
	buffer := new(bytes.Buffer)
	err := ico.Encode(buffer, image)
	return buffer, err
}

// GetImageInfo to get image dimentions and format.
func GetImageInfo(buffer []byte) (int, int, string) {

	reader := bytes.NewReader(buffer)
	image, format, err := image.DecodeConfig(reader)

	if err != nil {
		return 1, 1, ""
	}

	return image.Width, image.Height, format
}

func createCanvas(
	width, height int,
	background string,
) *image.NRGBA {

	var backgroundColor color.Color

	cssColor, err := colors.Parse(background)

	if err == nil {
		rgbaColor := cssColor.ToRGBA()
		backgroundColor = color.RGBA{
			rgbaColor.R,
			rgbaColor.G,
			rgbaColor.B,
			uint8(255 * rgbaColor.A),
		}
	} else {
		backgroundColor = color.RGBA{0, 0, 0, 0}
	}

	return imaging.New(width, height, backgroundColor)
}

func createSprite(
	source image.Image,
	width, height, offset int,
) *image.NRGBA {

	spriteBoxWidth := float64(width - offset*2)
	spriteBoxHeight := float64(height - offset*2)
	spriteBounds := source.Bounds()
	spriteWidth := float64(spriteBounds.Dx())
	spriteHeight := float64(spriteBounds.Dy())
	widthRatio := spriteBoxWidth / spriteWidth
	heightRatio := spriteBoxHeight / spriteHeight
	ratio := math.Min(widthRatio, heightRatio)

	return imaging.Resize(
		source,
		int(spriteWidth * ratio),
		int(spriteHeight * ratio),
		imaging.Lanczos,
	)
}

// RenderIcon to render icon.
func RenderIcon(
	source image.Image,
	width, height, offset int,
	background string,
) *image.NRGBA {

	maximumSide := math.Max(float64(width), float64(height))
	offsetPx := int(math.Round(float64(maximumSide) / 100 * float64(offset)))
	canvas := createCanvas(width, height, background)
	sprite := createSprite(source, width, height, offsetPx)

	return imaging.OverlayCenter(canvas, sprite, 1)
}
