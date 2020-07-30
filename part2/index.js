const fetch = require("node-fetch");


const url='https://www.farfetch.com/uk/plpslice/listing-api/query?setId=9645&view=10&gender=Men'

const init = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    }
}
exports.getData = async () => {

	try {
		const response = await fetch(`${url}`, init)
        
        if (response.ok) {
            const jsonResponse = await response.json()
        }
		
	} catch (err) {
        console.log(err)
	}
}