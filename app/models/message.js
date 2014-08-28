'use strict';

function Message(o}{
  this.to     = o.to;
  this.from   = o.from;
  this.body   = o.body; 
  this.date   = new Date();
  this.isRead = false;
}

Message.find = function(userId, cb){
  var id = Mongo.ObjectID(userId);
  Message.collection.find({userId: id}).toArray(function(err, messages){

  });
};

Message.read = function(query, cb){
  var id = Mongo.ObjectID(query);
  Message.collection.findOne({_id: id}, function(err, message){
    message.isRead = true;
    Message.collection.save(message, function(){
      cb(message);
    });
  });
};