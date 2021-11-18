module.exports = (app, models) => {
    // NEW
    app.get('/events/:eventId/rsvps/new', async (req, res) => {
      let event = await models.Event.findByPk(req.params.eventId)
      res.render('rsvps-new', { event: event });
    });
  
    // CREATE
    app.post('/events/:eventId/rsvps', (req, res) => {
        req.body.EventId = req.params.eventId;
        models.Rsvp.create(req.body).then(rsvp => {
        res.redirect(`/events/${req.params.eventId}`);
        }).catch((err) => {
            console.log(err)
        });
    });
    // DESTROY 
    app.delete('/events/:eventId/rsvps/:id', (req, res) => {
        models.Rsvp.findByPk(req.params.id).then(rsvp => {
            rsvp.destroy();
            res.redirect(`/events/${req.params.eventId}`);
        }).catch((err) => {
            console.log(err);
        });
    }); 
  }