# Aide : Blocs - Curseur

### Qu’est-ce qu’un curseur?

Un curseur c’est un point invisible que l’on va pouvoir déplacer d’une image à l’autre selon les valeurs qu’on lui donne. Si on attache le curseur au centre d’une forme, c’est ce qui nous permet de la faire bouger. Le centre bougerait en suivant la valeur du curseur. Ce qui nous permet de faire une translation.

***

### Utilisation


Tu dois d'abord initialiser la position du curseur au tout début de ton programme.

![Bloc init curseur][init_curseur]

Ensuite tu peux récuperer cet position avec ce bloc.

![Bloc position curseur][pos_curseur]

Des fois tu auras besoin de faire bouger plusieures formes en même temps vers la même direction. Utilise alors un décalage!

![Bloc position curseur avec décalage][pos_curseur_offset]

Pour déplacer ton curseur, rien de plus simple. Utilise ce bloc!

![Bloc déplacememt curseur][dep_curseur]

***

Des fois, tu pourras utiliser plusieurs curseurs. Pour cela, utilise le numéro pour avoir accès jusqu'à 10 curseurs!

![Bloc multiples curseurs][curseur_tab]

[init_curseur]: img/init_curseur.png
[pos_curseur]: img/pos_curseur.png
[pos_curseur_offset]: img/pos_curseur_offset.png
[dep_curseur]: img/dep_curseur.png
[curseur_tab]: img/curseur_tab.png
