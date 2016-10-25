/**
 * Created by RihabK on 23/06/2016.
 */

var express = require('express');
var router = express.Router();
var ctrlSubCategory = require('../controllers/sub_categoryCtrl.js');


/* GET all SubCategories  */

router.get('/', ctrlSubCategory.getAllSubCategories);

/* GET SubCategory by ID */
router.get('/:id', ctrlSubCategory.getSubCategoryById);

/* Upload category picture */
router.post('/:id', ctrlSubCategory.postSingleSubCategory);

/* ADD new category  */
router.post('/', ctrlSubCategory.AddSubCategory);

/* Edit a category */
router.post('/edit/:id',ctrlSubCategory.EditSubCategory);

/* DELETE category  */
router.get('/delete/:id',ctrlSubCategory.DeleteSubCategory);

module.exports = router;
