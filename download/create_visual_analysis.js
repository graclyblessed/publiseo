const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, PageBreak, PageNumber,
  Table, TableRow, TableCell, ShadingType, VerticalAlign
} = require("docx");

const c = {
  primary: "1A1F16", body: "2D3329", secondary: "4A5548",
  accent: "94A3B8", tableBg: "F8FAF7", white: "FFFFFF",
  highlight: "E7F3FF", fbBlue: "1877F2", darkText: "050505",
  border: "E4E6EB"
};

const noBorder = { style: BorderStyle.NONE, size: 0, color: c.white };
const thinBorder = { style: BorderStyle.SINGLE, size: 6, color: c.border };
const allBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 600, after: 300 },
    children: [new TextRun({ text, bold: true, size: 36, font: "Times New Roman", color: c.primary })]
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 28, font: "Times New Roman", color: c.primary })]
  });
}

function body(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, font: "Calibri", color: c.body })]
  });
}

function bullet(text) {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    indent: { left: 480 },
    children: [
      new TextRun({ text: "\u2022 ", size: 22, font: "Calibri", color: c.body }),
      new TextRun({ text, size: 22, font: "Calibri", color: c.body })
    ]
  });
}

function boldBullet(label, text) {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    indent: { left: 480 },
    children: [
      new TextRun({ text: "\u2022 ", size: 22, font: "Calibri", color: c.body }),
      new TextRun({ text: label + ": ", bold: true, size: 22, font: "Calibri", color: c.primary }),
      new TextRun({ text, size: 22, font: "Calibri", color: c.body })
    ]
  });
}

function spacer(h = 100) {
  return new Paragraph({ spacing: { before: h, after: h }, children: [] });
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: c.border, space: 8 } },
    children: []
  });
}

// Load user's screenshots
const screenshots = [
  fs.readFileSync("/home/z/my-project/upload/pasted_image_1775601275250.png"),
  fs.readFileSync("/home/z/my-project/upload/pasted_image_1775601288509.png"),
  fs.readFileSync("/home/z/my-project/upload/pasted_image_1775601305810.png"),
  fs.readFileSync("/home/z/my-project/upload/pasted_image_1775601335106.png"),
  fs.readFileSync("/home/z/my-project/upload/pasted_image_1775601360804.png"),
  fs.readFileSync("/home/z/my-project/upload/pasted_image_1775601383837.png"),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 22, color: c.body } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Times New Roman", color: c.primary },
        paragraph: { spacing: { before: 600, after: 300 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Times New Roman", color: c.primary },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 1 } }
    ]
  },
  sections: [
    // COVER
    {
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 }, size: { width: 11906, height: 16838 } },
        titlePage: true
      },
      children: [
        new Paragraph({ spacing: { before: 4000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "VISUAL CONTENT ANALYSIS", bold: true, size: 52, font: "Times New Roman", color: c.primary })]
        }),
        new Paragraph({ spacing: { before: 200 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Tips for the Home", size: 36, font: "Times New Roman", color: c.secondary, italics: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Facebook Page Image Style & Cooktop Cove Article Deep Dive", size: 22, font: "Calibri", color: c.accent })]
        }),
        new Paragraph({ spacing: { before: 3000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "6 Facebook Post Screenshots Analyzed  \u00B7  1 Full Article Deconstructed", size: 20, font: "Calibri", color: c.accent })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Including Cooktop Cove: \"Denture Cleaning Tablet Toilet Hack\"", size: 20, font: "Calibri", color: c.accent })]
        }),
      ]
    },
    // CONTENT
    {
      properties: {
        page: { margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 }, size: { width: 11906, height: 16838 } }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({ text: "Tips for the Home ", bold: true, size: 18, font: "Calibri", color: c.accent }),
              new TextRun({ text: "| Visual Content & Article Analysis", size: 18, font: "Calibri", color: c.accent })
            ]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "\u2014 ", size: 18, font: "Calibri", color: c.accent }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Calibri", color: c.accent }),
              new TextRun({ text: " \u2014", size: 18, font: "Calibri", color: c.accent })
            ]
          })]
        })
      },
      children: [
        // ===== SECTION 1: GRID COLLAGE DISCOVERY =====
        heading1("1. The Grid Collage Format \u2014 Their #1 Visual Strategy"),

        body("After analyzing all 6 screenshots shared directly from the Tips for the Home Facebook page, a clear and consistent visual pattern emerges that was NOT visible from the Ad Library alone. The page's primary image format is a **multi-tile grid collage** \u2014 not single photos. This is the single most important visual discovery about their content strategy."),

        heading2("1.1 What the Grid Collage Looks Like"),
        body("Each Facebook post consists of a large image that contains a grid of smaller square tiles arranged in rows and columns. The typical layout is either a 4x4 grid (16 tiles), a 5x3 grid (15 tiles), or a 4x3 grid (12 tiles). Each tile is a self-contained mini-post that combines a photograph with overlaid text, creating a mosaic-like visual experience."),

        body("The grid format serves multiple strategic purposes. First, it dramatically increases the visual surface area of each post, making it more prominent in the Facebook feed and harder to scroll past. Second, it creates a sense of abundance and value \u2014 the viewer sees 12-16 tips at once, which feels like a comprehensive resource rather than a single tip. Third, it naturally encourages engagement because viewers will save the post to reference individual tiles later."),

        heading2("1.2 Individual Tile Design"),
        body("Each tile within the grid follows a consistent design pattern that has been refined over thousands of posts:"),

        boldBullet("Background Color", "Each tile has a solid, saturated background color. The colors vary per tile and include warm oranges, teals, purples, soft greens, blues, and pinks. This variety creates visual interest across the grid while maintaining a cohesive feel."),
        boldBullet("Photograph", "A central photograph occupies roughly 60-70% of the tile area. Photos are typically close-up product shots (a bottle of cleaner, a lemon, a toothbrush), action shots (hands scrubbing, spraying, wiping), or before/after comparisons. All photos have a warm, natural-lit aesthetic \u2014 no studio lighting."),
        boldBullet("Text Overlay", "Each tile has 1-3 lines of text overlaid directly on the photo or on a semi-transparent banner. The text is white or dark (depending on background contrast), uses a bold sans-serif font, and is kept short (5-15 words per tile). The text frames the content as a personal experiment, question, or surprising fact."),
        boldBullet("Consistent Sizing", "All tiles within a grid are exactly the same square dimensions, creating a clean, uniform look that appears professional and organized."),

        heading2("1.3 Tile Text Formula"),
        body("The text on each tile follows one of these proven micro-formats. These are NOT random \u2014 they are carefully crafted to maximize curiosity and engagement within the small tile space:"),

        bullet("\"I [did X] every [time period]. This is what happened.\" (Personal experiment format)"),
        bullet("\"[Question about a common household situation]?\" (Engagement question format)"),
        bullet("\"Why you should never [common action].\" (Negative hook format)"),
        bullet("\"The [adjective] trick to [result].\" (Secret/reveal format)"),
        bullet("\"[Number] [adjective] [item] ideas you need to try.\" (List teaser format)"),
        bullet("\"I put [common item] in/on [location]. [Surprising result].\" (Experiment reveal format)"),
        bullet("\"My [family member] showed me this [adjective] [thing].\" (Authority/trust format)"),

        body("Examples from the actual screenshots analyzed:"),
        bullet("\"I dropped a denture cleaning tablet into my toilet bowl every night for 30 days. This is what happened.\""),
        bullet("\"I packed the empty spaces of my chest freezer with frozen water jugs for 3 weeks. This is what happened.\""),
        bullet("\"I turned off my furnace and only used a [space heater/candle].\""),
        bullet("\"What food item do most people refrigerate that actually doesn't require refrigeration?\""),
        bullet("\"I wiped my dull wood cabinets with mayonnaise.\""),
        bullet("\"I put a dishwasher tablet in my shower drain every week for a month.\""),

        heading2("1.4 Why This Format Dominates"),
        body("The grid collage is not an accident \u2014 it is a carefully engineered format designed to exploit Facebook's algorithm and user psychology:"),

        boldBullet("Scroll-stopping power", "A 4x4 grid of colorful tiles is visually striking and interrupts the monotonous scroll of single-image posts from other pages. It stands out in the feed."),
        boldBullet("Time-on-post", "Users pause longer to scan multiple tiles, which tells Facebook's algorithm the content is engaging. This boosts organic reach."),
        boldBullet("Save rate", "Users save the post to come back and read individual tips later. Saves are one of the highest-weighted engagement signals in Facebook's ranking algorithm."),
        boldBullet("Share appeal", "The abundance of tips (12-16 per post) makes it feel share-worthy. People share it thinking \"my friends need to see all these tips.\""),
        boldBullet("Repackaging efficiency", "They can take older, proven tips and repackage them into new grids. A tip about dryer sheets that performed well 6 months ago can reappear in a new \"20 Household Hacks\" grid with fresh surrounding tiles."),

        spacer(200),

        // Screenshots section
        heading2("1.5 Analyzed Facebook Post Screenshots"),
        body("Below are the 6 actual Facebook post screenshots from Tips for the Home, analyzed for visual patterns. Each image shows the grid collage format in action."),

        ...screenshots.flatMap((imgData, i) => [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 80 },
            children: [
              new ImageRun({
                type: "png",
                data: imgData,
                transformation: { width: 480, height: 360 },
                altText: { title: `Screenshot ${i+1}`, description: `Facebook post screenshot ${i+1}`, name: `ss${i+1}` }
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 50, after: 150 },
            children: [new TextRun({ text: `Figure ${i+1}: Facebook post from Tips for the Home \u2014 Grid collage format with multi-tile layout`, size: 18, font: "Calibri", color: c.accent, italics: true })]
          })
        ]),

        divider(),

        // ===== SECTION 2: COOKTOP COVE ARTICLE DEEP DIVE =====
        heading1("2. Cooktop Cove Article Deep Dive"),
        body("The URL shared from Facebook links to a full article on Cooktop Cove: \"I dropped a denture cleaning tablet into my toilet bowl every night for 30 days. This is what happened.\" This article represents the complete content funnel \u2014 from Facebook grid tile to full website article. Here is a complete deconstruction of how it works."),

        heading2("2.1 Article Structure Breakdown"),
        body("The article follows an 11-section long-form structure, totaling approximately 2,500-3,000 words. Each section is designed to be independently scannable while also flowing as a narrative. Here is the exact structure:"),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [900, 5400, 2700],
          margins: { top: 80, bottom: 80, left: 150, right: 150 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: ["#", "Section Title", "Purpose"].map((h, ci) =>
                new TableCell({
                  borders: allBorders, width: { size: [900,5400,2700][ci], type: WidthType.DXA },
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 20, font: "Calibri", color: c.primary })] })]
                })
              )
            }),
            ...[
              ["1", "Why I Started Dropping Denture Tablets in My Toilet", "Personal hook + cost justification ($5 for 100 tablets)"],
              ["2", "What Actually Happens When a Denture Tablet Hits the Bowl", "Science/chemistry explanation of effervescent reaction"],
              ["3", "The First Week: Visible Changes", "Early results (partial improvement)"],
              ["4", "Did It Really Make the Toilet Cleaner or Whiter?", "Honest assessment (minimal whitening)"],
              ["5", "How Well It Tackled Stains, Rings, and Hard-Water Marks", "Specific performance against tough stains"],
              ["6", "Odor Control: Fresh Hack or Overhyped Trick?", "Mixed results (nice but temporary)"],
              ["7", "What Plumbers and Cleaning Experts Say", "Authority/expert validation"],
              ["8", "Hidden Costs: Is This Any Better Than Regular Cleaners?", "Financial comparison"],
              ["9", "Safety, Environmental Impact, and Ingredients", "Addressing concerns"],
              ["10", "Would I Keep Doing It \u2014 What I'd Do Differently", "Honest conclusion + future plans"],
              ["11", "The Bigger Lesson About Viral Cleaning Hacks", "Meta-commentary + clickbait to other articles"]
            ].map(([num, title, purpose]) =>
              new TableRow({
                children: [
                  new TableCell({
                    borders: allBorders, width: { size: 900, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: num, size: 20, font: "Calibri", color: c.body })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 5400, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: title, size: 20, font: "Calibri", color: c.body })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 2700, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: purpose, size: 20, font: "Calibri", color: c.body })] })]
                  })
                ]
              })
            )
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50, after: 200 },
          children: [new TextRun({ text: "Table 1: Complete article structure of the denture tablet toilet cleaning experiment", size: 18, font: "Calibri", color: c.accent, italics: true })]
        }),

        heading2("2.2 Writing Style & Tone Analysis"),
        body("The article uses a first-person narrative voice (\u201cI decided to put this to the test,\u201d \u201cwhat I discovered was surprising\u201d) that creates authenticity and trust. This is NOT a generic listicle \u2014 it's framed as a personal 30-day experiment, which is far more compelling. Key writing characteristics:"),

        bullet("First-person perspective throughout: \u201cI dropped,\u201d \u201cI noticed,\u201d \u201cI would consider\u201d \u2014 the reader feels like they're following a friend's journey."),
        bullet("Honest and balanced: The article admits the hack didn't work as well as expected (\u201cthe whitening effect was minimal,\u201d \u201cstubborn stains remained\u201d). This honesty builds credibility and differentiates from purely promotional content."),
        bullet("Authority building: Section 7 brings in \u201cplumbers and cleaning experts\u201d to provide professional perspective, making the content feel well-researched rather than purely anecdotal."),
        bullet("SEO-optimized headings: Each section title is a self-contained keyword phrase that could rank in Google search (e.g., \u201cWhat happens when a denture tablet hits the bowl\u201d)."),
        bullet("Long-form depth: At ~3,000 words, the article provides substantial value, which increases time-on-page and reduces bounce rate \u2014 both important for SEO rankings and ad revenue."),
        bullet("Clickbait internal links: At the bottom, there are 10+ links to other Cooktop Cove articles with similar curiosity-gap headlines (e.g., \u201cMy aunt always throws together this vibrant and thrifty dinner...\u201d). This drives internal page views, increasing total ad impressions per visitor."),

        heading2("2.3 The Complete Content Funnel"),
        body("Now we can see the entire content ecosystem from start to finish:"),

        spacer(100),

        // Funnel visualization as a table
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1800, 3000, 4200],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: ["Stage", "Format", "Details"].map((h, ci) =>
                new TableCell({
                  borders: allBorders, width: { size: [1800,3000,4200][ci], type: WidthType.DXA },
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 20, font: "Calibri", color: c.primary })] })]
                })
              )
            }),
            ...[
              ["1. Discovery", "Grid collage on FB", "4x4 grid of colorful tiles, each with a photo + text overlay teasing a tip. Designed to stop the scroll."],
              ["2. Curiosity Click", "Tile text hook", "\"I dropped a denture tablet in my toilet for 30 days...\" creates an information gap that demands resolution."],
              ["3. Article Read", "Cooktop Cove blog", "3,000-word first-person experiment article. Honest, detailed, builds trust. Loaded with display ads."],
              ["4. Engagement", "Internal links", "10+ clickbait links at the bottom drive the reader to more articles, multiplying ad impressions."],
              ["5. Monetization", "Display ads", "Premium ad networks (Mediavine/Raptive) on every page view. Estimated $15-30 RPM."],
              ["6. Retargeting", "Facebook pixel", "FB pixel (ID: 702986679818891) tracks visitors for retargeting with more grid-style ads."]
            ].map(([stage, format, details], i) =>
              new TableRow({
                children: [
                  new TableCell({
                    borders: allBorders, width: { size: 1800, type: WidthType.DXA },
                    shading: i === 0 ? { fill: "E8F5E9", type: ShadingType.CLEAR } : undefined,
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: stage, bold: true, size: 20, font: "Calibri", color: c.primary })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 3000, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: format, size: 20, font: "Calibri", color: c.body })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 4200, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: details, size: 20, font: "Calibri", color: c.body })] })]
                  })
                ]
              })
            )
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50, after: 200 },
          children: [new TextRun({ text: "Table 2: Complete content funnel from Facebook grid post to monetization", size: 18, font: "Calibri", color: c.accent, italics: true })]
        }),

        divider(),

        // ===== SECTION 3: REPLICATION GUIDE =====
        heading1("3. How to Replicate This Visual Style"),

        heading2("3.1 Creating the Grid Collage (Technical Guide)"),
        body("Based on the screenshots, here is exactly how to recreate their grid collage format. This can be done in Canva, Photoshop, or any design tool:"),

        boldBullet("Canvas Size", "Create a square canvas (1080x1080px or 1200x1200px). This is Facebook's optimal post size."),
        boldBullet("Grid Layout", "Divide the canvas into a 4x4 grid of equal square tiles (each tile is 270x270px on a 1080 canvas). Add 4-6px gaps between tiles for a clean grid line."),
        boldBullet("Tile Background", "Each tile gets a solid background color from a predefined palette. Rotate through: warm orange (#F4845F), teal (#5EB1BF), soft purple (#9B8EC2), sage green (#8CB369), dusty pink (#E08DA3), warm yellow (#F0C75E), light blue (#6CA6C1)."),
        boldBullet("Photo Placement", "Place a photo in the center of each tile, covering roughly 60-70% of the tile area. Use high-quality, warm-toned product photos or action shots."),
        boldBullet("Text Overlay", "Add 1-3 lines of text at the bottom or top of each tile using a bold sans-serif font (Montserrat Bold, Bebas Neue, or similar). White text with a subtle dark drop shadow works best on most backgrounds."),
        boldBullet("Batch Production", "Create templates with pre-set colors and fonts. Then swap photos and text for each new post. A single grid post takes 30-60 minutes once the template is set up."),

        heading2("3.2 Photo Sourcing Strategy"),
        body("The page uses very specific types of photos. Here is how to source or create similar visuals:"),

        bullet("Product close-ups: Clean, well-lit photos of household items (vinegar bottles, baking soda boxes, lemons, dryer sheets). Use a plain white or light-colored background. Can be shot with a smartphone in natural window light."),
        bullet("Action shots: Hands performing the cleaning action (pouring, spraying, wiping, scrubbing). These should be candid-looking, not overly staged. A helper holds the phone while the other hand performs the action."),
        bullet("Before/after comparisons: Side-by-side or split-screen images showing the transformation. These are the highest-performing tile images."),
        bullet("Stock photos: Free stock photos from Pexels, Unsplash, or Pixabay can be used for generic household scenes. Customize with text overlays."),
        bullet("AI-generated images: For rapid content production, AI image generators can create realistic household scenes. This is particularly useful for testing new tile concepts before investing in real photography."),

        heading2("3.3 Content Repurposing Formula"),
        body("The grid format allows massive content repurposing. Here is the cycle:"),

        bullet("Week 1: Create a 16-tile grid post with all original tips. Post organically."),
        bullet("Week 2: The top-performing tiles (based on engagement) become individual single-image posts."),
        bullet("Week 3: The best single-image post gets expanded into a full Cooktop Cove-style article."),
        bullet("Week 4: Promote the article with Facebook ads using the original grid image."),
        bullet("Month 2: Recycle the proven tiles into new grid combinations with 4-8 new tiles added."),
        spacer(),
        body("This cycle means each tip can generate 3-4 pieces of content across different formats (grid tile, single post, article, ad), maximizing the ROI of every idea."),

        divider(),

        // ===== SECTION 4: UPDATED PLAYBOOK =====
        heading1("4. Complete Replication Checklist"),
        body("Combining the original strategy analysis with the new visual and article insights, here is the complete checklist for emulating Tips for the Home:"),

        heading2("4.1 Visual Content Checklist"),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [600, 7200, 1200],
          margins: { top: 80, bottom: 80, left: 150, right: 150 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: ["\u2713", "Action Item", "Priority"].map((h, ci) =>
                new TableCell({
                  borders: allBorders, width: { size: [600,7200,1200][ci], type: WidthType.DXA },
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 20, font: "Calibri", color: c.primary })] })]
                })
              )
            }),
            ...[
              ["\u2610", "Create 4x4 grid collage template in Canva/Photoshop (1080x1080px)", "Critical"],
              ["\u2610", "Define color palette (7-10 saturated colors for tile backgrounds)", "Critical"],
              ["\u2610", "Select bold sans-serif font for text overlays", "Critical"],
              ["\u2610", "Source or shoot 20+ household item photos (product shots + action shots)", "Critical"],
              ["\u2610", "Write 16 tile captions using the micro-formulas (I did X / Why you should never / Question)", "Critical"],
              ["\u2610", "Assemble first 4x4 grid post and publish organically", "High"],
              ["\u2610", "Create additional grid sizes: 4x3 (12 tiles) and 5x3 (15 tiles) for variety", "Medium"],
              ["\u2610", "Test single-tile extraction for standalone posts", "Medium"],
              ["\u2610", "Develop content pipeline: 2-3 grid posts per week", "High"],
            ].map(([check, action, priority]) =>
              new TableRow({
                children: [
                  new TableCell({
                    borders: allBorders, width: { size: 600, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: check, size: 24, font: "Calibri" })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 7200, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: action, size: 20, font: "Calibri", color: c.body })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 1200, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: priority, bold: true, size: 20, font: "Calibri", color: priority === "Critical" ? "D31130" : c.body })] })]
                  })
                ]
              })
            )
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50, after: 200 },
          children: [new TextRun({ text: "Table 3: Visual content replication checklist", size: 18, font: "Calibri", color: c.accent, italics: true })]
        }),

        heading2("4.2 Article Writing Checklist"),
        bullet("Write in first person (\u201cI tried this for X days\u201d) \u2014 never use third person or generic voice."),
        bullet("Structure: 10-12 numbered sections, each with a descriptive, SEO-friendly heading."),
        bullet("Be honest about mixed results \u2014 this builds credibility and differentiates from spam."),
        bullet("Include an expert quote section to add authority (can be paraphrased from online sources)."),
        bullet("End with 8-12 internal links to other articles with clickbait headlines."),
        bullet("Target 2,500-3,500 words per article for maximum time-on-page and ad impressions."),
        bullet("Install Facebook Pixel on the website for retargeting capabilities."),
        bullet("Use Mediavine or Raptive for display ads (require 50K+ monthly sessions to join)."),

        spacer(200),
        divider(),
        spacer(100),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Visual & Article Analysis by Z.ai  \u00B7  Data from Meta Ad Library, Cooktop Cove, and Facebook page screenshots", size: 18, font: "Calibri", color: c.accent, italics: true })]
        }),
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/home/z/my-project/download/Tips_Visual_and_Article_Analysis.docx", buf);
  console.log("Visual analysis document created!");
});
