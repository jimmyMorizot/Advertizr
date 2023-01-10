// Objet représentant l'écran défilant advertizer
const advertizer = {

    /**
     * Propriétés
     */

    // Propriété permettant de modéliser le fait que la touche MAJ a été enfoncée
    isUpperCase: false,

    /**
     * Méthodes
     */

    init: function() {

        // Code à exécuter au lancement de la page

        // On commence par sélectionner toutes les touches du clavier (elles portent toutes la classe "key")
        const keyElements = document.querySelectorAll('.key');

        // On va ensuite boucler sur chaque touche grâce à un "for...of"
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...of
        for (const key of keyElements) {
            // Pour chaque touche, on "écoute" les événements de type click.
            // Si on détecte cet événement, on exécute la méthode "handleKeysPressed"
            key.addEventListener('click', advertizer.handleKeysPressed);
        }

        // On écoute les clics sur le bouton Maj
        const majButton = document.querySelector('.maj');
        majButton.addEventListener('click', advertizer.handleMajPressed);

        // On écoute les clics sur le bouton back
        const backButton = document.querySelector('.return');
        backButton.addEventListener('click', advertizer.handleReturnPressed);

    },

    /**
     * Méthode qui est exécutée à chaque fois qu'on clique sur une touche du faux clavier.
     * Elle est appelée par l'écouteur d'événement placé sur les touches. Ce qui fait que
     * Javascript lui transmet automatiquement un argument "event" qui contient les différentes
     * informations de l'événement.
     */
     handleKeysPressed: function(event) {
        // On récupère la touche qui a été pressée grâce à la notation "event.currentTarget"
        const buttonPressed = event.currentTarget;

        // La variable buttonPressed contient le bouton sur lequel on a cliqué, 
        // on peut donc récupérer son contenu avec textContent.
        // https://developer.mozilla.org/fr/docs/Web/API/Node/textContent
        const letter = buttonPressed.textContent;

        // On appelle la méthode addLetter qui va se charger d'ajouter la lettre à la suite du message défilant.
        advertizer.addLetter(letter);
    },


    /**
     * Cette méthode permet "d'activer" le mode majuscule sur le clavier lorsqu'on clique sur la touche majuscule.
     */
     handleMajPressed: function(event) {

        console.log('Bouton maj pressé !');

        // Le fait de savoir si notre clavier est en mode "majuscule" est stocké dans la propriété isUppercase.
        // En cliquant sur le bouton, on vient donc inverser cet état. 
        // On déclare donc que le nouveau contenu de notre propriété isUppercase est l'inverse de son contenu actuel grâce au "!".
        advertizer.isUppercase = !advertizer.isUppercase;

        // On va ensuite indiquer visuellement que les majuscules sont activées en changeant la couleur du bouton. 
        const buttonPressed = event.target;

        // Si les majuscules sont activées, le bouton aura une classe ".pressed". 
        // On utilise classList.toggle qui permet de vérifier si une classe est présente et la retirer si c'est le cas, et inversement.
        buttonPressed.classList.toggle('pressed');
    },


    /**
     * Méthode permettant de retirer le dernier caractère affiché à l'écran.
     */
    handleReturnPressed: function(){
        // On récupère l'écran afin de faire nos modifications dessus.
        const screen =  document.querySelector('.screen .text');
        // On récupère le contenu actuel de l'écran afin de supprimer le dernier caractère.
        const screenText = screen.textContent

        // Avec la fonction slice, on récupère chaîne de caractères mais amputée de son dernier caractère.
        // Ici l'argument "0" indique qu'on récupère les caractères à partir du tout premier. 
        // L'argument "-1" indique qu'on s'arrête un caractère avant la fin de la chaîne. 
        const newText = screenText.slice(0, -1);

        // On remplace le texte de l'écran par notre nouveau texte réduit.
        screen.textContent = newText;
    },


    /**
     * Méthode permettant d'ajouter un nouveau caractère à notre écran.
     * Elle attend un caractère en argument et va le concaténer au texte existant dans l'écran. 
     */
    addLetter: function(letter) {
        // On récupère l'écran afin de faire nos modifications dessus.
        const screen =  document.querySelector('.screen .text');
        
        // On récupère le contenu actuel de l'écran afin d'y ajouter le nouveau caractère.
        const screenText = screen.textContent

        // Si la touche "Maj" est enfoncée, alors on convertit la lettre en majuscule.
        if(advertizer.isUppercase) {
            letter = letter.toUpperCase();
        }

        // On modifie le contenu de l'écran en concaténant son ancien contenu et notre nouveau caractère
        screen.textContent = screenText + letter;

    },
}



// Dès que la page est complètement chargée, on exécute la méthode init rangée dans le "module" advertizer
document.addEventListener('DOMContentLoaded', advertizer.init);