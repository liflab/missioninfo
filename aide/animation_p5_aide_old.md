#Aide : Anime plusieurs figures

Comme tu as pu le remarquer, il faut faire bouger 3 cercles en même temps.

***

La première chose à savoir, c’est que tu peux mettre dans le bloc ![Bloc déplacement curseur][bloc_dep_curseur] une valeur négative. 

####Exemple :  
Si je met -1 comme valeur à X, cela aura pour effet de faire déplacer une forme vers la gauche.  
Si la valeur de X initiale était de 5, on reculerait pour prendre les valeurs : 4, 3, 2, 1. Tout ça en faisant -1 à chaque fois.

***

Deuxième chose à savoir : comment faire bouger plusieurs formes dans le même sens?

Tu dois utiliser un seul «curseur» (![Bloc Init Curseur][bloc_init_curseur]).

Ce qui veut dire que pour les autres cercles, tu vas devoir utiliser ce nouveau bloc :  
![Bloc position curseur avec décalage][bloc_pos_curseur_offset]

***

Le décalage c’est la différence entre les coordonnées de deux centres par exemple.

![Exemple decalage formes][ex_p5_formes]

Ici, si on utilise les coordonnées du carré 1 pour le curseur, il faudra un décalage pour faire bouger le carré 2 de la même façon. 

Puisque les coordonnées du centre du carré 1 sont (3,5), il faut faire un décalage de :  

X : +4<br>Y : +1

Pour arriver au centre du carré 2 (7,6).

***

Voilà ce que ça donnerait : 

![Exemple decalage blocs][ex_p5_blocs]

Il faudrait bien sûr ajouter les autres blocs nécessaires pour concevoir l’animation.

***

Je te donne un indice : Pour réussir cette page tu devrais utiliser un bloc ![Bloc position curseur][bloc_pos_curseur] et deux blocs ![Bloc position curseur avec décalage][bloc_pos_curseur_offset].


##<span style="color: #800080">À ton tour d'essayer</span>

[bloc_dep_curseur]: img/dep_curseur.png
[bloc_init_curseur]: img/init_curseur.png
[bloc_pos_curseur_offset]: img/pos_curseur_offset.png
[bloc_pos_curseur]: img/pos_curseur.png
[ex_p5_formes]: img/ex_p5_formes.png
[ex_p5_blocs]: img/ex_p5_blocs.png