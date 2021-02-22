const mongoose = require('mongoose');



require('dotenv').config({
    path:'variables.env'
});

//CONEXÂO COM O BD
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology: true},);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.log('ERROR: '+error.message);
} );

//CARREGANDO TODOS OS MODELS
require('./models/Post');


const app = require('./app');
//SETAR PORTA
app.set('port', process.env.PORT || 7777);


const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta "+server.address().port);
});

