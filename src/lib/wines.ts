import elNino from "@/assets/bottles/El_Nino_Cinsault.jpg.asset.json";
import laNina from "@/assets/bottles/La_Nina_Semillon_Gris.jpg.asset.json";
import srChenin from "@/assets/bottles/Salt_Rock_Chenin_Blanc.jpg.asset.json";
import srRed from "@/assets/bottles/Salt_Rock_Red_Blend_NV.png.asset.json";
import srSauv from "@/assets/bottles/Salt_Rock_Sauvignon_Blanc.jpg.asset.json";
import saChard from "@/assets/bottles/Stand_Alone_Chardonnay.png.asset.json";
import saChenin from "@/assets/bottles/Stand_Alone_Chenin_Blanc.jpg.asset.json";
import saPinot from "@/assets/bottles/Stand_Alone_Pinot_Noir.jpg.asset.json";

export type WineType = "Red" | "White" | "Rosé" | "Sparkling" | "Dessert";
export type Range = "Climate" | "Lifestyle" | "Stand Alone";

export interface TechnicalData {
  alcohol: string;
  residualSugar: string;
  totalAcidity: string;
  volatileAcidity: string;
  pH: string;
  totalExtract?: string;
}

export interface Wine {
  slug: string;
  name: string;
  varietal: string;
  range: Range;
  type: WineType;
  vintage: string;
  price: number;
  body: 1 | 2 | 3 | 4 | 5;
  sweetness: 1 | 2 | 3 | 4 | 5;
  servingTemp: string;
  tasting: string;
  longDescription: string;
  winemakerComment: string;
  vinification: string;
  terroir: string;
  technical: TechnicalData;
  pairings: string[];
  awards?: string[];
  occasions: string[];
  image: string;
}

// All data sourced from official Salt Rock Wines factsheets (Nov 2024 / 2025 releases)
// and the official Wine_Pricing.pdf. Do not paraphrase — this is the winemaker's own text.
export const wines: Wine[] = [
  {
    slug: "stand-alone-pinot-noir",
    name: "Stand Alone Pinot Noir",
    varietal: "Pinot Noir",
    range: "Stand Alone",
    type: "Red",
    vintage: "2024",
    price: 370,
    body: 3,
    sweetness: 1,
    servingTemp: "14–16°C",
    tasting:
      "A vivid rush of sour cherry and wild raspberry, edged with a bittersweet Campari-like spice. Bright, cleansing acidity carries the fruit while subtle earthy tones — damp forest floor, dried herbs and stone — anchor the wine with quiet depth.",
    longDescription:
      "Old-world structure lends poise and restraint, while the generosity of new-world fruit brings warmth and immediacy — a Pinot that feels both contemplative and alive, refined yet deeply expressive of its origin.",
    winemakerComment:
      "This variety is known for elegance, lightness and finesse. We could only choose one region for this grape in South Africa — the Hemel en Aarde.",
    vinification:
      "Made in classic Burgundian style with lots of whole bunch and punch-downs kept to a minimum for softer extraction. Fermented spontaneously to showcase the site and variety. 30% new 300L French oak barrels for midpalate weight and length, the rest split between second, third and fourth-fill 300L French oak. Aged 12 months before fine filter and bottling.",
    terroir:
      "Hemel en Aarde Ridge — the highest of the valley's three wards — enjoys the cool Atlantic breeze pushing up the valley. Ancient weathered sandstone with younger Bokkeveld shale contributes clay to the soil, ideal for very low-yielding vines and smaller, more concentrated berries.",
    technical: { alcohol: "13.63%", residualSugar: "1.7 g/l", totalAcidity: "5.1 g/l", volatileAcidity: "0.64 g/l", pH: "3.63" },
    pairings: ["Duck breast with cherry jus", "Roasted beetroot with goat's cheese", "Mushroom risotto", "Aged Brie"],
    occasions: ["Dinner party", "Celebration", "Gift"],
    image: saPinot.url,
  },
  {
    slug: "stand-alone-chardonnay",
    name: "Stand Alone Chardonnay",
    varietal: "Chardonnay",
    range: "Stand Alone",
    type: "White",
    vintage: "2024",
    price: 370,
    body: 4,
    sweetness: 1,
    servingTemp: "10–12°C",
    tasting:
      "A refined Elgin Chardonnay with crisp citrus, white peach, subtle oak and a long mineral finish.",
    longDescription:
      "Elgin Chardonnay at its most sophisticated — finesse and longevity that draw comparison to the finest examples of Burgundy.",
    winemakerComment:
      "Chardonnay from South Africa's Elgin region epitomizes cool-climate sophistication. Elgin's mountain vineyards benefit from lower temperatures and extended ripening, yielding wines with remarkable mid-palate tension.",
    vinification:
      "Whole-bunch pressed with a 600 L/ton recovery, settled overnight before barrel fermentation with two yeast strains. Weekly bâtonnage supported texture through primary and spontaneous malolactic fermentation. After six months on lees, racked and returned to barrel for 11 months maturation. Bottled after barrel selection and aged a further six months prior to release.",
    terroir:
      "Coffee Klip soils — iron-rich and stony — promote deep roots and low vigour, yielding concentrated wines. Cooler mornings and warm days give the diurnal shifts Chardonnay thrives on.",
    technical: { alcohol: "12.73%", residualSugar: "1.8 g/l", totalAcidity: "6.5 g/l", volatileAcidity: "0.55 g/l", pH: "3.19" },
    pairings: ["Grilled line fish with garlic butter", "Roast chicken with thyme and lemon", "Butter-poached crayfish", "Truffle pasta"],
    occasions: ["Dinner party", "Fine dining", "Sunday lunch"],
    image: saChard.url,
  },
  {
    slug: "stand-alone-chenin-blanc",
    name: "Stand Alone Chenin Blanc",
    varietal: "Chenin Blanc",
    range: "Stand Alone",
    type: "White",
    vintage: "2024",
    price: 270,
    body: 3,
    sweetness: 2,
    servingTemp: "8–10°C",
    tasting:
      "Melon, cassis, stone fruit and hints of oak. Juicy with a whisper of sweetness that lends the wine great tension and a long-lasting finish.",
    longDescription:
      "A serious Chenin from 11-year-old Helderberg bush vines, matured across three vessels to build layers of texture, fruit and structure.",
    winemakerComment:
      "Chenin Blanc from South Africa has made a name for itself internationally as one of the best areas in the world to produce this precious drop.",
    vinification:
      "Spontaneous fermentation to reflect site-specific flavours. Matured in three vessels: one-third in South African amphora to focus acidity and form the core; one-third in older 300L barrels for fruit and finesse; one-third in new French oak for midpalate weight and structure.",
    terroir:
      "11-year-old bush vines in Stellenbosch's Helderberg region. Deep granite soils naturally limit yield and preserve fresh acidity.",
    technical: { alcohol: "13.65%", residualSugar: "2.9 g/l", totalAcidity: "6.4 g/l", volatileAcidity: "0.45 g/l", pH: "3.18" },
    pairings: ["Duck breast with cherry jus", "Roasted beetroot with goat's cheese", "Sushi", "Thai curry"],
    occasions: ["Weeknight", "Celebration"],
    image: saChenin.url,
  },
  {
    slug: "el-nino-cinsault",
    name: "El Niño Cinsault",
    varietal: "Cinsault",
    range: "Climate",
    type: "Red",
    vintage: "2024",
    price: 200,
    body: 2,
    sweetness: 1,
    servingTemp: "Serve slightly chilled",
    tasting:
      "Cinnamon spice, cherries, raspberries and brambles. Soft, velvety tannins with a bright acid line that builds mid-palate tension into a long, juicy finish.",
    longDescription:
      "A translucent, joyous Cinsault made in classic Beaujolais style — pour cool, allow it to warm and open in the glass, and share freely.",
    winemakerComment:
      "Cinsault — the Poorman's Pinot. This grape is so underrated due to its appearance, yet it can make a serious wine or something less complex and quaffable.",
    vinification:
      "Classic Beaujolais style: 40% whole bunch with one punch-down a day for softer extraction. Fermented spontaneously to showcase site and variety, then aged in concrete egg to keep the core tight with 15% aged in an old 500L oak barrel.",
    terroir:
      "Old bush vines in Stellenbosch's Helderberg region. Deep granite soils allow naturally low yields with good acidity.",
    technical: { alcohol: "13.5%", residualSugar: "1.1 g/l", totalAcidity: "5.2 g/l", volatileAcidity: "0.52 g/l", pH: "3.47" },
    pairings: ["Chicken liver parfait", "Springbok loin", "Roasted beetroot, lentil & feta salad", "Charcuterie"],
    occasions: ["Braai", "Weeknight", "Picnic"],
    image: elNino.url,
  },
  {
    slug: "la-nina-semillon-gris",
    name: "La Niña Rooi-Groen Semillon",
    varietal: "Semillon Gris",
    range: "Climate",
    type: "White",
    vintage: "2024",
    price: 200,
    body: 3,
    sweetness: 1,
    servingTemp: "9–11°C",
    tasting:
      "Expressive ripe stone fruit layered with subtle cinnamon spice. Extended skin contact lends impressive weight and texture; concrete-tank fermentation contributes a distinct mineral persistence and freshness that lets the site sing through.",
    longDescription:
      "A soon-to-be cult wine that reflects what patient skin contact can draw from this remarkable grape — textural, vibrant and quietly profound.",
    winemakerComment:
      "Soon to be cult wine — this truly reflects what skin contact can do to this amazing grape variety.",
    vinification:
      "Hand-picked at optimal ripeness in the early morning. Destemmed and given three days of skin contact before pressing. Spontaneous fermentation in concrete egg. Left on the lees for an extra couple of months; malolactic fermentation concluded naturally, then racked off the gross lees.",
    terroir:
      "Swartland, on the slopes of the Paardeberg. Unique climate and altitude drive a slow ripening period, resulting in fruit packed with flavour.",
    technical: { alcohol: "12.57%", residualSugar: "1.9 g/l", totalAcidity: "5.7 g/l", volatileAcidity: "0.35 g/l", pH: "3.18", totalExtract: "23.1 g/l" },
    pairings: ["Cheese boards", "Fresh fish", "Creamy pasta", "Seared scallops"],
    occasions: ["Fine dining", "Celebration"],
    image: laNina.url,
  },
  {
    slug: "salt-rock-chenin-blanc",
    name: "Salt Rock Chenin Blanc",
    varietal: "Chenin Blanc",
    range: "Lifestyle",
    type: "White",
    vintage: "2025",
    price: 120,
    body: 2,
    sweetness: 1,
    servingTemp: "8°C",
    tasting:
      "Fresh quince, apricot and wet stone. Juicy and vibrant with fresh acidity and a long, elegant finish.",
    longDescription:
      "The everyday Salt Rock Chenin — bright, precise and effortlessly drinkable. Made to be opened without occasion.",
    winemakerComment:
      "Chenin Blanc from South Africa has made a name for itself internationally as one of the best regions in the world to produce this precious drop.",
    vinification:
      "Cold fermentation preserved vibrant fruit expression, while partial fermentation in seasoned French oak added subtle mid-palate weight. Completed malolactic fermentation lends gentle creaminess and further complexity.",
    terroir:
      "Sourced from two Stellenbosch regions — the Helderberg and Bottelary Hills. Deep granite soils encourage naturally low yields, enhancing concentration while preserving fresh acidity.",
    technical: { alcohol: "12.47%", residualSugar: "1.7 g/l", totalAcidity: "6.8 g/l", volatileAcidity: "0.33 g/l", pH: "3.12" },
    pairings: ["Grilled prawns with garlic butter", "Roast chicken with thyme and lemon", "Sushi", "Fresh salads"],
    occasions: ["Weeknight", "Picnic", "Braai"],
    image: srChenin.url,
  },
  {
    slug: "salt-rock-sauvignon-blanc",
    name: "Salt Rock Sauvignon Blanc",
    varietal: "Sauvignon Blanc",
    range: "Lifestyle",
    type: "White",
    vintage: "2025",
    price: 120,
    body: 2,
    sweetness: 1,
    servingTemp: "8°C",
    tasting:
      "Upfront notes of melon, green fig and lime. Bone dry on the palate with crisp acidity and a mineral length that complements the fruity nose.",
    longDescription:
      "A classic expression of cooler-slope Stellenbosch Sauvignon Blanc — freshness with real length.",
    winemakerComment:
      "This is a classic expression of cooler-slope Sauvignon Blanc in Stellenbosch.",
    vinification:
      "Hand-picked in the cold morning, destemmed and pressed into stainless steel tanks for settling. Cold-fermented in a 4800L cask for upfront fruit notes, with the lees stirred once a day during fermentation. Went through malolactic fermentation and rested on the lees for three months before bottling.",
    terroir:
      "Vines overlooking False Bay, facing south, cooled daily by the ocean breeze — resulting in a wine of loads of freshness and great length.",
    technical: { alcohol: "12.66%", residualSugar: "1.4 g/l", totalAcidity: "7.2 g/l", volatileAcidity: "0.38 g/l", pH: "3.06" },
    pairings: ["Grilled prawns with garlic butter", "Roast chicken with thyme and lemon", "Oysters", "Goat's cheese"],
    occasions: ["Weeknight", "Picnic"],
    image: srSauv.url,
  },
  {
    slug: "salt-rock-red-blend-nv",
    name: "Salt Rock Red Blend NV",
    varietal: "Merlot · Cabernet Sauvignon · Cab Franc · Petit Verdot · Shiraz · Cinsault",
    range: "Lifestyle",
    type: "Red",
    vintage: "NV",
    price: 150,
    body: 5,
    sweetness: 1,
    servingTemp: "16–18°C",
    tasting:
      "All the bells and whistles of a classic blockbuster red — red and black fruit with cigar box notes and chocolate. Powdery yet velvety tannins, with exceptional length and complexity.",
    longDescription:
      "The ultimate BBQ wine — our Braaiwyn. A generous, warming Cape blend built for the open fire and the long table.",
    winemakerComment:
      "Introducing the ultimate BBQ wine, or as we call it — 'Braaiwyn'.",
    vinification:
      "All batches picked at optimal ripeness and cooled before processing. Cultivars fermented in open-top fermenters with four punch-downs a day. Matured in second- and third-fill 300L barrels. Vintages 2021, 2022, 2023 and 2024 blended together. Varieties: Merlot, Cabernet Sauvignon, Cabernet Franc, Petit Verdot, Shiraz and Cinsault.",
    terroir:
      "Fruit selected on potential rather than region — sourced from cooler blocks across the Western Cape to enhance slow ripening.",
    technical: { alcohol: "14.94%", residualSugar: "2.2 g/l", totalAcidity: "5.8 g/l", volatileAcidity: "0.54 g/l", pH: "3.53" },
    pairings: ["Rich stews", "Grilled steaks", "Grilled vegetables", "Mushroom-based dishes"],
    occasions: ["Braai", "Weeknight", "Dinner party"],
    image: srRed.url,
  },
];

export const wineBySlug = (slug: string) => wines.find((w) => w.slug === slug);
export const featuredWines = wines.slice(0, 4);
