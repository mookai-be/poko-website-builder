---
translationKey: portfolio
order: 2
lang: fr
createdAt: 2026-04-28T12:21:00.000Z
name: Portfolio
eleventyNavigation:
  add: Nav
---

# Plus de 10 ans de projets. Voilà ceux qui nous ressemblent le plus.

Du logo au site sur mesure, en passant par l'illustration et la mise en page — on a eu la chance de bosser avec des gens qui avaient quelque chose à dire. Voilà une partie de ce qu'on a fait ensemble.

## Une sélection

{% sectionCollection  %}

{% collection collection="creative-works", filters=[{"value":"featured","by":"tag"}], sortCriterias=[] %}{% endcollection %}

{% endsectionCollection %}

Un projet dans ces eaux-là? [On adore ça.](/contact/)

## Les autres projets

{% sectionCollection  %}

{% collection collection="creative-works", filters=[{"by":"tag","value":["featured"]}], exclusions=true, sortCriterias=[{"by":"random"}] %}{% endcollection %}

{% endsectionCollection %}

[Moi aussi je veux mon projet dans cette liste!](/contact/)
