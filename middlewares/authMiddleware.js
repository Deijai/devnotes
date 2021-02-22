exports.isLogged = (req, res, next)=>{

    if(!req.isAuthenticated()){
        req.flash('error', 'Ops! Voçê não tem permissão para acessar essa página!');
        res.redirect('/users/login');
        return;
    }

    next();


};

exports.changePassword = (req, res)=>{

    //1.veirifcar se as senhas batem
    let password = req.body.nova;
    let confirma = req.body.confirma;

    console.log('pass: '+password+'   conf'+confirma);

    if(password != confirma){
        req.flash('error', 'As senhas não batem, favor verificar.');
        res.redirect('/profile');
        return;
    }
    //2.procurar o usuario e trocar a senha
    req.user.setPassword(req.body.nova, async ()=>{
        await req.user.save();
        req.flash('success', 'Senha alterada com sucesso.');
        res.redirect('/');
    });
    //3.redirecionar para a pagina HOME

};