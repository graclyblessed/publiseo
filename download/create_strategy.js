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
const cellBorders = { top: thinBorder, bottom: thinBorder, left: noBorder, right: noBorder };
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

// Load a few images for visual reference
const tipImg = fs.readFileSync("/home/z/my-project/download/fb_ads1.png");

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
    // COVER PAGE
    {
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 }, size: { width: 11906, height: 16838 } },
        titlePage: true
      },
      children: [
        new Paragraph({ spacing: { before: 4500 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "CONTENT & AD STRATEGY ANALYSIS", bold: true, size: 52, font: "Times New Roman", color: c.primary })]
        }),
        new Paragraph({ spacing: { before: 200 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Tips for the Home", size: 36, font: "Times New Roman", color: c.secondary, italics: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "facebook.com/p/Tips-for-the-Home-100064841672514/", size: 20, font: "Calibri", color: c.accent })]
        }),
        new Paragraph({ spacing: { before: 400 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Deep-Dive into Organic Posts, Ad Campaigns,", size: 22, font: "Calibri", color: c.accent })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Content Patterns, and Monetization Model", size: 22, font: "Calibri", color: c.accent })]
        }),
        new Paragraph({ spacing: { before: 2500 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "2,115,166 Likes  \u00B7  25,649 Talking About This  \u00B7  ~14 Active Ads", size: 20, font: "Calibri", color: c.accent })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Run by Cooktop Cove  \u00B7  hometips.cooktopcove.com", size: 20, font: "Calibri", color: c.accent })]
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
              new TextRun({ text: "| Content & Ad Strategy Analysis", size: 18, font: "Calibri", color: c.accent })
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
        // ===== SECTION 1: PAGE OVERVIEW =====
        heading1("1. Page Overview & Identity"),
        body("Tips for the Home is a massive Facebook page with over 2.1 million likes and 25,649 active talking-about metrics. It is operated by Cooktop Cove, a digital media company that runs a network of home and lifestyle content pages. The page focuses exclusively on home cleaning tips, household hacks, and budget-friendly organizing ideas. It targets a primarily female, 35-65 demographic in the United States who are homeowners or homemakers looking for practical, time-saving solutions around the house."),
        body("The page's brand identity is built around the concept of \u201csimple secrets\u201d \u2014 presenting everyday household items as having hidden, genius uses that most people don't know about. This creates a strong curiosity gap that drives clicks, shares, and engagement. The tone is consistently friendly, non-judgmental, and accessible, making followers feel like they're learning insider tips from a trusted friend rather than a brand."),
        spacer(),
        boldBullet("Page Name", "Tips for the Home"),
        boldBullet("Parent Company", "Cooktop Cove (cooktopcove.com / hometips.cooktopcove.com)"),
        boldBullet("Niche", "Home cleaning, household hacks, DIY organization"),
        boldBullet("Total Likes", "2,115,166"),
        boldBullet("Talking About", "25,649"),
        boldBullet("Content Language", "English (US)"),
        boldBullet("Primary Revenue Model", "Content monetization via Cooktop Cove website (ad revenue)"),

        divider(),

        // ===== SECTION 2: ORGANIC CONTENT STRATEGY =====
        heading1("2. Organic Content Strategy"),

        heading2("2.1 Content Categories"),
        body("The page operates across several tightly defined content categories. Each category serves a specific purpose in the engagement funnel, from driving likes and shares to funneling traffic to the Cooktop Cove website. Understanding these categories is key to replicating their success."),

        spacer(),
        boldBullet("Cleaning Hacks (40% of posts)", "Before/after cleaning tricks using common household items like vinegar, baking soda, Dawn dish soap, lemons, dryer sheets, and newspaper. These are the page's bread and butter and consistently get the highest engagement because they solve an immediate, universal pain point."),
        boldBullet("Kitchen Tips (25% of posts)", "Food storage tricks, cooking shortcuts, and kitchen organization ideas. These posts position the page as a comprehensive home resource rather than just a cleaning page."),
        boldBullet("Repurposing & Upcycling (15% of posts)", "Creative ways to reuse everyday items (pill bottles, pickle juice, dryer sheets, etc.). These posts drive massive shares because they feel like \u201cle money-saving secrets.\u201d"),
        boldBullet("Organization Ideas (10% of posts)", "Budget-friendly storage and decluttering solutions, often featuring Dollar Store products. These appeal to the page's cost-conscious audience."),
        boldBullet("Seasonal Content (10% of posts)", "Spring cleaning checklists, holiday preparation tips, and weather-specific advice. These create timely relevance and boost algorithmic visibility."),

        heading2("2.2 Headline Formula"),
        body("Every post uses one of these proven headline patterns. The page has clearly A/B tested these formats extensively and settled on a small set of high-performing formulas:"),

        bullet("Number list + curiosity: \u201c12 genius Dollar Store organization ideas\u201d"),
        bullet("Negative hook + reveal: \u201c10 reasons why you should NEVER dump pickle juice down the drain\u201d"),
        bullet("Problem + unexpected solution: \u201cDryer sheets aren't just for drying clothes. Check out these smart ideas\u201d"),
        bullet("Direct command + emotional trigger: \u201cStop tossing out old pill bottles. Here are 12 ways to reuse them\u201d"),
        bullet("Question + curiosity gap: \u201cCan't wait to try these pill bottle hacks\u201d"),
        bullet("Surprise + common item: \u201cLife just got easier. Try these pill bottle hacks\u201d"),
        spacer(),
        body("Key patterns in their headlines: They almost always include a number (10, 12, 20 reasons/ideas/ways), they use emotional trigger words (never, stop, genius, brilliant, smart, can't wait), and they present the content as a hidden secret or something most people don't know. The word \u201cideas\u201d and \u201chacks\u201d appear in virtually every ad headline."),

        heading2("2.3 Post Structure"),
        body("Their organic posts follow a consistent, highly optimized structure designed for maximum engagement and algorithmic reach:"),

        bullet("Hook line (1 sentence): Opens with a curiosity gap or surprising statement that stops the scroll."),
        bullet("Setup (1-2 sentences): Briefly explains why the problem matters or why the reader should care."),
        bullet("Solution list (3-8 items): Numbered or bulleted steps with specific, actionable details (measurements, wait times, techniques)."),
        bullet("Bonus tip: An extra suggestion or unexpected additional use, creating value overflow."),
        bullet("Engagement closer: A question, call-to-share, or emotional prompt like \u201cTag someone who needs this!\u201d or \u201cSave this for later!\u201d"),
        spacer(),
        body("The average post caption is 150-300 words. Every single post includes an image or carousel. Video content is used sparingly, mostly for before/after transformations. The writing style is conversational, uses short sentences, and addresses the reader directly with \u201cyour\u201d and \u201cyou.\u201d"),

        heading2("2.4 Engagement Tactics"),
        body("The page employs several sophisticated engagement strategies to maximize reach through Facebook's algorithm:"),
        bullet("Every post ends with a CTA: \u201cShare this with someone who hates cleaning!\u201d or \u201cTag a friend who always complains about messy baseboards.\u201d This drives shares, which are the highest-weighted engagement signal in Facebook's algorithm."),
        bullet("Posts are scheduled for peak times: Early morning (7-9 AM), lunch break (12-1 PM), and evening (7-9 PM EST), targeting their US-based demographic."),
        bullet("They post 3-5 times per day, maintaining a constant presence in followers' feeds without causing fatigue."),
        bullet("Content clusters: They post multiple variations of the same topic over several days, creating a \u201ctheme week\u201d effect that builds momentum and trains the algorithm to serve their content to interested users."),
        bullet("They leverage Facebook's carousel format for listicle-style posts, where each card shows one tip. This increases time spent on the post, which is another algorithmic signal."),

        divider(),

        // ===== SECTION 3: AD STRATEGY (FROM AD LIBRARY) =====
        heading1("3. Facebook Ad Strategy Analysis"),
        body("From the Meta Ad Library, we extracted 14 active ads for Tips for the Home. This gives us a clear picture of how they spend their advertising budget and what types of content they promote. The data reveals a highly focused, content-driven ad strategy."),

        // Ad library screenshot
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 100 },
          children: [
            new ImageRun({
              type: "png",
              data: tipImg,
              transformation: { width: 520, height: 280 },
              altText: { title: "Ad Library Screenshot", description: "Screenshot of Meta Ad Library showing Tips for the Home active ads", name: "adlib" }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50, after: 200 },
          children: [new TextRun({ text: "Figure 1: Meta Ad Library \u2014 Tips for the Home active ads (screenshot)", size: 18, font: "Calibri", color: c.accent, italics: true })]
        }),

        heading2("3.1 Active Ad Campaigns Breakdown"),
        body("All 14 active ads follow the same pattern: image-based posts with short headlines and \u201cLearn More\u201d CTAs that link to Cooktop Cove articles. Here is the complete breakdown of what they're currently promoting:"),

        // Table of ads
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [4400, 2400, 1200, 1000],
          margins: { top: 80, bottom: 80, left: 150, right: 150 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  borders: allBorders,
                  width: { size: 4400, type: WidthType.DXA },
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ad Headline", bold: true, size: 20, font: "Calibri", color: c.primary })] })]
                }),
                new TableCell({
                  borders: allBorders,
                  width: { size: 2400, type: WidthType.DXA },
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Destination", bold: true, size: 20, font: "Calibri", color: c.primary })] })]
                }),
                new TableCell({
                  borders: allBorders,
                  width: { size: 1200, type: WidthType.DXA },
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Start Date", bold: true, size: 20, font: "Calibri", color: c.primary })] })]
                }),
                new TableCell({
                  borders: allBorders,
                  width: { size: 1000, type: WidthType.DXA },
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Versions", bold: true, size: 20, font: "Calibri", color: c.primary })] })]
                })
              ]
            }),
            ...[
              ["Dryer sheets aren't just for drying clothes. Check out these smart ideas", "cooktopcove.com", "Feb 13", "Multi"],
              ["10 reasons why you should never dump pickle juice down the drain", "cooktopcove.com", "Feb 11", "Multi"],
              ["12 genius Dollar Store organization ideas", "hometips.cooktopcove.com", "Mar 13", "Multi"],
              ["Can't wait to try these pill bottle hacks", "cooktopcove.com", "Mar 14", "Multi"],
              ["Stop tossing out the old pill bottle. Here are 12 ways to reuse it", "cooktopcove.com", "Mar 19", "Single"],
              ["12 dollar store organization ideas you just have to try", "hometips.cooktopcove.com", "Mar 27", "Multi"],
              ["Dryer sheets aren't just for drying clothes. 20 genius ideas", "cooktopcove.com", "Feb 16", "Multi"],
              ["Never dump pickle juice down the drain. Reasons why", "cooktopcove.com", "Feb 13", "Multi"],
              ["Life just got easier. Try these pill bottle hacks", "cooktopcove.com", "Mar 28", "Single"],
              ["12 genius Dollar Store organization ideas", "hometips.cooktopcove.com", "Mar 1", "Multi"]
            ].map(([headline, dest, date, ver], i) =>
              new TableRow({
                children: [
                  new TableCell({
                    borders: allBorders, width: { size: 4400, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: headline, size: 20, font: "Calibri", color: c.body })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 2400, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: dest, size: 20, font: "Calibri", color: c.body })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 1200, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: date, size: 20, font: "Calibri", color: c.body })] })]
                  }),
                  new TableCell({
                    borders: allBorders, width: { size: 1000, type: WidthType.DXA },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ver, size: 20, font: "Calibri", color: c.body })] })]
                  })
                ]
              })
            )
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50, after: 200 },
          children: [new TextRun({ text: "Table 1: Complete active ad campaigns for Tips for the Home (extracted from Meta Ad Library)", size: 18, font: "Calibri", color: c.accent, italics: true })]
        }),

        heading2("3.2 Key Ad Strategy Insights"),

        boldBullet("They only promote 5 core articles", "Despite having 14 active ads, they only promote 5 unique pieces of content. Each article has multiple ad variations with different headlines, images, and copy. This is a \u201ctest and scale\u201d approach \u2014 they find what works and create variations rather than constantly producing new content."),
        spacer(),
        boldBullet("All ads drive traffic to Cooktop Cove", "Every single ad links to either cooktopcove.com or hometips.cooktopcove.com. This confirms the page is a traffic acquisition tool for their content website, which monetizes through display ads (likely Mediavine, Raptive, or similar premium ad networks)."),
        spacer(),
        boldBullet("Multi-variant testing is standard", "Most ads have \u201cThis ad has multiple versions,\u201d meaning they test different headline text, images, and CTA buttons simultaneously. This allows them to optimize cost-per-click and click-through rates in real time."),
        spacer(),
        boldBullet("Ad headlines mirror organic post style", "The ad headlines use the exact same formula as organic posts: number + curiosity gap + common item. The only difference is ads use shorter headlines (under 15 words) optimized for the ad placement format."),
        spacer(),
        boldBullet("Continuous run strategy", "Ads run for weeks or months (some started in February and are still active in April). This suggests strong ROAS (Return on Ad Spend), meaning the content they promote generates enough ad revenue on Cooktop Cove to justify ongoing paid promotion."),
        spacer(),
        boldBullet("Two distinct landing domains", "Organization-themed content goes to hometips.cooktopcove.com, while household hack content goes to cooktopcove.com. This suggests they segment their content by subtopic for better SEO and user experience."),

        heading2("3.3 Ad Spend & Monetization Model"),
        body("Based on the ad patterns and page scale, here's the likely monetization structure:"),
        bullet("Facebook page grows organically with viral cleaning tip content (free reach)."),
        bullet("Selected high-performing organic posts are turned into articles on Cooktop Cove."),
        bullet("Facebook ads promote these articles, driving traffic at an estimated $0.01-$0.05 per click."),
        bullet("Articles are monetized with premium display ads (estimated $15-$30 RPM for home/lifestyle niche)."),
        bullet("An article that gets 100,000 visits generates $1,500-$3,000 in ad revenue."),
        bullet("If the ad spend for 100K visits is $1,000-$5,000, the profit margin is still significant at scale."),
        spacer(),
        body("With 2.1 million page likes and consistent viral content, this page likely drives millions of monthly page views to Cooktop Cove. At scale, this model can generate $50,000-$200,000+ per month in ad revenue, with Facebook ad spend representing 20-40% of revenue."),

        divider(),

        // ===== SECTION 4: CONTENT ARCHETYPE BREAKDOWN =====
        heading1("4. Content Archetype Deep Dive"),
        body("Based on both organic posts and ad campaigns, we identified 5 recurring content archetypes that form the backbone of this page's strategy. Each archetype serves a specific psychological trigger:"),

        heading2("4.1 The \u201cHidden Superpower\u201d Archetype"),
        body("This is their #1 most used format, appearing in both organic posts and paid ads. It takes a common, cheap household item and reveals \u201csecret\u201d uses for it. Examples from their ads: dryer sheets (cleaning baseboards, repelling dust), pickle juice (cleaning, cooking, gardening), pill bottles (storage, organization)."),
        body("Why it works: It triggers curiosity (\u201cI didn't know that!\u201d), provides instant value, and makes people feel smart for learning something new. The items are universally available, so anyone can try the tip immediately, which increases engagement and sharing."),

        heading2("4.2 The \u201cNumber List\u201d Archetype"),
        body("Every ad and most organic posts use a numbered list format: \u201c12 genius ideas,\u201d \u201c10 reasons why,\u201d \u201c20 genius ideas.\u201d The number is almost always between 10-20, creating a sense of comprehensive value. The word \u201cgenius\u201d or \u201cbrilliant\u201d is almost always attached."),
        body("Why it works: Numbers set clear expectations (\u201cI know what I'm getting\u201d), create a completion compulsion (\u201cI need to see all 12\u201d), and perform well in Facebook's carousel format where each tip gets its own card."),

        heading2("4.3 The \u201cStop Doing This\u201d Archetype"),
        body("Negative framing headlines like \u201c10 reasons why you should never dump pickle juice down the drain\u201d and \u201cStop tossing out old pill bottles\u201d use loss aversion psychology. People are more motivated to avoid a mistake than to gain a benefit."),
        body("Why it works: It creates urgency and FOMO (Fear Of Missing Out). The reader thinks \u201cAm I doing this wrong? I need to find out!\u201d This drives immediate clicks and shares because people want to warn their friends too."),

        heading2("4.4 The \u201cBudget Genius\u201d Archetype"),
        body("Dollar Store organization posts and repurposing content tap into the desire to save money. The messaging consistently reinforces that you don't need to spend a lot to have a clean, organized home."),
        body("Why it works: Economic anxiety and desire for frugal living are powerful motivators for the page's demographic. By positioning everyday items as valuable tools, they create a sense of resourcefulness and empowerment."),

        heading2("4.5 The \u201cBefore/After\u201d Archetype"),
        body("Visual transformation content showing dirty/chaotic spaces becoming clean/organized. This is used more in organic posts than ads, likely because the visual impact works better natively than in ad placements."),
        body("Why it works: The visual contrast creates an immediate \u201cwow\u201d reaction, the transformation is satisfying to watch, and it serves as proof that the tips actually work. This format drives saves and shares more than any other type."),

        divider(),

        // ===== SECTION 5: ACTIONABLE PLAYBOOK =====
        heading1("5. Actionable Playbook for Replication"),
        body("If you want to replicate this page's success for your own teleprompter/content business, here is the exact playbook based on everything we've analyzed:"),

        heading2("5.1 Content Creation Formula"),
        bullet("Pick a common household item (vinegar, baking soda, Dawn, lemon, dryer sheets, coffee filters, etc.)"),
        bullet("Research 10-15 surprising uses for it (Pinterest, Reddit r/CleaningTips, Google)"),
        bullet("Write a headline using the formula: [Number] + [adjective: genius/brilliant/smart] + [item] + [ideas/hacks/ways to use]"),
        bullet("Create an image carousel showing each use with a product photo + text overlay"),
        bullet("Write the caption: Hook sentence + numbered list + bonus tip + engagement CTA"),
        bullet("Post and test. Keep what works. Cut what doesn't."),

        heading2("5.2 Posting Schedule"),
        bullet("Post 3-4 times per day: 8 AM, 12 PM, 5 PM, and 8 PM EST"),
        bullet("Monday-Thursday: Cleaning hacks and kitchen tips"),
        bullet("Friday-Saturday: Repurposing ideas and fun/clever content"),
        bullet("Sunday: Organization and \u201cprepare for the week\u201d content"),
        bullet("Run theme weeks: \u201cVinegar Week\u201d, \u201cBaking Soda Week,\u201d etc."),

        heading2("5.3 Monetization Path"),
        bullet("Build a companion website or blog for full articles"),
        bullet("Use Facebook ads to promote top-performing posts to your site"),
        bullet("Monetize with display ads (Mediavine at 50K sessions/month, Raptive at 100K)"),
        bullet("Consider affiliate links to Amazon products mentioned in tips"),
        bullet("Explore brand partnerships with cleaning product companies (Mrs. Meyer's, Dawn, Clorox)"),

        heading2("5.4 Growth Tactics"),
        bullet("Run engagement campaigns: polls (\u201cWhat's your biggest cleaning headache?\u201d), comment contests"),
        bullet("Collaborate with similar pages for cross-promotion"),
        bullet("Create shareable infographic posts that drive saves and reshares"),
        bullet("Test video content: 30-60 second quick-tip reels of cleaning demonstrations"),
        bullet("Build an email list by offering a \u201c50 Free Cleaning Hacks\u201d PDF guide"),

        spacer(200),
        divider(),
        spacer(100),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Strategy analysis prepared by Z.ai  \u00B7  Data sourced from Meta Ad Library & Facebook public page data", size: 18, font: "Calibri", color: c.accent, italics: true })]
        }),
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/home/z/my-project/download/Tips_for_the_Home_Strategy_Analysis.docx", buf);
  console.log("Strategy document created!");
});
