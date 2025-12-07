const fs = require("fs");
const data = require("./data/entertainment.json");

const titles = data.map((item) => item.title);
const duplicates = titles.filter((item, index) => titles.indexOf(item) !== index);

console.log("Duplicate titles:", duplicates);
