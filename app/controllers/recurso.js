var Recurso = require('./../models/recurso');
module.exports = {
  save: function(req, res, upload, done) {
    upload(req, res, function(err) {
      if (err) {
        return res.end("Error uploading file.");
      }
      var data = req.body;
      var files = req.files;
      var recurso = new Recurso();
      recurso.idproducto = 'xxx';
      recurso.idrecurso = 'uuid';
      recurso.nombre = data.nombre;
      recurso.categoria = data.categoria;
      recurso.tipo = data.tipo;
      recurso.descripcion = data.descripcion;

      recurso.costo_de_ingreso = data.costo_de_ingreso;

      recurso.horario_atencion = data.horario_de_atencion;
      recurso.temperatura = data.temperatura;
      recurso.altitud = data.altitud;
      recurso.video = data.video;
      recurso.como_llegar = data.como_llegar;
      recurso.latitud = parseFloat(data.latitud);
      recurso.longitud = parseFloat(data.latitud);
      recurso.imagenes = [];
      for (var i = 0; i < files.length; i++) {
        recurso.imagenes.push({
          url: files[i].filename
        });
      }
      //Lllenar en aqui
      recurso.estado = true;
      recurso.owner = req.user.local.email;

      recurso.save(function(err) {
        if (err)
          res.send(err);
        done(true);
      });
    });
  },
  findAll: function(req, res) {
    Recurso.find({
      owner: req.user.local.email
    }, function(err, recursoes) {
      if (err)
        res.send(err);
      //console.log(recursoes);
      res.json(recursoes);
    });
  },
  findPublic: function(req, res) {
    Recurso.find(function(err, recursoes) {
      if (err)
        res.send(err);
      res.json(recursoes);
    });
  },

  delete: function(req, res) {
    console.log(req.params.id);
    Recurso.remove({
      _id: req.params.id
    }, function(err, bear) {
      if (err)
        res.send(err);
      res.json({
        message: 'Successfully deleted'
      });
    });
  }
};