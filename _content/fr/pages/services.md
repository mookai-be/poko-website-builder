---
translationKey: services
order: 3
lang: fr
createdAt: 2026-04-27T19:42:00.000Z
name: Services
vars: {}
eleventyNavigation:
  order: 2
---

# Services

::: section

:::div {.bg-title-section}

## Ce qu'on fait.{% br %}Et pourquoi on le fait comme ça.

On ne vend pas des livrables. On construit des outils qui durent, des identités qui tiennent la route et des relations qui valent le coup. Voilà ce qu'on propose — et pour qui c'est fait.

:::

::: div {.full-bleed .banner}
{% image src="/_images/dscf9920-2.webp" %}
:::

{% sectionCollection class="switcher palette-mocha bleed-bg mt-0" %}
{% sectionHeader  %}
## Web

Nos sites sont construits avec [poko](https://www.poko.eco/), notre website builder indépendant. Ça veut dire: légers, rapides, éco-conçus par défaut, et entièrement à toi. Pas de dépendance à un SaaS américain, pas de frais cachés, pas de mises à jour de sécurité à gérer. Juste un site qui fonctione.
{% endsectionHeader %}
{% collection collection="services", filters=[{"value":"web","by":"tag"}], sortCriterias=[], type="flow", class="palette--contrast-tone bleed-bg" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection class="switcher palette-bordeau bleed-bg" %}
{% sectionHeader class="palette--fg-neutral palette--bg-tone bleed-bg" %}
## Graphisme

Un logo, c'est le visage de ton projet. Une illustration, c'est sa personnalité. Une mise en page soignée, c'est ce qui donne envie de lire. Tess combine approche intuitive et exigence graphique pour que chaque visuel te ressemble vraiment — et serve tes objectifs sur le long terme.
{% endsectionHeader %}
{% collection collection="services", filters=[{"value":"print","by":"tag"}], sortCriterias=[], type="flow" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection class="switcher palette-gold bleed-bg" %}
{% sectionHeader  %}
## Pour aller plus loin

Parfois, ce qu'il faut n'est pas un livrable mais un regard extérieur, un coup de main pour prendre du recul ou apprendre à tenir les rênes. C'est là qu'on intervient différemment — en tant que partenaire, pas prestataire.
{% endsectionHeader %}
{% collection collection="services", filters=[{"by":"tag","value":["support"]}], sortCriterias=[], type="flow", class=" palette--bg-pop bleed-bg" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection class="switcher palette-purple palette--pop bleed-bg" %}
{% sectionHeader  %}
## Art

Tess est aussi artiste. Et si tes murs de bureau, ton cabinet ou ton espace de coworking méritent une âme, on peut s'en occuper.
{% endsectionHeader %}
{% collection collection="services", filters=[{"value":"art","by":"tag"}], sortCriterias=[], type="flow", class="palette--contrast palette--bg-pop bleed-bg" %}{% endcollection %}

{% endsectionCollection %}

::: div {.full-bleed .banner}
{% image src="/_images/dscf9954.webp" %}
:::

::: section { .text-center }

## Tu ne sais pas par où commencer?

On en parle, et on trouve ensemble ce qui a du sens pour toi.

[On est là](/contact/){.cta}

:::

{% css %}

.section-collection.switcher {
padding: 0;
gap: 0;
}
.section-collection.switcher header,
.section-collection.switcher .list-collection {
padding-inline: var(--step-1);
padding-block: var(--step-7);
}
.section-collection .list-collection{
margin-block: 0;
}
.section-collection .list-collection.bleed-bg {
--bleed-left: 0;
}
.section-collection header.bleed-bg {
--bleed-right: 0;
}

{% endcss %}
