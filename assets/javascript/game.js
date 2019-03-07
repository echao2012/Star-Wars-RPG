$(document).ready(function() {

    // Create an array of characters with their starting stats
    var characters = [{
        name: "Luke Skywalker",
        img: "https://place-hold.it/200x150",
        hp: 100,
        baseAtk: 8,
        counterAtk: 25
    },
    {
        name: "Obi-Wan Kenobi",
        img: "https://place-hold.it/200x150",
        hp: 120,
        baseAtk: 8,
        counterAtk: 25
    },
    {
        name: "Darth Vader",
        img: "https://place-hold.it/200x150",
        hp: 180,
        baseAtk: 8,
        counterAtk: 25
    },
    {
        name: "Emperor Palpatine",
        img: "https://place-hold.it/200x150",
        hp: 150,
        baseAtk: 8,
        counterAtk: 25
    }];

    // Declare variables to control the game state
    var iPlayer, iEnemy, currentAtk;
    var characterSelected = false;
    var enemySelected = false;

    // Create a card for each character and add them to the "Select Your Character" card
    //characters.forEach(fuction(theCharacter) {
    $.each(characters, function(i, theCharacter) {
        // Create the card div
        var card = $("<div>");
        card.addClass("card character-card");
        card.attr("index", i);
        card.css("display", "inline-block")

        // Add the character image
        var img = $("<img>");
        img.addClass("card-img-top");
        img.attr({
            "src": theCharacter.img,
            "alt": theCharacter.name
        });
        card.append(img)

        // Add the card body
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        card.append(cardBody);

        // Add character name
        var nameTxt = $("<p>");
        nameTxt.text(theCharacter.name);
        cardBody.append(nameTxt);

        // Add HP text
        var hpTxt = $("<p>");
        hpTxt.text("HP: ");
        hpTxt.append($("<span>").addClass("hp-text").text(theCharacter.hp));
        cardBody.append(hpTxt);

        $("#select-character-card > .card-body").append(card);
    })

    $(".character-card").on("click", function() {
        // Check if Player's character has been selected
        if (!characterSelected) {
            characterSelected = true;

            // Store the selected character index
            iPlayer = $(this).attr("index");

            // Move selected card to "Your Card"
            $("#your-character-card > .card-body").append(this);

            // Move the other cards to "Remaining Opponents"
            $("#remaining-enemies-card > .card-body").append($("#select-character-card > .card-body > .character-card"))
        } else if (!enemySelected) {
            // Check that enemy card was clicked
            if($(this).attr("index") !== iPlayer) {
                enemySelected = true;

                // Store the selected enemy index
                iEnemy = $(this).attr("index")

                // Move the selected card to "Selected Opponent"
                $("#current-enemy-card > .card-body").append(this);
            }
        }
    })

    function attack(player, enemy) {
        // Player attacks enemy
        enemy.hp -= currentAtk;

        // Check if enemy is dead
        if (enemy.hp <= 0) {

        }

        // Enemy attacks player
        player.hp -= enemy.counterAtk;

        // Check if player is dead
        if (player.hp <= 0) {

        }

        // Increase player attack power
        currentAtk += player.baseAtk;
    }
})