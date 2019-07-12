import "babel-polyfill"
const websites = ['codecasts', 'laravist'];
/* npm install --save-dev babel-cli babel-preset-es2015 */
const info = websites.map(website => `${website} is cool`);

for(const website of websites){
  console.log(website);
}

Array.from([1,2,3]);