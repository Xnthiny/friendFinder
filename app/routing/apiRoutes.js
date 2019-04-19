// Dependencies
const friends = require("../data/friends.js");
const path = require("path");

// Routes

module.exports = (app) => {

  // All possible friends
  app.get("/api/friends", (req, res) => {
    res.send(friends);
  })

  // Handle Survey
  app.post("/api/friends", (req, res, err) => {
    // store user data
    const user = {
      name: req.body.name,
      photo: req.body.photo,
      scores: req.body.scores
    };
    const userScore = user.scores;

    // const userScore = user.scores;

    // Find Match
    let matchName = '';
    let matchImage = '';
    let matchFound = null;
    // Loop through data
    for (let i=0; i < friends.length; i++) {

      // Calculate scores difference
      let num1 = Math.max.apply(null, friends[i].scores.map(Math.abs))
      let num2 = Math.max.apply(null, userScore.map(Math.abs));

      console.log(friends[i].name + ": " + num1 + " | " + user.name + ": " + num2);

      if (num1 === num2) {
        matchFound = true;
        matchName = friends[i].name;
        matchImage = friends[i].photo
        console.log("FOUND: " + matchName)
        break;
      } else {
        console.log("Not a match.")
        matchFound = false;
        matchName = "No match!"
      }
    }

    res.json({status: 'OK', matchName: matchName, matchImage: matchImage, matchFound: matchFound})
  })
}
