---
translationKey: demo-des-layouts
lang: fr
name: Démo des Layouts (Primitifs CSS)
eleventyNavigation: null
tags:
  - web
  - featured
status: "published"
---

# Démo visuelle des classes de Layout

Cette page documente visuellement les "primitifs de layout" (basés sur _Every Layout_) définis dans `32_layouts.css`. Pour rendre l'effet visible, des couleurs de fond et des bordures ont été ajoutées manuellement aux exemples.

---

## 1. Box (`.box`)

Ajoute un padding standard et une bordure à un élément pour l'encapsuler.

<div class="box" style="background: #f8fafc; border-color: #94a3b8;">
  Ceci est un composant <strong>box</strong>. Il possède un padding par défaut (géré par <code>--padding-box</code>) et une bordure.
</div>

---

## 2. Flow (`.flow`)

Ajoute un espacement vertical (margin-top) automatique entre les éléments frères.

<div class="flow box" style="background: #f8fafc; border-color: #94a3b8;">
  <div style="background: #cbd5e1; padding: 10px;">Élément 1</div>
  <div style="background: #cbd5e1; padding: 10px;">Élément 2 (l'espacement au-dessus est automatique)</div>
  <div style="background: #cbd5e1; padding: 10px;">Élément 3</div>
</div>

---

## 3. Center (`.center`)

Centre un élément horizontalement et lui donne une largeur maximale (gérée par `--max-width` ou `--measure`).

<div style="background: #e2e8f0; padding: 20px;">
  <div class="center box" style="background: #fff; border-color: #94a3b8; --max-width: 50%;">
    <p style="margin:0;">Cet élément est <strong>centré</strong> avec une largeur maximale de 50% de son parent.</p>
  </div>
</div>

---

## 4. Cluster (`.cluster`)

Aligne les éléments horizontalement (comme des tags) avec un espacement (gap) et les fait passer à la ligne si l'espace manque.

<div class="cluster box" style="background: #f8fafc; border-color: #94a3b8;">
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 1</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 2 très long</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 3</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 4</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 5</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 6</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 7</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 8</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 9</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 10</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 11</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 12</span>
  <span style="background: #cbd5e1; padding: 5px 15px; border-radius: 20px;">Tag 13</span>
</div>

---

## 5. With Sidebar (`.with-sidebar` / anciennement `fixed-fluid`)

Met en place une colonne de largeur fixe (ou dictée par son contenu) et une colonne fluide qui prend le reste de l'espace.

<div class="with-sidebar box" style="background: #f8fafc; border-color: #94a3b8;">
  <div style="background: #94a3b8; color: white; padding: 20px; --width-sidebar: 200px;">
    Sidebar (200px)
  </div>
  <div style="background: #cbd5e1; padding: 20px;">
    Contenu fluide. Il prend tout le reste de l'espace disponible et passera en dessous si l'écran est trop petit.
  </div>
</div>

---

## 6. Switcher (`.switcher`)

Affiche les éléments horizontalement, mais bascule l'ensemble en disposition verticale (colonne) si le conteneur devient plus étroit que `--width-wrap`.

<div class="switcher box" style="background: #f8fafc; border-color: #94a3b8; --width-wrap: 40rem;">
  <div style="background: #cbd5e1; padding: 20px;">Bloc A</div>
  <div style="background: #cbd5e1; padding: 20px;">Bloc B</div>
  <div style="background: #cbd5e1; padding: 20px;">Bloc C</div>
</div>
*Réduisez la taille de la fenêtre pour voir les blocs passer en disposition verticale.*

---

## 7. Cover (`.cover`)

Prend une hauteur minimum (par ex: 100vh) et centre verticalement l'élément possédant la classe `.centered`. Pousse l'en-tête en haut et le pied en bas.

<div class="cover box" style="background: #f8fafc; border-color: #94a3b8; --min-height-cover: 300px;">
  <div style="background: #cbd5e1; padding: 10px;">Header du cover (poussé en haut)</div>
  
  <div class="centered" style="background: #94a3b8; color: white; padding: 30px; text-align: center;">
    <strong>Contenu principal (.centered)</strong><br>
    Parfaitement centré verticalement.
  </div>
  
  <div style="background: #cbd5e1; padding: 10px;">Footer du cover (poussé en bas)</div>
</div>

---

## 8. Grid Fluid (`.grid-fluid`)

Crée une grille responsive automatique. Les colonnes s'adaptent selon `--width-column-min` sans avoir besoin de Media Queries.

<div class="grid-fluid box" style="background: #f8fafc; border-color: #94a3b8; --width-column-min: 150px;">
  <div style="background: #cbd5e1; padding: 30px; text-align: center;">1</div>
  <div style="background: #cbd5e1; padding: 30px; text-align: center;">2</div>
  <div style="background: #cbd5e1; padding: 30px; text-align: center;">3</div>
  <div style="background: #cbd5e1; padding: 30px; text-align: center;">4</div>
  <div style="background: #cbd5e1; padding: 30px; text-align: center;">5</div>
</div>

---

## 9. Frame (`.frame`)

Force un élément (comme une image ou une vidéo) à respecter un ratio d'aspect strict (ex: 16/9), tout en recadrant (`object-fit: cover`) ce qui dépasse.

<div style="width: 300px;">
  <div class="frame box" style="padding:0; --n: 16; --d: 9; background: #e2e8f0; border-color: #94a3b8;">
    <img class="frame-inner" src="https://picsum.photos/800/600" alt="Image générique recadrée en 16/9" />
  </div>
</div>

---

## 10. Reel (`.reel`)

Crée un conteneur défilable horizontalement (scroll) pour des éléments qui dépassent la largeur, idéal pour des carrousels de cartes.

<div class="reel box" style="background: #f8fafc; border-color: #94a3b8; --item-width: 200px;">
  <div style="background: #cbd5e1; padding: 40px; text-align: center;">Carte 1</div>
  <div style="background: #cbd5e1; padding: 40px; text-align: center;">Carte 2</div>
  <div style="background: #cbd5e1; padding: 40px; text-align: center;">Carte 3</div>
  <div style="background: #cbd5e1; padding: 40px; text-align: center;">Carte 4</div>
  <div style="background: #cbd5e1; padding: 40px; text-align: center;">Carte 5</div>
</div>

---

## 11. Imposter (`.imposter`)

Positionne un élément de manière absolue (ou fixe) pile au centre de son conteneur relatif.

<div class="box" style="position: relative; height: 250px; background: #f8fafc; border-color: #94a3b8;">
  <p>Conteneur parent (en position: relative)</p>
  
  <div class="imposter box" style="background: #0f172a; color: #fff; border-color: #0f172a;">
    Je suis l'imposter !<br>Centré absolument.
  </div>
</div>

---

## 12. Icon & With-Icon (`.icon`, `.with-icon`)

Permet d'aligner parfaitement une icône SVG avec la ligne de base du texte qui l'accompagne.

<div class="box flow" style="background: #f8fafc; border-color: #94a3b8;">
  <p class="with-icon" style="margin: 0; background: #cbd5e1; padding: 10px;">
    <!-- Exemple de SVG basique pour l'icône -->
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    Texte aligné avec l'icône à gauche
  </p>

  <p class="with-icon right" style="margin: 0; background: #cbd5e1; padding: 10px;">
    Texte aligné avec l'icône à droite
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  </p>
</div>

---

## 13. Pile (`.pile`)

Superpose tous ses enfants directs les uns au-dessus des autres sur une seule et même cellule de grille CSS (`grid-area: 1/1`). Idéal pour superposer du texte sur une image sans `position: absolute`.

<div class="pile box" style="background: #f8fafc; border-color: #94a3b8; height: 200px; width: 300px; padding: 0;">
  <img src="https://picsum.photos/300/200" alt="Fond" style="width: 100%; height: 100%; object-fit: cover;" />
  <div style="background: rgba(0,0,0,0.6); color: white; margin: 20px; padding: 10px; align-self: end;">
    Texte superposé (Calque 2)
  </div>
  <div style="background: red; color: white; padding: 5px; justify-self: end; align-self: start;">
    Badge (Calque 3)
  </div>
</div>
