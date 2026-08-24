---
translationKey: index
order: 1
lang: fr
createdAt: 2026-08-24T12:40:00.000Z
ldType: WebPage
name: Accueil
pageLayout: homepage
---

{% component "headless/page-nav.11ty.js", { class: "py-body" } %}

{% htmlPartial "homepage-hero.njk" %}

# Studio créatif engagé

::: section

## Ce qu'on fait

Du logo au site web, en passant par l'illustration et la mise en page, on construit les outils visuels et digitaux qui donnent à ton projet la visibilité qu'il mérite.

Notre vision de la collaboration : on avance ensemble et on t'explique ce qu'on fait avec transparence. Notre mission est accomplie si ton projet gagne en impact.

[Voir nos services](/services/){.cta}
:::

{% sectionCollection  %}
{% sectionHeader  %}
## Des projets concrets
{% endsectionHeader %}
{% collection collection="portfolio", filters=[{"by":"tag","value":["featured"]},{"value":3,"by":"first"}], sortCriterias=[], type="grid-fluid", columns=3, itemPartial="featured-work" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection class="breathe" %}

{% collection collection="reviews", filters=[{"by":"name","value":["guido"]}], sortCriterias=[], type="flow", class="items-center", itemPartial="review-card" %}{% endcollection %}

{% endsectionCollection %}

{% sectionTwoColumns class="palette-mocha bleed-bg" %}

{% twoColumns type="switcher" %}
{% twoColumnsItem  %}
## Deux personnes. Un studio.

Tess crée une identité visuelle qui te ressemble. Marc te construit un site web performant, sobre et éthique avec ses propres outils. A deux, on couvre tout le processus de création de l'identité digitale de ton projet. De ton idée à sa mise en ligne, tu peux compter sur nous pour t'accompagner.

Depuis 2015, on aide les projets à impact à grandir et à se faire entendre.

[En savoir plus sur mookaï](/organizations/mookai/){.cta}
{% endtwoColumnsItem %}
{% twoColumnsItem class="container" %}
{% image src="/_images/dscf0062.webp", class="aside-mb-pull radius-card" %}
{% endtwoColumnsItem %}
{% endtwoColumns %}

{% endsectionTwoColumns %}

:::: section {.palette-purple .bleed-bg .pbe-0}

## poko, notre ingrédient secret (qu'on partage volontiers)

Nos sites sont construits avec [poko](https://www.poko.eco/), un constructeur de site web indépendant développé par Marc. Léger et pensé pour l'éco-conception, poko est fait pour que tu sois autonome et que tu ne dépendes pas de nous ou d'une plateforme américaine.

C'est l'incarnation de nos valeurs sous la forme d'un website builder.

{% htmlPartial "poko-logo-cc.njk" %}

::: div {.full-bleed .banner .mbs-[-2rem]}
{% image src="/_images/dscf0345.webp" %}
:::

::::

::: section {.text-center}

## Un projet? Une question?

On répond vite et sans bullshit

[Parle-nous de ton projet](/contact/){.cta}
:::
