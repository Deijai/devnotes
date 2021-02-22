const mongoose = require('mongoose');
const slug = require('slug');
const Post = mongoose.model('Post');

exports.add = (req, res)=>{

    res.render('postAdd');

};

exports.addAction = async (req, res)=>{
    //res.json( req.body );
    req.body.tags = req.body.tags.split(',').map(t=>t.trim()); 
    req.body.author = req.user._id;
    const post = new Post( req.body );

    try {
        await post.save();
    } catch (error) {
        req.flash('error', 'Error: '+error.message); 
        res.redirect('/post/add'); 
        return;
    }
    

    req.flash('success', 'Post salvo com sucesso!'); 

    res.redirect('/');
};

exports.edit = async (req, res)=>{

    //1.pegar os dados
    const post = await Post.findOne({slug:req.params.slug});

    //2.carregar a pagina de edição
    res.render('postEdit', {post:post}); 

};

exports.editAction = async (req, res)=>{
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());
    req.body.slug = slug(req.body.titulo, {lower:true});

    try {
        
        const postEdit = await Post.findOneAndUpdate(
            {slug:req.params.slug},
             req.body, 
             {
                new:true,
                runValidators:true
             }
        );
    } catch (error) {
        req.flash('error', 'Error ao editar: '+error.message); 
        res.redirect('/post/'+req.params.slug+'/edit'); 
        return; 
    }


    req.flash('success', 'Post editado com sucesso!'); 
    res.redirect('/');


};

exports.view = async (req, res)=>{

    //1.pegar os dados
    const post = await Post.findOne({slug:req.params.slug});

    //2.carregar a pagina de edição
    res.render('view-post', {post:post});
};