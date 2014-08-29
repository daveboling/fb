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
      var m = new Message();
      expect(m).to.be.instanceof(Message);
    });
  });

  describe('.find', function(){
    it('should find a users received messages', function(done){
      Message.find('000000000000000000000001', function(err, messages){
        expect(messages).to.have.length(1);
        done();
      });
    });
  });

});
