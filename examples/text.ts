import { createCanvas,loadImage } from "../mod.ts";

const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext("2d");

// ctx.fillStyle = "black";
// ctx.fillRect(0, 0, 200, 200);

// ctx.fillStyle = "white";
// ctx.font = "20px sans-serif";
// // TODO: Find out why textBaseline, textAlign, etc. is broken
// // ctx.textBaseline = "bottom";
// ctx.fillText("Hello, World!", 5, 25);
const img = await loadImage("./people/2.jpg");
ctx.drawImage(img, 0, 0);
const img2 = await loadImage("./people/帽子/2.png");
ctx.drawImage(img2, 0, 0);
const img3 = await loadImage("./people/帽子/眉毛/眉毛1.png");
ctx.drawImage(img3, 0, 0);
const img4 = await loadImage("./people/帽子/眉毛/配饰/配饰1.png");
ctx.drawImage(img4, 0, 0);
const img5 = await loadImage("./people/帽子/眉毛/配饰/牙齿/牙齿3.png");
ctx.drawImage(img5, 0, 0);
const img6 = await loadImage("./people/帽子/眉毛/配饰/牙齿/last/衣服2.png");
ctx.drawImage(img6, 0, 0);


await Deno.writeFile("image2.png", canvas.toBuffer());
