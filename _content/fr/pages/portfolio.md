---
translationKey: portfolio
order: 2
lang: fr
createdAt: 2026-04-28T12:21:00.000Z
ldType: WebPage
name: Portfolio
eleventyNavigation:
  add: Nav
bodyClass: palette-mocha
---

# Portfolio

:::section

## Plus de 10 ans de projets.{% br %}Voici ceux qui nous ressemblent le plus.

Du logo au site sur mesure, en passant par l'illustration et la mise en page, on a eu la chance de bosser avec des gens qui avaient quelque chose d'important à dire. Voici une partie de ce qu'on a fait ensemble.
:::

{% sectionCollection  %}
{% sectionHeader  %}
## Quelques projets
{% endsectionHeader %}
{% collection collection="portfolio", filters=[{"by":"tag","value":["featured"]},{"value":6,"by":"first"}], sortCriterias=[], type="grid-fluid", columns=3, itemPartial="featured-work" %}{% endcollection %}
{% sectionFooter  %}
Toi aussi tu as un projet porteur de sens? [Dis-nous tout](/contact/){.cta}
{% endsectionFooter %}
{% endsectionCollection %}

{% sectionCollection  %}
{% sectionHeader  %}
## D'autres projets
{% endsectionHeader %}
{% collection collection="portfolio", filters=[{"by":"tag","value":["featured"]},{"value":6,"by":"first"}], exclusions=true, sortCriterias=[], type="grid-fluid", columns=8, itemPartial="portfolio-work" %}{% endcollection %}

{% endsectionCollection %}

[Je veux mon projet dans cette liste!](/contact/){.cta}
