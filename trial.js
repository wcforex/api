exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then(
      (thing) => {
        if (!thing) {
          return res.status(404).json({
            error: new Error('Objet non trouvé !')
          });
        }
        if (thing.userId !== req.auth.userId) {
          return res.status(401).json({
            error: new Error('Requête non autorisée !')
          });
        }
        Thing.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
    );
  };