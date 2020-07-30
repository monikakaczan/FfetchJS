const fetch = require("node-fetch");
var ColorThief = require('color-thief-jimp');
var Jimp = require('jimp');
var convert = require('color-convert');
const Coloraze = require('coloraze');
const coloraze = new Coloraze();
 


const url='https://www.farfetch.com/uk/plpslice/listing-api/query?setId=9645&view=10&gender=Men'

const init = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
}

const getDominantColor = (url) => {
    // const colors = Promise.all(urls.map(url => getDominantColor(url)))
    
    Jimp.read(url, (err, sourceImage) => {
        if (err) {
          console.error(err);
          return;
        }

        const dominantColor = ColorThief.getColor(sourceImage);
        const convertedHex = convert.rgb.hex(dominantColor)
        const converted = coloraze.name(`#${convertedHex}`)
        console.log(converted)
        return converted
      })
}

exports.getData = async () => {

	try {
		const response = await fetch(`${url}`, init)
        
        if (response.ok) {
            const jsonResponse = await response.json()
            const products = jsonResponse.listing.products

            const urls = products.map(productUrl => productUrl.images.cutOut)
            
            const colors = urls.map(url => getDominantColor(url))
            console.log('colors', colors)
            // return an array of designers, descriptions, urls, images, colours
            const productsArray = products.reduce((acc, product) => {
                return acc.concat([product.brand.name, product.shortDescription, product.url, product.images.cutOut])
            }, [])
            return productsArray
        }
		
	} catch (err) {
        console.log(err)
	}
}
