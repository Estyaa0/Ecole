/* RANDOMISATION DES QUESTIONS */
document.addEventListener('DOMContentLoaded', function() {
    const filtre = document.querySelector('#filtre');
    const questions = Array.from(document.querySelectorAll('.question'));
    
    
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    
    
    questions.forEach(question => {
        filtre.appendChild(question);
    });
});

/*
EXPLICATION :
Cette fonction s'exécute dès que la page HTML est complètement chargée (DOMContentLoaded).
- "filtre" : récupère l'élément HTML avec l'id #filtre (là où sont toutes les questions)
- "questions" : récupère TOUTES les div avec la classe .question et les transforme en tableau avec Array.from()
- La boucle for permet de mélanger aléatoirement le tableau des questions. Pour chaque position i (en partant de la fin), 
  on tire au hasard une position j, puis on échange les questions aux positions i et j.

- "Math.floor()" arrondit le nombre vers le bas pour avoir un nombre entier
- "Math.random()" génère un nombre aléatoire entre 0 et 1, multiplié par (i + 1) pour obtenir un index aléatoire
- "[questions[i], questions[j]] = [questions[j], questions[i]]" : c'est une déstructuration JavaScript qui échange les deux éléments de place
- Enfin, on réinsère chaque question dans le DOM dans le nouvel ordre mélangé avec appendChild()
Résultat : À chaque rechargement de la page, les questions apparaissent dans un ordre différent et aléatoire.
*/


/* FONCTION DE FILTRE / RECHERCHE */
document.querySelector('#filtre input').addEventListener('input', function(e) {
    const recherche = e.target.value.toLowerCase();
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(question => {
        const texteQuestion = question.querySelector('.question-text').textContent.toLowerCase();
        const medaille = question.querySelector('button').textContent;
        
        
        if (texteQuestion.includes(recherche) || medaille.includes(recherche)) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    });
});

/*
EXPLICATION :
Cette fonction s'active à chaque fois qu'on tape quelque chose dans la barre de recherche (événement 'input').
- "recherche" : stocke le texte de recherche en minuscules
- "e.target.value" : récupère ce que l'utilisateur a tapé dans l'input
- ".toLowerCase()" : convertit tout en minuscules pour que la recherche soit insensible à la casse (ex: "Javascript" trouvera "javascript")
- "questions" : récupère toutes les div avec la classe .question
- Pour chaque question, on récupère :
  * "texteQuestion" : le contenu textuel de la question (converti en minuscules)
  * "medaille" : le texte du bouton (l'emoji de la médaille 🥇🥈🥉)
- "includes()" : vérifie si le texte de recherche est présent dans la question OU dans la médaille
- Si c'est le cas (if), on affiche la question (display: block)
- Sinon (else), on cache la question (display: none)
Résultat : Quand on tape "javascript" ou "🥇", seules les questions correspondantes restent visibles, les autres sont cachées en temps réel.
*/


/* EFFET DE CERCLE AU CLIC */
document.addEventListener("click", function (e) {
    const cercle = document.createElement("div");
    cercle.classList.add("clic-cercle");

    cercle.style.left = e.clientX + "px";
    cercle.style.top = e.clientY + "px";

    document.body.appendChild(cercle);

    setTimeout(() => {
        cercle.remove();
    }, 300);
});

/*
EXPLICATION :
Cette fonction s'active à chaque clic n'importe où sur la page.
- "e" : représente l'événement de clic, il contient des informations comme la position du clic
- "cercle" : stocke ce nouvel élément div
- "document.createElement('div')" : crée un nouvel élément <div> en JavaScript (il n'existe pas encore dans le HTML)
- ".classList.add('clic-cercle')" : ajoute la classe CSS "clic-cercle" à ce div pour qu'il hérite des styles définis dans le CSS (cercle gris, animation)
- "e.clientX" et "e.clientY" : récupèrent les coordonnées X (horizontal) et Y (vertical) du clic en pixels
- On positionne le cercle exactement à l'endroit du clic avec left et top
- "document.body.appendChild(cercle)" : ajoute le cercle dans le DOM (dans le <body>), il devient visible à l'écran
- "setTimeout()" : lance une action après un délai (ici 300 millisecondes = 0.3 seconde)
- "cercle.remove()" : supprime le cercle du DOM après 300ms pour ne pas surcharger la page
Résultat : À chaque clic, un cercle gris apparaît à l'endroit du clic, s'agrandit progressivement et disparaît grâce à l'animation CSS, puis est supprimé de la page après 300ms.
*/


/*
 AFFICHE LA REPONSE AVEC AVOIR CLIQUER SUR LE BOUTON DE LA MEDAILLE*/


document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.question button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const reponse = this.nextElementSibling;
            
            
            if (reponse.style.display === 'block') {
                reponse.style.display = 'none';
            } else {
                reponse.style.display = 'block';
            }
        });
    });
});
/*
EXPLICATION :
Cette fonction alternative permet d'afficher/cacher la réponse au CLIC au lieu du survol (hover).
- Elle s'exécute au chargement de la page (DOMContentLoaded)
- "buttons" : récupère tous les boutons médailles (tous les <button> à l'intérieur des .question)
- "forEach" : pour chaque bouton, on ajoute un écouteur d'événement 'click'
- "e.stopPropagation()" : empêche le clic sur le bouton de déclencher l'effet de cercle (sinon on aurait le cercle + l'affichage de la réponse)
- "this" : représente le bouton sur lequel on a cliqué
- "nextElementSibling" : récupère l'élément HTML qui suit directement le bouton (ici, c'est le <p class="reponse">)
- "reponse" : stocke cet élément de réponse
- La condition if/else fait un "toggle" (basculement) :
  * Si la réponse est déjà visible (display === 'block'), on la cache (display = 'none')
  * Sinon, on l'affiche (display = 'block')
Résultat : Au lieu de passer la souris sur la médaille, on clique dessus pour afficher la réponse, et on re-clique pour la cacher.
*/