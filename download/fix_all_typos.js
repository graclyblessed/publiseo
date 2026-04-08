const { createCanvas } = require("canvas");
const fss = require("fs");

const W = 1080, H = 1080;

function makeImage(file, color, text) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let fSize = 48;
  if (text.length > 140) fSize = 38;
  if (text.length > 180) fSize = 34;
  ctx.font = `bold ${fSize}px Calibri, sans-serif`;
  const mw = W - 120, words = text.split(" "), lines = [], wrap = (line, word) => {
    const t = line ? line + " " + word : word;
    return ctx.measureText(t).width > mw && line ? false : t;
  };
  let cur = "";
  for (const w of words) { const t = wrap(cur, w); if (t === false) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur);
  const lh = fSize * 1.35, sy = (H - lines.length * lh) / 2 + lh / 2;
  lines.forEach((l, i) => ctx.fillText(l, W / 2, sy + i * lh));
  fss.writeFileSync(`/home/z/my-project/download/${file}`, canvas.toBuffer("image/png"));
  console.log(`✅ ${file}`);
}

// All 23 old images + 3 bonus with correct text
const posts = [
  ["sample_post_1.png", "#E74C3C", "I put a dishwasher tablet in my shower drain every week for a month. This is what happened (pic in cmt)"],
  ["sample_post_2.png", "#3498DB", "I wiped my dull wood cabinets with mayonnaise. You won't believe the results (pic in cmt)"],
  ["sample_post_3.png", "#27AE60", "I put a ball of aluminum foil in my microwave every day for 2 weeks. This is what happened (pic in cmt)"],
  ["post_04_baking_soda_toilet.png", "#8E44AD", "I poured baking soda and vinegar in my toilet bowl every night before bed. After 14 days this is what happened (pic in cmt)"],
  ["post_05_dryer_sheet_baseboard.png", "#E67E22", "I rubbed a dryer sheet along every baseboard in my house. This is what happened (pic in cmt)"],
  ["post_06_newspaper_mirror.png", "#1ABC9C", "I cleaned my bathroom mirror with crumpled newspaper instead of paper towels. The results were shocking (pic in cmt)"],
  ["post_07_lemon_salt_board.png", "#F1C40F", "I sprinkled coarse salt on my cutting board and scrubbed it with half a lemon. This is what happened (pic in cmt)"],
  ["post_08_pillowcase_fan.png", "#E91E63", "I put a pillowcase over each ceiling fan blade and pulled it off. The dust was unbelievable (pic in cmt)"],
  ["post_09_vinegar_showerhead.png", "#E74C3C", "I tied a bag of vinegar around my showerhead overnight. After 30 days of doing this weekly this is what happened (pic in cmt)"],
  ["post_10_toothpaste_sink.png", "#3498DB", "I polished my stainless steel sink with white toothpaste. This is what happened (pic in cmt)"],
  ["post_11_brick_toilet.png", "#27AE60", "I put a brick inside my toilet tank to save water. After 3 months this is what happened (pic in cmt)"],
  ["post_12_freezer_jugs.png", "#8E44AD", "I packed the empty spaces of my chest freezer with frozen water jugs for 3 weeks. This is what happened (pic in cmt)"],
  ["post_13_donation_bag.png", "#E67E22", "I put a donation bag in every room of my house for 21 days and added one item daily. This is what happened (pic in cmt)"],
  ["post_14_unplug_tv.png", "#1ABC9C", "I unplugged my TV every night before bed for 30 days. My electric bill showed something incredible (pic in cmt)"],
  ["post_15_pinesol_floor.png", "#F1C40F", "I added Pine-Sol to my mop water instead of regular floor cleaner. After 2 weeks this is what happened (pic in cmt)"],
  ["post_16_tea_windows.png", "#E91E63", "I brewed tea bags and used the water to clean my windows. This is what happened (pic in cmt)"],
  ["post_17_tennis_ball_garage.png", "#E74C3C", "I hung a tennis ball from my garage ceiling so it touches my windshield. This is what happened (pic in cmt)"],
  ["post_18_cat_litter_stain.png", "#3498DB", "I poured cat litter on the oil stain in my driveway and left it overnight. This is what happened (pic in cmt)"],
  ["post_19_denture_toilet.png", "#27AE60", "I dropped a denture cleaning tablet into my toilet bowl every night for 30 days. This is what happened (pic in cmt)"],
  ["post_20_cooking_spray_shovel.png", "#8E44AD", "I sprayed cooking spray on my snow shovel before going outside. This is what happened (pic in cmt)"],
  ["post_21_bonus_vinegar_microwave.png", "#E67E22", "I put a bowl of white vinegar in my microwave and ran it for 5 minutes. The grime wiped right off (pic in cmt)"],
  ["post_22_bonus_hanger_hack.png", "#1ABC9C", "I wrapped rubber bands around my hangers to keep clothes from slipping off. This is what happened (pic in cmt)"],
  ["post_23_bonus_salt_iron.png", "#E74C3C", "I sprinkled salt on a paper towel and scrubbed my iron with it. My iron looks brand new now (pic in cmt)"],
];

console.log(`Regenerating ${posts.length} images with perfect text...\n`);
posts.forEach(([file, color, text]) => makeImage(file, color, text));
console.log(`\nDone! All ${posts.length} images regenerated with PERFECT text.`);
