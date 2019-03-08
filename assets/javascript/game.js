$(document).ready(function() {

    // Create an array of characters with their starting stats
    var characters = [{
        name: "Luke Skywalker",
        img: "assets/images/Luke_Skywalker.png",
        hp: 1000,
        baseAtk: 8,
        counterAtk: 25
    },
    {
        name: "Obi-Wan Kenobi",
        img: "assets/images/Obi-Wan_Kenobi.png",

        hp: 120,
        baseAtk: 8,
        counterAtk: 25
    },
    {
        name: "Darth Vader",
        img: "assets/images/Darth_Vader.png",
        hp: 180,
        baseAtk: 8,
        counterAtk: 25
    },
    {
        name: "Emperor Palpatine",
        img: "assets/images/Emperor_Palpatine.png",
        hp: 150,
        baseAtk: 8,
        counterAtk: 25
    }];

    // Declare variables to control the game state
    var iPlayer, iEnemy, currentAtk;
    var characterSelected = false;
    var enemySelected = false;
    var gameOver = false;

    // Hide all except for character selection
    $("#select-character-card").show();
    $("#your-character-card").hide();
    $("#current-enemy-card").hide();
    $("#remaining-enemies-card").hide();
    $("#attack-btn").hide();
    
    // Create a card for each character and add them to the "Select Your Character" card
    //characters.forEach(fuction(theCharacter) {
    $.each(characters, function(i, theCharacter) {
        // Create the card div
        characters[i].card = $("<div>");
        characters[i].card.addClass("card character-card");
        characters[i].card.attr("index", i);

        // Add the character image
        var img = $("<img>");
        img.addClass("card-img-top");
        img.attr({
            "src": theCharacter.img,
            "alt": theCharacter.name
        });
        characters[i].card.append(img)

        // Add the card body
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        characters[i].card.append(cardBody);

        // Add character name
        var nameTxt = $("<p>");
        nameTxt.text(theCharacter.name);
        cardBody.append(nameTxt);

        // Add HP text
        var hpTxt = $("<p>");
        hpTxt.text("HP: ");
        hpTxt.append($("<span>").addClass("hp-text").text(theCharacter.hp));
        cardBody.append(hpTxt);

        $("#select-character-card > .card-body").append(characters[i].card);
    })

    $(".character-card").on("click", function() {
        if(!gameOver) {
            // Check if Player's character has been selected
            if (!characterSelected) {
                characterSelected = true;

                // Store the selected character index
                iPlayer = $(this).attr("index");

                // Set the current attack power
                currentAtk = characters[iPlayer].baseAtk;

                // Move selected card to "Your Card"
                $("#your-character-card > .card-body").append(this);

                // Move the other cards to "Remaining Opponents"
                $("#remaining-enemies-card > .card-body").append($("#select-character-card > .card-body > .character-card"));

                // Hide and show cards
                $("#select-character-card").hide();
                $("#your-character-card").show();
                $("#remaining-enemies-card").show();
            } else if (!enemySelected) {
                // Check that enemy card was clicked
                if($(this).attr("index") !== iPlayer) {
                    enemySelected = true;

                    // Store the selected enemy index
                    iEnemy = $(this).attr("index")

                    // Move the selected card to "Selected Opponent"
                    $("#current-enemy-card > .card-body").append(this);

                    // Show attack button and enemy
                    $("#current-enemy-card").show();
                    $("#attack-btn").show();
                }
            }
        }
    })

    $("#attack-btn").on("click", function() {
        // Player attacks enemy
        characters[iEnemy].hp -= currentAtk;

        // Update text
        $("#attack-txt").text("You attacked for " + currentAtk + " damage.");

        // Check if enemy is dead
        if (characters[iEnemy].hp <= 0) {
            // Ensure negative HP is not displayed
            characters[iEnemy].hp = 0;

            // Select a new enemy
            enemySelected = false;

            // Show enemy is defeated
            characters[iEnemy].card.remove();
            
            // Check if any enemies remaining
            if ($("#remaining-enemies-card > .card-body").children().length <= 0) {
                endGame(true);
            }
        } else {
            // Update HP text
            $(characters[iEnemy].card).find(".hp-text").text(characters[iEnemy].hp);

            // Enemy attacks player
            characters[iPlayer].hp -= characters[iEnemy].counterAtk;

            // Update text
            $("#counter-attack-txt").text(characters[iEnemy].name + " attacked you for " + characters[iEnemy].counterAtk + " damage.");

            // Check if player is dead
            if (characters[iPlayer].hp <= 0) {
                // Ensure negative HP is not displayed
                characters[iPlayer].hp = 0;

                // Player loses
                endGame(false);
            }

            // Update HP text
            $(characters[iPlayer].card).find(".hp-text").text(characters[iPlayer].hp);
        }
        
        // Increase player attack power
        currentAtk += characters[iPlayer].baseAtk;
    })

    function endGame(win) {
        console.log(win);
    }
})