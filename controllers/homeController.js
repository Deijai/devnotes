const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddleware = (req, res, next)=>{

    let info = {name:'Deijai Miranda'};
    req.userInfo = info;

    next();
};

exports.index = async (req, res)=>{

    console.log(req.user);

    /*
    let obj = {
        nome:"Deijai Miranda",
        idade: 25,
        profissao:"Analista de Desenvolvimento",
        mostrar:true,
        ingredientes:[
            {nome:"Arroz", qt:"500g"},
            {nome:"Macarrão", qt:"200g"}
        ],
        interesses:['Node', 'Java', 'Javascript', 'PHP', 'CSS'] ,
        userName: req.userInfo,
    };
    
    */

    let dados = {
        posts:[],
        tags:[],
        tag: '',
        user:[]
    };  

    dados.tag = req.query.t;
    dados.user = req.user;
    
    const postFilter = (typeof dados.tag != 'undefined') ? {tags:dados.tag} : {};

    const tagspromise =  Post.getTagsList();
    const postspromise =  Post.findPosts( postFilter );

    const [tags, posts] = await Promise.all([ tagspromise, postspromise ]);

    console.log(posts[0]);

    


    for(let i in tags){
        if(tags[i]._id == dados.tag){
            tags[i].class = 'selected';
        }
    }


    dados.tags = tags;   
    dados.posts = posts;

    res.render('home', dados);
};


