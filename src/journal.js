export const guides = [
  {
    slug: 'choosing-a-rug-size',
    topic: 'Soft furnishings',
    title: 'How to choose the right rug size',
    image: 'stillwood',
    alt: 'A woven rug beneath a moss velvet sofa and travertine table',
    intro: 'Start with the furniture you want the rug to connect. Then use the room’s walkways to narrow down the size.',
    sections: [
      ['Let the sofa set the width', 'For a living room, look for a rug wider than the sofa. Place the front feet of the sofa and chairs on it so the seating reads as one group. If you prefer all four feet on the rug, check that there is still a visible border of floor around it.'],
      ['Leave room to pull out chairs', 'Under a dining table, measure from the edge of the table to the back feet of a chair while someone is seated. Use that measurement on every side so chairs can slide out without catching the edge.'],
      ['Tape out the footprint', 'Mark the corners on the floor before ordering. Walk around the outline, open nearby doors and test the chair positions.'],
    ],
    category: 'textiles',
    shopLabel: 'Shop rugs and textiles',
  },
  {
    slug: 'layering-living-room-lighting',
    topic: 'Lighting',
    title: 'How to layer living-room lighting',
    image: 'lighting-2',
    alt: 'An opal globe floor lamp with a slender brass stem',
    intro: 'A ceiling light gets you through the door. A few smaller lights make the room easier to use throughout the evening.',
    sections: [
      ['Light the room first', 'Start with soft light that reaches most of the room. A shaded pendant or a floor lamp that bounces light off a wall can provide an even base.'],
      ['Put light where you need it', 'Set a floor lamp beside a reading chair and position its shade so it lights the page without shining directly into your eyes. Try a table lamp on a sideboard to soften a dark corner.'],
      ['Check the room after dark', 'Switch on the lamps you expect to use together. If one bulb looks noticeably cooler than the others, try matching their colour temperatures.'],
    ],
    category: 'lighting',
    shopLabel: 'Shop lighting',
  },
  {
    slug: 'setting-a-table-for-company',
    topic: 'Dining',
    title: 'Set a table for good company',
    image: 'dining-hero',
    alt: 'An oval walnut dining table set with a ceramic vase and linen runner',
    intro: 'A few choices can make a dining table easier to share, from the shape of the table to where you set the serving dishes.',
    sections: [
      ['Make space around the table', 'Measure with the chairs pulled out and leave a clear route to the doorway. If the room is narrow, an oval table can make it easier to pass around the ends.'],
      ['Keep the centre low', 'Choose a shallow bowl or a short vase so people can see across the table. Leave a clear space for dishes that will be passed around.'],
      ['Keep serving pieces within reach', 'Put extra glasses, water and a spare serving spoon on a nearby sideboard. Guests can help themselves without moving dishes on the table.'],
    ],
    category: 'dining',
    shopLabel: 'Shop dining',
  },
];

export const guidePath = guide => `/journal/${guide.slug}/`;
