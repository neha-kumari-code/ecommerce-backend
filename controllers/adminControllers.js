import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import attributeModel from '../models/attributeModel.js';
import attributeValueModel from '../models/attributeValueModel.js';
import CategoryAttribute from '../models/categoryAttribute.js';
import variantModel from '../models/variantSchema.js';
// admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        if (!email || !password) {
            return res.json({
                success: false,
                message: 'detail missing'
            })
        }
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const adminToken = await jwt.sign(email + password, process.env.JWT_SECRET)
            console.log(adminToken)
            return res.json({
                success: true,
                adminToken
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// product add api
const addProduct=async(req,res)=>{
    try {
        const {name,description,category}=req.body
        if(!name || !description || !category){
            return res.json({
                success:false,
                message:'missing details'
            })
        }
        const exist=await productModel.findOne({name})
        if(exist){
            return res.json({
                success:false,
                message:'product already exist'
            })
        }
        const productDetail={
            name,description,category
        }
        const product=new productModel(productDetail)
        product.save()
        return res.json({
            success:true,
            message:'product created'
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}
const createVariants = async (req, res) => {
    try {
        const { name, description, deliveredAt, price, status, quantity, sizes } = req.body
        const imageFile = req.file
        const uploadedImg = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
        const sizeArray = sizes.split(',')
        const productDetail = {
            name,
            description,
            deliveredAt,
            price,
            status,
            quantity,
            image: uploadedImg.secure_url,
            size: sizeArray
        }
        const newProduct = new productModel(productDetail);
        const product = await newProduct.save();
        return res.json({
            success: true,
            message: 'product added'
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// delete product api
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params
        await productModel.findByIdAndDelete(productId)
        return res.json({
            success: true,
            message: 'product deleted'
        })
    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}


// update product api
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { deliveredAt, price, status, quantity } = req.body
        const update = {}
        if (deliveredAt !== undefined) update.deliveredAt = deliveredAt
        if (price !== undefined) update.price = price
        if (status !== undefined) update.status = status
        if (quantity !== undefined) update.quantity = quantity
        await productModel.findByIdAndUpdate(productId, { $set: update }, { new: true, runValidators: true })
        return res.json({
            success: true,
            message: 'product updated'
        })

    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}
const getAllProduct=async(req,res)=>{
    try {
        const products=await productModel.find({})
        return res.json({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:error.message
        })
    }
}
// add category endpoint
const createCategory = async (req, res) => {
    try {
        let { categoryName, parent, statusValue } = req.body
        const ctExist = await categoryModel.findOne({name: categoryName })
        if (ctExist) {
            return res.json({
                success: false,
                message: 'category already exist'
            })
        }
        if(!statusValue){
            statusValue='active'
        }
        if(!parent){
           parent=null;
        }
        const categoryDetail = {
           name: categoryName,
            parentCategory:parent,
           status: statusValue
        }
        const category = new categoryModel(categoryDetail)
        await category.save()
        return res.json({
            success: true,
            message: 'Category Created'
        })
    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const getAllCategory=async(req,res)=>{
    try {
        const categories=await categoryModel.find({});
        return res.json({
            success:true,
            categories
        })
    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const createAttribute=async(req,res)=>{
    try {
        const {attributeName,attributeType}=req.body
        if(!attributeName || !attributeType){
            return res.json({
                success:false,
                message:'missing details'
            })
        }
        const atExist=await attributeModel.findOne({name:attributeName})
        if(atExist){
            return res.json({
                success:false,
                message:'attribute already exist'
            })
        }
        const attributeDetail={
            name:attributeName,
            inputType:attributeType
        }
        const attribute=new attributeModel(attributeDetail)
        await attribute.save()
        return res.json({
            success:true,
            message:'attribute created'
        })
    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}
const getAllAttribute=async(req,res)=>{
    try {
        const attributes=await attributeModel.find({})
        return res.json({
            success:true,
            attributes
        })
    } catch (error) {
         console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}
const addAttributeValues = async (req, res) => {
  try {
    const { value,attributeName } = req.body;

    // 1️⃣ Split by comma
    const valuesArray = value.split(",").map(v => v.trim());

    // 2️⃣ Create multiple documents
    const docs = valuesArray.map(val => ({
      attribute: attributeName,
      value: val
    }));

    await attributeValueModel.insertMany(docs);

    res.json({success:true, message: "Values added successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const categoryAttributeLink=async(req,res)=>{
    try {
        const {categoryName,attributeName}=req.body
        if(!categoryName || !attributeName){
            return res.json({
                success:false,
                message:'missing detail'
            })
        }
        const catExist=await CategoryAttribute.findOne({category:categoryName,attribute:attributeName})
        if(catExist){
            return res.json({
                success:false,
                message:'link already exist'
            })
        }
        const linkDetail={
            category:categoryName,
            attribute:attributeName
        }
        const link=new CategoryAttribute(linkDetail)
        await link.save()
        return res.json({
            success:true,
            message:'link created'
        })
    } catch (error) {
         console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}
 // category attribute
const getAttributesAndValue = async (req,res) => {
    try {
       let productId=req.body.productId
    const product=await productModel.findById(productId).select("category")
    const categoryId=product.category;
  const CategoryChain = [];
  let current = await categoryModel.findById(categoryId);

  while (current) {
    CategoryChain.push(current._id);
    if (!current.parentCategory) break;
    current = await categoryModel.findById(current.parentCategory);
  }

  const attributes=[];
  for(let i=0;i<CategoryChain.length;i++){
    let at=await CategoryAttribute.find({category:CategoryChain[i]}).populate('attribute');
   for(let j=0;j<at.length;j++){
    attributes.push(at[j].attribute);
   }
  }
 
  for(let i=0;i<attributes.length;i++){
    const attributeId=attributes[i]._id;
    let val=await attributeValueModel.find({attribute:attributeId}).select("value");
    const values=[];
    for(let j=0;j<val.length;j++){  
        values.push(val[j]);
    }
    const attObj=attributes[i].toObject();
    attObj.values=values
    attributes[i]=attObj
  }
 
  return res.json({
    success:true,
    attributes
  }) 
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
    
};
// create variant logic
const createVariant=async(req,res)=>{
    try {
        const {variants}=req.body;
        const imgFiles=req.files;
       for (let idx = 0; idx < variants.length; idx++) {
            const attributes=[];
            variants[idx].attributes.forEach((a)=>{
                attributes.push({
                    attribute:a.attribute,
                    value:a.value
                })
            })
            const images=[];
            const files=imgFiles.filter(file=>file.fieldname===`variants[${idx}][images]`);
            for(let file of files){
                const result=await cloudinary.uploader.upload(file.path,{
                    folder:"products"
                })
                images.push(result.secure_url)
            }
            const detail={
                attributes,
                images,
                price:variants[idx].price,
                stock:variants[idx].stock,
                status:variants[idx].status,
                product:variants[idx].product
            }
            const newVariant=await variantModel.create(detail);
            await productModel.findByIdAndUpdate(variants[idx].product,{
                $push: { variants: newVariant._id }
            })
        }
        return res.json({
            success:true,
            message:'variant added successfully'
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}
const listItem=async(req,res)=>{
    try {
        const allProducts=await productModel.find({}).populate({
            path:'variants',
            populate:[
                {
                    path:'attributes.attribute',
                    model:'Attribute'
                },
                {
                   path:'attributes.value',
                    model:'AttributeValue' 
                }
            ]
        }).populate('category')
        return res.json({
            success:true,
            allProducts
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        }) 
    }
}
export { adminLogin, addProduct, deleteProduct, updateProduct,createCategory,getAllCategory,createAttribute,getAllAttribute,addAttributeValues,categoryAttributeLink,getAllProduct,getAttributesAndValue,createVariant,listItem }