---
translationKey: index
order: 1
name: Accueil
pageLayout: homepage
---

{% component "headless/page-nav.11ty.js", { class: "py-body" } %}

{% htmlPartial "homepage-hero.njk" %}

# Studio créatif engagé

::: section

## Ce qu'on fait

Du logo au site web, en passant par l'illustration et la mise en page — on construit les outils visuels et digitaux qui donnent à ton projet la visibilité qu'il mérite.

Pas de jargon, pas de sur-promesse. On travaille avec toi, pas pour toi. Notre mission est réussie si ton impact grandit.

[Voir nos services](/services/){.cta}
:::

{% sectionCollection  %}
{% sectionHeader  %}
## Des projets, pas des promesses
{% endsectionHeader %}
{% collection collection="portfolio", filters=[{"by":"tag","value":["featured"]},{"value":3,"by":"first"}], sortCriterias=[], type="grid-fluid", columns=3, itemPartial="featured-work" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection class="breathe" %}

{% collection collection="reviews", filters=[{"by":"name","value":["guido"]}], sortCriterias=[], type="flow", itemPartial="review-card", class="items-center" %}{% endcollection %}

{% endsectionCollection %}

{% sectionTwoColumns class="palette-mocha bleed-bg" %}

{% twoColumns type="switcher" %}
{% twoColumnsItem  %}
## Deux personnes. Un studio.

Tess crée des identités visuelles qui ressemblent à ceux qui les portent. Marc construit des sites performants, sobres et éthiques avec ses propres outils. Ensemble, on couvre tout le spectre — de l'idée à la mise en ligne.

Depuis 2015, on aide les projets à impact à grandir et à se faire entendre.

[En savoir plus sur mookaï](/organizations/mookai/){.cta}
{% endtwoColumnsItem %}
{% twoColumnsItem class="container" %}
{% image src="/_images/dscf0062.webp", class="aside-mb-pull radius-card" %}
{% endtwoColumnsItem %}
{% endtwoColumns %}

{% endsectionTwoColumns %}

:::: section {.palette-purple .bleed-bg .pbe-0}

## poko — notre arme secrète (qu'on partage volontiers)

Nos sites sont construits avec [poko](https://www.poko.eco/), un website builder indépendant développé par Marc. Léger et pensé pour l'éco-conception, il est conçu pour que tu sois autonome — pas dépendant de nous ou d'un SaaS américain.

C'est notre conviction mise en pratique.

{% htmlPartial "poko-logo-cc.njk", style="isolation:isolate;" %}

::: div {.full-bleed .banner .mbs-[-2rem]}
{% image src="/_images/dscf0345.webp" %}
:::

::::


::: section {.text-center}

## Un projet? Une question?

On répond vite et sans bullshit

[Dis-nous ce que tu prépares](/contact/){.cta}
:::
