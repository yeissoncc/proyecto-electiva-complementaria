var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

//por ahora, las credenciales van vacias
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialogos
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Hola, Cómo te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);

        session.beginDialog('/ComoEstas');
    },
    function (session) {
        if (session.dialogData.estado) {
            session.send(`Saludos por ${session.userData.estado}`);
        }
        else {
            session.send('adios!!');
        }
    }
]);

bot.dialog('/ComoEstas', [
    function (session) {
        builder.Prompts.text(session, '¿como estas?');
    },
    function (session, results) {
        session.dialogData.estado = results.response;

        session.send(`ya veo ${session.dialogData.estado}`)

        session.beginDialog('/Cuentame');
    }
]);
bot.dialog('/Cuentame', [
    function (session) {
        builder.Prompts.text(session, '¿y eso a que se debe cuentame?');
    },
    function (session, results) {
        session.dialogData.estado = results.response;

        session.send('entiendo')

        session.beginDialog('/Conversacion1');
    }
]);
bot.dialog('/Conversacion1', [
    function (session) {
        builder.Prompts.text(session, '¿ de Dónde eres?');
    },
    function (session, results) {
        session.dialogData.lugar = results.response;

        session.send(`debe ser lindo ${session.dialogData.lugar} nunca eh estado haya`)

        session.beginDialog('/Conversacion2');
    }
    
]);

bot.dialog('/Conversacion2', [

    function (session) {
        builder.Prompts.text(session, 'a mi me gustaria ir ');
    },

    function (session, results) {
        session.dialogData.lugar = results.response;

        session.send(`debe ser lindo  nunca eh estado alla, ya que soy un robot`)

        session.beginDialog('/Conversacion3');
    }
    
]);

bot.dialog('/Conversacion3', [
    
    function (session) {
        builder.Prompts.text(session, ' hola?');
    },

    function (session, results) {
        session.dialogData.lugar = results.response;

        session.send(`es un gusto conocer `)

        session.beginDialog('/Conversacion4');
    }


]);
bot.dialog('/Conversacion4', [ //método preguntar lugar
    function(session){// objeto llamado sesiòn
        builder.Prompts.text(session, 'ya te vas?');
    },
    function (session, results){
        let respuesta = results.response;

        if(estado == 'si' || estado == 'SI'){
            session.endDialogWithResult(`${respuesta} bueno adios  ;)`);
        }else{
            session.endConversation(` ${respuesta} XD`);
        }
        
    }
]);