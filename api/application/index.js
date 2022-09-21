const express = require('express')
const api = express()
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const sizeOf = require('image-size');
const fs = require('fs');
const port = 80;



// enable files upload
api.use(fileUpload({
  safeFileNames : true,
  createParentPath: true,
  useTempFiles : true,
  tempFileDir : './uploads/tmp/'
}));


//add other middleware
api.use(cors());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));
api.use(morgan('dev'));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://database:27017/gauge', {
    authSource: 'admin',
    user: "root",
    pass: "root",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var banners = new mongoose.Schema({
  slug: String,
  path: String,
  file: String
});
var Banner = mongoose.model('Banner', banners);

api.get('/', (req, res) => {
  res.send('Bem vindo a API da Gauge.')
})

api.post('/store/:slug/banners', async (req, res) => {
    try {
      let name = req.body.name || req.files.file.name;
      let customer = req.body.customer;
      let banner = req.files.file;
      const dimensions = sizeOf(banner.tempFilePath);

      if(!req.files) {
        res.status(422).send({
          message: 'Nenhum arquivo foi enviado, verifique o formulário de envio, anexe um arquivo e envie novamente.'
        });
        removeTempFile(banner.tempFilePath);
        return;
      }

      if(!req.body.name) {
        res.status(422).send({
          message: 'O Nome do arquivo não foi informado.'
        });
        removeTempFile(banner.tempFilePath);
        return;
      }

      if(!req.body.customer) {
        res.status(422).send({
          message: 'O Nome do Cliente não foi informado.'
        });
        removeTempFile(banner.tempFilePath);
        return;
      }

      if (req.files.file.mimetype != 'image/jpeg') {
        res.status(422).send({
          message: 'Apenas arquivos .JPG são aceitos.'
        });
        removeTempFile(banner.tempFilePath);
        return;
      }

      if (dimensions.width !== 343 && dimensions.height !== 430) {
        res.status(422).send({
          message: 'As dimensões de altura e largura da imagem devem ser de 100x100'
        });
        removeTempFile(banner.tempFilePath);
        return;
      }

      var filePath = './uploads/' + customer.trim() + '/' + name.trim();
      
      banner.mv(filePath)
        .then(() => {
          var banner = new Banner()
          banner.slug = customer;
          banner.path = filePath;
          banner.file = name;
          banner.save()
            .then(() => {
              res.status(201).send({
                message: 'Arquivo recebido.',
                arquivo: filePath,
                data: {
                  name: banner.name,
                  mimetype: banner.mimetype,
                  size: banner.size
                }
              });
            })
            .catch(error => {
              console.log(error);
              res.status(500).send('Não foi possível salvar o item ao banco de dados')
            });
        })
        ;
        
    } catch (err) {
      if (err.statusCode == 500) {
        res.send(err);
      }
      if (err.statusCode == 422) {
        res.send(err);
      }
    }
})

api.listen(port, () => {
  console.log(`'Gauge API' is listening on port ${port}`)
})

removeTempFile = (file) => {
  fs.unlink(file, error => {
    if(error){
      console.warn('Não foi possível remover o arquivo temporário %s',file)
    }else{
      console.log('Arquivo temporário %s removido com sucesso.',file);
    }
  });
}