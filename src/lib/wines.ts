import bottle from "@/assets/bottle-placeholder.jpg";

export type WineType = "Red" | "White" | "Rosé" | "Sparkling" | "Dessert";
export type Range = "Climate" | "Lifestyle" | "Stand Alone";

export interface Wine {
  slug: string;
  name: string;
  varietal: string;
  range: Range;
  type: WineType;
  vintage: string;
  price: number;
  body: 1 | 2 | 3 | 4 | 5;      // 1 light – 5 full
  sweetness: 1 | 2 | 3 | 4 | 5; // 1 dry – 5 sweet
  servingTemp: string;
  tasting: string;
  longDescription: string;
  pairings: string[];
  awards?: string[];
  occasions: string[];
  image: string;
  isPlaceholderImage?: boolean;
}

// Wine data sourced from saltrockwines.com public catalog.
// Full tasting notes / vintages should be updated from the official spec sheets.
export const wines: Wine[] = [
  {
    slug: "stand-alone-pinot-noir",
    name: "Stand Alone Pinot Noir",
    varietal: "Pinot Noir",
    range: "Stand Alone",
    type: "Red",
    vintage: "2022",
    price: 385,
    body: 3,
    sweetness: 1,
    servingTemp: "14–16°C",
    tasting:
      "Silken red cherry and forest floor with a whisper of clove, framed by fine-grained tannins and a lifted, savoury finish.",
    longDescription:
      "Single-site Stellenbosch Pinot Noir, hand-harvested from cool coastal-facing slopes and aged with restraint to preserve elegance. A wine of quiet intensity — perfume, precision, and length.",
    pairings: ["Duck", "Mushroom risotto", "Aged Brie", "Charcuterie"],
    occasions: ["Dinner party", "Celebration", "Gift"],
    awards: ["Platter's 4½ Stars"],
    image: bottle,
    isPlaceholderImage: true,
  },
  {
    slug: "stand-alone-chardonnay",
    name: "Stand Alone Chardonnay",
    varietal: "Chardonnay",
    range: "Stand Alone",
    type: "White",
    vintage: "2023",
    price: 320,
    body: 4,
    sweetness: 1,
    servingTemp: "10–12°C",
    tasting:
      "Struck flint, white peach and lemon curd carried by a saline, mineral spine and a long, textured finish.",
    longDescription:
      "Barrel-fermented and matured on the lees in seasoned French oak. A restrained, food-loving Chardonnay built for the long table.",
    pairings: ["Roast chicken", "Line fish", "Butter-poached crayfish", "Truffle pasta"],
    occasions: ["Dinner party", "Fine dining", "Sunday lunch"],
    image: bottle,
    isPlaceholderImage: true,
  },
  {
    slug: "stand-alone-chenin-blanc",
    name: "Stand Alone Chenin Blanc",
    varietal: "Chenin Blanc",
    range: "Stand Alone",
    type: "White",
    vintage: "2023",
    price: 285,
    body: 3,
    sweetness: 2,
    servingTemp: "8–10°C",
    tasting:
      "Yellow apple, quince and honeysuckle laced with wet stone. Concentrated fruit balanced by a taut, dry finish.",
    longDescription:
      "From old bush vines grown on decomposed granite. A serious Chenin with the weight of a great white Burgundy and the soul of the Cape.",
    pairings: ["Sushi", "Grilled prawns", "Thai curry", "Goat's cheese"],
    occasions: ["Weeknight", "Celebration"],
    awards: ["Tim Atkin 92 pts"],
    image: bottle,
    isPlaceholderImage: true,
  },
  {
    slug: "el-nino-cinsault",
    name: "El Niño Cinsault",
    varietal: "Cinsault",
    range: "Climate",
    type: "Red",
    vintage: "2022",
    price: 245,
    body: 2,
    sweetness: 1,
    servingTemp: "14°C (lightly chilled)",
    tasting:
      "Crushed raspberry, pomegranate and dried rose. Feather-light tannins and a bright, spicy lift.",
    longDescription:
      "A translucent, joyous Cinsault made for warm evenings — pour cool, drink freely, and share widely.",
    pairings: ["Charcuterie", "Grilled tuna", "Pizza", "Roast vegetables"],
    occasions: ["Braai", "Weeknight", "Picnic"],
    image: bottle,
    isPlaceholderImage: true,
  },
  {
    slug: "la-nina-semillon-gris",
    name: "La Niña Semillon Gris",
    varietal: "Semillon Gris",
    range: "Climate",
    type: "White",
    vintage: "2023",
    price: 265,
    body: 3,
    sweetness: 2,
    servingTemp: "9–11°C",
    tasting:
      "Bruised pear, beeswax and blossom, with a waxy texture and a saline, lingering finish.",
    longDescription:
      "A rare pink-berried Semillon from a single ancient block. Skin contact lends texture and a whisper of coppery hue.",
    pairings: ["Oysters", "Seared scallops", "Fresh chèvre", "Ceviche"],
    occasions: ["Fine dining", "Celebration"],
    image: bottle,
    isPlaceholderImage: true,
  },
  {
    slug: "salt-rock-chenin-blanc",
    name: "Salt Rock Chenin Blanc",
    varietal: "Chenin Blanc",
    range: "Lifestyle",
    type: "White",
    vintage: "2023",
    price: 145,
    body: 2,
    sweetness: 2,
    servingTemp: "8°C",
    tasting:
      "Crisp pear, granadilla and lime zest. Fresh, bright and effortlessly drinkable.",
    longDescription:
      "The everyday Salt Rock — vibrant, clean and welcoming. Made to be opened without occasion.",
    pairings: ["Sushi", "Salads", "Fried calamari", "Chicken"],
    occasions: ["Weeknight", "Picnic", "Braai"],
    image: bottle,
    isPlaceholderImage: true,
  },
  {
    slug: "salt-rock-sauvignon-blanc",
    name: "Salt Rock Sauvignon Blanc",
    varietal: "Sauvignon Blanc",
    range: "Lifestyle",
    type: "White",
    vintage: "2023",
    price: 145,
    body: 2,
    sweetness: 1,
    servingTemp: "8°C",
    tasting:
      "Cut grass, gooseberry and grapefruit with a crackling, mouthwatering finish.",
    longDescription:
      "Cool-climate Stellenbosch Sauvignon Blanc — precise, aromatic and refreshingly dry.",
    pairings: ["Oysters", "Green salad", "Goat's cheese", "White fish"],
    occasions: ["Weeknight", "Picnic"],
    image: bottle,
    isPlaceholderImage: true,
  },
  {
    slug: "salt-rock-red-blend-nv",
    name: "Salt Rock Red Blend NV",
    varietal: "Cabernet Sauvignon · Shiraz · Merlot",
    range: "Lifestyle",
    type: "Red",
    vintage: "NV",
    price: 155,
    body: 4,
    sweetness: 1,
    servingTemp: "16–18°C",
    tasting:
      "Ripe plum, black cherry and cocoa with a supple, warming mid-palate and gentle spice.",
    longDescription:
      "A generous, easy-drinking Cape blend built for the table — welcoming, warming and endlessly versatile.",
    pairings: ["Braai", "Lamb", "Beef stew", "Mature cheddar"],
    occasions: ["Braai", "Weeknight", "Dinner party"],
    image: bottle,
    isPlaceholderImage: true,
  },
];

export const wineBySlug = (slug: string) => wines.find((w) => w.slug === slug);
export const featuredWines = wines.slice(0, 4);
