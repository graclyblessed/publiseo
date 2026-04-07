const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, PageBreak, PageNumber,
  Table, TableRow, TableCell, ShadingType, VerticalAlign
} = require("docx");

const colors = {
  primary: "1A1F16",
  body: "2D3329",
  secondary: "4A5548",
  accent: "94A3B8",
  tableBg: "F8FAF7",
  white: "FFFFFF",
  fbBlue: "1877F2",
  lightGray: "F0F2F5",
  medGray: "65676B",
  darkText: "050505"
};

// Load all 8 images
const images = [
  { file: "tip1_oven_cleaning.png", name: "Oven Cleaning with Baking Soda" },
  { file: "tip2_mirror_cleaning.png", name: "Streak-Free Mirror Hack" },
  { file: "tip3_pillow_stain.png", name: "Yellow Pillow Stain Remover" },
  { file: "tip4_showerhead.png", name: "Showerhead Vinegar Soak" },
  { file: "tip5_sink_polish.png", name: "Lemon & Baking Soda Sink Polish" },
  { file: "tip6_stovetop.png", name: "Greasy Stovetop Rescue" },
  { file: "tip7_baseboards.png", name: "Dryer Sheet Baseboard Trick" },
  { file: "tip8_ceiling_fan.png", name: "Ceiling Fan Dusting Hack" }
];

const imgData = {};
for (const img of images) {
  imgData[img.file] = fs.readFileSync(`/home/z/my-project/download/${img.file}`);
}

const posts = [
  {
    title: "Clean Your Oven with Just Baking Soda and Vinegar",
    caption: `Stop scrubbing your oven for hours! This simple trick will have it looking brand new in no time.\n\nHere's what you need:\n- 1/2 cup baking soda\n- 3 tablespoons water\n- White vinegar\n- A spray bottle\n- A damp cloth\n\nMix the baking soda and water into a thick paste. Spread it all over the inside of your oven, avoiding the heating elements. Let it sit overnight — at least 12 hours.\n\nThe next morning, wipe out the paste with a damp cloth. Spray any stubborn spots with vinegar and watch it fizz away! Give it one final wipe and you're done.\n\nYour oven will look like the day you bought it. No harsh chemicals needed!\n\nSave this post for later and share it with someone who hates cleaning their oven!`,
    likes: "24.3K",
    comments: "892",
    shares: "15.7K"
  },
  {
    title: "The Newspaper Trick for Streak-Free Mirrors",
    caption: `Tired of cleaning your mirrors and still seeing streaks? Try this old-school trick that actually works!\n\nInstead of paper towels, use crumpled newspaper with your glass cleaner. The ink acts as a mild abrasive that removes residue without leaving lint behind.\n\nHere's how:\n- Spray glass cleaner directly on the mirror\n- Crumple up a sheet of newspaper\n- Wipe in circular motions\n- Buff dry with a clean sheet\n\nThe difference is incredible. Your bathroom mirror will look like a professional cleaned it. Hotels have been using this trick for decades!\n\nWorks great on windows too. Try it on your car windshield for the clearest view you've ever had.\n\nTag someone who's always complaining about streaky mirrors!`,
    likes: "18.9K",
    comments: "634",
    shares: "12.1K"
  },
  {
    title: "How to Remove Yellow Sweat Stains from Pillows",
    caption: `Don't throw away those yellowed pillows! You can make them white again with this simple mixture.\n\nYou'll need:\n- 1 cup laundry detergent\n- 1 cup powdered dishwasher detergent\n- 1 cup bleach\n- 1/2 cup borax\n- Hot water\n\nRemove the pillowcases and any covers. Check the care label first — most polyester pillows can handle hot water. Place two pillows in your washing machine at a time to keep the load balanced.\n\nAdd all the ingredients to the drum, not the dispenser. Run on the hottest setting your machine offers. For extra whitening, pause the cycle halfway through and let the pillows soak for an hour.\n\nDry them in the sun if possible — UV rays naturally bleach and deodorize. If using a dryer, add tennis balls to keep them fluffy.\n\nYour pillows will look brand new! No need to spend money on replacements.\n\nShare this with your family group chat!`,
    likes: "31.5K",
    comments: "1.2K",
    shares: "22.8K"
  },
  {
    title: "Soak Your Showerhead in Vinegar — Here's Why",
    caption: `Is your showerhead spraying in every direction except down? Time for a vinegar soak!\n\nHard water deposits build up over time and clog the nozzles. Instead of replacing the whole showerhead, try this:\n\n1. Fill a plastic bag with white vinegar\n2. Place it over the showerhead so the nozzles are submerged\n3. Secure it with a rubber band or zip tie\n4. Leave it overnight (at least 8 hours)\n5. Remove the bag and run hot water for 2 minutes\n\nThe vinegar dissolves calcium and lime deposits without any scrubbing. You'll notice the water pressure improve immediately.\n\nFor really stubborn buildup, add a few tablespoons of baking soda to the vinegar. The fizzing action helps break through tough clogs.\n\nThis works on faucet aerators too! Save money and avoid buying chemical descalers.\n\nDrop a \u{1F44D} if you're trying this tonight!`,
    likes: "15.7K",
    comments: "478",
    shares: "9.3K"
  },
  {
    title: "Polish Your Stainless Steel Sink with a Lemon",
    caption: `Want your stainless steel sink to sparkle? Reach for a lemon from your fridge!\n\nHere's the secret:\n- Cut a lemon in half\n- Dip the cut side in baking soda\n- Scrub the entire sink surface\n- Let it sit for 5 minutes\n- Rinse with warm water\n- Dry with a microfiber cloth\n\nThe citric acid in the lemon breaks down grease and mineral deposits, while the baking soda acts as a gentle abrasive. Together they remove stains, water spots, and even rust marks.\n\nFor extra shine, rub the sink with a few drops of olive oil on a cloth. It creates a protective barrier that repels water and prevents future spots.\n\nThis also works on stainless steel appliances, pots, and pans. Your kitchen will look like a magazine spread!\n\nTry it and tag us with your before and after photos!`,
    likes: "20.1K",
    comments: "756",
    shares: "14.2K"
  },
  {
    title: "The Easiest Way to Clean a Greasy Stovetop",
    caption: `Cooking a big meal left your stovetop looking like a disaster zone? Don't worry — this method handles even the toughest grease.\n\nWhat you'll need:\n- Hot, soapy water (Dawn dish soap works best)\n- Baking soda\n- A razor scraper (for glass stovetops)\n- Microfiber cloth\n- Paper towels\n\nFirst, remove the grates and knobs if possible. Sprinkle baking soda over the entire surface. Pour hot soapy water over the baking soda and let it bubble up. Let it sit for 15-20 minutes.\n\nFor burned-on food, use the razor scraper at a 45-degree angle. Wipe everything clean with a microfiber cloth. For glass stovetops, finish with a glass cleaner for a streak-free shine.\n\nFor gas stovetops, soak the grates in the same hot soapy water while you clean the surface.\n\nDo this once a week and you'll never have a greasy stovetop again!\n\nSave this recipe and share it with your cooking friends!`,
    likes: "27.8K",
    comments: "1.1K",
    shares: "19.4K"
  },
  {
    title: "Use a Dryer Sheet to Clean Your Baseboards",
    caption: `This might sound weird, but dryer sheets are incredible for cleaning baseboards — and it takes half the time!\n\nWhy it works:\nDryer sheets are designed to reduce static in your laundry. That same anti-static property actually repels dust! When you wipe your baseboards with a dryer sheet, they stay cleaner for much longer.\n\nHow to do it:\n- Take a clean dryer sheet (used ones work too!)\n- Simply wipe along the top and front of each baseboard\n- The sheet picks up dust, pet hair, and cobwebs effortlessly\n- No water or cleaning spray needed\n\nFor really dirty baseboards, dampen the sheet slightly first. The softener in the sheet also helps remove scuff marks from shoes and furniture.\n\nThis trick saves SO much time during spring cleaning. You can clean every baseboard in your house in under 30 minutes.\n\nBonus: It also works on blinds, window sills, and door frames!\n\nPass this along to anyone who dreads cleaning day!`,
    likes: "33.2K",
    comments: "1.5K",
    shares: "28.6K"
  },
  {
    title: "The Best Way to Dust a Ceiling Fan (No Ladder Needed)",
    caption: `Nobody likes cleaning the ceiling fan. It's awkward, dusty, and you always end up with debris in your eyes. But this hack changes everything.\n\nThe pillowcase method:\n- Take an old pillowcase you don't need anymore\n- Slide it over one fan blade\n- Pull it back slowly while pressing against the blade\n- All the dust falls INSIDE the pillowcase, not on you!\n- Repeat for each blade\n\nThen just take the pillowcase outside, turn it inside out, and shake it into the trash. No mess, no dust in your face, no ladder drama.\n\nFor a deeper clean, lightly dampen the pillowcase with water or furniture polish first. This picks up stubborn dust that's been clinging for months.\n\nPro tip: Do this before vacuuming so any dust that escapes gets picked up off the floor.\n\nYour future self will thank you every time a breeze hits that clean fan!\n\nShare this with someone who has a ceiling fan!`,
    likes: "19.4K",
    comments: "823",
    shares: "16.1K"
  }
];

function createPostSection(post, index, imgFileName) {
  const imgW = 420, imgH = 420;
  const borderColor = { style: BorderStyle.SINGLE, size: 8, color: colors.lightGray };
  const noBorder = { style: BorderStyle.NONE, size: 0, color: colors.white };

  const children = [];

  // Separator line before post (except first)
  if (index > 0) {
    children.push(new Paragraph({
      spacing: { before: 400, after: 300 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "E4E6EB", space: 8 } },
      children: []
    }));
  }

  // Post image
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 100 },
    children: [
      new ImageRun({
        type: "png",
        data: imgData[imgFileName],
        transformation: { width: imgW, height: imgH },
        altText: { title: post.title, description: post.title, name: post.title }
      })
    ]
  }));

  // Post title
  children.push(new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({
        text: post.title,
        bold: true,
        size: 28,
        font: "Calibri",
        color: colors.darkText
      })
    ]
  }));

  // Post caption (split by newlines into separate paragraphs)
  const lines = post.caption.split("\n");
  for (const line of lines) {
    const isBullet = line.trimStart().startsWith("- ");
    const isEmpty = line.trim() === "";

    if (isEmpty) {
      children.push(new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }));
    } else if (isBullet) {
      children.push(new Paragraph({
        spacing: { before: 40, after: 40 },
        indent: { left: 360 },
        children: [
          new TextRun({ text: "\u2022 ", bold: false, size: 22, font: "Calibri", color: colors.body }),
          new TextRun({ text: line.trimStart().substring(2), size: 22, font: "Calibri", color: colors.body })
        ]
      }));
    } else if (line.trimStart().match(/^\d+\./)) {
      children.push(new Paragraph({
        spacing: { before: 40, after: 40 },
        indent: { left: 360 },
        children: [
          new TextRun({ text: line.trimStart(), size: 22, font: "Calibri", color: colors.body })
        ]
      }));
    } else {
      children.push(new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [
          new TextRun({ text: line, size: 22, font: "Calibri", color: colors.body })
        ]
      }));
    }
  }

  // Engagement metrics bar
  children.push(new Paragraph({ spacing: { before: 250, after: 100 }, children: [] }));

  children.push(new Paragraph({
    spacing: { before: 100, after: 100 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: "E4E6EB", space: 6 } },
    children: [
      new TextRun({ text: "\u2764\uFE0F ", size: 22, font: "Calibri", color: colors.medGray }),
      new TextRun({ text: post.likes, size: 22, font: "Calibri", color: colors.medGray }),
      new TextRun({ text: "    \uD83D\uDCAC ", size: 22, font: "Calibri", color: colors.medGray }),
      new TextRun({ text: post.comments, size: 22, font: "Calibri", color: colors.medGray }),
      new TextRun({ text: "    \uD83D\uDD00 ", size: 22, font: "Calibri", color: colors.medGray }),
      new TextRun({ text: post.shares, size: 22, font: "Calibri", color: colors.medGray }),
    ]
  }));

  return children;
}

async function main() {
  // Build all post sections
  const allPostChildren = [];
  posts.forEach((post, i) => {
    const section = createPostSection(post, i, images[i].file);
    allPostChildren.push(...section);
  });

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22, color: colors.body }
        }
      },
      paragraphStyles: [
        {
          id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 36, bold: true, font: "Times New Roman", color: colors.primary },
          paragraph: { spacing: { before: 600, after: 300 }, outlineLevel: 0 }
        },
        {
          id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 28, bold: true, font: "Times New Roman", color: colors.primary },
          paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 1 }
        }
      ]
    },
    sections: [
      // COVER PAGE
      {
        properties: {
          page: {
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            size: { width: 11906, height: 16838 }
          },
          titlePage: true
        },
        children: [
          new Paragraph({ spacing: { before: 4000 }, children: [] }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
            children: [
              new ImageRun({
                type: "png",
                data: imgData["tip1_oven_cleaning.png"],
                transformation: { width: 250, height: 250 },
                altText: { title: "Tips for the Home", description: "Cover image", name: "cover" }
              })
            ]
          }),
          new Paragraph({ spacing: { before: 400 }, children: [] }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: "Tips for the Home",
                bold: true, size: 56, font: "Times New Roman", color: colors.primary
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 100 },
            children: [
              new TextRun({
                text: "Home Cleaning Hacks & Tricks",
                size: 28, font: "Calibri", color: colors.secondary, italics: true
              })
            ]
          }),
          new Paragraph({ spacing: { before: 300 }, children: [] }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 50 },
            children: [
              new TextRun({
                text: "8 Viral Cleaning Posts with Engagement Data",
                size: 22, font: "Calibri", color: colors.accent
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 50 },
            children: [
              new TextRun({
                text: "Content Emulation Reference Guide",
                size: 22, font: "Calibri", color: colors.accent
              })
            ]
          }),
          new Paragraph({ spacing: { before: 1500 }, children: [] }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 50 },
            children: [
              new TextRun({
                text: "Based on facebook.com/p/Tips-for-the-Home-100064841672514/",
                size: 18, font: "Calibri", color: colors.accent
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 50, after: 50 },
            children: [
              new TextRun({
                text: "2,115,166 Likes \u00B7 25,649 Talking About This",
                size: 18, font: "Calibri", color: colors.accent
              })
            ]
          }),
        ]
      },
      // CONTENT PAGE
      {
        properties: {
          page: {
            margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 },
            size: { width: 11906, height: 16838 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({ text: "Tips for the Home ", bold: true, size: 18, font: "Calibri", color: colors.accent }),
                  new TextRun({ text: "| Content Emulation Guide", size: 18, font: "Calibri", color: colors.accent })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "\u2014 ", size: 18, font: "Calibri", color: colors.accent }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Calibri", color: colors.accent }),
                  new TextRun({ text: " \u2014", size: 18, font: "Calibri", color: colors.accent })
                ]
              })
            ]
          })
        },
        children: [
          new Paragraph({
            spacing: { before: 200, after: 300 },
            children: [
              new TextRun({ text: "Content Overview", bold: true, size: 36, font: "Times New Roman", color: colors.primary })
            ]
          }),
          new Paragraph({
            spacing: { before: 100, after: 200 },
            children: [
              new TextRun({
                text: "This document contains 8 fully written social media posts that emulate the content style, tone, and format of the \"Tips for the Home\" Facebook page. Each post includes an original image, a detailed caption written in the page's characteristic conversational style, and simulated engagement metrics. The posts cover popular cleaning hack topics including oven cleaning, mirror tricks, pillow stain removal, showerhead descaling, sink polishing, stovetop degreasing, baseboard cleaning, and ceiling fan dusting. Use these as reference templates for creating similar viral cleaning content.",
                size: 22, font: "Calibri", color: colors.body
              })
            ]
          }),

          // Posts
          ...allPostChildren,

          // Back cover note
          new Paragraph({
            spacing: { before: 600, after: 200 },
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: "E4E6EB", space: 6 } },
            children: []
          }),
          new Paragraph({
            spacing: { before: 200, after: 100 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Tips for the Home \u2014 Content Emulation by Z.ai",
                size: 20, font: "Calibri", color: colors.accent, italics: true
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("/home/z/my-project/download/Tips_for_the_Home_Posts.docx", buffer);
  console.log("Document created successfully!");
}

main().catch(console.error);
