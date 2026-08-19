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

## On discute?

Tu as un projet en tête, une question, ou juste envie de voir si le courant passe? On répond rapidement — sans bullshit, sans relance commerciale, et souvent avec un vrai conseil même si on n'est pas la bonne solution pour toi.

## Ce qu'on peut faire ensemble

Pas sûr de ce dont tu as besoin? Voilà comment ça démarre souvent:

- **Tu as un projet web à lancer** — un site vitrine, un outil sur mesure, une refonte complète. On en parle et on trouve la bonne taille pour ton budget et tes besoins.
- **Tu veux (re)faire ton identité visuelle** — logo, charte graphique, ou juste un coup de main pour que tes documents ressemblent à quelque chose.
- **Tu cherches un partenaire créatif** — agence, freelance, ou projet éthique qui cherche un duo design + tech pour collaborer.
- **Tu ne sais pas encore exactement ce dont tu as besoin** — c'est ok, c'est aussi un chouette point de départ. On démêle ça ensemble.
:::

::: div {.full-bleed .banner}
{% image src="/_images/dscf0325.webp" %}
:::

{% sectionCollection  %}

{% collection collection="reviews", filters=[{"by":"name","value":["Marie-Laure"]},{"value":1,"by":"first"}], sortCriterias=[], type="flow", class="items-center", itemPartial="review-card" %}{% endcollection %}

{% endsectionCollection %}

::: section {.palette-purple .bleed-bg .pb-[var(--step-9)]}

## Écris-nous

<form action="/api/contact" method="POST" class="contact-form switcher">
  <div class="contact-form__left flow">
    <div class="contact-form__field flow">
      <label for="name">Ton nom</label>
      <input type="text" id="name" name="name" required placeholder="Prénom Nom">
    </div>
    <div class="contact-form__field flow">
      <label for="email">Ton email</label>
      <input type="email" id="email" name="email" required placeholder="email@exemple.be">
    </div>
    <div class="contact-form__field flow">
      <label for="subject">C'est à quel sujet?</label>
      <select id="subject" name="subject">
        <option value="">Choisir...</option>
        <option value="projet-web">Un projet web</option>
        <option value="identite-visuelle">Identité visuelle / logo</option>
        <option value="partenariat">Partenariat / collaboration</option>
        <option value="stage">Stage / rejoindre l'équipe</option>
        <option value="autre">Autre chose</option>
      </select>
    </div>
  </div>
  <div class="contact-form__right flow">
    <div class="contact-form__field flow">
      <label for="message">Ton message</label>
      <textarea id="message" name="message" required placeholder="Je rédige mon message..."></textarea>
    </div>
    <button type="submit" class="cta">Envoyer</button>
  </div>
</form>
:::

{% sectionTwoColumns  %}

{% twoColumns type="switcher" %}
{% twoColumnsItem  %}
## Autrement

Tu préfères l'email direct? Pas de souci: {{ env.email | emailLink }}

Tu es plutôt réseaux sociaux? On est là aussi: [Instagram](https://instagram.com/mookai) / [LinkedIn](https://linkedin.com/company/mookai)

Et si tu cherches à rejoindre l'équipe ou proposer un partenariat, mentionne-le dans le formulaire ou l'email. On lit tout, vraiment.
{% endtwoColumnsItem %}
{% twoColumnsItem class="container" %}
{% image src="/_images/dscf0434-2.webp", class="aside-mb-pull radius-card" %}
{% endtwoColumnsItem %}
{% endtwoColumns %}

{% endsectionTwoColumns %}

{% css %}

.contact-form__right {
  align-items: flex-end;
}

.contact-form__field {
  width: 100%;
}

.contact-form label {
  font-size: var(--step--1);
  opacity: 0.6;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  background: transparent;
  border: none;
  border-bottom: 1px solid currentColor;
  padding-inline: 0;
  color: inherit;
  width: 100%;
  outline: none;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: currentColor;
  opacity: 0.4;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  border-bottom-color: var(--color-pop);
}

.contact-form select {
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0 center;
  padding-right: var(--step-1);
}

.contact-form__right .contact-form__field {
  flex: 1;
}

.contact-form textarea {
  resize: none;
  flex: 1;
  min-block-size: 10rem;
}

@media (max-width: 40em) {
  .contact-form {
    grid-template-columns: 1fr;
  }
}
{% endcss %}
