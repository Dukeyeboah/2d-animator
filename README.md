# SVG Layer Animator

A powerful NextJS TypeScript application that allows you to upload SVG files from Illustrator and animate individual layers using GSAP (GreenSock Animation Platform).

## Features

- 🎨 **SVG Upload**: Drag & drop or browse to upload SVG files
- 🔍 **Layer Detection**: Automatically parses and identifies all SVG layers
- 🎭 **11 Animation Presets**: Fade, slide, scale, rotate, bounce, wiggle, pulse, and more
- ⏱️ **Timeline Animations**: Create sequential animations across multiple layers
- 🎯 **Layer Selection**: Click to select and animate specific layers
- 🔄 **Reset Functionality**: Clear all animations and return to original state
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd svg-animator
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### 1. Prepare Your SVG File

**From Adobe Illustrator:**

- Open your Illustrator file with multiple layers
- Go to `File → Save As → SVG`
- In the SVG options dialog:
  - Set `Styling` to `Internal CSS` or `Inline Styles`
  - Enable `Responsive` if needed
  - Click `OK` to save

**Best Practices:**

- Use meaningful layer names in Illustrator
- Keep layer structure simple for better parsing
- Avoid deeply nested groups when possible

### 2. Upload and Animate

1. **Upload**: Drag & drop your SVG file or click to browse
2. **Select Layer**: Click on any layer in the layer list to select it
3. **Choose Animation**: Use the preset buttons or create a timeline
4. **Reset**: Use the reset button to clear all animations

### 3. Animation Types

| Animation    | Description                 |
| ------------ | --------------------------- |
| Fade In/Out  | Smooth opacity transitions  |
| Slide In/Out | Position-based animations   |
| Scale In/Out | Size transformations        |
| Rotate       | 360° rotation effects       |
| Bounce       | Up and down bouncing motion |
| Wiggle       | Small rotation oscillations |
| Pulse        | Scale up and down           |
| Color Change | Fill color transitions      |

### 4. Timeline Animations

The "Create Timeline Animation" button creates a sequence where:

- All layers animate in order
- Each layer starts 0.2 seconds after the previous one
- Uses a fade-in + slide-up effect
- Perfect for revealing complex illustrations

## Supported SVG Elements

The app can animate these SVG elements:

- Groups (`<g>`)
- Paths (`<path>`)
- Rectangles (`<rect>`)
- Circles (`<circle>`)
- Ellipses (`<ellipse>`)
- Lines (`<line>`)
- Polygons (`<polygon>`)
- Polylines (`<polyline>`)
- Text (`<text>`)

## Technical Details

### Built With

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **GSAP** - Animation library
- **React Hooks** - State management

### Key Components

- `SVGUploader` - Handles file upload with drag & drop
- `SVGLayerList` - Displays and manages layer selection
- `AnimationControls` - Provides animation options and controls
- `SVGDemo` - Shows welcome screen with instructions

### Animation Engine

The app uses GSAP for all animations, providing:

- Smooth 60fps animations
- Hardware acceleration
- Complex easing functions
- Timeline sequencing
- Performance optimization

## File Structure

```
svg-animator/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main application
│   │   ├── layout.tsx        # App layout
│   │   └── globals.css       # Global styles
│   └── components/
│       ├── SVGUploader.tsx   # File upload component
│       ├── SVGLayerList.tsx  # Layer selection
│       ├── AnimationControls.tsx # Animation controls
│       └── SVGDemo.tsx       # Welcome screen
├── public/
│   └── sample.svg           # Sample SVG for testing
└── package.json
```

## Testing

A sample SVG file is included at `public/sample.svg` for testing the application. This file contains multiple layers with different shapes and elements.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [GSAP](https://greensock.com/gsap/) for the powerful animation library
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
