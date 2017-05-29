# Aide: Anime une figure

Avant de construire l’animation, il faut se demander ce qui va bouger.  
Est-ce que c’est l’extrémité d’une ligne ou encore la position d’une forme?  
Une fois que tu as répondu à cette question, il faut initialiser ce point avec le bloc : ![Bloc Init Curseur][bloc_init_curseur].  
Utilise un bloc position (![Bloc XY][bloc_xy]) pour indiquer la coordonnée du centre ou du coin de la forme ou encore de l’extrémité de la ligne qui va bouger.

***

Maintenant, place en dessous un bloc ![Bloc Pour chaque image Faire][bloc_pour_image] pour concevoir l’animation.  
Place le bloc ![Bloc position curseur][bloc_pos_curseur] sur la forme, à l’endroit qui va devoir changer d’une valeur de temps à l’autre.  
N’oublie pas de placer sous ta forme la valeur de mouvement qui doit être réalisé à chaque valeur de temps avec le bloc ![Bloc déplacement curseur][bloc_dep_curseur].  
Utilise aussi un bloc position (![Bloc XY][bloc_xy]).

***

Voici un exemple de ce à quoi ça doit ressembler :

![Exemple animation][ex_p4]

## <span style="color: #800080">À ton tour d'essayer</span>

[bloc_init_curseur]: img/animation_init_curseur.png
[bloc_xy]: img/animation_XY.png
[bloc_pour_image]: img/animation_pour_image.png
[bloc_pos_curseur]: img/animation_pos_curseur.png
[bloc_dep_curseur]: img/animation_dep_curseur.png
[ex_p4]: img/animation_ex_1.png
