Cette application a été creer dans le cadre d'un projet d'école

L'application a pour fonction de collecter des valeurs de variable automates et de les stocker sur une base de donné et de les retransmettre a l'utilisateur.

L'utilisateur lui accède a l'application via des page web.

Sur ces page l'utilisateur peut se connecter,ajouter de nouvelles variable a suivre, de nouveau automate,
de nouvelle fréquence (fréquence a la qulle le système récupére les données), il a aussi accés aux valeurs des varible suivie sous forme d'u graphe.

L'utilisateur a aussi la possibilité d'exporter les données en CSV. 



Attention:
nécéssite Docker pour pouvoir fonctionner.


Installation:

1- Télecharger le réposit  https://github.com/NikBon-FE/TP-DepSI.git
2- Exécuter la commande : docker-compose up --build (en étant connecté a un réseau aillant accés a internet)
3- Faire un ctrl-c pour stoper le système




LANCEMENT DE L'APPLICATION:

1-Être connecter au même reseau que les automates
2-Exécuter la commande : docker-compose up
3-Accéder a la page de login: http://localhost:8080/login.html
4- se loggé  ,2 utilisateur de base : 
-Administrateur --> username: admin /password: admin (droit de modifier les configurations automate et fréquence)
-Opérateur --> username: operator /password: operator (droit d'ajouter des variable a la liste des suivis ,d'exporter en csv)

5- Un fois loggé vous arriver sur la page main:

-Export csv: redirige sur la page permettant d'exporter les données
-Graphe: redirige sur la page permettant de voir l'evolution des données sous forme d'un graphe
-Ajout var:redirige sur la page permettant l'ajout de nouvelle variable a suivre ,l'ajout d'automate et de nouvelle fréquence
-QUIT: retourne sur la page de login



6- Export CSV
Sur la droite vous avez un formulaire qui permet de choisir la ou les varibles  a afficher dans le tableau de gauche, ou d'exporter en format csv les données.
vous avez aussi des bouton de redirection sur les autres pages

7- Graphe
Sur la droite un formulaire qui permet de choisir la ou les varibles a afficher dans le graphe de gauche.

8- Ajout var
A gauche un formulaire pour ajouter une nouvelle variable a suivre:
-Nom variable: le nom que vous voulez donné a votre variable (ex:Température_zone1)
-Choisissez l'automate: choissir l'automate dans le quelle la varible a lire se trouve (parmis la liste des automates déjà créer)
-Nom_varible: Adresse de la variable a lire dans l'automate
-Choisissez la fréquence:choissir la fréquence a la quelle la varible sera lu (parmis la liste des fréquence déjà créer)
-ajouter la variable dans le suivi : ajoute la variable dans la BDD et l'affiche dans le tableau en dessous du formulaire

A droite nécéssite les droit Administrateur:

Ajout automates:
-Nom automate :choisisser le nom de l'automate que vous allez ajouter
-IP automate : donner l'adresse IP de l'automate

Ajout fréquence:
-Nom fréquence :choisisser le nom de la fréquence que vous allez ajouter
-Temps : le temps de la fréquense (ex: 1s)
