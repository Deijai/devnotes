const NoteService = require('../services/NoteService');

module.exports = {
    ping: (req, res) => {
        res.json({pong:true});
    },
    all: async (req, res) => {

        let dados = {error: '', result:[]};
        let notes = await NoteService.getAll();

        dados.result = notes;
        res.json(dados);

    },
    one: async (req, res) => {

        let dados = {error: '', result:{}};
        let id = req.params.id;
        console.log("ID== "+id);

        let note = await NoteService.findById(id);

        console.log(note);

        if (note) {
            dados.result = note;
        }

        
        res.json(dados);

    },
    new: async (req, res) => {

        let dados = {error: '', result:{}};

        //pegar os dados enviados
        let title = req.body.title;
        let body = req.body.body;

        if(title && body) {

            let noteId = await NoteService.add(title, body);
            dados.result = {
                id: noteId,
                title: title,
                body: body
            };

        } else {
            dados.error = 'Campos não enviados!';
        }

        res.json(dados);

    },
    edit: async (req, res) => {

        let dados = {error: '', result:{}};

        //pegar os dados enviados
        let title = req.body.title;
        let body = req.body.body;
        let id = req.params.id;

        if(id && title && body) {

            //pegar a nota para editar
            await NoteService.update(id, title, body);

            dados.result = {
                id: id,
                title: title,
                body: body
            };

        } else {
            dados.error = 'Campos não enviados!';
        }

        res.json(dados);
    },
    delete: async (req, res) => {

        let dados = {error: '', result:{}};

        //pegar a nota enviada para delete
        let id = req.params.id;

        if (id) {
            let retorno = await NoteService.delete(id);
            dados.result = retorno;
        } else {
            dados.error = 'ID não enviado!';
        }
        

        res.json(dados);
        
    }
};