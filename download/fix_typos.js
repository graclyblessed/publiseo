const { createCanvas } = require("canvas");
const fs = require("fs");

const WIDTH = 1080;
const HEIGHT = 1080;
const FONT = "/usr/share/fonts/truetype/english/calibri-regular.ttf";
const FONT_BOLD = "/usr/share/fonts/truetype/english/calibri-regular.ttf";

const posts = [
  { id: 24, file: "post_24_vinegar_dawn_shower.png", color: "#E74C3C", text: "I mixed white vinegar with Dawn dish soap and sprayed my shower walls. After 30 minutes the soap scum melted right off (pic in cmt)" },
  { id: 25, file: "post_25_coffee_fridge.png", color: "#27AE60", text: "I put an open container of used coffee grounds in my fridge for 2 weeks. The results were surprising (pic in cmt)" },
  { id: 26, file: "post_26_hairdryer_wood.png", color: "#3498DB", text: "I held a hair dryer over the water ring on my wooden table for 10 minutes. Here is what happened (pic in cmt)" },
  { id: 27, file: "post_27_toothpaste_headlights.png", color: "#E67E22", text: "I rubbed toothpaste on my foggy car headlights with a cloth. After 15 minutes they looked brand new (pic in cmt)" },
  { id: 28, file: "post_28_tennis_pillows.png", color: "#E91E63", text: "I put 3 tennis balls in my dryer with my pillows. What happened next was incredible (pic in cmt)" },
  { id: 29, file: "post_29_baking_soda_shoes.png", color: "#8E44AD", text: "I sprinkled baking soda in my smelly gym shoes every night for a week. This is what happened (pic in cmt)" },
  { id: 30, file: "post_30_wd40_crayon.png", color: "#1ABC9C", text: "I sprayed WD-40 on the crayon marks my kids left on the wall. This is what happened (pic in cmt)" },
  { id: 31, file: "post_31_rice_salt_shaker.png", color: "#F1C40F", text: "I put a few grains of rice in my salt shaker and it changed everything. This is what happened (pic in cmt)" },
  { id: 32, file: "post_32_rubberband_paint.png", color: "#E67E22", text: "I wrapped a rubber band around my paint can before opening it. This is what happened (pic in cmt)" },
  { id: 33, file: "post_33_ice_salt_grease.png", color: "#E74C3C", text: "I put ice cubes and salt on the grease stain on my shirt. After 10 minutes this is what happened (pic in cmt)" },
];

// Word wrap function
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";
  for (const word of words) {
    const test = currentLine ? currentLine + " " + word : word;
    const metrics = ctx.measureText(test);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = test;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

posts.forEach(post => {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // Solid background
  ctx.fillStyle = post.color;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // White text
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Dynamic font size based on text length
  let fontSize = 48;
  if (post.text.length > 140) fontSize = 38;
  if (post.text.length > 180) fontSize = 34;

  ctx.font = `bold ${fontSize}px Calibri, sans-serif`;
  const maxWidth = WIDTH - 120;
  const lines = wrapText(ctx, post.text, maxWidth);
  const lineHeight = fontSize * 1.35;
  const totalHeight = lines.length * lineHeight;
  const startY = (HEIGHT - totalHeight) / 2 + lineHeight / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, WIDTH / 2, startY + i * lineHeight);
  });

  const outPath = `/home/z/my-project/download/${post.file}`;
  fs.writeFileSync(outPath, canvas.toBuffer("image/png"));
  console.log(`✅ ${post.id}: ${post.file} (fontSize=${fontSize}, lines=${lines.length})`);
});

console.log("\nDone! All 10 images regenerated with perfect text.");
