const Category = require('../model/categoryModel');

const createCategory = async function(req, res){
    try {
        if(req.body == undefined){
            return res.status(200).json({errorCode : 400, message : 'Empty Request Body'})
        }
        if(!req.body.categoryName){
            return res.status(200).json({errorCode : 400, message : 'Please Provide Category'})
        }
        await Category.create({categoryName : req.body.categoryName});
        return res.status(200).json({errorCode : 200, message : 'Categry Added Successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
};


const getCategories = async function(req, res){
    try {
        let category = await Category.find({})
        if(category.length == 0){
            return res.status(200).json({errorCode : 400, message : 'No Category found'})
        }
        let data = []
        for(let i =0; i<category.length; i++){
            data.push({
                categoryName: category[i].categoryName,
                categoryId : category[i]._id
            })
        }
        return res.status(200).json({errorCode : 200,message : 'Category List', data})
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
}

const updateCategory = async function(req, res){
    try{
        if(req.body == undefined){
            return res.status(200).json({errorCode : 400, message : 'Empty Request Body'})
        }
        let categoryId = req.params.categoryId;
        let cate = await Category.findOne({_id : categoryId})
        if(!cate){
            return res.status(200).json({error_code : 404, message : 'No Category exist For thsi Category'})
        }
        if(req.body.categoryName != undefined){
            if(!req.body.categoryName){
                return res.status(200).json({errorCode : 400, message : 'Please Provide Category Name'})
            }
        }
        let obj = {
            categoryName : req.body.categoryName
        };
        await Category.findOneAndUpdate({_id : categoryId }, {$set : obj}, {new : true})
        return res.status(200).json({erroCode : 200, message : 'Category Update Successfully' })
    }catch(error){
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
}


const deleteCategory = async function(req, res){
    try {
        let categoryId = req.params.categoryId;
        let check_service = await Category.findOne({_id : categoryId})
        if(check_service.serviceId.length == 0){
            let category = await Category.findOneAndDelete({_id : categoryId})
            if(!category){
               return res.status(200).json({erroCode : 404, message : 'Category Not Exist'})
            }
            return res.status(200).json({erroCode : 200, message : 'Category Deleted Successfully'}) 
        }
        return res.status(200).json({errorCode : 400, message : 'this category cannot be delete.(services is present)'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({errorCode : 500, message : 'Internal Server Error'})
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}