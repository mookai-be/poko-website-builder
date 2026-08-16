---
translationKey: portfolio
order: 2
lang: fr
createdAt: 2026-04-28T12:21:00.000Z
name: Portfolio
eleventyNavigation:
  add: Nav
bodyClass: palette-mocha
---

# Portfolio

:::section

:::div {.bg-title-section}

## Plus de 10 ans de projets.{% br %}Voilà ceux qui nous ressemblent le plus.

Du logo au site sur mesure, en passant par l'illustration et la mise en page — on a eu la chance de bosser avec des gens qui avaient quelque chose à dire. Voilà une partie de ce qu'on a fait ensemble.
:::

{% sectionCollection  %}
{% sectionHeader  %}
## Une sélection
{% endsectionHeader %}
{% collection collection="portfolio", filters=[{"by":"tag","value":["featured"]},{"value":4,"by":"first"}], sortCriterias=[], type="grid-fluid", columns=4, itemPartial="featured-work" %}{% endcollection %}
{% sectionFooter  %}
Un projet dans ces eaux-là? [On adore ça](/contact/){.cta}
{% endsectionFooter %}
{% endsectionCollection %}

{% sectionCollection  %}
{% sectionHeader  %}
## Les autres projets
{% endsectionHeader %}
{% collection collection="portfolio", filters=[{"by":"tag","value":["featured"]}], exclusions=true, sortCriterias=[{"by":"random"}], type="grid-fluid", columns=8, itemPartial="portfolio-work" %}{% endcollection %}

{% endsectionCollection %}

[Moi aussi je veux mon projet dans cette liste!](/contact/){.cta}
