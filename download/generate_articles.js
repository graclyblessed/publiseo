const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType,
  LevelFormat, TableOfContents, HeadingLevel, BorderStyle, WidthType,
  PageNumber, PageBreak, ShadingType, VerticalAlign, Table, TableRow, TableCell
} = require("docx");

// ── Color Scheme: Terra Cotta Afterglow ──
const C = {
  primary: "26211F",
  body: "3D3735",
  secondary: "6B6361",
  accent: "C19A6B",
  white: "FFFFFF",
  lightBg: "F7F3F0",
  accentLight: "E8D5C0",
};

// ── Reusable helpers ──
const bodyPara = (text, opts = {}) => new Paragraph({
  spacing: { after: 180, line: 250 },
  alignment: AlignmentType.LEFT,
  ...opts,
  children: [new TextRun({ text, font: "Calibri", size: 22, color: C.body, ...(opts.run || {}) })],
});

const bodyParaMulti = (runs, opts = {}) => new Paragraph({
  spacing: { after: 180, line: 250 },
  alignment: AlignmentType.LEFT,
  ...opts,
  children: runs.map(r => typeof r === "string"
    ? new TextRun({ text: r, font: "Calibri", size: 22, color: C.body })
    : new TextRun({ font: "Calibri", size: 22, color: C.body, ...r })
  ),
});

const spacer = (before = 0) => new Paragraph({ spacing: { before, after: 0 }, children: [] });

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 360, after: 200, line: 250 },
  children: [new TextRun({ text, font: "Times New Roman", size: 28, bold: true, color: C.primary })],
});

// ── Build numbered list configs ──
const bulletConfigs = [];
const numberConfigs = [];
let bulletIdx = 0;
let numberIdx = 0;

const makeBulletRef = () => {
  const ref = `bullet-${bulletIdx++}`;
  bulletConfigs.push({
    reference: ref,
    levels: [{
      level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } }
    }]
  });
  return ref;
};

const makeNumberRef = () => {
  const ref = `number-${numberIdx++}`;
  numberConfigs.push({
    reference: ref,
    levels: [{
      level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } }
    }]
  });
  return ref;
};

const bulletItem = (ref, text) => new Paragraph({
  numbering: { reference: ref, level: 0 },
  spacing: { after: 100, line: 250 },
  children: [new TextRun({ text, font: "Calibri", size: 22, color: C.body })],
});

const bulletItemBold = (ref, boldText, normalText) => new Paragraph({
  numbering: { reference: ref, level: 0 },
  spacing: { after: 100, line: 250 },
  children: [
    new TextRun({ text: boldText, font: "Calibri", size: 22, color: C.body, bold: true }),
    new TextRun({ text: normalText, font: "Calibri", size: 22, color: C.body }),
  ],
});

const numberItem = (ref, text) => new Paragraph({
  numbering: { reference: ref, level: 0 },
  spacing: { after: 120, line: 250 },
  children: [new TextRun({ text, font: "Calibri", size: 22, color: C.body })],
});

const numberItemMulti = (ref, runs) => new Paragraph({
  numbering: { reference: ref, level: 0 },
  spacing: { after: 120, line: 250 },
  children: runs.map(r => typeof r === "string"
    ? new TextRun({ text: r, font: "Calibri", size: 22, color: C.body })
    : new TextRun({ font: "Calibri", size: 22, color: C.body, ...r })
  ),
});

// ══════════════════════════════════════════════
// ARTICLE 1 — Vinegar + Dawn Shower Cleaner
// ══════════════════════════════════════════════
function article1() {
  const title = "I Mixed White Vinegar With Dawn Dish Soap and Sprayed It on My Shower Walls \u2014 Here\u2019s What Happened";
  const h1 = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 600, after: 300, line: 250 },
    children: [new TextRun({ text: title, font: "Times New Roman", size: 36, bold: true, color: C.primary })],
  });

  // Things You'll Need
  const bRef1 = makeBulletRef();
  const things = [
    bRef1,
    [
      "1 spray bottle (16 oz or larger)",
      "1 cup white vinegar",
      "1 cup original blue Dawn dish soap",
      "Scrub brush or nylon-bristle brush",
      "Microfiber cloth or sponge for rinsing",
      "Gloves (optional, to protect your hands)",
      "Fan or open window for ventilation",
    ],
  ];
  const thingsSection = [
    h2("Things You\u2019ll Need"),
    ...things[1].map(t => bulletItem(bRef1, t)),
    spacer(200),
  ];

  // Step-by-step
  const nRef1 = makeNumberRef();
  const steps = [
    "Heat one cup of white vinegar in the microwave for about 45 to 60 seconds. You want it warm, not boiling. Warm vinegar activates the acetic acid and makes it far more effective at breaking down mineral deposits and soap scum.",
    "Pour the warm vinegar into your spray bottle. Then add one cup of original blue Dawn dish soap directly on top. Do not shake the bottle vigorously. Instead, give it a gentle swirl or tilt it back and forth a few times. Shaking creates excessive foam that will clog the nozzle and make spraying difficult.",
    "Remove everything from your shower walls and floor. Take down shampoo bottles, soap dishes, loofahs, and any other items. You want every inch of the surface accessible.",
    "Spray the mixture generously onto your shower walls, starting from the top and working your way down. Pay special attention to the corners, around the drain, and any areas with visible soap scum buildup or hard water stains. Coat the surface thoroughly but avoid oversaturating.",
    "Let the solution sit for at least 30 minutes. For stubborn stains, you can leave it on for up to an hour. During this time, the acetic acid in the vinegar is actively dissolving calcium and magnesium deposits while the Dawn surfactants penetrate and break down the oils and body fat trapped in the soap scum.",
    "After the waiting period, take your scrub brush and gently scrub the walls in circular motions. You do not need to apply heavy pressure. The combination should have loosened most of the grime, and a light scrubbing is all that\u2019s needed to lift it away.",
    "Rinse thoroughly with warm water. Use a handheld showerhead if you have one, directing the water from top to bottom. Make sure every trace of the cleaning solution is removed, especially in the grout lines and corners.",
    "Dry the walls with a microfiber cloth or squeegee to prevent new water spots from forming. This step also helps keep your shower cleaner for longer between deep cleanings.",
  ];

  const stepsSection = [
    h2("Step-by-Step Instructions"),
    ...steps.map(s => numberItem(nRef1, s)),
    spacer(200),
  ];

  // Why This Works
  const whySection = [
    h2("Why This Works"),
    bodyPara("The magic behind this cleaning hack comes down to basic chemistry, and it is genuinely one of the most effective homemade cleaners you can make. White vinegar contains acetic acid, typically at about five percent concentration. Acetic acid is a weak acid, but it is strong enough to dissolve alkaline mineral deposits like calcium carbonate and magnesium carbonate. These are the compounds responsible for hard water stains, that chalky white film you see on shower doors, tile, and around fixtures."),
    bodyPara("Dawn dish soap, on the other hand, is a powerful surfactant. Surfactants are compounds that lower the surface tension of water, allowing it to spread more easily and penetrate grease, oils, and organic matter. When you combine Dawn with the vinegar, the surfactants help the acidic solution reach deeper into the layers of soap scum, body oils, and residue that accumulate on shower surfaces over time."),
    bodyPara("What makes this combination particularly effective is that the two ingredients target different types of buildup simultaneously. Vinegar handles the mineral deposits, while Dawn breaks down the organic and oily residues. Together, they create a one-two punch that commercial shower cleaners often try to replicate with harsher chemicals and higher price tags."),
    bodyPara("Using warm vinegar instead of room-temperature vinegar further enhances the reaction. Heat increases the kinetic energy of the acetic acid molecules, allowing them to interact with mineral deposits more rapidly and effectively. It is the same principle behind why warm water cleans better than cold water for most tasks."),
    spacer(200),
  ];

  // What to Expect
  const expectSection = [
    h2("What to Expect"),
    bodyPara("After spraying the mixture and letting it work for 30 minutes, you will notice the soap scum beginning to soften and lift from the surface. Areas that were previously opaque with a white, chalky film will start to look clearer. When you scrub, the grime should come away with minimal effort, leaving behind a noticeably cleaner surface."),
    bodyPara("Hard water stains, which often appear as white streaks or spots on glass shower doors and tile, will dissolve significantly. In many cases, they disappear entirely after a single treatment. Stubborn, long-standing deposits may require a second application, but most users report dramatic improvement right away."),
    bodyPara("Your shower will not only look cleaner but will also feel different to the touch. The surfaces will be smooth and slick rather than rough and chalky. There is also a brief vinegar scent during application, but this dissipates quickly once you rinse and dry the walls."),
    spacer(200),
  ];

  // Tips
  const bRef2 = makeBulletRef();
  const tips = [
    h2("Tips for Best Results"),
    bulletItemBold(bRef2, "Use warm vinegar: ", "Heating the vinegar for about 45 seconds in the microwave makes a noticeable difference in cleaning power. Do not let it boil, as this can damage your spray bottle and reduce effectiveness."),
    bulletItemBold(bRef2, "Use a scrub brush, not a sponge: ", "A nylon-bristle scrub brush gives you better contact with the surface and gets into grout lines more effectively than a flat sponge. Sponges tend to push the cleaner around without really lifting the grime."),
    bulletItemBold(bRef2, "Ventilate the bathroom: ", "The vinegar smell can be strong, especially in a small, enclosed bathroom. Open a window or run the exhaust fan before you start spraying. The odor fades quickly after rinsing."),
    bulletItemBold(bRef2, "Do not shake the bottle: ", "Mixing Dawn and vinegar vigorously creates a thick foam that is difficult to spray and wastes product. A gentle swirl is all you need to combine them."),
    bulletItemBold(bRef2, "Test on a small area first: ", "If you have natural stone surfaces like marble or granite in your shower, test the mixture on an inconspicuous spot first. The acid in vinegar can etch certain natural stones over time."),
    bulletItemBold(bRef2, "Use original blue Dawn: ", "Other varieties of Dawn may contain additives like moisturizers, bleach, or scents that reduce cleaning effectiveness. The original formula works best for this purpose."),
    spacer(200),
  ];

  // Safety
  const bRef3 = makeBulletRef();
  const safetySection = [
    h2("Safety Warnings"),
    bulletItemBold(bRef3, "Never mix vinegar with bleach: ", "Combining vinegar and bleach creates chlorine gas, which is extremely dangerous and can cause severe respiratory problems. Always keep these two products completely separate."),
    bulletItemBold(bRef3, "Avoid natural stone: ", "Vinegar can damage marble, granite, limestone, and other natural stone surfaces. Stick to ceramic tile, porcelain, fiberglass, and glass."),
    bulletItemBold(bRef3, "Protect your eyes: ", "When spraying overhead, there is a chance the solution could drip into your eyes. Wear safety glasses or be careful to spray at arm\u2019s level."),
    spacer(200),
  ];

  // Related
  const bRef4 = makeBulletRef();
  const relatedSection = [
    h2("Related Cleaning Tips"),
    bodyPara("This vinegar and Dawn combination is versatile beyond just shower walls. You can use the same mixture on your bathtub, bathroom sinks, tile grout, and even around faucets and fixtures. Some homeowners report excellent results on kitchen grease buildup around the stove and vent hood as well."),
    bodyPara("For tile grout specifically, spray the mixture directly onto the grout lines, let it sit for 15 to 20 minutes, and then scrub with an old toothbrush. The narrow bristles get deep into the grout channels and lift out embedded dirt and mildew stains that ordinary surface cleaning misses."),
    bodyPara("If your faucets have hard water buildup around the base, wrap a paper towel soaked in the vinegar and Dawn mixture around the fixture and leave it for 30 minutes. The concentrated contact time works wonders on mineral deposits in tight spaces where spraying alone might not reach."),
  ];

  return [h1, ...thingsSection, ...stepsSection, ...whySection, ...expectSection, ...tips, ...safetySection, ...relatedSection];
}

// ══════════════════════════════════════════════
// ARTICLE 2 — Coffee Grounds in Fridge
// ══════════════════════════════════════════════
function article2() {
  const title = "I Put a Container of Used Coffee Grounds in My Fridge for 2 Weeks \u2014 The Results Were Surprising";
  const h1 = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 600, after: 300, line: 250 },
    children: [new TextRun({ text: title, font: "Times New Roman", size: 36, bold: true, color: C.primary })],
  });

  const bRef1 = makeBulletRef();
  const things = [
    "Used coffee grounds from your morning brew (about 1 cup)",
    "An open container or shallow bowl (a small mason jar works perfectly)",
    "Baking sheet or paper towel for drying",
    "Optional: 2 tablespoons of baking soda for the double-power method",
    "A marker or label to track when you placed it in the fridge",
  ];

  const thingsSection = [
    h2("Things You\u2019ll Need"),
    ...things.map(t => bulletItem(bRef1, t)),
    spacer(200),
  ];

  // Steps
  const nRef1 = makeNumberRef();
  const steps = [
    "After brewing your morning coffee, collect the used grounds. Spread them in a thin, even layer on a baking sheet or paper towel. Let them dry completely at room temperature for several hours or overnight. This step is crucial because wet coffee grounds can develop mold, and the moisture itself can introduce unwanted dampness into your fridge.",
    "Once the grounds are completely dry, place them into an open container. A small bowl, a mason jar with the lid removed, or a shallow dish all work well. The key is that the container must be open so the grounds are exposed to the air inside the refrigerator.",
    "Place the container on one of the middle shelves of your fridge, not crammed against the back wall or wedged behind other items. Good air circulation around the container is essential for effective odor absorption. Avoid placing it directly next to strongly scented foods.",
    "Leave the container in place for one to two weeks. During this time, the porous structure of the coffee grounds will passively absorb odors from the surrounding air. You do not need to stir or agitate them. Just let them do their work.",
    "After one to two weeks, or whenever you notice food odors starting to return, remove the old grounds and replace them with a fresh batch. Compost the old grounds or sprinkle them in your garden for an added soil health benefit.",
  ];

  const stepsSection = [
    h2("Step-by-Step Instructions"),
    ...steps.map(s => numberItem(nRef1, s)),
    spacer(200),
  ];

  // Why
  const whySection = [
    h2("Why This Works"),
    bodyPara("Coffee grounds are remarkably effective at absorbing unpleasant odors, and the science behind it is straightforward but fascinating. Used coffee grounds have a highly porous structure, meaning they contain countless microscopic holes and tunnels throughout their surface area. This porous quality is similar to activated carbon, which is the same material used in water filters, air purifiers, and even gas masks."),
    bodyPara("When odor molecules drift through the air inside your refrigerator, they come into contact with the coffee grounds. These molecules are drawn into the tiny pores through a process called adsorption, where they become trapped on the surface of the coffee grounds rather than being absorbed into them like a sponge absorbs water. The distinction is important because adsorption captures a wide variety of molecules regardless of their chemical composition, which is why coffee grounds can neutralize so many different types of smells simultaneously."),
    bodyPara("Additionally, coffee contains nitrogen compounds and other organic molecules that naturally help neutralize acidic and basic odor compounds through chemical interaction. The roasted coffee aroma itself is strong enough to permeate the fridge space, masking residual odors while the physical adsorption process handles the heavy lifting."),
    bodyPara("The fact that you are using already-brewed grounds is part of what makes this such an economical hack. The brewing process actually increases the porosity of the grounds by extracting oils and soluble compounds, leaving behind a more open, sponge-like structure that is even better at capturing odor molecules than fresh grounds would be."),
    spacer(200),
  ];

  // What to Expect
  const expectSection = [
    h2("What to Expect"),
    bodyPara("Within the first 24 to 48 hours, you should notice a significant reduction in the overall smell level inside your refrigerator. The mingling odors of leftover foods, produce, and stored items will diminish, replaced by a subtle, faint coffee aroma that most people find pleasant and unobtrusive."),
    bodyPara("After a full two weeks, the difference is even more pronounced. Foods that previously seemed to transfer their smells to everything nearby, like onions, strong cheeses, or leftover fish, will no longer dominate the fridge atmosphere. Opening the refrigerator door will reveal a neutral, clean-smelling interior rather than the confusing mix of competing food odors that many fridges develop over time."),
    bodyPara("It is worth noting that coffee grounds will not eliminate odors that are actively being produced by spoiled food. If something has gone bad, you still need to identify and remove the source. What the coffee grounds do extremely well is neutralize the normal, everyday odors that accumulate from storing a variety of foods in an enclosed, cold space."),
    spacer(200),
  ];

  // Compare with Baking Soda
  const compareSection = [
    h2("Coffee Grounds vs. Baking Soda: Which Is Better?"),
    bodyPara("Baking soda has long been the go-to solution for fridge odor control, and it works well for the same fundamental reason. Baking soda, or sodium bicarbonate, is a mild alkaline compound that reacts with and neutralizes both acidic and basic odor molecules. An open box of baking soda in the fridge will absorb unwanted smells for about one to three months before needing replacement."),
    bodyPara("In terms of cost, both methods are extremely affordable. A box of baking soda costs less than a dollar, and used coffee grounds are essentially free since you already have them. However, coffee grounds have a distinct advantage in that they also impart a pleasant aroma to the fridge. Baking soda is odorless, so while it neutralizes bad smells, it does not replace them with anything appealing."),
    bodyPara("From a sustainability standpoint, coffee grounds win easily. While baking soda is environmentally benign, used coffee grounds serve a second purpose after their fridge duty. You can add them directly to compost piles, mix them into garden soil as a nitrogen-rich amendment, or even use them as a gentle exfoliating hand scrub."),
    spacer(200),
  ];

  // Pro tip
  const bRef2 = makeBulletRef();
  const proTip = [
    h2("Pro Tips"),
    bulletItemBold(bRef2, "Combine with baking soda: ", "For maximum odor-fighting power, mix two tablespoons of baking soda into your dried coffee grounds before placing them in the container. This gives you the adsorption power of coffee grounds plus the chemical neutralization of baking soda in one single solution."),
    bulletItemBold(bRef2, "Replace weekly for best results: ", "While the grounds will continue working for up to two weeks, replacing them every seven days ensures peak performance. Mark the date on a piece of tape on the container so you never forget."),
    bulletItemBold(bRef2, "Dry thoroughly: ", "This is the single most important step. Wet grounds will grow mold in the humid fridge environment, which defeats the entire purpose and could actually make your fridge smell worse. Take the extra time to dry them completely."),
    bulletItemBold(bRef2, "Use a breathable container: ", "If you want to contain any visual mess, place the grounds in a small paper bag or a mesh pouch rather than a solid bowl. This allows maximum air exposure while keeping the grounds contained."),
    spacer(200),
  ];

  // Other uses
  const bRef3 = makeBulletRef();
  const otherUses = [
    h2("Other Uses for Used Coffee Grounds Around the Home"),
    bodyPara("Coffee grounds are one of the most versatile household items you probably throw away on a regular basis. Beyond fridge deodorizing, here are several more ways to put them to work:"),
    bulletItemBold(bRef3, "Garden compost: ", "Coffee grounds are rich in nitrogen, phosphorus, and potassium, making them an excellent addition to compost piles. They also attract earthworms, which further improve soil health. Mix them directly into your compost bin or scatter them around acid-loving plants like roses, azaleas, and blueberries."),
    bulletItemBold(bRef3, "Natural skin scrub: ", "The coarse texture of coffee grounds makes a fantastic exfoliant. Mix a handful with a spoonful of coconut oil and a drop of vanilla extract for a spa-quality hand or body scrub. The caffeine in the grounds may also temporarily tighten skin and reduce the appearance of cellulite."),
    bulletItemBold(bRef3, "Pest repellent: ", "Sprinkle used coffee grounds around the perimeter of your garden or near entry points in your home. The strong smell and abrasive texture deter slugs, snails, ants, and even some larger pests. Some gardeners also claim it helps keep cats away from flower beds."),
    bulletItemBold(bRef3, "Furniture scratch concealer: ", "Rub damp coffee grounds into light scratches on dark wood furniture. The natural brown pigment can help camouflage minor damage, making scratches less visible."),
    bulletItemBold(bRef3, "Drain cleaner: ", "Pour a handful of coffee grounds down your kitchen sink followed by boiling water. While not a replacement for proper drain cleaning, this can help absorb grease and reduce mild odors between deeper cleanings."),
  ];

  return [h1, ...thingsSection, ...stepsSection, ...whySection, ...expectSection, ...compareSection, ...proTip, ...otherUses];
}

// ══════════════════════════════════════════════
// ARTICLE 3 — Hair Dryer on Water Ring
// ══════════════════════════════════════════════
function article3() {
  const title = "I Held a Hair Dryer Over the Water Ring on My Wooden Table for 10 Minutes \u2014 Here\u2019s What Happened";
  const h1 = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 600, after: 300, line: 250 },
    children: [new TextRun({ text: title, font: "Times New Roman", size: 36, bold: true, color: C.primary })],
  });

  const bRef1 = makeBulletRef();
  const things = [
    "A hair dryer with adjustable heat settings",
    "A soft, lint-free cloth",
    "Wood polish or furniture wax (for after treatment)",
    "Optional: mayonnaise, non-gel toothpaste, or a clean cotton towel and iron (backup methods)",
  ];
  const thingsSection = [
    h2("Things You\u2019ll Need"),
    ...things.map(t => bulletItem(bRef1, t)),
    spacer(200),
  ];

  const nRef1 = makeNumberRef();
  const steps = [
    "Set your hair dryer to the medium heat setting. High heat can damage the wood finish or cause the wood itself to crack, so resist the temptation to crank it up. Medium heat provides enough warmth to evaporate trapped moisture without putting the surface at risk.",
    "Hold the hair dryer approximately two to three inches above the water ring. Keep it at this consistent distance throughout the process. Moving the dryer closer increases the risk of damaging the finish, and holding it farther away reduces the effectiveness.",
    "Move the hair dryer in slow, continuous circles over the water ring. Do not hold it stationary in one spot, as concentrated heat on a single area can cause the finish to bubble or discolor. Keep the airflow moving evenly across the entire affected area and slightly beyond its edges.",
    "Continue this process for about five to ten minutes. Pause every two to three minutes to check your progress. You should see the white ring gradually fading as the trapped moisture evaporates. The color of the wood will begin to look more uniform as the ring disappears.",
    "Once the ring has faded or disappeared completely, turn off the hair dryer and let the area cool for a few minutes. Then apply a thin coat of wood polish or furniture wax to the area to restore moisture and protection to the finish.",
    "Buff the polished area gently with a soft, lint-free cloth using circular motions. This helps blend the treated area with the surrounding surface and ensures an even, protective shine.",
  ];
  const stepsSection = [
    h2("Step-by-Step Instructions"),
    ...steps.map(s => numberItem(nRef1, s)),
    spacer(200),
  ];

  const whySection = [
    h2("Why This Works"),
    bodyPara("Water rings on wooden furniture are one of the most common and frustrating household problems. They form when moisture from a cold glass or hot mug becomes trapped between the wood surface and its protective finish layer. The moisture creates a visible white or cloudy ring because it refracts light differently than the surrounding finish, creating a contrast that makes the ring stand out clearly against the wood grain."),
    bodyPara("When you apply controlled heat from a hair dryer, you are essentially reversing the process that created the ring in the first place. The warm air gently raises the temperature of the finish layer just enough to cause the trapped moisture to evaporate. As the water vapor escapes, the finish returns to its normal state, and the refractive difference that created the visible ring disappears along with it."),
    bodyPara("This technique works best on water-based rings, which appear as white or cloudy marks. These rings are caused by moisture sitting in the top layer of the finish rather than penetrating deep into the wood itself. Heat treatment is ideal for these surface-level issues because it targets the exact location of the problem without requiring any stripping, sanding, or refinishing."),
    bodyPara("It is important to understand the distinction between a water ring in the finish and actual water damage to the wood. If moisture has penetrated through the finish and stained the raw wood beneath, the ring will appear dark or discolored rather than white. Heat alone usually will not resolve these deeper stains, and you may need to try alternative methods or consult a professional furniture restorer."),
    spacer(200),
  ];

  const expectSection = [
    h2("What to Expect"),
    bodyPara("In most cases, you will begin to see the water ring fade within the first three to five minutes of applying heat. The white, cloudy appearance will gradually diminish, and the natural color and grain of the wood will re-emerge. By the ten-minute mark, many water rings disappear entirely, leaving no trace that they were ever there."),
    bodyPara("The process is not instantaneous, and patience is important. Rushing by using higher heat can cause more harm than good. Some rings may require a second treatment session if they are particularly stubborn or have been present for a long time. If the ring lightens significantly but does not fully disappear on the first attempt, let the surface cool completely and try again the next day."),
    bodyPara("After treatment, the affected area may look slightly different from the surrounding surface for a short period. This is normal and usually resolves within a day or two as the finish fully settles. Applying furniture wax or polish helps speed this process and protects the area from future damage."),
    spacer(200),
  ];

  const altSection = [
    h2("Alternative Methods If Heat Doesn\u2019t Work"),
    bodyPara("If the hair dryer method does not fully resolve the water ring, there are several other household remedies worth trying before giving up or calling a professional:"),
    bodyParaMulti([
      { text: "The mayonnaise trick: ", bold: true },
      "Apply a thick layer of regular mayonnaise to the water ring and let it sit overnight. The oil and acid in the mayonnaise can help break down the trapped moisture. In the morning, wipe it clean with a soft cloth and assess the results. This method works surprisingly well for rings that resist heat treatment.",
    ]),
    bodyParaMulti([
      { text: "The iron-through-towel method: ", bold: true },
      "Place a clean cotton towel or T-shirt over the water ring. Then press a warm, not hot, iron onto the towel over the ring for several seconds at a time. The steam generated helps release trapped moisture. Keep the iron moving and check your progress frequently. This is a more aggressive approach and requires careful temperature control.",
    ]),
    bodyParaMulti([
      { text: "Non-gel toothpaste: ", bold: true },
      "Apply a small amount of non-gel white toothpaste to the ring and rub gently with a soft cloth in circular motions. The mild abrasive qualities of toothpaste can polish away the surface of the finish just enough to remove the trapped moisture mark. Wipe clean with a damp cloth when finished.",
    ]),
    bodyParaMulti([
      { text: "Baking soda paste: ", bold: true },
      "Mix baking soda with a small amount of water to form a thick paste. Apply it to the ring and rub gently with a soft cloth. Like toothpaste, baking soda acts as a very mild abrasive that can polish the surface. This works best on very light, fresh water rings.",
    ]),
    spacer(200),
  ];

  const preventSection = [
    h2("Prevention Tips"),
    bodyPara("The best way to deal with water rings is to prevent them from forming in the first place. A few simple habits can save you from ever needing to treat one:"),
    bodyPara("Always use coasters under cold and hot beverages. This is the single most effective prevention strategy. Keep a set of coasters on every surface where drinks are commonly placed, including the living room coffee table, dining table, and bedside tables."),
    bodyPara("Use placemats under plates and serving dishes during meals. Hot plates can cause similar moisture traps, and placemats provide an inexpensive protective barrier."),
    bodyPara("Apply furniture wax to your wooden surfaces every three to six months. A good coat of wax creates an additional barrier between the wood and any moisture. Paste wax products are particularly effective for dining tables and other high-use surfaces."),
    bodyPara("Wipe up spills immediately. Even small amounts of liquid left on a wooden surface for extended periods can create marks. Keep a cloth handy and address spills as soon as they happen rather than letting them sit."),
    spacer(200),
  ];

  const whenSection = [
    h2("When to Call a Professional"),
    bodyPara("While most water rings respond well to home remedies, there are situations where professional help is warranted. If the ring is dark or black in color, it likely indicates that moisture has penetrated through the finish and into the wood itself. This type of damage usually requires professional refinishing, which involves stripping the old finish, treating the stain, and applying new finish coats."),
    bodyPara("You should also seek professional assistance if the finish on your furniture is cracked, peeling, or bubbling. These are signs of more extensive moisture damage that cannot be resolved with simple heat or household products. A professional furniture restorer can assess the damage and recommend the appropriate treatment, which may range from spot repairs to a complete refinishing job."),
  ];

  return [h1, ...thingsSection, ...stepsSection, ...whySection, ...expectSection, ...altSection, ...preventSection, ...whenSection];
}

// ══════════════════════════════════════════════
// ARTICLE 4 — Toothpaste on Foggy Headlights
// ══════════════════════════════════════════════
function article4() {
  const title = "I Rubbed Toothpaste on My Foggy Car Headlights \u2014 After 15 Minutes They Looked Brand New";
  const h1 = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 600, after: 300, line: 250 },
    children: [new TextRun({ text: title, font: "Times New Roman", size: 36, bold: true, color: C.primary })],
  });

  const bRef1 = makeBulletRef();
  const things = [
    "Whitening toothpaste (non-gel, with mild abrasives)",
    "Masking tape or painter\u2019s tape",
    "Microfiber cloth or soft rag (2 cloths recommended)",
    "Water and a spray bottle",
    "Car wax or UV-protectant sealant for finishing",
    "Bucket of soapy water for cleanup",
  ];
  const thingsSection = [
    h2("Things You\u2019ll Need"),
    ...things.map(t => bulletItem(bRef1, t)),
    spacer(200),
  ];

  const nRef1 = makeNumberRef();
  const steps = [
    "Park your car in a shaded area or garage. Working in direct sunlight causes the toothpaste to dry too quickly, making it difficult to work with and reducing its effectiveness. A cool, shaded environment gives you the time you need to complete the restoration properly.",
    "Wash the headlights with soapy water and dry them thoroughly. Remove any surface dirt, bugs, or road grime. Any debris left on the surface can act like sandpaper during the polishing process and create additional scratches. Dry the headlights completely with a clean microfiber cloth.",
    "Apply masking tape around the edges of each headlight to protect the surrounding paint. Press the tape firmly along the edge to create a tight seal. This is important because toothpaste can dull automotive paint, and you want to keep the polishing compound strictly on the headlight lens.",
    "Squeeze a generous amount of whitening toothpaste onto the headlight. You need enough to cover the entire lens surface with a visible layer. Non-gel whitening toothpaste is essential here because it contains mild abrasive particles like silica or baking soda that do the actual polishing work.",
    "Using a microfiber cloth, rub the toothpaste into the headlight lens using firm, circular motions. Apply consistent pressure and work in small sections, covering the entire surface of the lens. You should see the toothpaste gradually turning from white to a slightly discolored or yellowish tone as it lifts the oxidation from the plastic.",
    "Continue rubbing for about five to ten minutes per headlight. Do not rush this step. The abrasive action needs time to work through the oxidized layer and reveal the clear plastic beneath. Periodically add a small amount of water to keep the surface lubricated and prevent the toothpaste from drying out.",
    "Once you are satisfied with the clarity, spray the headlight with clean water and wipe away all the toothpaste residue with a fresh microfiber cloth. Inspect the surface carefully. If there are still cloudy or yellowed areas, repeat the process on those specific spots.",
    "Apply a coat of car wax or UV-protectant sealant to the restored headlight. This step is absolutely critical because it seals the newly exposed plastic and protects it from UV damage, which is what caused the oxidation in the first place. Without this protective layer, the headlights will become foggy again within a few weeks. Follow the product instructions for application and curing time.",
    "Remove the masking tape carefully and clean any toothpaste residue from the surrounding paint with a damp cloth. Step back and admire the transformation.",
  ];
  const stepsSection = [
    h2("Step-by-Step Instructions"),
    ...steps.map(s => numberItem(nRef1, s)),
    spacer(200),
  ];

  const whySection = [
    h2("Why This Works"),
    bodyPara("Modern car headlights are made of polycarbonate plastic, a durable material that is significantly lighter and more impact-resistant than the glass used in older vehicles. However, polycarbonate has a vulnerability that glass does not: it is susceptible to UV degradation from sun exposure. Over time, ultraviolet rays from the sun break down the outer layer of the plastic, causing it to oxidize and develop a cloudy, yellowed, or frosted appearance."),
    bodyPara("This oxidation is essentially a very thin layer of degraded plastic on the surface of the lens. It is not permanent damage to the structure of the headlight, but rather a surface-level change that happens gradually over months and years of sun exposure. The degraded layer scatters light rather than letting it pass through clearly, which is why foggy headlights appear dull and reduce the effectiveness of your headlight beams at night."),
    bodyPara("Whitening toothpaste contains mild abrasive particles, most commonly hydrated silica or calcium carbonate. These microscopic particles work like an extremely fine sandpaper when you rub them against the headlight surface. They gradually wear away the thin oxidized layer of plastic, revealing the clear, unoxidized plastic beneath. It is the same principle used in professional headlight restoration kits, which also rely on abrasives to remove the degraded surface layer."),
    bodyPara("The key word here is mild. Toothpaste abrasives are gentle enough that they remove the oxidized layer without significantly altering the shape or thickness of the lens. Professional restoration kits use more aggressive abrasives for faster results, but toothpaste achieves the same outcome given a bit more time and elbow grease. The savings are substantial: a tube of toothpaste costs two or three dollars compared to fifteen to forty dollars for a commercial restoration kit."),
    spacer(200),
  ];

  const expectSection = [
    h2("What to Expect"),
    bodyPara("The transformation is often dramatic, especially on headlights that have been neglected for a year or more. As you rub the toothpaste in circular motions, you will see the cloudy yellow oxidation lifting away with each pass. The difference becomes apparent almost immediately, with the plastic beneath looking noticeably clearer and more transparent."),
    bodyPara("After completing the full process and applying the UV-protective sealant, your headlights should look significantly better. On mild to moderate oxidation, the results can be nearly indistinguishable from new headlights. The light output improves noticeably at night, which is a genuine safety benefit beyond just the cosmetic improvement."),
    bodyPara("Severely oxidized headlights, those with deep yellowing or a rough, sandpaper-like texture, may not return to perfect clarity with toothpaste alone. These cases might benefit from a more aggressive approach using a commercial restoration kit with multiple grit levels. However, even on heavily oxidized headlights, the toothpaste method will produce a meaningful improvement that extends the life of your existing lights."),
    spacer(200),
  ];

  const compareSection = [
    h2("How Does This Compare to Commercial Restoration Kits?"),
    bodyPara("Commercial headlight restoration kits typically cost between fifteen and forty dollars and include multiple grades of sandpaper, a polishing compound, and a UV-protective coating. They are more effective on severe oxidation because the multi-step sanding process can remove deeper damage layers than toothpaste alone can handle. Kits also tend to produce more consistent, even results."),
    bodyPara("However, for mild to moderate oxidation, toothpaste performs remarkably well at a fraction of the cost. The trade-off is primarily time and effort. A restoration kit might take twenty to thirty minutes per headlight, while the toothpaste method can take fifteen to twenty minutes for the same result on lighter oxidation. Both methods require the critical final step of applying UV protection to prevent the oxidation from returning."),
    bodyPara("The longevity of the fix is similar for both methods when UV protection is properly applied. Without UV protection, headlights will begin to oxidize again within a month or two regardless of which restoration method you used. With a quality UV sealant, you can expect three to six months of clarity before a light touch-up might be needed. Some high-end sealants claim up to a year of protection."),
    spacer(200),
  ];

  // Important note
  const bRef2 = makeBulletRef();
  const importantSection = [
    h2("Important Notes"),
    bulletItemBold(bRef2, "Use whitening toothpaste only: ", "Gel toothpaste does not contain the abrasive particles needed for this process. Look for standard white paste varieties that list hydrated silica or baking soda in the ingredients. The baking soda or peroxide content in whitening toothpaste provides the gentle abrasive action required."),
    bulletItemBold(bRef2, "Always apply UV protection afterward: ", "Skipping this step means your restored headlights will reoxidize quickly. Car wax works, but dedicated headlight UV sealants are formulated specifically for polycarbonate plastic and provide longer-lasting protection."),
    bulletItemBold(bRef2, "Do not use on glass headlights: ", "Older vehicles with glass headlights do not benefit from this method. If your headlights are made of glass, the fogging is usually on the inside surface and requires a completely different approach, such as opening the housing and cleaning the interior reflector."),
    bulletItemBold(bRef2, "Protect your paint: ", "Always mask off the area around the headlights. The abrasives in toothpaste can create micro-scratches in automotive clear coat if they come into contact with painted surfaces."),
    spacer(200),
  ];

  const otherHacks = [
    h2("Other Toothpaste Cleaning Hacks"),
    bodyPara("Toothpaste is one of the most versatile cleaning agents in your bathroom cabinet. Beyond headlight restoration, here are several more household applications where it shines:"),
    bulletItemBold(bRef2, "Silver jewelry polishing: ", "Apply a small amount of non-gel toothpaste to tarnished silver jewelry and rub gently with a soft cloth or old toothbrush. Rinse thoroughly and dry. The mild abrasives remove tarnish without damaging the silver. This works on sterling silver and silver-plated items alike."),
    bulletItemBold(bRef2, "Phone screen cleaning: ", "A tiny dab of toothpaste on a microfiber cloth can remove light scratches from smartphone screens and watch faces. Use very gentle pressure and wipe clean with a damp cloth afterward. This is best for minor surface scratches, not deep gouges."),
    bulletItemBold(bRef2, "Sneaker sole whitening: ", "Scrub white rubber sneaker soles with an old toothbrush and toothpaste. The abrasives lift dirt and stains from the rubber, restoring the original white color. This is particularly effective on running shoes with textured rubber soles that collect dirt in the grooves."),
    bulletItemBold(bRef2, "Chrome fixture polishing: ", "Toothpaste works well on bathroom and kitchen chrome fixtures, removing hard water spots and soap residue. Apply, rub gently with a cloth, and rinse clean for a bright, streak-free shine."),
  ];

  return [h1, ...thingsSection, ...stepsSection, ...whySection, ...expectSection, ...compareSection, ...importantSection, ...otherHacks];
}

// ══════════════════════════════════════════════
// ARTICLE 5 — Tennis Balls in Dryer With Pillows
// ══════════════════════════════════════════════
function article5() {
  const title = "I Put 3 Tennis Balls in My Dryer With My Pillows \u2014 What Happened Next Was Incredible";
  const h1 = new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 600, after: 300, line: 250 },
    children: [new TextRun({ text: title, font: "Times New Roman", size: 36, bold: true, color: C.primary })],
  });

  const bRef1 = makeBulletRef();
  const things = [
    "3 clean tennis balls (new or washed thoroughly if previously used outdoors)",
    "Pillows that are machine-dryable (down, synthetic fiber, or polyester fill)",
    "A large-capacity dryer (standard or high-capacity works best)",
    "Dryer sheets or wool dryer balls (optional, for added freshness)",
    "Tennis ball coverings (clean socks, if you prefer a barrier between balls and pillows)",
  ];
  const thingsSection = [
    h2("Things You\u2019ll Need"),
    ...things.map(t => bulletItem(bRef1, t)),
    spacer(200),
  ];

  const nRef1 = makeNumberRef();
  const steps = [
    "Check the care label on your pillows to confirm they are safe for machine drying. Most down, synthetic fiber, and polyester-fill pillows can go in the dryer, but memory foam and latex pillows should never be machine-dried. The heat can damage their internal structure and void any warranty.",
    "Place your pillows into the dryer. For best results, dry only two pillows at a time to allow enough space for them to tumble freely. Overcrowding the dryer prevents the pillows from fluffing properly and may result in uneven drying.",
    "Add three clean tennis balls to the dryer along with the pillows. If you are concerned about the color transferring from the tennis balls to light-colored pillowcases, you can put each ball inside a clean white sock before adding it. This is an optional precaution but worth considering if your pillows are white.",
    "Set the dryer to medium or low heat. High heat can damage certain pillow fills, especially down feathers, which can become brittle and break under excessive temperatures. A medium heat setting provides enough warmth to dry thoroughly while protecting the filling material.",
    "Run the dryer for 30 to 40 minutes. About halfway through the cycle, pause the dryer and manually fluff the pillows by hand. Feel for any damp spots, especially in the center of each pillow. If you find damp areas, rearrange the pillows and continue drying. Check again every 15 minutes until the pillows are completely dry through to the center.",
    "Once the pillows are fully dry, remove them immediately and give them a good shake and fluff by hand. This helps redistribute the filling evenly after the tumbling process. Place them on your bed and enjoy the restored fluffiness.",
  ];
  const stepsSection = [
    h2("Step-by-Step Instructions"),
    ...steps.map(s => numberItem(nRef1, s)),
    spacer(200),
  ];

  const whySection = [
    h2("Why This Works"),
    bodyPara("Pillows go flat and lumpy for several interconnected reasons, and the tennis ball trick addresses all of them simultaneously. Over time, the filling inside your pillows, whether it is down feathers, polyester fiber, or synthetic clusters, gets compressed from the weight of your head night after night. This compression causes the filling to clump together in dense pockets, leaving other areas of the pillow thin and unsupported."),
    bodyPara("Moisture also plays a significant role. Even if your pillows have pillowcases, they absorb sweat, body oils, and moisture from the air over time. This moisture causes the filling fibers to stick together, creating those stubborn lumps that make your pillow feel uneven and uncomfortable. Washing your pillows removes the accumulated oils and moisture, but the challenge comes during the drying phase."),
    bodyPara("When you dry a pillow in the machine without anything else inside, the wet filling tends to clump together as it tumbles. The pillow essentially stays in a compressed lump throughout the cycle, and what comes out is a pillow that is clean but still flat and lumpy. The tennis balls solve this problem through constant, gentle physical agitation."),
    bodyPara("As the dryer tumbles, the tennis balls bounce around inside the drum and continuously strike the pillows from all angles. This bouncing action acts like dozens of tiny hands kneading the pillow, breaking apart clumps of filling and redistributing it evenly throughout the pillow shell. The result is a pillow that comes out of the dryer noticeably fluffier, softer, and more evenly filled than it was before."),
    bodyPara("The movement of the tennis balls also helps the pillows dry more evenly. By constantly shifting the internal filling, they create channels for warm air to circulate through the pillow, reaching the center where moisture tends to linger longest. This means your pillows dry faster and more thoroughly, reducing the risk of mold or mildew from trapped moisture."),
    spacer(200),
  ];

  const expectSection = [
    h2("What to Expect"),
    bodyPara("The difference between pillows dried with tennis balls and those dried without is immediately noticeable. Pillows that went into the dryer looking flat, misshapen, and lumpy come out plump, evenly filled, and soft to the touch. The clumps that you could feel when pressing on the pillow before are gone, replaced by a consistent, comfortable density throughout."),
    bodyPara("Down pillows show the most dramatic transformation. Down feathers that had compressed into dense, flat layers spring back to their original loft and softness. Synthetic and polyester-fill pillows also improve significantly, though the effect may be slightly less dramatic depending on the age and quality of the filling."),
    bodyPara("Beyond just the fluffiness, freshly washed and properly dried pillows also smell cleaner and feel fresher. The removal of accumulated sweat, oils, and dust mites through washing, combined with the thorough drying facilitated by the tennis balls, gives your pillows a near-new quality that can improve your sleep comfort immediately."),
    spacer(200),
  ];

  const whichPillows = [
    h2("Which Pillows Work Best"),
    bodyPara("The tennis ball method works excellently on most common pillow types, but there are important exceptions to be aware of:"),
    bodyParaMulti([
      { text: "Down and feather pillows: ", bold: true },
      "These respond beautifully to the tennis ball treatment. The bouncing action separates matted feathers and restores the natural loft that makes down pillows so comfortable. This is where you will see the most dramatic results.",
    ]),
    bodyParaMulti([
      { text: "Synthetic fiberfill and polyester pillows: ", bold: true },
      "These also work very well. The tennis balls break apart clumped fiber clusters and redistribute the filling evenly. Synthetic pillows tend to hold their shape well after treatment and may actually feel better than when they were new.",
    ]),
    bodyParaMulti([
      { text: "Memory foam pillows: ", bold: true },
      "Do not put memory foam pillows in the dryer at all. The heat can melt or permanently deform the foam, destroying the pillow. Memory foam should be spot-cleaned only and allowed to air dry completely in a well-ventilated area.",
    ]),
    bodyParaMulti([
      { text: "Latex pillows: ", bold: true },
      "Similar to memory foam, latex pillows should not go in the dryer. Heat can cause the latex to break down and crumble. Hand wash gently and air dry flat on a rack.",
    ]),
    spacer(200),
  ];

  const alternatives = [
    h2("Alternatives to Tennis Balls"),
    bodyPara("If you do not have tennis balls on hand, several alternatives can achieve similar results:"),
    bodyParaMulti([
      { text: "Wool dryer balls: ", bold: true },
      "These are specifically designed for the dryer and work on the same principle as tennis balls. They are reusable, environmentally friendly, and can be scented with essential oils for added fragrance. Most people find they work just as well as tennis balls for this purpose.",
    ]),
    bodyParaMulti([
      { text: "Clean socks stuffed with tennis balls: ", bold: true },
      "If you are worried about the tennis ball dye transferring to your pillows, simply put each ball inside a clean sock. The bouncing action still works through the fabric barrier.",
    ]),
    bodyParaMulti([
      { text: "Clean canvas shoes: ", bold: true },
      "In a pinch, a pair of clean canvas sneakers with rubber soles can substitute for tennis balls. The shoes provide similar bouncing and agitating action. Make sure they are completely clean and free of dirt or debris before putting them in the dryer with your pillows.",
    ]),
    spacer(200),
  ];

  const whenToReplace = [
    h2("When to Replace Your Pillows Entirely"),
    bodyPara("No amount of fluffing can save a pillow that has truly reached the end of its useful life. Here is how to tell if it is time to replace rather than refresh:"),
    bodyPara("Perform the fold test. Fold your pillow in half and place a heavy book or your hand on top. If the pillow springs back to its original shape when you remove the weight, it still has life left. If it stays folded, the filling has permanently degraded and the pillow needs to be replaced."),
    bodyPara("Most pillows should be replaced every one to two years, though high-quality down pillows can last three to five years with proper care. If your pillow is more than two years old, has permanent yellow stains, smells musty even after washing, or fails the fold test, it is time to invest in a new one."),
    bodyPara("Regular washing and fluffing with the tennis ball method can extend the life of your pillows by keeping the filling in good condition, but no pillow lasts forever. Think of this maintenance routine as a way to get the most out of your investment while it lasts, not as a permanent solution to aging pillows."),
    spacer(200),
  ];

  const bonusSection = [
    h2("Bonus: Tennis Balls Work for Comforters and Jackets Too"),
    bodyPara("The same principle that makes tennis balls so effective for pillows also applies to bulky items like down comforters, duvets, and puffy winter jackets. When drying these larger items, add three to four tennis balls to the dryer to prevent the down filling from clumping in one corner or section. The continuous bouncing action keeps the filling evenly distributed, resulting in a comforter or jacket that comes out fluffy, evenly filled, and warm."),
    bodyPara("For comforters and jackets, you may need to run the dryer for a longer cycle since these items hold significantly more moisture than pillows. Start with a 40-minute cycle on low to medium heat, check for damp spots, and continue drying in 20-minute increments until completely dry. Cutting the drying time short is one of the most common mistakes, as even slightly damp down can develop a musty odor over time."),
    bodyPara("This trick also works well for fleece blankets, sleeping bags, and stuffed animals. Any item with a fluffy or fiber-filled interior can benefit from the agitation that tennis balls provide during the drying process."),
  ];

  return [h1, ...thingsSection, ...stepsSection, ...whySection, ...expectSection, ...whichPillows, ...alternatives, ...whenToReplace, ...bonusSection];
}


// ══════════════════════════════════════════════
// ASSEMBLE DOCUMENT
// ══════════════════════════════════════════════

// Pre-generate all numbering configs by calling all article functions
// We need to call them to generate the bullet/number configs
const a1 = article1();
const a2 = article2();
const a3 = article3();
const a4 = article4();
const a5 = article5();

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22, color: C.body },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: C.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 600, after: 300, line: 250 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: C.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 360, after: 200, line: 250 }, outlineLevel: 1 },
      },
    ],
  },
  numbering: {
    config: [...bulletConfigs, ...numberConfigs],
  },
  sections: [
    // ── COVER PAGE ──
    {
      properties: {
        page: {
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          size: { width: 11906, height: 16838 },
        },
        titlePage: true,
      },
      children: [
        // Decorative accent line at top
        new Paragraph({
          spacing: { before: 4200, after: 0 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", font: "Calibri", size: 20, color: C.accent })],
        }),
        spacer(300),
        // Main title
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100, line: 250 },
          children: [new TextRun({ text: "Home Tips Website Articles", font: "Times New Roman", size: 56, bold: true, color: C.primary })],
        }),
        // Volume
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200, line: 250 },
          children: [new TextRun({ text: "Volume 1", font: "Times New Roman", size: 40, color: C.accent })],
        }),
        // Decorative line
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", font: "Calibri", size: 20, color: C.accent })],
        }),
        // Subtitle
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200, line: 250 },
          children: [new TextRun({ text: "5 Ready-to-Publish SEO-Optimized Articles", font: "Calibri", size: 26, color: C.secondary, italics: true })],
        }),
        spacer(600),
        // Topics preview
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 60, line: 250 },
          children: [new TextRun({ text: "Topics Include:", font: "Calibri", size: 20, color: C.secondary })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40, line: 250 },
          children: [new TextRun({ text: "Vinegar & Dawn Shower Cleaner  |  Coffee Grounds Fridge Deodorizer", font: "Calibri", size: 18, color: C.secondary })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40, line: 250 },
          children: [new TextRun({ text: "Hair Dryer Water Ring Fix  |  Toothpaste Headlight Restoration", font: "Calibri", size: 18, color: C.secondary })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40, line: 250 },
          children: [new TextRun({ text: "Tennis Ball Pillow Fluffer", font: "Calibri", size: 18, color: C.secondary })],
        }),
      ],
    },

    // ── TABLE OF CONTENTS ──
    {
      properties: {
        page: {
          margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Home Tips Website Articles \u2014 Volume 1", font: "Calibri", size: 18, color: C.secondary, italics: true })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "\u2014 ", font: "Calibri", size: 18, color: C.secondary }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: C.secondary }),
              new TextRun({ text: " \u2014", font: "Calibri", size: 18, color: C.secondary }),
            ],
          })],
        }),
      },
      children: [
        new Paragraph({
          spacing: { after: 300, line: 250 },
          alignment: AlignmentType.LEFT,
          children: [new TextRun({ text: "Table of Contents", font: "Times New Roman", size: 36, bold: true, color: C.primary })],
        }),
        new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
        spacer(200),
        new Paragraph({
          spacing: { after: 100, line: 250 },
          children: [new TextRun({ text: "Note: This Table of Contents is generated via field codes. To ensure page number accuracy after editing, please right-click the TOC and select \u201cUpdate Field.\u201d", font: "Calibri", size: 18, color: C.secondary, italics: true })],
        }),
      ],
    },

    // ── ARTICLE SECTIONS ──
    ...[
      { content: a1, pageNum: 1 },
      { content: a2, pageNum: 1 },
      { content: a3, pageNum: 1 },
      { content: a4, pageNum: 1 },
      { content: a5, pageNum: 1 },
    ].map((article, idx) => ({
      properties: {
        page: {
          margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 },
          pageNumbers: { start: article.pageNum },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: `Home Tips Website Articles \u2014 Volume 1`, font: "Calibri", size: 18, color: C.secondary, italics: true })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "\u2014 ", font: "Calibri", size: 18, color: C.secondary }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: C.secondary }),
              new TextRun({ text: " \u2014", font: "Calibri", size: 18, color: C.secondary }),
            ],
          })],
        }),
      },
      children: [
        // Page break before each article (except the first one will naturally start after TOC)
        ...(idx > 0 ? [new Paragraph({ children: [new PageBreak()] })] : []),
        ...article.content,
      ],
    })),

    // ── BACK COVER ──
    {
      properties: {
        page: {
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
        },
      },
      children: [
        spacer(5500),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", font: "Calibri", size: 20, color: C.accent })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100, line: 250 },
          children: [new TextRun({ text: "Volume 2 Coming Soon", font: "Times New Roman", size: 40, bold: true, color: C.primary })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100, line: 250 },
          children: [new TextRun({ text: "More home tips, hacks, and tricks for your website.", font: "Calibri", size: 22, color: C.secondary, italics: true })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", font: "Calibri", size: 20, color: C.accent })],
        }),
      ],
    },
  ],
});

// ── Generate ──
const OUTPUT = "/home/z/my-project/download/Home_Tips_Website_Articles.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`Document saved to ${OUTPUT}`);
});
