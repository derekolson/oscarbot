// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Categories.find().count() === 0) {
    var categories = [
      {name: "Best Picture", nominees:["Amour", "Argo", "Beasts of the Southern Wild", "Django Unchained", "Les Misérables", "Life of Pi", "Lincoln", "Silver Linings Playbook", "Zero Dark Thirty" ]},
      {name: "Actor - Leading Role", nominees:["Bradley Cooper", "Daniel Day-Lewis", "Hugh Jackman", "Joaquin Phoenix", "Denzel Washington" ]},
      {name: "Actress - Leading Role", nominees:["Jessica Chastain", "Jennifer Lawrence", "Emmanuelle Riva", "Quvenzhané Wallis", "Naomi Watts" ]},
      {name: "Actor - Supporting Role", nominees:["Alan Arkin", "Robert De Niro", "Philip Seymour Hoffman", "Tommy Lee Jones", "Christoph Waltz" ]},
      {name: "Actress - Supporting Role", nominees:["Amy Adams", "Sally Field", "Anne Hathaway", "Helen Hunt", "Jacki Weaver" ]},
      {name: "Animated Feature Film", nominees:["Brave", "Frankenweenie", "ParaNorman", "The Pirates! Band of Misfits", "Wreck-It Ralph" ]},
      {name: "Cinematography", nominees:["Anna Karenina", "Django Unchained", "Life of Pi", "Lincoln", "Skyfall" ]},
      {name: "Costume Design", nominees:["Anna Karenina", "Les Misérables", "Lincoln", "Mirror Mirror", "Snow White and the Huntsman" ]},
      {name: "Directing", nominees:["Amour", "Beasts of the Southern Wild", "Life of Pi", "Lincoln", "Silver Linings Playbook" ]},
      {name: "Documentary Feature", nominees:["5 Broken Cameras", "The Gatekeepers", "How to Survive a Plague", "The Invisible War", "Searching for Sugar Man" ]},
      {name: "Documentary Short", nominees:["Inocente", "Kings Point", "Mondays at Racine", "Open Heart", "Redemption" ]},
      {name: "Film Editing", nominees:[ "Argo", "Life of Pi", "Lincoln", "Silver Linings Playbook", "Zero Dark Thirty"]},
      {name: "Foreign Language Film", nominees:["Amour", "Kon-Tiki", "No", "A Royal Affair", "War Witch" ]},
      {name: "Makeup and Hairstyling", nominees:["Hitchcock", "The Hobbit: An Unexpected Journey", "Les Misérables" ]},
      {name: "Music - Original Score", nominees:["Anna Karenina", "Argo", "Life of Pi", "Lincoln", "Skyfall"]},
      {name: "Music - Original Song", nominees:["\"Before My Time\" from Chasing Ice", "\"Everybody Needs A Best Friend\" from Ted", "\"Pi\'s Lullaby\" from Life of Pi", "\"Skyfall\" from Skyfall", "\"Suddenly\" from Les Misérables" ]},
      {name: "Production Design", nominees:["Anna Karenina", "The Hobbit: An Unexpected Journey", "Les Misérables", "Life of Pi", "Lincoln" ]},
      {name: "Short Film - Animated", nominees:["Adam and Dog", "Fresh Guacamole", "Head over Heels", "The Longest Daycare", "Paperman"]},
      {name: "Short Film - Live Action", nominees:["Asad", "Buzkashi Boys", "Curfew", "Death of a Shadow", "Henry" ]},
      {name: "Sound Editing", nominees:["Argo", "Django Unchained", "Life of Pi", "Skyfall", "Zero Dark Thirty" ]},
      {name: "Sound Mixing", nominees:["Argo", "Les Misérables", "Life of Pi", "Lincoln", "Skyfall" ]},
      {name: "Visual Effects", nominees:["The Hobbit: An Unexpected Journey", "Life of Pi", "The Avengers", "Prometheus", "Snow White and the Huntsman" ]},
      {name: "Writing - Adapted Screenplay", nominees:["Argo", "Beasts of the Southern Wild", "Life of Pi", "Lincoln", "Silver Linings Playbook" ]},
      {name: "Writing - Original Screenplay", nominees:["Amour", "Django Unchained", "Flight", "Moonrise Kingdom", "Zero Dark Thirty" ]}
    ];

    var nominees = [];

    for (var i = 0; i < categories.length; i++) {
      var category_name = categories[i].name;
      var category_nominees = categories[i].nominees;
      var category_id = Categories.insert({
        name: category_name, 
        votes: []
      });
      

      for (var j = 0; j < category_nominees.length; j++) {
        var nominee_name = category_nominees[j];
        
        nominees[nominee_name] = nominee_name;
        
        Nominees.insert({
          category_id: category_id,
          name: nominee_name,
          votes: [],
          winner: false
        });
      }
    }

    for (var k in nominees) {      
      console.log(nominees[k]);
    }
    
  }
});
