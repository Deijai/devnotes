exports.tituloPadrao = "Titulo Padrão do Site";
exports.menu = [
    {name: "Home", slug: "/" ,guest:true, logged:true},
    {name:'Adicionar Post', slug:'/post/add',guest:false, logged:true},
    {name:'Login', slug:'/users/login',guest:true, logged:false},
    {name:'Register', slug:'/users/register',guest:true, logged:false},
    {name:'Sair', slug:'/users/logout',guest:false, logged:true}
    

    /*
    {name: "Sobre", slug: "/sobre"},
    {name: "Perfil", slug: "/perfil"},
    {name: "Login", slug: "/users/login"},
    {name: "Register", slug: "/users/register"},
    {name: "Teste", slug: "/teste"}
    
    */
]