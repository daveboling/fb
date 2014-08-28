'use strict';

var bcrypt  = require('bcrypt'),
    Mongo   = require('mongodb'),
    _       = require('lodash'),
    Mailgun = require('mailgun-js'),
    Message = require('./message');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, function(err, obj){
    cb(err, _.create(User.prototype, obj));
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb);
  });
};

User.authenticate = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(user);
  });
};

User.all = function(cb){
  User.collection.find({isVisible: true}).toArray(cb);
};

User.viewProfile = function(username, cb){
  User.collection.findOne({email: username}, cb);
};

User.prototype.save = function(o, cb){
  var properties = Object.keys(o),
      self       = this;

  properties.forEach(function(property){
    switch(property){
      case 'visible':
        self.isVisible = o[property] === 'public';
        break;
      default:
        self[property] = o[property];
    }
  });

  User.collection.save(this, cb);
};

User.prototype.send = function(receiver, obj, cb){
  switch(obj.mtype){
    case 'text':
      sendText(receiver.phone, obj.message, cb);
      break;
    case 'email':
      sendEmail(receiver.email, this.email, obj.message, cb);
      break;
    case 'internal':
      sendInternal(receiver._id, this.email, obj.message, cb);
  }

};

function sendText(to, body, cb){
  if(!to){return cb();}

  var accountSid = process.env.TWSID,
      authToken  = process.env.TWTOK,
      from       = process.env.FROM,
      client     = require('twilio')(accountSid, authToken);

  client.messages.create({to:to, from:from, body:body}, cb);
}

function sendEmail(to, from, body, cb){
  var apikey = process.env.GUNKEY,
      domain = process.env.GUN_DOMAIN,
     mailgun = new Mailgun({apiKey: apikey, domain: domain}),

  data = {from: from,to: to, subject: 'Message From:' + from, text: body};

  mailgun.messages().send(data, cb);

}

function sendInternal(to, from, body, cb){
  var message = new Message({
    to: to,
    from: from,
    body: body
  });

  Message.collection.save(message, cb);

}



module.exports = User;

