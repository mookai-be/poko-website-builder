---
translationKey: good-start
lang: en
createdAt: 2026-02-23T14:20:00.000Z
uuid: b71034954d3c
localizationKey: e17e12d71fb9
name: Bien débuter
eleventyNavigation: null
metadata: null
preview: null
tags: []
status: ''
pageLayout: ''
generatePage: ''
vars: null
dataList: []
---

# Crée ta page en quelque clic

Bienvenue dans ta première création de pages internet

## 1 - Petit présentation du CMS :

- En haut à gauche tu trouveras un bouton pour voir les document et image stocké dans le CMS **1**

Dans les onglets à gauche tu trouveras dans l'ordre :

- Tes pages et les différentes catégories choisis lors du _" Settings "_ **2**
- Le  _" Navigateur, Footeurs et Pages Layouts "_ **3 (Tuto à venir + Work in progress)**
- Tes _" Partials "_ **4**
- Les options pour tes contenues **5**
- Des options complexes supplémentaires **6 (Tuto à venir + Work in progress)**
- Tes _" Settings "_ généraux pour le CMS **7**

Tu trouveras également :

- L’aperçu principales de tes onglets **8**
- Un champ rechercher **9**
- Un bouton très utile **(je crois, tuto à venir) 10**
- Le  _" + "_ sert à ajouter plein de chose utile **(tuto à venir) 11**
- Ton avatar te donnant accès à des options supplémentaires **12** .**(tuto à venir)**
- Deux boutons te permetant de supprimer et recréer des pages est autres modules **13**
- Un petit filtre pour une meilleur lisibilité **14**

{% image src="/_images/tutos/0-9-page-principale-finale.webp" %}

## 2 - Créons de ta première pages web :

- Commence par aller sur _" Pages "_ **1** et clique sur _" Create New Entry "_ **2**

{% image src="/_images/tutos/1-pages-1.webp" %}

- Pour bien débuter ta première page doit OBLIGATOIREMENT s’appeler _" index "_ **1**. Rassure toi, tu pourras modifier ce non après l'avoir publier une première fois ta page
- Nous avons ensuite le _" content "_. C'est là que toute la magie opère :)

Dans le content nous avons dans l'ordre :

- La liste des paragraphes, bullet point, et citation **2**
- Le Gras **3**
- L'italique **4**
- Le texte barré **5**
- Les balise pour mettre en forme du texte et faire comprendre que c'est du code **6**
- Les liens **7**
- La liste des insertions **8**
- L’affichage en forma code **9**

{% image src="/_images/tutos/2-pages-2.webp", width="800" %}

Les différents rendu de la liste des paragraphes sont visibles juste là :

{% image src="/_images/tutos/4-content-premier-volet-paragraphe-2.webp", width="800" %}

## 3 - Les insertions :

{% image src="/_images/tutos/5-content-deuxieme-volet-insert.webp", width="500" %}

#### I) Les images :

- Tu commence par insérer ton image **1**
- Tu peux ensuite cliquer sur _" Attributes "_ pour avoir des options d'affichages **2**

{% image src="/_images/tutos/6-content-deuxieme-volet-insert-image-1.webp", width="800" %}

- Dans le champ _" Alt Text "_  **3**, tu peut mettre une description succincte de ton image. Cette description sert pour les audios descriptions.
- C'est là pour un ratio précis **4**. Par exemple 16:9, 4:3, ...
- C'est la que tu peut fixer une dimension précise de ton image en pixel (px) **5**. Par défaut ton image féras la dimension maximale de la fenêtre d’affichage du navigateur.
- Tu trouveras ici des options plus poussées **6**

{% image src="/_images/tutos/8-content-deuxieme-volet-insert-image-3.webp", width="800" %}

- class **(c'est quoi?) 7**
- Id **(c'est quoi?) 8**
- Title **(c'est quoi?) 9**
- C'est la façon dont le site vas charger ton image. Par défaut c'est sur " Lazy " **10**.

> En " Lazy " ton image chargeras plus lentement. C'est utile pour limiter les latences.

> En " Eager " tu forces le chargement de l'image en priorité. C'est surtout utile si tu commence avec un logo ou une image en haut de ta page.

- Le Wrapper **(c'est quoi?) 11**
- Other raw image attributes **(c'est quoi?) 12**

{% image src="/_images/tutos/9-content-deuxieme-volet-insert-image-4.webp", width="800" %}

#### II) Les Partials :

Ce sont des morceaux de modèles réutilisables que l’on peut intégrer dans plusieurs pages. Comme par exemple des en-têtes, pied de pages, un bouton personnalisé, un bloc d'adresse, ...

Pour créer un _" Partial "_, rien de plus simple :

- Tu peux en crée un nouveau **2** en passant par le Hub **1**.

{% image src="/_images/tutos/0-1-partial-1.webp" %}

- Tu aura juste à lui donner un nom dans le champ _" Slug "_ **3**. Puis dans _" content "_ **4**, tu aura accès à tous les outils habituels pour faire ton _" Partiel "_.

{% image src="/_images/tutos/0-1-partial-2.webp", width="800" %}

- Une fois fait, sauvegarde le. Et voila, plus qu'à insérais ton _" Partial "_ partout ou il te seras utile.

{% image src="/_images/tutos/10-content-deuxieme-volet-insert-partial.webp", width="800" %}

#### III) Les Partials (HTML) :

Ils sont pareille au partial. A un détaille prés, il faut savoir codé en HTML. Il propose donc plus de possibilités pour le moment.

> Mais ne t'en fait pas amie No-code, Marc travail d’arrache-pied pour que tu n'est jamais à avoir besoin de ça.

#### IV) Wrapper :

**(C'est quoi? )**

#### V) Icon :

Ce sont tous les petits logos et images que tu pourrais vouloir intégrer directement dans ton texte.

- Tu peut cliquer sur _" Add Icon Library "_ **1**

{% image src="/_images/tutos/11-content-deuxieme-volet-insert-icone-1.webp", width="800" %}

- Tu peut ensuite choisir le site d'hébergement d’icônes de ton chois dans la liste

{% image src="/_images/tutos/12-content-deuxieme-volet-insert-icone-2.webp", width="500" %}

- Trouve l’icône de ton chois sur le site choisi **2** et retrouve sont nom dans la liste du menue déroulant **3**

{% image src="/_images/tutos/13-content-deuxieme-volet-insert-icone-3.webp", width="800" %}

- Tu as également _" Size "_ **4** pour ça taille en pixel(px)
- La _" class "_ **(c'est quoi?) 5**
- _" Other raw attributes "_ **(c'est quoi?) 6**
- N’oublie pas de cliquer sur _" Insert "_ pour valider tes chois **7**
- Si tu veux supprimer l’icône clique sur _" Remove "_ **8**

{% image src="/_images/tutos/13-5-content-deuxieme-volet-insert-icone-4.webp", width="800" %}

#### VI) Links :

Tu pourras insérer des liens dans tes texte via cette insertion.

- Le premier champ **1** sert à écrire le texte qui seras visible sur ta page
- Tu devras ensuite ouvrir le menu déroulant **2** pour choisir ton type de lien

{% image src="/_images/tutos/14-content-deuxieme-volet-links-1.webp", width="800" %}

Tu as plusieurs chois pour tes liens :

{% image src="/_images/tutos/15-content-deuxieme-volet-links-2.webp", width="500" %}

- Tu peut faire un lien vers une autre page de ton site **3**

{% image src="/_images/tutos/16-content-deuxieme-volet-links-3-pages.webp", width="800" %}

- Tu peut mettre un lien externe **4**

{% image src="/_images/tutos/17-content-deuxieme-volet-links-4-external-link.webp", width="800" %}

Pour un lien directement vers un mail **5** :

Tu peut Mettre le mail que tu veux lier **A**

Aller dans les options pour une meilleur précision **B**

{% image src="/_images/tutos/18-content-deuxieme-volet-links-5-e-mail.webp", width="800" %}

- Tu peut mettre des mail en copie **C**
- Tu peut également mettre des mail en copie caché **D** (il ne seront pas visible dans les mails partager par les autres personnes qui reçoivent ce mail)
- Tu peut préremplir un objet de mail **E** (pratique pour trier rapidement ses mail ;p)
- Enfin tu peut préremplir le contenue du mail **F**

{% image src="/_images/tutos/19-content-deuxieme-volet-links-6-e-mail-options.webp", width="800" %}

- Et enfin tu peut mettre un lien vers un fichier de ton chois **(Work in Progress)**

{% image src="/_images/tutos/20-content-deuxieme-volet-links-7-files.webp", width="800" %}

#### VII) Grid Section :

La _" Grid Section "_ te permet de mettre plusieurs image et texte cote à cote sur ta page.

> Tu trouveras toujours dans les _" Section "_, un _" Header "_ **1** et un _" Fouter "_ **5**, qui te permettrons respectivement de mettre du contenue avant et après tas mise en forme principale (Grid, Two Columns, ...)

- Tu as ensuite les _" Grid "_ **2** dans lesquelles tu peux ajouter le contenue dans _" content "_ **7** que tu souhaite mettre en forme

{% image src="/_images/tutos/22-content-deuxieme-volet-grids-2.webp", width="800" %}

- Tu peux ajouter **4** ou supprimer **3** autant de _" Grid "_ que tu veux
- Pour plus d'option, tu peux cliquer sur _" Add Layout and Options "_ **6**

{% image src="/_images/tutos/21-content-deuxieme-volet-grids-1.webp", width="800" %}

- Tu as 2 option, le _" Fluid Grid "_ **9** et le _" Switcher "_ **10**

{% image src="/_images/tutos/23-content-deuxieme-volet-grids-3.webp", width="800" %}

Dans le _" Fluid Grid "_ tu trouveras :

- Le nombre de colonnes **11** que tu veux définir par ligne

> Si tu met 4 " Grid " mais que défini que 2 colonnes, tu en aura 2 cote à cote et les 2 autres cote à cote en dessous des deux premier.

- Le _" Gap "_ **12 (c'est quoi?)**
- Le _" Class Name "_ **13(c'est quoi?)**

{% image src="/_images/tutos/24-content-deuxieme-volet-grids-4.webp", width="800" %}

Dans le _" Switcher "_ tu trouveras :

Le _" switche Vrap "_ **14 (c'est quoi?)**

Et de nouveau le _" Gap "_ **15** et le _" Class Name "_ **16**

#### VIII) Two Columns Section :
