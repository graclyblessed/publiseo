const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, Footer, AlignmentType, LevelFormat, TableOfContents, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak,
} = require("docx");

// ─── Color Palette: Terra Cotta Afterglow ──────────────────────────
const C = {
  primary: "26211F",
  body: "3D3735",
  secondary: "6B6361",
  accent: "C19A6B",
  tableBg: "FDFCFB",
  white: "FFFFFF",
  tableHeader: "F5F0EB",
  coverAccent: "C19A6B",
};

// ─── Reusable Helpers ──────────────────────────────────────────────
const tb = { style: BorderStyle.SINGLE, size: 1, color: "D5CFC9" };
const cellBorders = { top: tb, bottom: tb, left: tb, right: tb };
const noBorders = {
  top: { style: BorderStyle.NONE, size: 0 },
  bottom: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
};

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 600, after: 300 },
    children: [new TextRun({ text, font: "Times New Roman", size: 36, bold: true, color: C.primary })],
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, font: "Times New Roman", size: 28, bold: true, color: C.primary })],
  });
}

function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, font: "Times New Roman", size: 24, bold: true, color: C.secondary })],
  });
}

function bodyPara(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 250 },
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: [new TextRun({ text, font: "Calibri", size: 22, color: C.body })],
  });
}

function bodyParaRuns(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: 160, line: 250 },
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: runs,
  });
}

function bulletItem(ref, text) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80, line: 250 },
    children: [new TextRun({ text, font: "Calibri", size: 22, color: C.body })],
  });
}

function numberedItem(ref, text) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80, line: 250 },
    children: [new TextRun({ text, font: "Calibri", size: 22, color: C.body })],
  });
}

function tableCaption(text) {
  return new Paragraph({
    spacing: { before: 80, after: 240 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, font: "Calibri", size: 18, color: C.secondary, italics: true })],
  });
}

function headerCell(text, width) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: C.tableHeader, type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { line: 250 },
      children: [new TextRun({ text, bold: true, font: "Calibri", size: 20, color: C.primary })],
    })],
  });
}

function dataCell(text, width, opts = {}) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: opts.shade || C.tableBg, type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      spacing: { line: 250 },
      children: [new TextRun({ text, font: "Calibri", size: 20, color: C.body })],
    })],
  });
}

function makeTable(colWidths, rows) {
  return new Table({
    alignment: AlignmentType.CENTER,
    columnWidths: colWidths,
    margins: { top: 80, bottom: 80, left: 150, right: 150 },
    rows,
  });
}

function spacer(before = 200) {
  return new Paragraph({ spacing: { before } });
}

// ─── Load images ───────────────────────────────────────────────────
const img1 = fs.readFileSync("/home/z/my-project/download/sample_post_1.png");
const img2 = fs.readFileSync("/home/z/my-project/download/sample_post_2.png");
const img3 = fs.readFileSync("/home/z/my-project/download/sample_post_3.png");

// ─── Numbering config ──────────────────────────────────────────────
const bulletConfigs = [];
for (let i = 1; i <= 30; i++) {
  bulletConfigs.push({
    reference: `bl-${i}`,
    levels: [{
      level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } },
    }],
  });
}
const numConfigs = [];
for (let i = 1; i <= 30; i++) {
  numConfigs.push({
    reference: `nl-${i}`,
    levels: [{
      level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } },
    }],
  });
}

// ═══════════════════════════════════════════════════════════════════
// COVER PAGE SECTION
// ═══════════════════════════════════════════════════════════════════
const coverSection = {
  properties: {
    page: {
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      size: { width: 11906, height: 16838 },
    },
    titlePage: true,
  },
  children: [
    new Paragraph({ spacing: { before: 4000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", font: "Calibri", size: 24, color: C.accent })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "THE COMPLETE", font: "Times New Roman", size: 36, color: C.secondary, bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "FACEBOOK HOME TIPS", font: "Times New Roman", size: 52, color: C.primary, bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [new TextRun({ text: "MONEY-MAKING PLAYBOOK", font: "Times New Roman", size: 52, color: C.primary, bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", font: "Calibri", size: 24, color: C.accent })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: "The Step-by-Step Blueprint to Build a Profitable Facebook Page", font: "Calibri", size: 24, color: C.secondary, italics: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [new TextRun({ text: "in the Home Tips / Life Hacks Niche", font: "Calibri", size: 24, color: C.secondary, italics: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: "Based on Deep Analysis of 'Tips for the Home' (4M+ Followers)", font: "Calibri", size: 22, color: C.accent })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "April 2026 Edition", font: "Times New Roman", size: 28, color: C.primary, bold: true })],
    }),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// TOC SECTION
// ═══════════════════════════════════════════════════════════════════
const tocSection = {
  properties: {
    page: {
      margin: { top: 1800, bottom: 1440, left: 1440, right: 1440 },
    },
  },
  headers: {
    default: new Header({
      children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Facebook Home Tips Money-Making Playbook", font: "Calibri", size: 18, color: C.secondary, italics: true })],
      })],
    }),
  },
  footers: {
    default: new Footer({
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Page ", font: "Calibri", size: 18, color: C.secondary }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: C.secondary }),
          new TextRun({ text: " of ", font: "Calibri", size: 18, color: C.secondary }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Calibri", size: 18, color: C.secondary }),
        ],
      })],
    }),
  },
  children: [
    new Paragraph({
      spacing: { after: 300 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "TABLE OF CONTENTS", font: "Times New Roman", size: 36, bold: true, color: C.primary })],
    }),
    new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
    new Paragraph({
      spacing: { before: 300, after: 200 },
      children: [new TextRun({ text: "Note: This Table of Contents is generated via field codes. To ensure page number accuracy after editing, please right-click the TOC and select \"Update Field.\"", font: "Calibri", size: 18, color: C.secondary, italics: true })],
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// MAIN CONTENT SECTION
// ═══════════════════════════════════════════════════════════════════
const mainChildren = [];

// ─── Chapter 1: Executive Summary ──────────────────────────────────
mainChildren.push(heading1("Chapter 1: Executive Summary"));
mainChildren.push(bodyPara("The Facebook Home Tips Money-Making Playbook is a comprehensive, data-driven guide to building a profitable media business in the home improvement and life hacks niche. This playbook is based on an extensive analysis of one of the most successful pages in this space, \"Tips for the Home,\" which has amassed over 4 million followers through a systematic content strategy."));
mainChildren.push(bodyPara("The core business model is elegantly simple: create highly engaging Facebook posts that drive traffic to content websites, where display advertising generates revenue. This strategy has proven effective across multiple niches and can be replicated by anyone willing to invest time in content creation and audience building."));

mainChildren.push(heading2("What You Will Learn"));
mainChildren.push(bulletItem("bl-1", "The complete business model behind multi-million-dollar Facebook media companies"));
mainChildren.push(bulletItem("bl-1", "How to create viral content using six proven content archetypes"));
mainChildren.push(bulletItem("bl-1", "Visual design principles that maximize engagement and shares"));
mainChildren.push(bulletItem("bl-1", "Optimal posting schedules and growth strategies for every stage"));
mainChildren.push(bulletItem("bl-1", "Monetization methods including display ads, affiliate marketing, and sponsored content"));
mainChildren.push(bulletItem("bl-1", "20 ready-to-use post templates to launch immediately"));

mainChildren.push(heading2("The Market Opportunity"));
mainChildren.push(bodyPara("Facebook remains one of the largest social media platforms globally, with over 250 million monthly active users in the United States alone. The home tips and life hacks niche consistently achieves engagement rates of 5-15%, far exceeding the platform average of 0.5-1%. This combination of massive reach and high engagement creates a significant monetization opportunity."));
mainChildren.push(bodyPara("The key insight is that home improvement content appeals to a broad demographic spanning homeowners, renters, young families, and retirees. This wide appeal, combined with the practical value of the content, makes it one of the most lucrative niches for Facebook-based content businesses."));

// ─── Chapter 2: The Business Model Decoded ─────────────────────────
mainChildren.push(heading1("Chapter 2: The Business Model Decoded"));

mainChildren.push(heading2("2.1 The Revenue Funnel"));
mainChildren.push(bodyPara("The entire business model rests on a three-step revenue funnel that transforms Facebook engagement into real income:"));
mainChildren.push(numberedItem("nl-1", "Facebook Post: Create a highly engaging visual post with a curiosity-driven caption that compels users to interact and click through to read more."));
mainChildren.push(numberedItem("nl-1", "Article Link: Each Facebook post links to a full article on your content website. The article provides detailed instructions, tips, or background on the topic introduced in the post."));
mainChildren.push(numberedItem("nl-1", "Display Ad Revenue: The content website is monetized through display advertising networks. As visitors read the article, they are served ads, and you earn revenue based on impressions and clicks."));

mainChildren.push(heading2("2.2 The Website Network"));
mainChildren.push(bodyPara("Successful operators in this space typically use a multi-site strategy, creating a network of themed content websites that each focus on a specific sub-niche within home improvement and lifestyle. This approach provides several advantages:"));
mainChildren.push(bulletItem("bl-2", "Domain Authority Building: Each site can build its own authority in search engines, creating multiple traffic channels."));
mainChildren.push(bulletItem("bl-2", "Audience Segmentation: Different sites can target different demographics within the broader audience."));
mainChildren.push(bulletItem("bl-2", "Revenue Diversification: Multiple sites reduce dependency on any single traffic source or revenue stream."));
mainChildren.push(bulletItem("bl-2", "Monetization Flexibility: Different sites can qualify for different ad networks at different revenue thresholds."));
mainChildren.push(bodyPara("Examples of successful multi-site networks include properties like CooktopCove.com (kitchen and cooking tips), DIYEverywhere.com (DIY and home improvement), and others that collectively drive millions of monthly visitors."));

mainChildren.push(heading2("2.3 Revenue Estimates"));
mainChildren.push(bodyPara("The following table illustrates potential revenue at different traffic scales, based on typical RPM (Revenue Per Mille - revenue per 1,000 page views) rates in the home improvement niche:"));

// Revenue table
mainChildren.push(makeTable([2200, 1600, 2200, 1800, 1800], [
  new TableRow({
    tableHeader: true,
    children: [
      headerCell("Monthly Visitors", 2200),
      headerCell("RPM ($)", 1600),
      headerCell("Monthly Revenue", 2200),
      headerCell("Annual Revenue", 1800),
      headerCell("Stage", 1800),
    ],
  }),
  new TableRow({ children: [dataCell("10,000", 2200, {center:true}), dataCell("$5 - $10", 1600, {center:true}), dataCell("$50 - $100", 2200, {center:true}), dataCell("$600 - $1,200", 1800, {center:true}), dataCell("Startup", 1800, {center:true})] }),
  new TableRow({ children: [dataCell("50,000", 2200, {center:true, shade: C.tableHeader}), dataCell("$8 - $15", 1600, {center:true, shade: C.tableHeader}), dataCell("$400 - $750", 2200, {center:true, shade: C.tableHeader}), dataCell("$4,800 - $9,000", 1800, {center:true, shade: C.tableHeader}), dataCell("Growth", 1800, {center:true, shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("100,000", 2200, {center:true}), dataCell("$12 - $20", 1600, {center:true}), dataCell("$1,200 - $2,000", 2200, {center:true}), dataCell("$14,400 - $24,000", 1800, {center:true}), dataCell("Scaling", 1800, {center:true})] }),
  new TableRow({ children: [dataCell("500,000", 2200, {center:true, shade: C.tableHeader}), dataCell("$15 - $30", 1600, {center:true, shade: C.tableHeader}), dataCell("$7,500 - $15,000", 2200, {center:true, shade: C.tableHeader}), dataCell("$90,000 - $180,000", 1800, {center:true, shade: C.tableHeader}), dataCell("Established", 1800, {center:true, shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("1,000,000+", 2200, {center:true}), dataCell("$20 - $40", 1600, {center:true}), dataCell("$20,000 - $40,000", 2200, {center:true}), dataCell("$240,000 - $480,000", 1800, {center:true}), dataCell("Authority", 1800, {center:true})] }),
]));
mainChildren.push(tableCaption("Table 1: Revenue projections at various traffic scales (RPM ranges based on niche averages)"));

mainChildren.push(heading2("2.4 Paid Amplification Strategy"));
mainChildren.push(bodyPara("The paid amplification strategy follows a \"boost the winner\" philosophy. Rather than investing equally in all posts, the approach is to:"));
mainChildren.push(numberedItem("nl-2", "Post organic content and monitor performance for the first 2-4 hours."));
mainChildren.push(numberedItem("nl-2", "Identify top-performing posts based on engagement rate (likes, comments, shares relative to impressions)."));
mainChildren.push(numberedItem("nl-2", "Boost only the top 10-20% of posts with a modest advertising budget ($5-$20 per boost)."));
mainChildren.push(numberedItem("nl-2", "Scale winning posts progressively, increasing the budget for posts that continue to perform."));
mainChildren.push(bodyPara("This data-driven approach maximizes return on advertising spend by concentrating resources on content that has already demonstrated organic appeal."));

// ─── Chapter 3: The Content Creation Formula ───────────────────────
mainChildren.push(heading1("Chapter 3: The Content Creation Formula"));

mainChildren.push(heading2("3.1 Six Content Archetypes"));
mainChildren.push(bodyPara("The most successful home tips pages consistently use six content archetypes that drive the highest engagement. Each archetype leverages specific psychological triggers to capture attention and compel interaction."));

mainChildren.push(heading3("1. Hidden Superpower"));
mainChildren.push(bodyParaRuns([
  new TextRun({ text: "Headline Formula: ", bold: true, font: "Calibri", size: 22, color: C.primary }),
  new TextRun({ text: "\"I [used item] to [solve problem]. This is what happened\"", font: "Calibri", size: 22, color: C.body }),
]));
mainChildren.push(bodyPara("This archetype reveals a surprising or unexpected use for a common household item. The first-person perspective creates authenticity and relatability. The curiosity gap in \"This is what happened\" compels users to click through. This is the highest-performing archetype in the niche, consistently driving 5-15% engagement rates."));

mainChildren.push(heading3("2. Time-Based Experiment"));
mainChildren.push(bodyParaRuns([
  new TextRun({ text: "Headline Formula: ", bold: true, font: "Calibri", size: 22, color: C.primary }),
  new TextRun({ text: "\"I [action] every [time] for [X] days...\"", font: "Calibri", size: 22, color: C.body }),
]));
mainChildren.push(bodyPara("This archetype adds a time-based commitment element that creates anticipation and credibility. By specifying an exact timeframe (e.g., \"every night for 30 days\"), the content implies a genuine experiment with real results. The time element also naturally leads to before/after comparisons that drive curiosity."));

mainChildren.push(heading3("3. Number List"));
mainChildren.push(bodyParaRuns([
  new TextRun({ text: "Headline Formula: ", bold: true, font: "Calibri", size: 22, color: C.primary }),
  new TextRun({ text: "\"Don't toss those old [item]! Here are [X] clever ways...\"", font: "Calibri", size: 22, color: C.body }),
]));
mainChildren.push(bodyPara("List-based content is a staple of social media because it sets clear expectations and promises value. The \"Don't toss\" opening creates an emotional trigger around waste prevention, while the numbered list format implies comprehensive, organized information that users can save and reference later."));

mainChildren.push(heading3("4. Budget Genius"));
mainChildren.push(bodyParaRuns([
  new TextRun({ text: "Headline Formula: ", bold: true, font: "Calibri", size: 22, color: C.primary }),
  new TextRun({ text: "\"[Simple action] saved me $[X] a month on [expense]\"", font: "Calibri", size: 22, color: C.body }),
]));
mainChildren.push(bodyPara("Money-saving content consistently performs well across all demographics. The specificity of dollar amounts adds credibility, and the promise of financial benefit creates strong motivation to click through. This archetype works particularly well when paired with utility bills, grocery costs, or home maintenance expenses."));

mainChildren.push(heading3("5. Stop Doing This"));
mainChildren.push(bodyParaRuns([
  new TextRun({ text: "Headline Formula: ", bold: true, font: "Calibri", size: 22, color: C.primary }),
  new TextRun({ text: "\"Stop [common action]! Here's what you should do instead\"", font: "Calibri", size: 22, color: C.body }),
]));
mainChildren.push(bodyPara("Contrarian advice creates a pattern interrupt that stops users from scrolling. By challenging a commonly held belief or practice, this archetype triggers curiosity and concern (\"Am I doing this wrong?\"). The corrective advice that follows positions the page as a trusted authority."));

mainChildren.push(heading3("6. Simple Genius"));
mainChildren.push(bodyParaRuns([
  new TextRun({ text: "Headline Formula: ", bold: true, font: "Calibri", size: 22, color: C.primary }),
  new TextRun({ text: "\"I put [common item] on [surface/object]. The result was genius\"", font: "Calibri", size: 22, color: C.body }),
]));
mainChildren.push(bodyPara("This archetype celebrates the simplicity and cleverness of everyday solutions. The contrast between the mundane action and the \"genius\" result creates intrigue. These posts often go viral because they are highly shareable, with users tagging friends who would appreciate the tip."));

mainChildren.push(heading2("3.2 Universal Caption Formula"));
mainChildren.push(bodyPara("Every post caption should follow a structured formula designed to maximize click-through rate while maintaining authenticity. The formula consists of five components:"));

mainChildren.push(makeTable([1800, 7800], [
  new TableRow({
    tableHeader: true,
    children: [headerCell("Component", 1800), headerCell("Description & Example", 7800)],
  }),
  new TableRow({ children: [dataCell("Hook", 1800, {center:true}), dataCell("\"I put [X] in [Y]...\" - Immediately establishes action and context", 7800)] }),
  new TableRow({ children: [dataCell("Timeframe", 1800, {center:true, shade: C.tableHeader}), dataCell("\"every night for 30 days\" - Adds credibility and suggests a real experiment", 7800, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Curiosity Gap", 1800, {center:true}), dataCell("\"This is what happened\" - The payoff tease that drives clicks", 7800)] }),
  new TableRow({ children: [dataCell("Engagement CTA", 1800, {center:true, shade: C.tableHeader}), dataCell("\"(pic in cmt)\" - Encourages comments to boost algorithmic reach", 7800, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Optional Question", 1800, {center:true}), dataCell("\"Have you tried this?\" - Drives additional comments and engagement", 7800)] }),
]));
mainChildren.push(tableCaption("Table 2: Universal Caption Formula components"));

mainChildren.push(heading3("Caption Rules"));
mainChildren.push(bulletItem("bl-3", "Always use first person (\"I\") - personal voice drives 3x more engagement than impersonal statements"));
mainChildren.push(bulletItem("bl-3", "Include a specific timeframe - vague claims underperform specific experiments"));
mainChildren.push(bulletItem("bl-3", "Keep captions under 25 words - shorter captions get higher reach"));
mainChildren.push(bulletItem("bl-3", "Never use hashtags - Facebook deprioritizes hashtag-heavy posts in the feed"));
mainChildren.push(bulletItem("bl-3", "Always include \"(pic in cmt)\" or \"(link in cmt)\" - this drives comments which boost algorithmic visibility"));

// ─── Chapter 4: Visual Design System ───────────────────────────────
mainChildren.push(heading1("Chapter 4: Visual Design System"));

mainChildren.push(heading2("4.1 Post Card Layout"));
mainChildren.push(bodyPara("Every Facebook post follows a consistent visual template designed for maximum stop-and-scroll impact:"));
mainChildren.push(bulletItem("bl-4", "Format: 1:1 square (1080x1080 pixels) for optimal display in the Facebook feed"));
mainChildren.push(bulletItem("bl-4", "Background: Solid colored background that fills the entire canvas"));
mainChildren.push(bulletItem("bl-4", "Thumbnail: A centered product or household item image, typically 300-500px, placed in the center or lower third"));
mainChildren.push(bulletItem("bl-4", "Text Overlay: Large, bold white text at the top of the image, 2-3 lines maximum, describing the action or hack"));
mainChildren.push(bulletItem("bl-4", "Font: Sans-serif, bold, with a subtle shadow or outline for readability"));

mainChildren.push(heading2("4.2 Color Palette"));
mainChildren.push(bodyPara("A rotating color palette creates visual variety while maintaining brand consistency. The following eight colors form the core palette:"));

mainChildren.push(makeTable([1400, 1600, 2400, 2200, 2000], [
  new TableRow({
    tableHeader: true,
    children: [
      headerCell("Color", 1400),
      headerCell("Hex Code", 1600),
      headerCell("Use Frequency", 2400),
      headerCell("Psychological Effect", 2200),
      headerCell("Best For", 2000),
    ],
  }),
  new TableRow({ children: [dataCell("Red", 1400, {center:true}), dataCell("#E74C3C", 1600, {center:true}), dataCell("High (20%)", 2400, {center:true}), dataCell("Urgency, excitement, attention", 2200), dataCell("Top-performing posts", 2000)] }),
  new TableRow({ children: [dataCell("Blue", 1400, {center:true, shade: C.tableHeader}), dataCell("#3498DB", 1600, {center:true, shade: C.tableHeader}), dataCell("High (18%)", 2400, {center:true, shade: C.tableHeader}), dataCell("Trust, calm, reliability", 2200, {shade: C.tableHeader}), dataCell("Cleaning tips", 2000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Green", 1400, {center:true}), dataCell("#27AE60", 1600, {center:true}), dataCell("Medium (15%)", 2400, {center:true}), dataCell("Growth, freshness, nature", 2200), dataCell("Eco-friendly tips", 2000)] }),
  new TableRow({ children: [dataCell("Purple", 1400, {center:true, shade: C.tableHeader}), dataCell("#8E44AD", 1600, {center:true, shade: C.tableHeader}), dataCell("Medium (12%)", 2400, {center:true, shade: C.tableHeader}), dataCell("Creativity, luxury, mystery", 2200, {shade: C.tableHeader}), dataCell("Unusual hacks", 2000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Orange", 1400, {center:true}), dataCell("#E67E22", 1600, {center:true}), dataCell("Medium (12%)", 2400, {center:true}), dataCell("Energy, warmth, enthusiasm", 2200), dataCell("DIY projects", 2000)] }),
  new TableRow({ children: [dataCell("Teal", 1400, {center:true, shade: C.tableHeader}), dataCell("#1ABC9C", 1600, {center:true, shade: C.tableHeader}), dataCell("Low (10%)", 2400, {center:true, shade: C.tableHeader}), dataCell("Clarity, sophistication", 2200, {shade: C.tableHeader}), dataCell("Kitchen tips", 2000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Yellow", 1400, {center:true}), dataCell("#F1C40F", 1600, {center:true}), dataCell("Low (8%)", 2400, {center:true}), dataCell("Optimism, happiness, caution", 2200), dataCell("Budget tips", 2000)] }),
  new TableRow({ children: [dataCell("Pink", 1400, {center:true, shade: C.tableHeader}), dataCell("#E91E63", 1600, {center:true, shade: C.tableHeader}), dataCell("Low (5%)", 2400, {center:true, shade: C.tableHeader}), dataCell("Playfulness, warmth, care", 2200, {shade: C.tableHeader}), dataCell("Family/organizing", 2000, {shade: C.tableHeader})] }),
]));
mainChildren.push(tableCaption("Table 3: Color palette with usage frequency and psychological associations"));

mainChildren.push(heading2("4.3 Image Composition Rules"));
mainChildren.push(bodyPara("The thumbnail images used in post cards follow specific composition rules to maximize visual appeal and shareability:"));
mainChildren.push(bulletItem("bl-5", "Subject Isolation: Photograph the item against a plain, clean background. Remove distractions and clutter. The item should be the clear focal point."));
mainChildren.push(bulletItem("bl-5", "Close-Up Framing: Fill the frame with the subject. Close-up shots create intimacy and detail that make the \"hack\" feel tangible and achievable."));
mainChildren.push(bulletItem("bl-5", "Before/After Format: For transformation-based posts, use a side-by-side or split-frame before/after format. This is the most engaging visual format in the niche."));
mainChildren.push(bulletItem("bl-5", "Natural Lighting: Use soft, natural lighting whenever possible. Harsh flash photography reduces perceived quality and authenticity."));
mainChildren.push(bulletItem("bl-5", "No Faces: Avoid showing people's faces. Posts with product-only images consistently outperform those with people, as they are more universally relatable and avoid privacy concerns."));

mainChildren.push(heading2("4.4 Sample Post Images"));
mainChildren.push(bodyPara("The following images demonstrate the post card design system in practice. Each example shows the square format, colored background, centered product thumbnail, and white text overlay that define the brand's visual identity."));

// Sample images
mainChildren.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 80 },
  children: [new ImageRun({
    type: "png",
    data: img1,
    transformation: { width: 350, height: 350 },
    altText: { title: "Sample Post 1", description: "Example of home tips post card design", name: "sample1" },
  })],
}));
mainChildren.push(tableCaption("Figure 1: Sample post card demonstrating the standard layout with colored background and text overlay"));

mainChildren.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 80 },
  children: [new ImageRun({
    type: "png",
    data: img2,
    transformation: { width: 350, height: 350 },
    altText: { title: "Sample Post 2", description: "Example of home tips post card design variant", name: "sample2" },
  })],
}));
mainChildren.push(tableCaption("Figure 2: Sample post card showing color variation and product-focused thumbnail"));

mainChildren.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 80 },
  children: [new ImageRun({
    type: "png",
    data: img3,
    transformation: { width: 350, height: 350 },
    altText: { title: "Sample Post 3", description: "Example of home tips post card design variant", name: "sample3" },
  })],
}));
mainChildren.push(tableCaption("Figure 3: Sample post card with different color palette and layout composition"));

// ─── Chapter 5: Posting Strategy ───────────────────────────────────
mainChildren.push(heading1("Chapter 5: Posting Strategy"));

mainChildren.push(heading2("5.1 Posting Frequency"));
mainChildren.push(bodyPara("Posting frequency should be calibrated to your page's growth stage. The following table outlines recommended posting frequency based on follower count and business maturity:"));

mainChildren.push(makeTable([2200, 2200, 2600, 2600], [
  new TableRow({
    tableHeader: true,
    children: [headerCell("Stage", 2200), headerCell("Follower Count", 2200), headerCell("Posts Per Day", 2600), headerCell("Focus", 2600)],
  }),
  new TableRow({ children: [dataCell("Launch", 2200, {center:true}), dataCell("0 - 1,000", 2200, {center:true}), dataCell("3 - 5", 2600, {center:true}), dataCell("Building initial content library", 2600)] }),
  new TableRow({ children: [dataCell("Growth", 2200, {center:true, shade: C.tableHeader}), dataCell("1,000 - 50,000", 2200, {center:true, shade: C.tableHeader}), dataCell("3 - 4", 2600, {center:true, shade: C.tableHeader}), dataCell("Finding top-performing formats", 2600, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Scaling", 2200, {center:true}), dataCell("50,000 - 500,000", 2200, {center:true}), dataCell("2 - 3", 2600, {center:true}), dataCell("Quality over quantity, boost winners", 2600)] }),
  new TableRow({ children: [dataCell("Mature", 2200, {center:true, shade: C.tableHeader}), dataCell("500,000+", 2200, {center:true, shade: C.tableHeader}), dataCell("1 - 2", 2600, {center:true, shade: C.tableHeader}), dataCell("High-quality content + paid amplification", 2600, {shade: C.tableHeader})] }),
]));
mainChildren.push(tableCaption("Table 4: Recommended posting frequency by growth stage"));

mainChildren.push(heading2("5.2 Optimal Posting Times"));
mainChildren.push(bodyPara("Analysis of top-performing posts in the home tips niche reveals three peak engagement windows. Posting during these times maximizes initial engagement, which signals the algorithm to increase distribution:"));
mainChildren.push(bulletItem("bl-6", "Morning Peak (7:00 AM - 9:00 AM): Users check Facebook during breakfast and morning routines. This is the best window for quick tips and productivity hacks."));
mainChildren.push(bulletItem("bl-6", "Lunch Peak (12:00 PM - 2:00 PM): Mid-day browsing during lunch breaks. Ideal for longer-form tips, DIY projects, and cleaning hacks."));
mainChildren.push(bulletItem("bl-6", "Evening Peak (6:00 PM - 9:00 PM): The highest engagement window overall. Users are relaxed and browsing. Best for before/after transformations and budget-saving tips."));

mainChildren.push(heading2("5.3 Content Rotation Strategy"));
mainChildren.push(bodyPara("To maintain audience interest and avoid fatigue, rotate through the six content archetypes on a weekly schedule. This ensures variety while maintaining consistent engagement patterns:"));

mainChildren.push(makeTable([1600, 2000, 3000, 3000], [
  new TableRow({
    tableHeader: true,
    children: [headerCell("Day", 1600), headerCell("Primary Archetype", 2000), headerCell("Secondary Archetype", 3000), headerCell("Content Theme", 3000)],
  }),
  new TableRow({ children: [dataCell("Monday", 1600, {center:true}), dataCell("Hidden Superpower", 2000, {center:true}), dataCell("Simple Genius", 3000, {center:true}), dataCell("Kitchen & Cleaning", 3000)] }),
  new TableRow({ children: [dataCell("Tuesday", 1600, {center:true, shade: C.tableHeader}), dataCell("Budget Genius", 2000, {center:true, shade: C.tableHeader}), dataCell("Number List", 3000, {center:true, shade: C.tableHeader}), dataCell("Money-Saving Hacks", 3000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Wednesday", 1600, {center:true}), dataCell("Time-Based Experiment", 2000, {center:true}), dataCell("Hidden Superpower", 3000, {center:true}), dataCell("Bathroom & Laundry", 3000)] }),
  new TableRow({ children: [dataCell("Thursday", 1600, {center:true, shade: C.tableHeader}), dataCell("Stop Doing This", 2000, {center:true, shade: C.tableHeader}), dataCell("Simple Genius", 3000, {center:true, shade: C.tableHeader}), dataCell("Common Mistakes", 3000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Friday", 1600, {center:true}), dataCell("Number List", 2000, {center:true}), dataCell("Budget Genius", 3000, {center:true}), dataCell("Weekend Projects", 3000)] }),
  new TableRow({ children: [dataCell("Saturday", 1600, {center:true, shade: C.tableHeader}), dataCell("Hidden Superpower", 2000, {center:true, shade: C.tableHeader}), dataCell("Time-Based Experiment", 3000, {center:true, shade: C.tableHeader}), dataCell("Gardening & Outdoor", 3000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Sunday", 1600, {center:true}), dataCell("Simple Genius", 2000, {center:true}), dataCell("Budget Genius", 3000, {center:true}), dataCell("Organization & Declutter", 3000)] }),
]));
mainChildren.push(tableCaption("Table 5: Weekly content rotation schedule"));

// ─── Chapter 6: Growth Strategy ────────────────────────────────────
mainChildren.push(heading1("Chapter 6: Growth Strategy"));

mainChildren.push(heading2("6.1 Phase 1: Foundation (Weeks 1-4)"));
mainChildren.push(bodyPara("The foundation phase focuses on establishing your page infrastructure and building an initial content library. Key activities include:"));
mainChildren.push(bulletItem("bl-7", "Page Setup: Create your Facebook Business Page with a professional cover photo, profile picture, and complete all business information including website link and contact details."));
mainChildren.push(bulletItem("bl-7", "Content Calendar: Plan 4 weeks of content in advance using the archetype rotation system. Pre-create all post images and write all captions."));
mainChildren.push(bulletItem("bl-7", "Consistent Posting: Post 3-5 times per day during the optimal posting windows identified in Chapter 5."));
mainChildren.push(bulletItem("bl-7", "Comment Engagement: Respond to every comment within 1 hour during the first month. This signals to the algorithm that your page is active and builds community."));
mainChildren.push(bulletItem("bl-7", "Data Tracking: Begin tracking post performance daily using Meta Business Suite. Note which archetypes, colors, and topics perform best."));

mainChildren.push(heading2("6.2 Phase 2: Acceleration (Weeks 5-12)"));
mainChildren.push(bodyPara("Once you have 4-8 weeks of performance data, shift focus to accelerating growth through data-driven optimization:"));
mainChildren.push(bulletItem("bl-8", "Identify Top Posts: Analyze your top 10% of posts by engagement rate. Identify common themes, archetypes, colors, and topics that drive the highest engagement."));
mainChildren.push(bulletItem("bl-8", "Boost Winners: Begin the \"boost the winner\" paid amplification strategy. Start with $5-10 per boost on posts that show organic traction."));
mainChildren.push(bulletItem("bl-8", "Cross-Promote: Share your top content in relevant Facebook Groups. Engage authentically in group discussions before sharing links."));
mainChildren.push(bulletItem("bl-8", "Reels Integration: Create short-form Reel versions of your best-performing posts. Reels receive preferential distribution and can reach non-followers."));
mainChildren.push(bulletItem("bl-8", "Audience Refinement: Use Meta Insights to understand your audience demographics and adjust content strategy accordingly."));

mainChildren.push(heading2("6.3 Phase 3: Scale (Month 4+)"));
mainChildren.push(bodyPara("With a growing audience and proven content formulas, focus shifts to scaling revenue and operations:"));
mainChildren.push(bulletItem("bl-9", "Launch Website: Set up your content website on WordPress with a clean, fast-loading theme optimized for ad placement. Begin publishing full articles linked to your Facebook posts."));
mainChildren.push(bulletItem("bl-9", "Increase Paid Spend: Gradually increase your paid amplification budget as you identify reliable winning content patterns. Target a 3:1 or better revenue-to-spend ratio."));
mainChildren.push(bulletItem("bl-9", "Content Batching: Produce content in batches. Schedule one full week of content in a single session to improve efficiency and consistency."));
mainChildren.push(bulletItem("bl-9", "Second Page Launch: Once your first page reaches 50,000+ followers, consider launching a second page targeting a related sub-niche (e.g., cooking tips, gardening)."));
mainChildren.push(bulletItem("bl-9", "Team Building: Begin outsourcing content creation to freelance writers and designers. Focus your time on strategy, analytics, and growth."));

// ─── Chapter 7: Monetization Blueprint ─────────────────────────────
mainChildren.push(heading1("Chapter 7: Monetization Blueprint"));

mainChildren.push(heading2("7.1 Display Advertising"));
mainChildren.push(bodyPara("Display advertising is the primary revenue engine for this business model. The progression follows a tiered approach based on traffic volume:"));

mainChildren.push(heading3("Tier 1: Google AdSense"));
mainChildren.push(bodyPara("Begin with Google AdSense as your first ad network. Requirements are minimal (any traffic level), and setup takes less than a day. Expect RPMs of $2-5 in the home improvement niche. Focus on proper ad placement: one leaderboard ad at the top of each article, one in-content ad after the second paragraph, and one sidebar ad."));

mainChildren.push(heading3("Tier 2: Mediavine"));
mainChildren.push(bodyPara("Mediavine is the premier premium ad network for lifestyle and home content. Requirements include 50,000 sessions per month, original content, and a clean website design. Mediavine delivers RPMs of $15-35, significantly higher than AdSense. Their programmatic header bidding technology maximizes ad revenue through real-time competition between advertisers."));

mainChildren.push(heading3("Tier 3: Ezoic"));
mainChildren.push(bodyPara("Ezoic serves as an excellent mid-tier option between AdSense and Mediavine. With requirements as low as 10,000 monthly sessions, Ezoic uses AI to optimize ad placement and delivers RPMs of $8-20. They also offer additional features like automated site speed optimization and multivariate testing."));

mainChildren.push(heading3("SEO Optimization"));
mainChildren.push(bodyPara("To maximize organic traffic to your content website, implement fundamental SEO practices:"));
mainChildren.push(bulletItem("bl-10", "Keyword Research: Target long-tail keywords related to each post topic (e.g., \"how to clean showerhead with vinegar overnight\")"));
mainChildren.push(bulletItem("bl-10", "Content Length: Aim for 800-1,500 words per article to provide comprehensive coverage of each topic"));
mainChildren.push(bulletItem("bl-10", "Internal Linking: Link between related articles to build site architecture and keep visitors on-site longer"));
mainChildren.push(bulletItem("bl-10", "Site Speed: Optimize images, enable caching, and use a CDN to achieve load times under 3 seconds"));

mainChildren.push(heading2("7.2 Affiliate Marketing"));
mainChildren.push(bodyPara("Affiliate marketing provides a complementary revenue stream by earning commissions on product recommendations within your content:"));
mainChildren.push(bulletItem("bl-11", "Amazon Associates: The most accessible program, offering 1-4% commissions on a vast product catalog. Link to cleaning supplies, tools, and home products mentioned in your articles."));
mainChildren.push(bulletItem("bl-11", "Home Depot / Lowe's Affiliate Programs: These programs offer 3-6% commissions on home improvement products with high average order values ($50-200+), making them highly profitable for relevant content."));
mainChildren.push(bulletItem("bl-11", "Specialty Programs: Seek out niche-specific programs such as Brandless, Grove Collaborative, or Blueland for eco-friendly cleaning products, which align perfectly with the home tips audience."));

mainChildren.push(heading2("7.3 Sponsored Content"));
mainChildren.push(bodyPara("As your audience grows, brands will pay to reach your followers directly. Pricing benchmarks for sponsored posts in the home tips niche:"));

mainChildren.push(makeTable([2400, 2400, 2400, 2400], [
  new TableRow({
    tableHeader: true,
    children: [headerCell("Follower Count", 2400), headerCell("Per Post Rate", 2400), headerCell("Per Story Rate", 2400), headerCell("Monthly Package", 2400)],
  }),
  new TableRow({ children: [dataCell("10,000 - 50,000", 2400, {center:true}), dataCell("$50 - $150", 2400, {center:true}), dataCell("$25 - $75", 2400, {center:true}), dataCell("$200 - $500", 2400, {center:true})] }),
  new TableRow({ children: [dataCell("50,000 - 250,000", 2400, {center:true, shade: C.tableHeader}), dataCell("$150 - $500", 2400, {center:true, shade: C.tableHeader}), dataCell("$75 - $250", 2400, {center:true, shade: C.tableHeader}), dataCell("$500 - $2,000", 2400, {center:true, shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("250,000 - 1,000,000", 2400, {center:true}), dataCell("$500 - $2,000", 2400, {center:true}), dataCell("$250 - $1,000", 2400, {center:true}), dataCell("$2,000 - $8,000", 2400, {center:true})] }),
  new TableRow({ children: [dataCell("1,000,000+", 2400, {center:true, shade: C.tableHeader}), dataCell("$2,000 - $10,000+", 2400, {center:true, shade: C.tableHeader}), dataCell("$1,000 - $5,000+", 2400, {center:true, shade: C.tableHeader}), dataCell("$8,000 - $40,000+", 2400, {center:true, shade: C.tableHeader})] }),
]));
mainChildren.push(tableCaption("Table 6: Sponsored content pricing benchmarks by follower count"));

// ─── Chapter 8: Essential Tools & Resources ────────────────────────
mainChildren.push(heading1("Chapter 8: Essential Tools & Resources"));
mainChildren.push(bodyPara("The following tools are essential for building and running a profitable home tips Facebook page and content website. Each tool has been selected for its reliability, value, and relevance to this specific business model."));

mainChildren.push(makeTable([2000, 1400, 1200, 5000], [
  new TableRow({
    tableHeader: true,
    children: [headerCell("Tool", 2000), headerCell("Category", 1400), headerCell("Cost", 1200), headerCell("Purpose", 5000)],
  }),
  new TableRow({ children: [dataCell("Canva Pro", 2000), dataCell("Design", 1400, {center:true}), dataCell("$13/mo", 1200, {center:true}), dataCell("Create post card images with templates and brand kit", 5000)] }),
  new TableRow({ children: [dataCell("AI Image Generator", 2000, {shade: C.tableHeader}), dataCell("AI Tools", 1400, {center:true, shade: C.tableHeader}), dataCell("$10-20/mo", 1200, {center:true, shade: C.tableHeader}), dataCell("Generate product thumbnail images for post cards", 5000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("ChatGPT / Claude", 2000), dataCell("AI Writing", 1400, {center:true}), dataCell("$20/mo", 1200, {center:true}), dataCell("Draft captions, article outlines, and content ideas", 5000)] }),
  new TableRow({ children: [dataCell("Meta Business Suite", 2000, {shade: C.tableHeader}), dataCell("Social Mgmt", 1400, {center:true, shade: C.tableHeader}), dataCell("Free", 1200, {center:true, shade: C.tableHeader}), dataCell("Schedule posts, track analytics, manage pages", 5000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("WordPress", 2000), dataCell("CMS", 1400, {center:true}), dataCell("Free*", 1200, {center:true}), dataCell("Content website platform with extensive plugin ecosystem", 5000)] }),
  new TableRow({ children: [dataCell("SiteGround", 2000, {shade: C.tableHeader}), dataCell("Hosting", 1400, {center:true, shade: C.tableHeader}), dataCell("$3-6/mo", 1200, {center:true, shade: C.tableHeader}), dataCell("Fast, reliable WordPress hosting with good support", 5000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Yoast SEO", 2000), dataCell("SEO Plugin", 1400, {center:true}), dataCell("$99/yr", 1200, {center:true}), dataCell("On-page SEO optimization for WordPress content", 5000)] }),
  new TableRow({ children: [dataCell("Google AdSense", 2000, {shade: C.tableHeader}), dataCell("Ad Network", 1400, {center:true, shade: C.tableHeader}), dataCell("Free", 1200, {center:true, shade: C.tableHeader}), dataCell("Entry-level display advertising monetization", 5000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Mediavine", 2000), dataCell("Ad Network", 1400, {center:true}), dataCell("Free*", 1200, {center:true}), dataCell("Premium ad network with high RPMs for lifestyle content", 5000)] }),
  new TableRow({ children: [dataCell("Google Analytics", 2000, {shade: C.tableHeader}), dataCell("Analytics", 1400, {center:true, shade: C.tableHeader}), dataCell("Free", 1200, {center:true, shade: C.tableHeader}), dataCell("Track website traffic, user behavior, and conversions", 5000, {shade: C.tableHeader})] }),
  new TableRow({ children: [dataCell("Meta Insights", 2000), dataCell("Analytics", 1400, {center:true}), dataCell("Free", 1200, {center:true}), dataCell("Facebook page performance metrics and audience demographics", 5000)] }),
  new TableRow({ children: [dataCell("Mailchimp", 2000, {shade: C.tableHeader}), dataCell("Email Mktg", 1400, {center:true, shade: C.tableHeader}), dataCell("Free tier", 1200, {center:true, shade: C.tableHeader}), dataCell("Build email list for additional traffic and revenue channel", 5000, {shade: C.tableHeader})] }),
]));
mainChildren.push(tableCaption("Table 7: Essential tools and resources for the home tips media business (*costs vary by usage)"));

// ─── Chapter 9: Risk Mitigation & Compliance ───────────────────────
mainChildren.push(heading1("Chapter 9: Risk Mitigation & Compliance"));

mainChildren.push(heading2("9.1 Facebook Policy Compliance"));
mainChildren.push(bodyPara("Maintaining compliance with Facebook's policies is critical for long-term page health. Violations can result in reduced reach, content removal, or even page deletion. Key areas to monitor:"));

mainChildren.push(heading3("Clickbait Prevention"));
mainChildren.push(bodyPara("Facebook actively reduces the reach of posts that use clickbait tactics. To stay compliant, ensure that your captions accurately represent the content behind the link. The curiosity gap (\"This is what happened\") is acceptable because the linked article does deliver the promised result. However, avoid exaggerated claims like \"You won't BELIEVE what happened next!!!\""));

mainChildren.push(heading3("Engagement Bait"));
mainChildren.push(bodyPara("Facebook penalizes posts that explicitly ask for engagement through manipulative tactics. Avoid phrases like \"Like if you agree,\" \"Share to save a life,\" or \"Comment YES if you want more.\" The \"(pic in cmt)\" approach is acceptable because it provides genuine value to users rather than artificially inflating engagement metrics."));

mainChildren.push(heading3("Copyright Compliance"));
mainChildren.push(bodyPara("Use only original images, properly licensed stock photos, or AI-generated images. Never download and repost images from other pages or websites. For AI-generated images, review the specific tool's licensing terms to ensure commercial use is permitted. Keep records of image sources for each post."));

mainChildren.push(heading3("Community Standards"));
mainChildren.push(bodyPara("All content must comply with Facebook's Community Standards. This includes avoiding misleading health claims (e.g., \"This cures disease\"), dangerous activities, and hate speech. When sharing cleaning tips, ensure that recommended products and combinations are safe (e.g., never recommend mixing bleach and ammonia)."));

mainChildren.push(heading2("9.2 FTC Disclosure Requirements"));
mainChildren.push(bodyPara("The Federal Trade Commission requires clear disclosure of material connections between content creators and brands. Key requirements for your business:"));
mainChildren.push(bulletItem("bl-12", "Affiliate Links: Clearly disclose that links in your articles are affiliate links. Use a disclosure statement at the top of each article containing affiliate links (e.g., \"This post contains affiliate links. We may earn a commission if you purchase through these links at no extra cost to you.\")"));
mainChildren.push(bulletItem("bl-12", "Sponsored Content: Clearly label all sponsored posts with #ad or #sponsored. Place the disclosure prominently at the beginning of the caption, not buried at the end."));
mainChildren.push(bulletItem("bl-12", "Free Products: If you receive free products in exchange for a review or mention, disclose this relationship clearly."));
mainChildren.push(bulletItem("bl-12", "Endorsement Guidelines: Only endorse products you have personally used or thoroughly researched. Do not make claims about products that cannot be substantiated."));

// ─── Chapter 10: 20 Ready-to-Use Post Templates ───────────────────
mainChildren.push(heading1("Chapter 10: 20 Ready-to-Use Post Templates"));
mainChildren.push(bodyPara("The following table provides 20 complete, ready-to-publish post templates. Each includes the topic, caption, recommended background color, and content archetype. Simply create the post card image following the design guidelines in Chapter 4, copy the caption, and publish during one of the optimal posting windows from Chapter 5."));

const templates = [
  ["1", "Dishwasher Tablet Shower Drain", "\"I put a dishwasher tablet in my shower drain every week for a month. This is what happened (pic in cmt)\"", "Red", "Hidden Superpower"],
  ["2", "Mayonnaise Wood Cabinets", "\"I wiped my dull wood cabinets with mayonnaise. You won't believe the results (pic in cmt)\"", "Blue", "Hidden Superpower"],
  ["3", "Aluminum Foil Microwave", "\"I put a ball of aluminum foil in my microwave every day for 2 weeks. This is what happened (pic in cmt)\"", "Green", "Curiosity Experiment"],
  ["4", "Baking Soda Toilet", "\"I poured baking soda and vinegar in my toilet bowl every night before bed. After 14 days, this is what happened (pic in cmt)\"", "Purple", "Time-Based Experiment"],
  ["5", "Dryer Sheet Baseboards", "\"I rubbed a dryer sheet along every baseboard in my house. This is what happened (pic in cmt)\"", "Orange", "Hidden Superpower"],
  ["6", "Newspaper Mirror Trick", "\"I cleaned my bathroom mirror with crumpled newspaper instead of paper towels. The results were shocking (pic in cmt)\"", "Teal", "Stop Doing This"],
  ["7", "Lemon Salt Cutting Board", "\"I sprinkled coarse salt on my cutting board and scrubbed it with half a lemon. This is what happened (pic in cmt)\"", "Yellow", "Hidden Superpower"],
  ["8", "Pillowcase Ceiling Fan", "\"I put a pillowcase over each ceiling fan blade and pulled it off. The dust was unbelievable (pic in cmt)\"", "Pink", "Simple Genius"],
  ["9", "Vinegar Showerhead", "\"I tied a bag of vinegar around my showerhead overnight. After 30 days of doing this weekly, this is what happened (pic in cmt)\"", "Red", "Time-Based Experiment"],
  ["10", "Toothpaste Sink Polish", "\"I polished my stainless steel sink with white toothpaste. This is what happened (pic in cmt)\"", "Blue", "Hidden Superpower"],
  ["11", "Brick in Toilet Tank", "\"I put a brick inside my toilet tank to save water. After 3 months, this is what happened (pic in cmt)\"", "Green", "Budget Genius"],
  ["12", "Freezer Water Jugs", "\"I packed the empty spaces of my chest freezer with frozen water jugs for 3 weeks. This is what happened (pic in cmt)\"", "Purple", "Budget Genius"],
  ["13", "Donation Bag Every Room", "\"I put a donation bag in every room of my house for 21 days and added one item daily. This is what happened (pic in cmt)\"", "Orange", "Life Challenge"],
  ["14", "Unplug TV Every Night", "\"I unplugged my TV every night before bed for 30 days. My electric bill showed something incredible (pic in cmt)\"", "Teal", "Budget Genius"],
  ["15", "Pine-Sol Floor Wash", "\"I added Pine-Sol to my mop water instead of regular floor cleaner. After 2 weeks, this is what happened (pic in cmt)\"", "Yellow", "Hidden Superpower"],
  ["16", "Tea Bags Window Clean", "\"I brewed tea bags and used the water to clean my windows. This is what happened (pic in cmt)\"", "Pink", "Hidden Superpower"],
  ["17", "Tennis Ball Garage Door", "\"I hung a tennis ball from my garage ceiling so it touches my windshield. This is what happened (pic in cmt)\"", "Red", "Simple Genius"],
  ["18", "Cat Litter Oil Stain", "\"I poured cat litter on the oil stain in my driveway and left it overnight. This is what happened (pic in cmt)\"", "Blue", "Hidden Superpower"],
  ["19", "Denture Tablet Toilet", "\"I dropped a denture cleaning tablet into my toilet bowl every night for 30 days. This is what happened (pic in cmt)\"", "Green", "Time-Based Experiment"],
  ["20", "Cooking Spray Snow Shovel", "\"I sprayed cooking spray on my snow shovel before going outside. This is what happened (pic in cmt)\"", "Purple", "Simple Genius"],
];

const templateRows = [
  new TableRow({
    tableHeader: true,
    children: [
      headerCell("#", 500),
      headerCell("Topic", 1800),
      headerCell("Caption", 3800),
      headerCell("Color", 900),
      headerCell("Archetype", 2000),
    ],
  }),
];

templates.forEach((t, idx) => {
  const shade = idx % 2 === 1 ? C.tableHeader : undefined;
  templateRows.push(new TableRow({
    children: [
      dataCell(t[0], 500, { center: true, shade }),
      dataCell(t[1], 1800, { shade }),
      dataCell(t[2], 3800, { shade }),
      dataCell(t[3], 900, { center: true, shade }),
      dataCell(t[4], 2000, { center: true, shade }),
    ],
  }));
});

mainChildren.push(makeTable([500, 1800, 3800, 900, 2000], templateRows));
mainChildren.push(tableCaption("Table 8: 20 ready-to-use post templates with captions, colors, and archetypes"));

// ═══════════════════════════════════════════════════════════════════
// MAIN CONTENT SECTION CONFIG
// ═══════════════════════════════════════════════════════════════════
const mainSection = {
  properties: {
    page: {
      margin: { top: 1800, bottom: 1440, left: 1440, right: 1440 },
    },
  },
  headers: {
    default: new Header({
      children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Facebook Home Tips Money-Making Playbook", font: "Calibri", size: 18, color: C.secondary, italics: true })],
      })],
    }),
  },
  footers: {
    default: new Footer({
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Page ", font: "Calibri", size: 18, color: C.secondary }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: C.secondary }),
          new TextRun({ text: " of ", font: "Calibri", size: 18, color: C.secondary }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Calibri", size: 18, color: C.secondary }),
        ],
      })],
    }),
  },
  children: mainChildren,
};

// ═══════════════════════════════════════════════════════════════════
// BACK COVER SECTION
// ═══════════════════════════════════════════════════════════════════
const backCoverSection = {
  properties: {
    page: {
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      size: { width: 11906, height: 16838 },
    },
  },
  children: [
    new Paragraph({ spacing: { before: 6000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", font: "Calibri", size: 24, color: C.accent })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: "Start Building Your Profitable", font: "Times New Roman", size: 40, bold: true, color: C.primary })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [new TextRun({ text: "Home Tips Empire Today", font: "Times New Roman", size: 40, bold: true, color: C.primary })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", font: "Calibri", size: 24, color: C.accent })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [new TextRun({ text: "April 2026 Edition", font: "Times New Roman", size: 28, color: C.primary, bold: true })],
    }),
  ],
};

// ═══════════════════════════════════════════════════════════════════
// BUILD DOCUMENT
// ═══════════════════════════════════════════════════════════════════
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
        paragraph: { spacing: { before: 400, after: 200, line: 250 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: C.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150, line: 250 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: { config: [...bulletConfigs, ...numConfigs] },
  sections: [coverSection, tocSection, mainSection, backCoverSection],
});

// ═══════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════
const OUTPUT = "/home/z/my-project/download/Facebook_Home_Tips_Money_Making_Playbook.docx";

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUTPUT, buffer);
  const stats = fs.statSync(OUTPUT);
  console.log("SUCCESS:", OUTPUT);
  console.log("File size:", (stats.size / 1024).toFixed(1), "KB");
}).catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
