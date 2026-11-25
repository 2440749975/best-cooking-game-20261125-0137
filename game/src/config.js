globalThis.RushKitchen = (() => {
  const ingredients = ['Bottom bun', 'Patty', 'Cheese', 'Lettuce', 'Tomato', 'Top bun'];
  const recipes = [
    { name: 'The Classic', layers: [1, 2, 6] }, { name: 'Gold Melt', layers: [1, 2, 3, 6] },
    { name: 'Garden Club', layers: [1, 2, 4, 5, 6] }, { name: 'All-American', layers: [1, 2, 3, 4, 5, 6] },
    { name: 'Red Rocket', layers: [1, 2, 3, 5, 6] }, { name: 'Green Melt', layers: [1, 2, 3, 4, 6] },
  ];
  const controls = { start: [240,384,314,54], restart: [220,402,328,54], mute: [1212,9,56,49],
    grill: [18,274,374,265], serve: [810,277,451,262], trash: [714,477,84,55] };
  ingredients.forEach((name,index) => { controls[index + 1] = [26 + 206 * index,568,196,108]; });
  return { ingredients, recipes, controls, width: 1280, height: 720, duration: 90,
    heat: { cooked: 1.7, perfect: 2.6, late: 4, burnt: 5.2, max: 6.1 }, targets: [75,200,400] };
})();
