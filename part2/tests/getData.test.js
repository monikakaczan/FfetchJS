const { getData } = require('../index')
jest.setTimeout(20000);

describe('getData', () => {
	it('Successfully gets returns an array of designers, descriptions, images, paths and colors', async () =>{
		
		const result = await getData();

		expect(result.length).toEqual(50)
	})
})