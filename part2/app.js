const { getData } = require('./index')


const printOutData = async () => {
	const dataInfo = await getData()
    
	console.log(dataInfo)
}

printOutData()
