import { createCanvas, loadImage } from "../mod.ts";

import * as path from "https://deno.land/std/path/mod.ts";

const readDir = async (directory: string,filePathArr:string[],isFirst:boolean) => {
  //判断最底级
  for await (const dirEntry of Deno.readDir(directory)) {
    if(isFirst){
      filePathArr = []
    }
    
    const filename = dirEntry.name
    const filePath = path.join(directory, filename);
    const stats = Deno.statSync(filePath);
    if (!stats.isDirectory) {
      // filePathArr = filePathArr.filter(item=>{
      //   return item !== filePath
      // })
      if(directory.split('/')[directory.split('/').length-1]==='last'){
        for await (const dirEntry of Deno.readDir(directory)){
          const filename = dirEntry.name
          const filePath2 = path.join(directory, filename);
          // console.log(filePath)
          const index = filePathArr.findIndex(item=>{
            return item === filePath2
          })
          if(index !== -1){
            filePathArr.splice(index)
          }
        }
        filePathArr = [...filePathArr,filePath]
        const canvas = createCanvas(1000, 1000);
        const ctx = canvas.getContext("2d");
        filePathArr.forEach(async (item)=>{
            if(item.split('/')[item.split('/').length-1]==='.DS_Store')return
            const img = await loadImage('./'+item);
            console.log(img)
            ctx.drawImage(img, 0, 0);
        })
        await Deno.writeFile(`./image/${new Date().getTime()}.png`, canvas.toBuffer());
      }
      
      await readDirChild(directory,filePathArr,filePath)
    }
  }
}

const readDirChild =async (directory: string,filePathArr:string[],imagePath:string) => {
  for await (const dirEntry of Deno.readDir(directory)) {
    const filename = dirEntry.name
    const filePath = path.join(directory, filename);
    const stats = Deno.statSync(filePath);
    if (stats.isDirectory) {
      await readDir(filePath,[...filePathArr,imagePath],false)
    }
  }
  
}

readDir('people',[],true)

// function traverse(dirname){
//   const data = readDir(dirname)
//   drawImage(data)
// }
// function drawImage(data){
//   data.forEach(async (path:string,index:any)=>{
//     const img = await loadImage(path);
//     ctx.drawImage(img, 0, 0);
    
//   })
// }
// const canvas = createCanvas(200, 200);
// const ctx = canvas.getContext("2d");
// drawImage()
// await Deno.writeFile(`./image.png`, canvas.toBuffer());

// console.log(1111)



// //读取文件夹内容


// await Deno.mkdir("./image")

// const img = await loadImage(
//   "./image.png",
// );
// ctx.drawImage(img, 0, 0);

// const img2 = await loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAC8UlEQVRIx42V32vVdRjHXx5F3MBld4FWDGXSopoW1brTuwVhRGiwC8HyIhz9wIu6iCQ00uG6UBAJ3am/oNCgWNrCH6PEaDuj5VYzZiPM8ixTtzPa2auLz/f7Pd/za6fnc/F9Ps/n+fV9Ps/7+SyjFrXwHFtpp4NVQIFhxhjkFP/wP2g9WeYR9/i2iPhi+M6TZcPSxs30UgxGm1z0u8hB3omIo0gvzfXMN5IjVvSoekzENS76maUTRtlYy7yDfErJIfWpiN9tJpG/Z6vk6aiOnkcc8ECkeN3f0lGTdcXvRfLlWTSH5LerA5HiicRVWG94w5fFx+0Mkly6Fr1B6WP1/Zpx8Yy6o1zWG5tviCv/g//aVMfBtH9WyoqsDw6yeMUt4m3Ho8M3/cYp77rojJOe9iW/9UJ01uUNDwW+P3TdfJ9F28Rxj4svOG4lLXjWRyIH/erhwBdogW4c8WqS2F7vpgwLTiX8hG0iXnbBB2P9bjiJs34eCZ42Xxb5U/GnZBc6828nS3U4uYL2Hpo4F9XzLe4ta48n+YgHUrt3mOEezpcU2mFuVxKfVMK1acQnPOPz4l4vuVxmiU13etWd3mrgYC4JdclF14mZOJdttLKGOw2wvop9CeqvMQ3AXPA44W3xKxvRl1G++oXIbIZhgNW08jNwkJsNcngIgC5gCGAkw1io/gpywFle49qSDu5nMzDDOPsBxqAbcZc/2iWu9JYfeMScd+r+xNE0HrqhJUzAsA6on0T8Ol9xj39VObhYMi/QEoGpPmgHqhykUJmNb6RYD7SverDGT+xIwTkDTNIXl+h3BlMFO8GxmrfybPj0MVkx0uK13d0J7tbWqMK5qpGWDNW4qaYj3P0iTlSYT7m1aqiWjfX7XPCy2KOeigpboqGKsZ5ggWE6GQV4neWMAo8Cg8BUovIHh3iGX0fpDP1b92k77DaxzXdF3K/OmvPDhk9bfKn9FNIlfdieuG2y8Rwu0bIln/fHaALmGGGMrzld63n/D5IUk9MNidXBAAAAAElFTkSuQmCC')

// ctx.drawImage(img2,0,0);

// await Deno.writeFile("./image/image.png", canvas.toBuffer());
// await Deno.writeFile("./image/image2.png", canvas.toBuffer());
// await Deno.writeFile("./image/image3.png", canvas.toBuffer());
// await Deno.writeFile("./image/image4.png", canvas.toBuffer());
// await Deno.writeFile("./image/image5.png", canvas.toBuffer());
// await Deno.writeFile("./image/image6.png", canvas.toBuffer());


