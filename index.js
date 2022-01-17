const http=require('http')
const {getProducts,getProduct,createProduct,deleteProduct,updateProduct}=require('./controll/controll.js')

const PORT=process.env.PORT || 5000

const server=http.createServer((req,res)=>{
       if(req.url==="/" && req.method==="GET"){
              res.writeHead(302,{'Location':'/api/products'})
              res.end()
       }
       else if(req.url==="/api/products" && req.method==="GET"){
       	  getProducts(req,res)
       }
       else if(req.url.match(/\/api\/products\/[0-9]+/) && req.method==="GET"){
       	   const id=req.url.split('/')[3]
       	   getProduct(req,res,id)
       }
       else if(req.url==="/api/products" && req.method==="POST"){
       	  createProduct(req,res)
       }
       else if(req.url.match(/\/api\/products\/[0-9]+/) && req.method==="PUT"){
       	  const id=req.url.split('/')[3]
       	  updateProduct(req,res,id)
       }
       else if(req.url.match(/\/api\/products\/[0-9]+/) && req.method==="DELETE"){
       	  const id=req.url.split('/')[3]
       	  deleteProduct(req,res,id)
       }
       else{
       	  res.writeHead(404,{"Content-Type" : "application/json"})
       	  res.end(JSON.stringify({message:"PAGE NOT FOUND"}))
       	
       }
})


server.listen(PORT,()=>console.log(`srever is running on http://localhost:${PORT}`))