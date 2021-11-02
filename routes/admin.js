var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products});
  })
  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true})
})
router.post('/add-product',(req,res)=>{
 
  productHelpers.addProduct(req.body,(id)=>{
    let image = req.files.Image
    
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-product',{admin:true})
      }
      else{
        console.log(err);
      }
    })
    
  })
})

router.get('/delete-product/:id',(req,res)=>{
  let proId = req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id',async (req,res)=>{
  let product = await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{admin:true,product})
})

router.post('/edit-product/:id',(req,res)=>{
  let id = req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image = req.files.Image
      image.mv('./public/product-images/'+id+'.jpg')
    }
  })
}),
router.get('/all-users',(req,res)=>{
  // res.render('admin/all-users',{admin:true})
 productHelpers.getAllUsers().then((users)=>{
    console.log(users)
    res.render('admin/all-users',{admin:true,users});
  })
  
}),
// router.get('/all-orders',(req,res)=>{
//   // res.render('admin/all-users',{admin:true})
//  productHelpers.getAllOrders().then((orders)=>{
//     console.log(orders)
//     res.render('admin/all-users',{admin:true,orders});
//   })
  
// }),
router.get('/all-orders', (req, res, next)=> {
  productHelpers.getAllOrders().then((orders)=>{
    console.log(orders)
    res.render('admin/all-orders',{admin:true,orders});
  })
  
});
// router.get('/all-orders/:id',async (req,res)=>{
//   let product = await productHelpers.getAllOrders(req.params.id)
//   console.log(users);
//   res.render('admin/all-orders',{admin:true,users})
// })
module.exports = router;  
