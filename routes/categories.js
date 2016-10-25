/**
 * Created by RihabK on 23/06/2016.
 */

var express = require('express');
var router = express.Router();
var ctrlCategory = require('../controllers/categoryCtrl.js');


/* GET all categories  */

router.get('/', ctrlCategory.getAllCategories);

/* GET category by ID */
router.get('/:id', ctrlCategory.getCategoryById);

/* Upload category picture */
//router.post('/:id', ctrlCategory.postSingleCategory);

/* ADD new category  */
router.post('/', ctrlCategory.AddCategory);

/* Edit a category */
router.post('/:id',ctrlCategory.EditCategory);

/* DELETE category  */
router.get('/:id',ctrlCategory.DeleteCategory);

module.exports = router;