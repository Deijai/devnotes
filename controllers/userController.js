const User = require('../models/User');
const crypto = require('crypto');
const mailHandler = require('../handlers/mailHandler');


exports.index = (req, res)=>{

    let nome = req.query.nome;

    let resposta = {
        nome:"Deijai Miranda",
        idade: 25,
        profissao:"Analista de Desenvolvimento",
        projeto:"Desenvolvimento de Software"
    };

    res.json(resposta);



//quando usar o json, nao pode usar o send
    //res.send( "Dados: " +res.);
};

exports.login = (req, res)=>{
    
    
    res.render('login');
};

exports.register = (req, res)=>{

    res.render('register');
};

exports.registerAction = (req, res)=>{

    User.register(new User(req.body), req.body.senha, (e)=>{
        if(e){
            req.flash('error', 'Ocorreu um erro!');
            res.redirect('/users/register');
            return;
        }
        req.flash('success', 'Usuario criado com sucesso!'); 
        res.redirect('/users/login'); 
    });
   
};

exports.loginAction = (req, res)=>{

    const auth = User.authenticate();

    auth(req.body.email, req.body.senha, (error, result)=>{

        if(!result){
            req.flash('error', 'email e/ou senha estão incorretos!');
            res.redirect('/users/login');
            return;
        }

       

        req.login(result, ()=>{});
         

        req.flash('success', 'Você foi logado com sucesso!');
        res.redirect('/');

    });

};

exports.logout = (req, res)=>{

    req.logout();
    res.redirect('/'); 

};

exports.profile = (req, res)=>{
    let dados = {};

    res.render('profile', dados);
};

exports.profileAction = async (req, res)=>{

    try {
        
    const user = await User.findOneAndUpdate(
        {_id:req.user._id},
        {name:req.body.name, email:req.body.email},
        {new:true, runValidators:true}
    );
    } catch (error) {
       req.flash('error', 'Erro ao alterar o usuario.'+error.message); 
       res.redirect('/profile');
       return;
    }



    req.flash('success', 'Dados alterados com sucesso.');
    res.redirect('/profile');

};

exports.forget = (req, res)=>{

    res.render('forget');
};

exports.forgetAction = async (req, res)=>{
    
        const user = await User.findOne({email:req.body.email});

        if(!user){
            req.flash('error', 'Email não cadastrado! [Danger]');
            res.redirect('/users/forget');
            return;
        }

        //gerar token
        user.resetTokenPassword = crypto.randomBytes(20).toString('hex');
        user.resetTokenExpired = Date.now() + 3600000// uma hora;

        //salvar
        await user.save();

        //gerar o link
        const resetLink = `http://${req.headers.host}/users/reset/${user.resetTokenPassword}`;
        console.log(resetLink);

        const html = `Acesse o link para resetar a senha: <a href="${resetLink}">Resetar senha</a>`;

        //enviar email
        mailHandler.send({
            to:user.email,
            subject:'Resetar senha',
            html:html,
            text:'.....'
        });


        //redirecionaar usuario com mensagem de sucesso

        req.flash('success', 'Foi enviado um email para resetar sua senha.');
        res.redirect('/users/login');




        console.log(user);
};

exports.reset = async (req, res)=>{

    const user =  await User.findOne(
        {
            resetTokenPassword:req.params.token,
            resetTokenExpired:{$gt:Date.now()}
        });

        if(!user){
            req.flash('error', 'Token expirado!');
            res.redirect('/users/login');
            return;
        }

        //mandar para a tela pra resetar a senha

        res.render('resetPassword');


    console.log(user);
};

exports.resetAction = async (req, res)=>{ 

     //1.veirifcar se as senhas batem
     let password = req.body.nova;
     let confirma = req.body.confirma;
 
     console.log('pass: '+password+'   conf'+confirma);
 
     if(password != confirma){
         req.flash('error', 'As senhas não batem, favor verificar.');
         res.redirect('back');
         return;
     }
     //2.procurar o usuario e trocar a senha
     const user =  await User.findOne(
        {
            resetTokenPassword:req.params.token,
            resetTokenExpired:{$gt:Date.now()}
        });

     user.setPassword(req.body.nova, async ()=>{
         await user.save();
         req.flash('success', 'Senha alterada com sucesso. (RESET)');
         res.redirect('/users/login');
     });
     //3.redirecionar para a pagina HOME

};