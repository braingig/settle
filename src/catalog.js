const groups = {
  sofas: [
    ['Aster', 'Rounded 3 Seat Sofa', 'Oat', 'Linen', 1099],
    ['Sable', 'Modular Sofa', 'Moss', 'Velvet', 1599],
    ['Nola', 'Loveseat', 'Rust', 'Velvet', 649],
    ['Firth', 'Low 3 Seat Sofa', 'Ink', 'Corduroy', 999],
    ['Solene', 'Curved Sofa', 'Ivory', 'Bouclé', 1399],
    ['Tarin', 'Chaise Sectional', 'Stone', 'Linen', 1499],
    ['Otis', 'Box Arm Sofa', 'Chocolate', 'Leather', 1699],
    ['Lune', 'Slim Arm Sofa', 'Mushroom', 'Linen', 949],
    ['Kerr', 'Fold Out Sofa Bed', 'Charcoal', 'Linen', 1199],
    ['Isley', 'Armless Daybed', 'Olive', 'Velvet', 799],
  ],
  furniture: [
    ['Orla', 'Oval Dining Table', 'Walnut', 'Wood', 899],
    ['Auden', 'Upholstered Dining Chair', 'Moss', 'Velvet', 189],
    ['Bram', 'Three Door Sideboard', 'Walnut', 'Wood', 699],
    ['Sienna', 'Accent Chair', 'Sand', 'Bouclé', 449],
    ['Vale', 'Low Coffee Table', 'Ivory', 'Stone', 429],
    ['Holt', 'Open Shelving Unit', 'Black', 'Wood', 449],
    ['Riven', 'Upholstered Bed', 'Oak', 'Wood', 849],
    ['Ivo', 'Bedside Table', 'Ash', 'Wood', 199],
    ['Miro', 'Fluted Media Unit', 'Oak', 'Wood', 549],
    ['Keir', 'Writing Desk', 'Walnut', 'Wood', 399],
  ],
  lighting: [
    ['Cove', 'Dome Table Lamp', 'Oat', 'Linen', 89],
    ['Leto', 'Globe Floor Lamp', 'Ivory', 'Glass', 189],
    ['Nori', 'Ceramic Table Lamp', 'Olive', 'Ceramic', 79],
    ['Wren', 'Paper Pendant', 'Ivory', 'Paper', 65],
    ['Avi', 'Glass Table Lamp', 'Amber', 'Glass', 109],
    ['Pell', 'Arched Floor Lamp', 'Black', 'Metal', 209],
    ['Vera', 'Pleated Wall Light', 'Ivory', 'Linen', 75],
    ['Ansel', 'Cone Pendant', 'Brass', 'Metal', 139],
    ['Etta', 'Mushroom Table Lamp', 'Stone', 'Ceramic', 99],
    ['Dara', 'Ribbed Glass Pendant', 'Clear', 'Glass', 125],
  ],
  accessories: [
    ['Tova', 'Glazed Vase', 'Sage', 'Ceramic', 39],
    ['Soren', 'Smoked Glass Bowl', 'Smoke', 'Glass', 45],
    ['Arden', 'Full Length Mirror', 'Walnut', 'Wood', 169],
    ['Leda', 'Pedestal Vessel', 'Terracotta', 'Ceramic', 49],
    ['Mara', 'Sculptural Bookends', 'Stone', 'Stone', 59],
    ['Voss', 'Taper Candleholder', 'Black', 'Metal', 29],
    ['Alba', 'Carafe and Tumbler', 'Amber', 'Glass', 35],
    ['Tess', 'Serving Platter', 'Ivory', 'Ceramic', 42],
    ['Tern', 'Woven Storage Basket', 'Natural', 'Rattan', 55],
    ['Reed', 'Framed Abstract Print', 'Olive', 'Paper', 69],
  ],
  textiles: [
    ['Rill', 'Geometric Woven Rug', 'Olive', 'Wool', 189],
    ['Lyra', 'Tufted Cushion', 'Ivory', 'Cotton', 35],
    ['Suri', 'Fringed Throw', 'Terracotta', 'Cotton', 59],
    ['Ness', 'Stripe Cushion', 'Charcoal', 'Cotton', 32],
    ['Dune', 'Checked Rug', 'Rust', 'Wool', 209],
    ['Veda', 'Velvet Cushion', 'Moss', 'Velvet', 39],
    ['Aira', 'Linen Curtains', 'Natural', 'Linen', 109],
    ['Mila', 'Textured Throw', 'Honey', 'Cotton', 55],
    ['Ona', 'Striped Flatweave Rug', 'Ink', 'Wool', 159],
    ['Sela', 'Linen Bedspread', 'Stone', 'Linen', 119],
  ],
};

export const categories = [
  { id: 'sofas', name: 'Sofas', image: 'sofas-2', description: 'Deep seats, generous shapes and tactile fabrics for a room you can settle into.' },
  { id: 'furniture', name: 'Furniture', image: 'furniture-1', description: 'Contemporary pieces for living, dining and sleeping, from sculptural tables to everyday storage.' },
  { id: 'lighting', name: 'Lighting', image: 'lighting-3', description: 'Set the mood with soft table lamps, sculptural pendants and floor lights.' },
  { id: 'accessories', name: 'Home Accessories', image: 'accessories-1', description: 'Ceramics, mirrors and everyday objects with an eye for shape and texture.' },
  { id: 'textiles', name: 'Soft Furnishings', image: 'textiles-1', description: 'Make a room your own with woven rugs, soft cushions and natural textiles.' },
];

export const products = Object.entries(groups).flatMap(([category, items]) =>
  items.map(([name, type, colour, material, price], index) => ({
    id: `${category}-${index + 1}`,
    slug: name.toLowerCase(),
    name, type, colour, material, price, category,
    isNew: index < 3,
  })),
);

export const byId = Object.fromEntries(products.map(product => [product.id, product]));
export const featured = ['textiles-1', 'lighting-1', 'furniture-4', 'furniture-3', 'accessories-1'].map(id => byId[id]);
export const dining = ['furniture-1', 'furniture-2', 'furniture-3', 'furniture-6', 'lighting-4', 'lighting-8', 'accessories-2', 'accessories-7', 'accessories-8', 'textiles-5'].map(id => byId[id]);
export const diningCategory = {id: 'dining', name: 'Dining Room', description: 'Make space for good company with warm woods, softly upholstered dining chairs and pieces for the table.'};
export const media = (id) => `/media/${id}.webp`;
export const shop = (id = 'all') => `/shop/${id}/`;
export const item = (p) => `/product/${p.slug}/`;
export const money = (value) => new Intl.NumberFormat('en-GB', {
  style: 'currency', currency: 'GBP', maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
}).format(value);
