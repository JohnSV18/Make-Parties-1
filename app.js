const models = require('./db/models')
const methodOverride = require('method-override')
const express = require('express');
const app = express();

//require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// Initialize body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'))
//use main as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
// use handlebars to render
app.set('view engine', 'handlebars');

// GETS ALL EVENTS AND DISPLAYS THEM
require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);

app.get('/events/new', (req, res) => {
  res.render('events-new', {})
})
//Create
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/events/${event.id}`);
  }).catch((err) => {
    console.log(err)
  });
});
// SHOW
// app.get('/events/:id', (req, res) => {
//   // find an event by it's id that was passed through req.params
//   models.Event.findByPk(req.params.id).then((event) => {
//     res.render("events-show", { event:event })
//   }).catch((err) => {
//     console.log(err.message)
//   })
// });
// EDIT
app.get('/events/:id/edit', (req, res) => {
  models.Event.findByPk(req.params.id).then((event) => {
    res.render('events-edit', { event:event });
  }).catch((err) => {
    console.log(err.message)
  })
});
// UPDATE
app.put('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.update(req.body).then(event => {
      res.redirect(`/events/${req.params.id}`);
    }).catch((err) => {
      console.log(err)
    });
  }).catch((err) => {
    console.log(err);
  });
});
// DELETE
app.delete('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.destroy();
    res.redirect('/')
  }).catch((err) => {
    console.log(err);
  });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port 3000!')
});