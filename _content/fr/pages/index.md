---
translationKey: index
order: 1
name: Accueil
pageLayout: homepage
vars: {}
---

:::div {.flex .flex-col}

{% component "headless/page-nav.11ty.js" %}

{% htmlPartial "homepage-hero.njk" %}

:::

<div class="title-container">
<h1 class="bg-title">
Studio créatif engagé
</h1>
</div>

::: section

:::div {.bg-title-section}

## Ce qu'on fait

Du site web au logo, en passant par l'illustration et la mise en page — on construit les outils visuels et digitaux qui donnent à ton projet la visibilité qu'il mérite.

Pas de jargon, pas de sur-promesse. On travaille avec toi, pas pour toi. Notre mission est réussie si ton impact grandit.

[Voir nos services](/services/){.cta}
:::

{% sectionCollection  %}
{% sectionHeader  %}
## Des projets, pas des promesses
{% endsectionHeader %}
{% collection collection="creative-works", filters=[{"by":"tag","value":["featured"]}], sortCriterias=[], class="full-bleed", itemPartial="featured-work.njk" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection  %}

{% collection collection="reviews", filters=[{"by":"name","value":["guido"]}], sortCriterias=[], type="flow", itemPartial="review-card" %}{% endcollection %}

{% endsectionCollection %}

{% sectionTwoColumns class="palette-mocha bleed-bg" %}

{% twoColumns type="switcher" %}
{% twoColumnsItem  %}
## Deux personnes. Un studio.

Tess crée des identités visuelles qui ressemblent à ceux qui les portent. Marc construit des sites performants, sobres et éthiques avec ses propres outils. Ensemble, on couvre tout le spectre — de l'idée à la mise en ligne.

Depuis 2015, on aide les projets à impact à grandir et à se faire entendre.

[En savoir plus sur mookaï](/organizations/mookai/){.cta}
{% endtwoColumnsItem %}
{% twoColumnsItem class="item-two-columns-img-bleed" %}
{% image src="/_images/dscf0062.webp" %}
{% endtwoColumnsItem %}
{% endtwoColumns %}

{% endsectionTwoColumns %}

::: section {.palette-purple .bleed-bg}

## poko — notre arme secrète (qu'on partage volontiers)

Nos sites sont construits avec [poko](https://www.poko.eco/), un website builder indépendant développé par Marc. Léger et pensé pour l'éco-conception, il est conçu pour que tu sois autonome — pas dépendant de nous ou d'un SaaS américain.

C'est notre conviction mise en pratique.

{% htmlPartial "poko-logo-cc.njk" %}

:::

::: div {.full-bleed .banner}
{% image src="/_images/dscf0345.webp" %}
:::

:::section {.flow .text-center}

## Un projet? Une question?

On répond vite et sans bullshit.

[Dis-nous ce que tu prépares](/contact/){.cta}
:::
