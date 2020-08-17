const needle = require('needle');
const mongodb = require('./config/mongodb.connect');

const options = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
  },
};

async function main() {
  const mongoClient = await mongodb();
  const hmDb = mongoClient.db('hm');
  const womenProducts = hmDb.collection('women-products');

  const pageSize = 96;
  let totalProducts = 1000;
  for (let offset = 0; offset < totalProducts; offset = offset + pageSize) {
    const result = await needle(
      'get',
      `https://www2.hm.com/en_us/women/products/view-all/_jcr_content/main/productlisting_30ab.display.json?sort=stock&image-size=small&image=model&offset=${offset}&page-size=${pageSize}`,
      options
    );
    totalProducts = result.body.total;
    await womenProducts.insertMany(result.body.products);
    await sleep(5000);
    console.log(offset);
    console.log(totalProducts);
  }
  //   console.log(result);
}

async function sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

main();
