Categories = new Meteor.Collection('categories');
Meteor.publish('categories', function () {
  return Categories.find();
});


Nominees = new Meteor.Collection('nominees');
Meteor.publish('nominees', function (category_id) {
  return Nominees.find({category_id: category_id});
});

Meteor.publish('all_nominees', function () {
  return Nominees.find();
});

Players = new Meteor.Collection('players');
Meteor.publish('players', function () {
  return Players.find();
});