import express from 'express'
import { adminLogin, getAllAttribute,addAttributeValues,categoryAttributeLink,addProduct,getAllProduct,getAttributesAndValue, createVariant, listItem } from '../controllers/adminControllers.js'
import { createCategory } from '../controllers/adminControllers.js'
import { getAllCategory } from '../controllers/adminControllers.js'
import { createAttribute } from '../controllers/adminControllers.js'
import adminAuth from '../auth/adminAuth.js'
import upload from '../config/multer.js'
const adminRouter=express.Router()
adminRouter.post('/login',adminLogin)
adminRouter.post('/create-category',adminAuth,createCategory)
adminRouter.get('/get-category',getAllCategory)
adminRouter.post('/create-attribute',adminAuth,createAttribute)
adminRouter.get('/get-attribute',adminAuth,getAllAttribute)
adminRouter.post('/set-attributeValue',adminAuth,addAttributeValues)
adminRouter.post('/category-attribute-link',adminAuth,categoryAttributeLink)
adminRouter.post('/add-product',adminAuth,addProduct)
adminRouter.get('/get-product',adminAuth,getAllProduct)
adminRouter.post('/get-attribute-value',getAttributesAndValue)
adminRouter.post('/create-variant',adminAuth,upload.any(),createVariant)
adminRouter.get('/list-item',adminAuth,listItem)
export default adminRouter