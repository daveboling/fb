'use strict';

var User = require('../models/user'),
    Message = require('../models/message'),
    moment = require('moment');

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

exports.edit = function(req, res){
  res.render('users/edit');
};

exports.editProfile = function(req, res){
  res.locals.user.save(req.body, function(){
    res.redirect('/profile');
  });
};

exports.profile = function(req, res){
  res.render('users/profile');
};

exports.users = function(req, res){
  User.all(function(err, users){
    res.render('users/users', {users: users});
  });
};

exports.viewProfile = function(req, res){
  User.viewProfile(req.params.username, function(err, user){
    if(user.isVisible){
      res.render('users/public', {publicUser: user});
    }else {
      res.redirect('/');
    }
  });
};

//Send Message
exports.message = function(req, res){
  User.findById(req.params.userId, function(err, receiver){
    res.locals.user.send(receiver, req.body, function(){
      res.redirect('/user/' + receiver.email);
    });
  });
};

//Display all messages to given user
exports.displayMessages = function(req, res){
  var sort = req.query.sort || -1; //default sort
  Message.find(res.locals.user._id, sort, function(err, messages){
    var unread = 0;
    messages.forEach(function(m){ unread = (m.isRead) ? unread : unread + 1; });
    res.render('users/messages', {messages: messages, sort: sort, unread: unread, moment: moment});
  });
};

//Display a single message
exports.readMessage = function(req, res){
  Message.read(req.params.messageId, function(message){
    res.render('users/view-message', {message: message, moment: moment});
  });
};



