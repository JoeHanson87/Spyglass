export const defaultSettings: Record<string, string> = {
  phone: "01795 123456",
  email: "hello@spyglassandkettle.co.uk",
  address: "Sittingbourne, Kent",
  instagram: "#",
  facebook: "#",
  resdiaryId: "YOUR_RESTAURANT_ID",
  bannerOn: "false",
  bannerText: "",
  hours: "Mon–Thu|12pm – 11pm\nFri–Sat|12pm – 12am\nSunday|12pm – 10:30pm",
  menuNote: "Please tell us about any allergies. Sample menu; dishes and prices are placeholders.",
};

export const seedMenu = [
  { name: "Starters", items: [
    ["Soup of the Day", "With crusty bread and Kentish butter", "£7", ""],
    ["Scotch Egg", "Black pudding, piccalilli", "£8", ""],
    ["Whitebait", "Lemon, tartare sauce", "£8.50", ""],
    ["Chicken Liver Pâté", "Red onion chutney, toasted brioche", "£8.50", ""],
  ]},
  { name: "Mains", items: [
    ["Beer-Battered Haddock", "Triple-cooked chips, mushy peas", "£16.50", ""],
    ["8oz Sirloin Steak", "Roasted tomato, mushrooms, peppercorn sauce", "£26", ""],
    ["Steak & Ale Pie", "Mash, seasonal greens, gravy", "£17", ""],
    ["Wild Mushroom Risotto", "Parmesan, truffle oil", "£15", "v"],
  ]},
  { name: "Desserts", items: [
    ["Sticky Toffee Pudding", "Butterscotch sauce, vanilla ice cream", "£8", ""],
    ["Apple & Blackberry Crumble", "Proper custard", "£8", ""],
    ["Kentish Cheeseboard", "Chutney, biscuits, grapes", "£11", ""],
  ]},
  { name: "Sunday Roast", items: [
    ["Roast Sirloin of Beef", "Yorkshire pudding, roast potatoes, all the trimmings", "£19", ""],
    ["Roast Chicken", "Sage & onion stuffing, pigs in blankets", "£17", ""],
    ["Nut Roast", "Vegetable gravy, all the trimmings", "£16", "v"],
  ]},
] as const;

function future(monthsAhead: number, day: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsAhead, day);
  return d.toISOString().slice(0, 10);
}

export const seedEvents = [
  { title: "The Rovers", category: "music", date: future(0, 28), startTime: "20:00", description: "Folk & rock covers", image: "/images/music.png" },
  { title: "Acoustic Session", category: "music", date: future(1, 11), startTime: "19:00", description: "Local singer-songwriters", image: "/images/music.png" },
  { title: "Sunday Jazz", category: "music", date: future(1, 22), startTime: "14:00", description: "Live jazz over Sunday lunch", image: "/images/music.png" },
  { title: "Winter Specials Launch", category: "event", date: future(1, 24), startTime: "12:00", description: "Our festive menu arrives. All day.", image: "/images/winter.png" },
  { title: "Christmas Fayre", category: "event", date: future(2, 2), startTime: "11:00", description: "Local makers & mulled wine", image: "/images/dining.png" },
  { title: "New Year's Eve", category: "event", date: future(2, 28), startTime: "19:00", description: "Set menu & party", image: "/images/pub.png" },
];

export const seedNights = [
  { title: "Quiz Night", weekday: 4, startTime: "19:30", description: "Great prizes to be won", image: "/images/quiz.png" },
  { title: "Steak Night", weekday: 3, startTime: "18:00", description: "Any steak & a glass of wine", image: "/images/food.png" },
  { title: "Gin Club", weekday: 2, startTime: "17:00", description: "Tasting flights", image: "/images/bar.png" },
];
