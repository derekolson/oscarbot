Categories = new Meteor.Collection('categories');
Nominees = new Meteor.Collection('nominees');
Players = new Meteor.Collection('players');

Session.setDefault('category_id', null);
Session.setDefault('player_id', null);
Session.setDefault('selected_nominee', null);

var categories;
var categoryIndex = 0;

var categoriesHandle = Meteor.subscribe('categories', function () {
  categories = Categories.find({}, {sort: {name: 1}}).fetch();

  if (!Session.get('category_id')) {
    var category = categories[categoryIndex];
    if (category)
      Session.set('category_id', category._id);
  }
});

var nomineesHandle = null;
Meteor.autorun(function () {
  var category_id = Session.get('category_id');
  if (category_id)
    nomineesHandle = Meteor.subscribe('nominees', category_id);
  else
    nomineesHandle = null;
});


//TODO - Use Meteor Authentication
var playersHandle = Meteor.subscribe('players', function () {
  if (!Session.get('player_id')) {
    //create / find player
    var name;
    while(name == null || name == ''){
      name = prompt("Enter Your Name");
      if(name == '')
        alert("Name cannot be blank!");
    }
    var player = Players.findOne({name: name});
    var id;
    if (player) {
      id = player._id;
    } else {
      id = Players.insert({
        name: name, 
        votes: [], 
        score: 0
      });
    }

    Session.set('player_id', id);
  }
});

// Template.category.currentCategory = function () {
//   return Categories.findOne(Session.get('category_id'));
// };

Template.select_category.categories = function () {
  return Categories.find({}, {sort: {name: 1}});
};

Template.select_category.selected = function () {
  if(this._id == Session.get('category_id')) {
    return true;
  }
  return false;
};


Template.nominees.loading = function () {
  return nomineesHandle && !nomineesHandle.ready();
};

Template.nominees.nominees = function () {
  var category_id = Session.get('category_id');
  if (!category_id)
    return {};

  var category = Categories.findOne(category_id);
  var nominees = Nominees.find({category_id: category_id}, {sort: {name: 1}}).fetch();
  //var nominees = Nominees.find({}, {sort: {name: 1}}).fetch();
  nominees.forEach(function(nominee) {
    var score = Math.floor((nominee.votes.length / category.votes.length)  * 100);
    nominee.score = score ? score : 0;
  });
  
  return nominees;
}

Template.nominee.selected = function () {
  var nominee = Nominees.findOne({_id: this._id});
  var votes = nominee.votes;
  var player_id = Session.get('player_id');

  var exists = voteExists(votes, player_id);
  return exists ? 'selected' : '';
}

Template.nominee.voters = function () {
  var nominee = Nominees.findOne({_id: this._id});
  var votes = nominee.votes;
  var voters = [];
  for(var i=0; i<votes.length; i++) {
    voters.push(Players.findOne(votes[i].id));
  }
  return voters;
}

function voteExists(votes, id) {
  var exists = false;
  for(var i=0; i<votes.length; i++) {
    if(votes[i].id == id) {
      var exists = true;
      break;
    }
  }
  return exists;
}

// Template.category.events({
//   'click .next': function (event) {
//     categoryIndex++;

//     if(categoryIndex >= categories.length) {
//       categoryIndex = 0;
//     }
//     Session.set('category_id', categories[categoryIndex]._id);
//   }
// });

Template.select_category.events({
  'change #category-select': function (event) {
    var index=document.getElementById("category-select").selectedIndex;
    console.log(this);
    Session.set('category_id', categories[index]._id);
  }
});

Template.nominee.events({

  // 'touchstart .nominee, mousedown .nominee': function (event) {
  //   event.target.className += ' selected';
  // },

  'click .nominee': function (event) {
    var nominee = Nominees.findOne({_id: this._id});
    var player_id = Session.get('player_id');
    var category_id = Session.get('category_id');
    
    var vote = {id: player_id};

    if(voteExists(nominee.votes, player_id)) {
      //Remove vote if already selected
      Categories.update(category_id, { $pull: { votes: vote }});
      Nominees.update(this._id, { $pull: { votes: vote }});
      Players.update(player_id, { $pull: {votes: this._id}});
    } else {
      //Add or switch votes
      Categories.update(category_id, {$addToSet: {votes: vote}});
      Nominees.update({category_id: category_id}, { $pull: { votes: vote }}, { multi: true });
      Nominees.update(this._id, { $addToSet: {votes: vote}, });
      Players.update(player_id, { $addToSet: {votes: this._id}});
    }
  }
});
