const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const imageMiddleware = require('../middlewares/imageMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//ROTAS
const router = express.Router();
router.get('/', homeController.index); 

router.get('/sobre', (req, res)=>{
    res.send('Pagina sobre');
});

router.get('/quem', (req, res)=>{
    res.send('Pagina quem somos');
});

router.get('/posts/:id', (req, res)=>{
    let id = req.params.id;
    res.send('id do post'+id);
});






router.get('/template', homeController.index);

router.get('/users/login', userController.login); 
router.post('/users/login', userController.loginAction);


//rotas para resetar senha
router.get('/users/forget', userController.forget);
router.post('/users/forget', userController.forgetAction);

router.get('/users/reset/:token', userController.reset);
router.post('/users/reset/:token', userController.resetAction);

router.get('/users/logout', userController.logout);

router.get('/users/register', userController.register); 
router.post('/users/register', userController.registerAction);


router.get('/profile/', authMiddleware.isLogged, userController.profile);
router.post('/profile/', authMiddleware.isLogged, userController.profileAction);

router.post('/profile/password', authMiddleware.isLogged, authMiddleware.changePassword); 








router.get('/perfil', (req, res)=>{
    res.send("Perfil");
} );













//criando rotas para o blog

//rotas para adicionar
router.get('/post/add', authMiddleware.isLogged, postController.add);
router.post('/post/add',authMiddleware.isLogged, imageMiddleware.upload, imageMiddleware.resize, postController.addAction);

//rotas para editar
router.get('/post/:slug/edit',authMiddleware.isLogged, postController.edit);
router.post('/post/:slug/edit',authMiddleware.isLogged, imageMiddleware.upload, imageMiddleware.resize, postController.editAction);

//rotas de visialização
router.get('/post/:slug', postController.view);

















module.exports = router;