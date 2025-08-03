// src/sketches/stocksReaction.ts
import { Shape } from '@/utils/Shape';
//import { createIndependentShapes } from '@/utils/playPatterns'; // Using the generalized function
import p5 from 'p5'; // Import p5 for type hinting

// Define the structure of your stock data
interface StockData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Your provided stock data (PLTR prices every 30 mins)
const stockPrices: StockData[] = [
  { "timestamp": "2025-07-17T18:00:00Z", "open": 155.42, "high": 155.45, "low": 154.58, "close": 154.65, "volume": 1768572 },
  { "timestamp": "2025-07-17T17:30:00Z", "open": 154.57, "high": 155.65, "low": 154.51, "close": 155.42, "volume": 3907285 },
  { "timestamp": "2025-07-17T17:00:00Z", "open": 153.84, "high": 155, "low": 153.79, "close": 154.57, "volume": 4376762 },
  { "timestamp": "2025-07-17T16:30:00Z", "open": 153.38, "high": 153.99, "low": 153.26, "close": 153.84, "volume": 2078073 },
  { "timestamp": "2025-07-17T16:00:00Z", "open": 153.43, "high": 153.84, "low": 153.34, "close": 153.38, "volume": 3699503 },
  { "timestamp": "2025-07-17T15:30:00Z", "open": 152.69, "high": 153.88, "low": 152.66, "close": 153.42, "volume": 4089569 },
  { "timestamp": "2025-07-17T15:00:00Z", "open": 152.65, "high": 153.55, "low": 152.61, "close": 152.69, "volume": 4623140 },
  { "timestamp": "2025-07-17T14:30:00Z", "open": 152.13, "high": 152.69, "low": 151.77, "close": 152.64, "volume": 4410361 },
  { "timestamp": "2025-07-17T14:00:00Z", "open": 152.31, "high": 153.09, "low": 151.73, "close": 152.13, "volume": 7140768 },
  { "timestamp": "2025-07-17T13:30:00Z", "open": 151.58, "high": 152.32, "low": 150.94, "close": 152.31, "volume": 8272203 },
  { "timestamp": "2025-07-17T13:00:00Z", "open": 152.15, "high": 152.24, "low": 151.58, "close": 151.58, "volume": 217574 },
  { "timestamp": "2025-07-17T12:30:00Z", "open": 151.93, "high": 152.33, "low": 151.91, "close": 152.15, "volume": 263661 },
  { "timestamp": "2025-07-17T12:00:00Z", "open": 151.84, "high": 151.94, "low": 151.74, "close": 151.94, "volume": 320667 },
  { "timestamp": "2025-07-17T11:30:00Z", "open": 151.85, "high": 151.89, "low": 151.61, "close": 151.84, "volume": 41767 },
  { "timestamp": "2025-07-17T11:00:00Z", "open": 151.2, "high": 151.94, "low": 151.13, "close": 151.85, "volume": 107343 },
  { "timestamp": "2025-07-17T10:30:00Z", "open": 151.28, "high": 151.28, "low": 151.15, "close": 151.2, "volume": 22021 },
  { "timestamp": "2025-07-17T10:00:00Z", "open": 151.15, "high": 151.31, "low": 151.11, "close": 151.28, "volume": 21582 },
  { "timestamp": "2025-07-17T09:30:00Z", "open": 151.2, "high": 151.3, "low": 151.12, "close": 151.15, "volume": 19626 },
  { "timestamp": "2025-07-17T09:00:00Z", "open": 151.08, "high": 151.27, "low": 151.08, "close": 151.21, "volume": 21458 },
  { "timestamp": "2025-07-17T08:30:00Z", "open": 151.18, "high": 151.2, "low": 151.07, "close": 151.08, "volume": 15651 },
  { "timestamp": "2025-07-17T08:00:00Z", "open": 150.76, "high": 151.24, "low": 150.76, "close": 151.18, "volume": 46314 }
];

export const stocksReaction = (p: p5) => { // Changed 'any' to 'p5'
  const shapes: Shape[] = []; // Changed 'let' to 'const'
  let currentDataIndex = 0;
  let lastEllipseX = 50; // Starting X position for the first ellipse
  const horizontalSpacing = 5; // 5 units to the right for each new ellipse

  let firstOpenPrice: number;
  let minPrice: number;
  let maxPrice: number;
  let minVolume: number;
  let maxVolume: number;
  let minCumulativeChange: number;
  let maxCumulativeChange: number;

  const animationIntervalFrames = 60; // Simulate 30 minutes every 60 frames (1 second at 60fps)
  let frameCounter = 0;

  p.setup = () => {
    p.background(20, 20, 30); // Dark blue-grey background
    p.noStroke(); // Default to no stroke for the ellipses

    // Reverse the stock data so the oldest data comes first for chronological plotting
    stockPrices.reverse();

    // Calculate min/max for scaling
    minPrice = stockPrices[0].low;
    maxPrice = stockPrices[0].high;
    minVolume = stockPrices[0].volume;
    maxVolume = stockPrices[0].volume;
    firstOpenPrice = stockPrices[0].open;
    minCumulativeChange = 0;
    maxCumulativeChange = 0;

    for (const data of stockPrices) {
      if (data.low < minPrice) minPrice = data.low;
      if (data.high > maxPrice) maxPrice = data.high;
      if (data.volume < minVolume) minVolume = data.volume;
      if (data.volume > maxVolume) maxVolume = data.volume;
    }

    // Adjust min/max for cumulative change based on the full range of data
    // This is an estimate; actual min/max will depend on price fluctuations
    minCumulativeChange = stockPrices[0].open - firstOpenPrice;
    maxCumulativeChange = stockPrices[0].close - firstOpenPrice;
    for (let i = 1; i < stockPrices.length; i++) {
        const cumulativeChange = stockPrices[i].close - firstOpenPrice;
        if (cumulativeChange < minCumulativeChange) minCumulativeChange = cumulativeChange;
        if (cumulativeChange > maxCumulativeChange) maxCumulativeChange = cumulativeChange;
    }
    // Add a small buffer to cumulative change range to avoid division by zero if all changes are 0
    if (minCumulativeChange === maxCumulativeChange) {
        minCumulativeChange -= 0.1;
        maxCumulativeChange += 0.1;
    }

    console.log("Stocks Reaction Sketch Initialized");
    console.log("Min Price:", minPrice, "Max Price:", maxPrice);
    console.log("Min Volume:", minVolume, "Max Volume:", maxVolume);
    console.log("First Open Price:", firstOpenPrice);
    console.log("Min Cumulative Change:", minCumulativeChange, "Max Cumulative Change:", maxCumulativeChange);
  };

  p.draw = () => {
    p.background(20, 20, 30, 50); // Semi-transparent background for a subtle trail

    // Add a new ellipse based on stock data every 'animationIntervalFrames'
    if (frameCounter % animationIntervalFrames === 0 && currentDataIndex < stockPrices.length) {
      const data = stockPrices[currentDataIndex];

      // Calculate properties for the new ellipse
      const ellipseX = lastEllipseX;
      // Map close price to Y position (higher price -> lower Y on screen)
      const ellipseY = p.map(data.close, minPrice, maxPrice, p.height * 0.9, p.height * 0.1);

      // Width determined by volume (scaled)
      const ellipseWidth = p.map(data.volume, minVolume, maxVolume, 20, 150); // Min 20, Max 150 pixels

      // Y-amplitude of vibration determined by high-low range (scaled)
      const amplitudeY = p.map(data.high - data.low, 0, maxPrice - minPrice, 0, 80); // Max 80 pixels amplitude

      // Frequency determined by rate of change from first ever open to current close
      const cumulativeChange = data.close - firstOpenPrice;
      // Map cumulative change to frequency (e.g., 0.001 to 0.05)
      const frequency = p.map(cumulativeChange, minCumulativeChange, maxCumulativeChange, 0.001, 0.05);
      const mappedFrequency = p.constrain(frequency, 0.001, 0.05); // Ensure frequency stays within a sensible range

      // Color changes to redder when faster (positive change), bluer when slower (negative change)
      // Map cumulative change to a hue (e.g., blue hue 240 to red hue 0 or 360)
      // Using HSB color mode for easier hue manipulation
      const hue = p.map(cumulativeChange, minCumulativeChange, maxCumulativeChange, 240, 0); // Blue to Red
      const saturation = p.map(p.abs(cumulativeChange), 0, p.max(p.abs(minCumulativeChange), p.abs(maxCumulativeChange)), 50, 100); // More change = more saturation
      const brightness = 100;
      const alpha = 150; // Fixed alpha for visibility

      // Create the new ellipse shape
      shapes.push(new Shape(p, {
        type: 'ellipse', // Explicitly set type to ellipse
        x: ellipseX,
        y: ellipseY,
        width: ellipseWidth,
        height: ellipseWidth * 0.5, // Make it an ellipse, height is half of width for initial shape
        color: [hue, saturation, brightness, alpha], // Use HSB for color
        strokeWeight: 1, // Small stroke
        strokeColor: [255, 255, 255, 100], // White stroke
        rotationSpeed: 0.001, // Slow rotation
        amplitudeX: 0, // No horizontal movement for the ellipse itself
        amplitudeY: amplitudeY, // Vertical vibration based on high-low
        frequencyX: 0,
        frequencyY: mappedFrequency, // Frequency based on cumulative change
        offsetX: 0,
        offsetY: 0,
      }));

      lastEllipseX += horizontalSpacing; // Move X position for the next ellipse
      currentDataIndex++;
    }

    // Set color mode to HSB for drawing the ellipses
    p.colorMode(p.HSB, 360, 100, 100, 255);

    // Update and display all existing shapes
    shapes.forEach((shape) => {
      shape.update();
      shape.display();
    });

    // Reset color mode to RGB for background if needed elsewhere, or keep HSB
    p.colorMode(p.RGB, 255, 255, 255, 255);

    frameCounter++;
  };

  p.windowResized = () => {
    // No specific logic needed here as ellipses are drawn relative to canvas size.
  };
};
