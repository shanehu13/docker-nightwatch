const assert = require('assert');
const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');
var j = 1;
var str = '#app > main > div.widget.widget-page.widget-register-page > div > div > div.col-m-12.col-t-7.col-d-8 > form > fieldset:nth-child(1) > div:nth-child(6) > div.col-m-12.col-d-5 > div > div > div.selectric';
var option = '#app > main > div.widget.widget-page.widget-register-page > div > div > div.col-m-12.col-t-7.col-d-8 > form > fieldset:nth-child(1) > div:nth-child(6) > div.col-m-12.col-d-5 > div > div > div.selectric-items > div > ul > li:nth-child(2)';
var a = '';

function sleep(numberMillis) { 
  var now = new Date(); 
  var exitTime = now.getTime() + numberMillis; 
  while (true) { 
  now = new Date(); 
  if (now.getTime() > exitTime) 
  return; 
  } 
}

function aaa(str){
  window.alert(str);
}

Given(/^Step 1$/, () => {
  debugger;
  return client
    .execute(function(data){
      var users = [
        {name: "Marry", "email": "zhang@email.com"},
        {name: "Jane",   "email": "jiang@email.com"},
        {name: "Sim",  "email": "li@email.com"}
      ];
      
      //var emails = users.map(x => user.name);
      var odds = users.map(v => v + 1);
      //var nums = evens.map((v, i) => v + i);
      //var pairs = evens.map(v => ({even: v, odd: v + 1}));
    }, ['a value','dsds','eeee'], function (result){
      console.log("22222"+result.value);
      client.assert.deepEqual(['a value'], result.value, 'Result matches');
    })
});

When(/^Step 2$/, () => {
  //return 'pending';
});

Then(/^Step 3$/, () => {
  //return 'pending';
});