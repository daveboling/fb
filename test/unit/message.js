/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Message   = require('../../app/models/message'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'fb';

describe('Message', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Message object', function(){
      var m = {to: 'bob', from: 'sue', body: 'Hello Bob'},
      message = new Message(m);
      expect(message).to.be.instanceof(Message);
      expect(message.to).to.equal('bob');
      expect(message.from).to.equal('sue');
      expect(message.body).to.include('Hello');
    });
  });

  describe('.find', function(){
    it('should find a users received messages', function(done){
      //Message.find('000000000000000000000001', function(err, messages){
        //expect(messages).to.have.length(1);
      done();
      //});
    });
  });

  describe('.read', function(){
    it('should display a single message and mark it as read', function(done){
      Message.read('53ffc8a77eedeb1a14f69131', function(message){
        expect(message.isRead).to.be.true;
        done();
      });
    });
  });

});
