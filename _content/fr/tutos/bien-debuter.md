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

## Étape 1 - Petit présentation du CMS :

**1)** En haut à gauche tu trouveras un bouton pour voir les document et image stocké dans le CMS.

Dans les onglets à gauche tu trouveras :

**2)** Tes pages et les différentes catégories choisis lors du _" Settings "._

**3)** C'est là que tu trouveras le _" Navigateur, Footeurs et Pages Layouts ". **(Tuto à venir + Work in progress)**

**4)** Tu trouves ici tes _" Partials "_.

**5)** Les options pour tes contenues sont ici.

**6)** Se sont des options complexes supplémentaires. **(Tuto à venir + Work in progress)**

**7)** Ce sont tes _" Settings "_ généraux pour le CMS.

Tu trouveras également :

**8)** C'est l’aperçu principales de tes onglets.

**9)** Quand tu sait plus où c'est, c'est ici pour rechercher ;p.

**10)** Bouton très utile **(je crois, tuto à venir)**. Le  _" + "_ sert à ajouter plein de chose utile **(tuto à venir)**. Ton avatar te donne accès à des options supplémentaires. **(tuto à venir)**

**11)** Te permet de supprimer et recréer des pages est autres modules.

**12)** Un petit filtre pour une meilleur lisibilité.

{% image src="/_images/tutos/0-9-page-principale.webp", alt="Image du Hub  du CMS de POKO" %}

## Étape 2 - Créons de ta première pages web :

A) Commence par aller sur _" Pages "_ **1** et clique sur _" Create New Entry "_ **2**.

{% image src="/_images/tutos/1-pages-1.webp" %}

B) Pour bien débuter ta première page doit OBLIGATOIREMENT s’appeler _" index "_ **1**. Rassure toi, tu pourras modifier ce non après l'avoir publier une première fois ta page.

C) Nous avons ensuite le _" content "_. C'est là que toute la magie opère :).

D) Dans le content nous avons dans l'ordre :

- La liste des paragraphes, bullet point, et citation **2**
- Le Gras **3**
- L'italique **4**
- Le texte barré **5**
- Les balise pour mettre en forme du texte et faire comprendre que c'est du code **6**
- Les liens **7**
- La liste des insertions **8**
- L’affichage en forma code

{% image src="/_images/tutos/2-pages-2.webp", alt="Titre + Content", width="900" %}

E) Les différents rendu de la liste des paragraphes sont visibles juste là :

{% image src="/_images/tutos/4-content-premier-volet-paragraphe-2.webp", alt="Visuelles des différents effet de la liste de paragraphe", width="700" %}

Parlons maintenant plus en profondeur des insertions :

{% image src="/_images/tutos/5-content-deuxieme-volet-insert.webp", width="400" %}

#### I) Les images :

A) Tu commence par insérer ton image **1**.

B) Tu peux ensuite cliquer sur " Attributes " pour avoir des options d'affichages **2**.

{% image src="/_images/tutos/6-content-deuxieme-volet-insert-image-1.webp", width="900" %}

C) Dans le champ _" Alt Text "_  **3**, tu peut mettre une description succincte de ton image. Cette description sert pour les audios descriptions.

D) C'est là pour un ratio précis **4**. Par exemple 16:9, 4:3, ...

E) C'est la que tu peut fixer une dimension précise de ton image en pixel (px) **5**. Par défaut ton image féras la dimension maximale de la fenêtre d’affichage du navigateur.

F) Tu trouveras ici des options plus poussées **6**.

{% image src="/_images/tutos/8-content-deuxieme-volet-insert-image-3.webp" %}

G) class **(c'est quoi?)**

H) Id **(c'est quoi?)**

I) Title **(c'est quoi?)**

J) C'est la façon dont le site vas charger ton image. Par défaut c'est sur " Lazy ".

- En " Lazy " ton image chargeras plus lentement. C'est utile pour limiter les latences.
- En " Eager " tu forces le chargement de l'image en priorité. C'est surtout utile si tu commence avec un logo ou une image en haut de ta page.

K) Le Wrapper **(c'est quoi?)**

L) Other raw image attributes **(c'est quoi?)**

{% image src="/_images/tutos/9-content-deuxieme-volet-insert-image-4.webp" %}

#### II) Les Partials :

Ce sont des morceaux de modèles réutilisables que l’on peut intégrer dans plusieurs pages. Comme par exemple des en-têtes, pied de pages, un bouton personnalisé, un bloc d'adresse, ...

Pour créer un _" Partial "_, rien de plus simple :

A) Tu peux en crée un nouveau **2** en passant par le Hub **1**.

{% image src="/_images/tutos/0-1-partial-1.webp" %}

B) Tu aura juste à lui donner un nom dans le champ _" Slug "_ **3**. Puis dans _" content "_ **4**, tu aura accès à tous les outils habituels pour faire ton _" Partiel "_.

{% image src="/_images/tutos/0-1-partial-2.webp" %}

C) Une fois fait, sauvegarde le. Et voila, plus qu'à insérais ton _" Partial "_ partout ou il te seras utile.

{% image src="/_images/tutos/10-content-deuxieme-volet-insert-partial.webp", width="900" %}

#### III) Les Partials (HTML) :

Ils sont pareille au partial. A un détaille prés, il faut savoir codé en HTML. Il propose donc plus de possibilités pour le moment.

> Mais ne t'en fait pas amie No-code, Marc travail d’arrache-pied pour que tu n'est jamais à avoir besoin de ça.
