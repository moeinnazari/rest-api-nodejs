const products=require('../data/products.json')
const {writeDatatoFile}=require('../utils/utils.js')
//find all products 
const findAll=()=>{
	return new Promise((resolve,reject)=>{
		resolve(products)
	})
}


//find product by id
const findById=(id)=>{
	return new Promise((resolve,reject)=>{
		const product=products.find((p)=>p.id===id)
		resolve(product)
	})
}

//create a product
const create=(product)=>{
	return new Promise((resolve,reject)=>{
		
		const newProduct={id:String(Number(products[products.length-1]["id"])+1),...product}
		products.push(newProduct)
		writeDatatoFile('./data/products.json',products)
		resolve(newProduct)
	})
}


//delete
const remove=(id)=>{
	return new Promise((resolve,reject)=>{
		const newProducts=products.filter((p)=>p.id!==id)
		writeDatatoFile('./data/products.json',newProducts)
		resolve()
	})
}


//update
const update=(id,product)=>{
	return new Promise((resolve,reject)=>{
		const index=products.findIndex((p)=>p.id===id)
		products[index]={id,...product}
		writeDatatoFile('./data/products.json',products)
		resolve({id,...product})
	})
}


module.exports={
	findAll,
	findById,
	create,
	remove,
	update,

}
