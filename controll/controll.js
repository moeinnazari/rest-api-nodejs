const Product=require('../model/model.js')
const {getPostData}=require('../utils/utils.js')


//@route GET api/products
const getProducts=async (req,res)=>{
        try {
        
        const products=await Product.findAll();
        
        if(!products){
        
          res.writeHead(200,{"Content-Type" : "application/json"})
       	  res.end(JSON.stringify({message:"NO EXIST PRODUCTS"}))
        
        }
        else{
         
          res.writeHead(404,{"Content-Type" : "application/json"})
       	  res.end(JSON.stringify(products,null,'\t'))

        }
        } catch(e) {
        	// statements
        	console.log(e);
        }
}


//@route GET api/product/id
const getProduct=async (req,res,id)=>{
	try {
        const product=await Product.findById(id)
        if(!product){
			res.writeHead(200,{"Content-Type" : "application/json"})
			res.end(JSON.stringify({message:`PRODUCT BY ID ${id} NOT FOUND`}))
        }
        else{
        	res.writeHead(404,{"Content-Type" : "application/json"})
       	    res.end(JSON.stringify(product,null,'\t'))

        }
	} catch(e) {
		// statements
		console.log(e);
	}
}


//@route  POST api/products
const createProduct=async (req,res)=>{
	try {
		const body=await getPostData(req)

		const {name,age}=JSON.parse(body)
		
		const product={
			name,
			age
		}

		const newProduct=await Product.create(product)
		res.writeHead(201,{"Content-Type" : "application/json"})
       	res.end(JSON.stringify(product,null,'\t'))


	} catch(e) {
		// statements
		console.log(e);
	}
}


//@route DELETE api/product/id
const deleteProduct=async (req,res,id)=>{
	try {
		const product=await Product.findById(id)
		if(!product){
            res.writeHead(200,{"Content-Type" : "application/json"})
			res.end(JSON.stringify({message:`PRODUCT BY ID ${id} NOT FOUND`}))
		}
		else{
			await Product.remove(id)
			res.writeHead(200,{"Content-Type" : "application/json"})
			res.end(JSON.stringify({message:`PRODUCT BY ID ${id} REMOVED SUCCESSFULLY`}))

		}
	} catch(e) {
		// statements
		console.log(e);
	}
}


//@route PUT api/products/id
const updateProduct=async (req,res,id)=>{
	try {
		const product=await Product.findById(id)
        if(!product){
            res.writeHead(200,{"Content-Type" : "application/json"})
			res.end(JSON.stringify({message:`PRODUCT BY ID ${id} NOT FOUND`}))
		}
		else{
			const body=await getPostData(req)

		const {name,age}=JSON.parse(body)
		
		const newproduct={
			name:name || product.name,
			age:age || product.age
		}
 		const updProduct=await Product.update(id,newproduct)
 		res.writeHead(200,{"Content-Type" : "application/json"})
		res.end(JSON.stringify(updProduct))
	}

	} catch(e) {
		// statements
		console.log(e);
	}
}
module.exports={
	getProducts,
	getProduct,
	createProduct,
	deleteProduct,
	updateProduct
}