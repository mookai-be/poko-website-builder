---
translationKey: services
order: 3
lang: fr
createdAt: 2026-04-27T19:42:00.000Z
ldType: WebPage
name: Services
eleventyNavigation:
  add: Nav
  order: 2
vars: {}
---

# Services

::: section

## Ce qu'on fait.{% br %}Et pourquoi on le fait comme ça.

On construit des outils qui durent, des identités qui tiennent la route et des relations qui valent le coup. Si ça te parle, voici plus d'informations sur les différents services qu'on propose.

:::

::: div {.full-bleed .banner}
{% image src="/_images/dscf9920-2.webp" %}
:::

{% sectionCollection class="switcher palette-mocha bleed-bg mt-0" %}
{% sectionHeader  %}
## Web

Nos sites sont construits avec [poko](https://www.poko.eco/), notre website builder indépendant. Concrètement, nos sites sont légers, rapides, éco-conçus par défaut, et entièrement à toi. Pas de dépendance à une plateforme américaine, pas de frais cachés, pas de mises à jour de sécurité à gérer. L'autonomie et la sobriété, approuvé par Dame Nature.
{% endsectionHeader %}
{% collection collection="services", filters=[{"by":"tag","value":["web"]}], sortCriterias=[], type="flow", class="palette--contrast-tone bleed-bg" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection class="switcher palette-bordeau bleed-bg" %}
{% sectionHeader class="palette--bg-tone bleed-bg" %}
## Graphisme

Un logo, une identité visuelle, c'est la première impression que les gens se font de ton projet. Une mise en page soignée, c'est ce qui donne envie de te lire. Tess combine approche intuitive et exigence graphique pour que chaque visuel te ressemble vraiment et serve tes objectifs sur le long terme.
{% endsectionHeader %}
{% collection collection="services", filters=[{"by":"tag","value":["print"]}], sortCriterias=[], type="flow" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection class="switcher palette-gold bleed-bg" %}
{% sectionHeader  %}
## Pour aller plus loin

Parfois, ce qu'il faut n'est pas un livrable mais un regard extérieur, un coup de main pour prendre du recul ou apprendre à gérer soi-même sa communication digitale. On te propose aussi notre expertise en tant que conseillers et formateurs.
{% endsectionHeader %}
{% collection collection="services", filters=[{"by":"tag","value":["support"]}], sortCriterias=[], type="flow", class=" palette--bg-pop bleed-bg" %}{% endcollection %}

{% endsectionCollection %}

{% sectionCollection class="switcher palette-purple palette--pop bleed-bg" %}
{% sectionHeader  %}
## Art

Tess est aussi artiste. Si les murs de ton bureau, ton cabinet ou ton espace de coworking méritent une âme, si tu as besoin de photos pour mettre en valeur ton équipe ou ton activité, elle peut s'en occuper.
{% endsectionHeader %}
{% collection collection="services", filters=[{"by":"tag","value":["art"]}], sortCriterias=[], type="flow", class="palette--contrast palette--bg-pop bleed-bg" %}{% endcollection %}

{% endsectionCollection %}

::: div {.full-bleed .banner}
{% image src="/_images/dscf9954.webp" %}
:::

::: section { .text-center }

## Tu ne sais pas par où commencer?

On en parle, on identifie ensemble ce qui a du sens pour toi et comment on peut t'aider à concrétiser ton projet.

[Parlons-en](/contact/){.cta}

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
