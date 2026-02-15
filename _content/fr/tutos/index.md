---
translationKey: index
lang: fr
createdAt: 2026-02-12T12:30:00.000Z
uuid: 9393e283f871
localizationKey: f45a3ce690be
name: Créer sont site POKO
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

# Comment utilise-t-on POKO ?

Avant toute chose, crée toi un compte [GitHub](https://github.com/). « C’est entièrement gratuit »

## 1ère étape :

Aller sur cette page GitHub : [poko-website-builder](https://github.com/m4rrc0/poko-website-builder)

Vérifie bien que tu es connecté sur ton compte.

Première chose à faire cliquer sur _"Fork"_.

{% image src="/_images/tutos/fork.webp" %}

Tu peux ajouter une description à ton nouveau projet et le renommer.

Puis clique sur _" Create fork "_ pour valider.

Tu obtiens un nouvel onglet avec une copie du _" website-builder "_ qui sera sur ton nouveau compte GitHub .

{% image src="/_images/tutos/2-new-fork.webp", width="600" %}

**Félicitation c’est ton nouveau bébé&#160;**, prend en soins.

## 2éme étape :

Il te faut maintenant un **TOKEN.**

> **_Un TOKEN (ou jeton d’accès)_**_ est une chaîne secrète utilisée à la place d’un mot de passe pour s’authentifier auprès de GitHub via l’API ou la ligne de commande; il donne des droits d’accès limités selon les permissions qu’on lui donne._

Tu pourras le créer en passant par ce lien [TOKEN](https://github.com/settings/personal-access-tokens/new?name=poko-website-builder+token&description=Read+and+write+repo+access+for+the+CMS&expires_in=none&contents=write).

#### Tu peux :

A) Renommer ton TOKEN **1**.

B) Mettre une description **2**.

C) Définir le propriétaire **3**.

D) Choisir une date d’expiration (si tu souhaites donner un accès temporaire) **4**.

{% image src="/_images/tutos/3-creation-de-token.webp", width="600" %}

E) Choisir le type d’accès **5**.

F) Choisir le type d’accès **6**.

{% image src="/_images/tutos/4-creation-de-token-2.webp", width="600" %}

G) Et enfin générer le TOKEN **7**.

{% image src="/_images/tutos/5-creation-de-token-3.webp", width="200" %}

À savoir :

•	Si tu as bifurqué le dépôt dans une organisation, change le " Resource Ownerpour " correspondre au nom de ton organisation.

•	N’hésite pas à définir une date d’expiration ou à restreindre le " Repository access ".

Le but étant d’avoir un TOKEN de secours pour pouvoir accéder à ton projet de n’importe où (garde bien une date d’expiration illimitée).

Bravo, tu as créé ton premier TOKEN.

{% image src="/_images/tutos/6-token.webp", width="600" %}

Copiez la valeur du TOKEN " **1** " et enregistrez-la dans un endroit sûr. (comme un gestionnaire de mots de passe).

•	⚠️ Ne partagez pas ce jeton avec qui que ce soit.

•	⚠️ Vous ne serez pas en mesure de lire le jeton de Github après avoir quitté la page (vous pouvez toujours en créer un nouveau cependant).

## 3éme étape:

On vas maintenant héberger ta page internet via GitHub.

Pour d'autre hébergeur c'est par {% link url="cloudflare", linkType="external" %}.

A) Commence par aller dans _" Settings "_ .

{% image src="/_images/tutos/1-setting.webp" %}

B) Clique sur _" Pages "_.

{% image src="/_images/tutos/2-pages.webp", width="300" %}

C) Clique sur le menu déroulant puis sur _" GitHub Actions "_ **1**.

{% image src="/_images/tutos/3-giyhub-action.webp", width="1200" %}

D) Vas maintenant dans l'onglet principale _" Actions "_ **2** puis clique sur _" I understand my workflows, go ahead and enable them "_ **3**.

{% image src="/_images/tutos/4-je-comprend-et-valide.webp", width="1200" %}

E) Clique sur _" Deploy 11 ty site to pages "_ **4**.

{% image src="/_images/tutos/5-deploy.webp", width="1200" %}

F) Déroule _" Run workflow "_ et vérifie que tu es bien sur main **5** puis valide **6**.

{% image src="/_images/tutos/6-run-workflow.webp", width="1200" %}

## 4éme étape :

Ton site est maintenant hébergé ;p

On doit maintenant accéder au CMS  pour pouvoir le configurer.

# ---->In Progress<----(pas d'image)

- Trouvez l'URL de ton projet en allant sur " Actions ". Clique sur le dernier update en date. Tu y trouveras le lien vers ton sites(par ex. https://project-name.pages.dev)
- Ouvrez l'URL dans ton navigateur et ajoutez _" /admin "_ juste à la fin (Par ex. https://project-name.pages.dev/admin). Tu devrais voir l'écran de connexion CMS.

Clique sur _"Sign in with GitHub Using PAT"_ **2**.

{% image src="/_images/tutos/18-cms-connection-admin-2.webp", width="200" %}

Tu doit coller le TOKEN que tu as précieusement sauvegardé au début **3**.

{% image src="/_images/tutos/19-cms-connection-admin-token.webp", width="300" %}

Bienvenue sur ton CMS.

> CMS : " Content managment systèm " est le système de gestion de ton site web.

On vas maintenant configurer celui-ci pour que tu puisse enfin commencer ton site.

Commence par aller dans _"settings"_ **4**.

{% image src="/_images/tutos/20-cms-pages-d-accueil-vide.webp" %}

A) Nomme ton site **5**.

B) Colle l’URL de ton site sans oublier le _" https:// "_ et en enlevant tout ce qui a après _" .dev "_ **6**.

{% image src="/_images/tutos/21-cms-settings-url.webp", width="300" %}

C) Ouvre le volet _" Languages "_ et choisi ta langue.

{% image src="/_images/tutos/22-cms-settings-langue-1.webp", width="300" %}

{% image src="/_images/tutos/23-cms-settings-langue-2.webp", width="300" %}

Vérifie que tu as bien complété tous les champs contenant une astérisque _" \* "_.

E) Sauvegarde avec _" Save and Publish "_ que tu trouveras en haut à gauche de ta page.

{% image src="/_images/tutos/24-cms-save-and-publish.webp", width="300" %}

F) Attends le temps que Cloudflare valide la modification (ça peut prendre un peu de temps).

{% image src="/_images/tutos/25-cms-cloudflare-chargement.webp", width="500" %}

G) Une fois validé, rafraichi ta page web. Si tu as ce visuel, bravo, tu as fini la configuration de ton site.

{% image src="/_images/tutos/26-cms-fin.webp", width="200" %}

Tu as maintenant accès à tous les outils pour faire ta mise en page et créé ton site internet personnaliser avec POKO.
