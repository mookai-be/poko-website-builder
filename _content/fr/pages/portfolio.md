---
translationKey: portfolio
order: 2
lang: fr
createdAt: 2026-04-28T12:21:00.000Z
name: Portfolio
eleventyNavigation:
  add: Nav
pageClass: palette-mocha
---

<div class="title-container">
  <h1 class="bg-title">
    Portfolio
  </h1>
</div>

:::section

:::div {.bg-title-section}

## Plus de 10 ans de projets. Voilà ceux qui nous ressemblent le plus.

Du logo au site sur mesure, en passant par l'illustration et la mise en page — on a eu la chance de bosser avec des gens qui avaient quelque chose à dire. Voilà une partie de ce qu'on a fait ensemble.
:::

{% sectionCollection  %}
{% sectionHeader %}
## Une sélection
{% endsectionHeader %}

{% collection collection="creative-works", filters=[{"value":"featured","by":"tag"}], sortCriterias=[], class="full-bleed", itemPartial="featured-work.njk" %}{% endcollection %}

{% sectionFooter %}
Un projet dans ces eaux-là? [On adore ça.](/contact/){.cta}
{% endsectionFooter %}
{% endsectionCollection %}


{% sectionCollection  %}
{% sectionHeader %}
## Les autres projets
{% endsectionHeader %}

{% collection collection="creative-works", filters=[{"by":"tag","value":["featured"]}], exclusions=true, sortCriterias=[{"by":"random"}], itemPartial="portfolio-work.njk" %}{% endcollection %}

{% endsectionCollection %}

[Moi aussi je veux mon projet dans cette liste!](/contact/){.cta}