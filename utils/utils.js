const fs=require('fs')

const getPostData=(req)=>{
	return new Promise((resolve,reject)=>{
		try {
		
		let body=''

		req.on('data',chunk=>{
			body+=chunk.toString()
		})

		req.on('end',()=>{
			resolve(body)
		})

		} catch(e) {

		reject(e)
		}
	})
}

const writeDatatoFile=(dirname,data)=>{
	fs.writeFileSync(dirname,JSON.stringify(data,null,'\t'),'utf8',(err)=>{
		if(err){
			console.log("err in utils",err)
		}
	});
}
module.exports={
	getPostData,
	writeDatatoFile
}