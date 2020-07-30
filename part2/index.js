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

    return new Promise((resolve, reject)=> {
        Jimp.read(url, (err, sourceImage) => {
            if (err) {
                console.error(err);
                return;
            }
    
            const dominantColor = ColorThief.getColor(sourceImage);
            const convertedHex = convert.rgb.hex(dominantColor)
            //coloraze returns names of colors
            const converted = coloraze.name(`#${convertedHex}`)
            resolve(converted)
            })
        })
}
    


exports.getData = async () => {

	try {
		const response = await fetch(`${url}`, init)
        
        if (response.ok) {
            const jsonResponse = await response.json()
            const products = jsonResponse.listing.products

            const urls = products.map(productUrl => productUrl.images.cutOut)
            
            // return an array of designers, descriptions, urls, images, colours
            const productsArray = products.reduce((acc, product) => {
                return acc.concat([product.brand.name, product.shortDescription, product.url, product.images.cutOut])
            }, [])


            return Promise.all(urls.map(url => getDominantColor(url)))
            .then(data => {
                //start at 4th index and inject color of the product every 5th index
                    let index = 4;
                    data.forEach((i) => {
                        productsArray.splice(index, 0, i);
                        index += 5;
                });
                return productsArray
            })
        }
        throw new Error ('Request failed!')
    } catch (err) {
        console.log(err)
	}
}
