'use strict';

define(
  function() {
    function findUser(array, email) {
      //returns undefined if not found
        var user;
          for(var i=0,j=array.length; i<j; i++){
            if(email && array[i].email===email)
              user = {i:i,user:array[i]};
              
          };
          return user;
      }
    return {
      online: [
        {
          'img': 'http://lorempixel.com/60/60/people/0/',
          'firstName': 'Sven',
          'lastName': 'Svensson',
          'email': 'ss@proxyweb.com'
        },
        {
          'img': 'http://lorempixel.com/60/60/people/1/',
          'firstName': 'Maria',
          'lastName': 'Jonsson',
          'email': 'mj@jonsson.net'
        },
        {
          'img': 'http://lorempixel.com/60/60/people/2/',
          'firstName': 'Johan',
          'lastName': 'Kalt',
          'email': 'kalt_johan@gmail.com'
        }
      ],
      offline: [
        {
          'img': 'http://lorempixel.com/60/60/people/3/',
          'firstName': 'Yasin',
          'lastName': 'Bahtiyar',
          'email': 'yasin@bahtiyar.org'
        },
        {
          'img': 'http://lorempixel.com/60/60/people/4/',
          'firstName': 'Katy',
          'lastName': 'Katten',
          'email': 'hello@kitty.net'
        },
        {
          'img': 'http://lorempixel.com/60/60/people/5/',
          'firstName': 'Alfred',
          'lastName': 'Nobel',
          'email': 'noble@gmail.com'
        }
      ],
      getOnline: function(email) {
        return findUser(this.online,email);
      },
      getOffline: function(email) {
        return findUser(this.offline,email);
      },
      signIn: function(email){
        var user = this.getOffline(email);
        if(user){
          this.offline.splice(user.i,1);
          this.online.push(user.user);
        }
      },
      signOut: function(email){
        var user = this.getOnline(email);
        if(user){
          this.online.splice(user.i,1);
          this.offline.push(user.user);
        }
      }
      
    };
  }
);

