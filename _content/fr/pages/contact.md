---
translationKey: contact
order: 8
lang: fr
createdAt: 2026-04-27T19:44:00.000Z
ldType: WebPage
name: Contact
eleventyNavigation:
  add: Nav
  order: 4
bodyClass: palette-mocha palette--tone-contrast
---

# Contact

::: section

## Discutons de ton projet

Tu as un projet en tête, une question, ou juste envie de voir si le courant passe? On répond rapidement, sans bullshit et souvent avec un vrai conseil. Si on n'est pas la bonne solution pour toi, on te le dit directement.

## Ce qu'on peut faire ensemble

Voici comment ça démarre souvent:

- **Tu as un projet web à lancer** : un site vitrine, un outil sur mesure, une refonte complète. On en parle et on trouve la formule qui convient à ton budget et à tes besoins.
- **Tu veux (re)faire ton identité visuelle** : logo, charte graphique, ou juste un coup de main pour que tes documents aient une belle mise en page pour encore mieux mettre ton travail en valeur.
- **Tu cherches un partenaire créatif** : tu es une agence, un freelance, ou porteur d'un projet éthique et tu cherches un duo design + tech pour collaborer sur des projets.
- **Tu ne sais pas encore exactement ce dont tu as besoin** : c'est ok, c'est aussi un chouette point de départ. On démêle ça ensemble.
:::

::: div {.full-bleed .banner}
{% image src="/_images/dscf0325.webp" %}
:::

{% sectionCollection  %}

{% collection collection="reviews", filters=[{"by":"name","value":["Marie-Laure"]},{"value":1,"by":"first"}], sortCriterias=[], type="flow", class="items-center", itemPartial="review-card" %}{% endcollection %}

{% endsectionCollection %}

::: section {.palette-purple .bleed-bg .pb-[var(--step-9)]}

## Écris-nous

{% htmlPartial "contact-form.njk" %}

:::

{% sectionTwoColumns  %}

{% twoColumns type="switcher" %}
{% twoColumnsItem  %}
## Si tu n'aimes pas les formulaires

Tu préfères l'e-mail direct? Pas de souci: {{ env.email | emailLink }}

Tu es plutôt réseaux sociaux? On est là aussi:
{% link url="https://www.linkedin.com/company/109812644/", type="external", rel="self" %}LinkedIn{% endlink %} / {% link url="https://www.instagram.com/mookai.be/", type="external", rel="self" %}Instagram{% endlink %} / {% link url="https://www.facebook.com/profile.php?id=61560323541142", type="external", rel="self" %}Facebook{% endlink %}

Et si tu cherches à rejoindre l'équipe ou proposer un partenariat, mentionne-le dans le formulaire ou l'e-mail. On lit tout!
{% endtwoColumnsItem %}
{% twoColumnsItem class="container" %}
{% image src="/_images/dscf0434-2.webp", class="aside-mb-pull radius-card" %}
{% endtwoColumnsItem %}
{% endtwoColumns %}

{% endsectionTwoColumns %}
