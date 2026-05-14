---
translationKey: contact
order: 8
lang: fr
createdAt: 2026-04-27T19:44:00.000Z
name: Contact
eleventyNavigation:
  order: 4
---

# On discute?

Tu as un projet en tête, une question, ou juste envie de voir si le courant passe? On répond dans les 24-48h — sans bullshit, sans relance commerciale, et souvent avec un vrai conseil même si on n'est pas la bonne solution pour toi.

## Ce qu'on peut faire ensemble

Pas sûr de ce dont tu as besoin? Voilà comment ça démarre souvent:

- **Tu as un projet web à lancer** — un site vitrine, un outil sur mesure, une refonte complète. On en parle et on trouve la bonne taille pour ton budget et tes besoins.
- **Tu veux (re)faire ton identité visuelle** — logo, charte graphique, ou juste un coup de main pour que tes documents ressemblent à quelque chose.
- **Tu cherches un partenaire créatif** — agence, freelance, ou projet éthique qui cherche un duo design + tech pour collaborer.
- **Tu ne sais pas encore exactement ce dont tu as besoin** — c'est ok, c'est aussi un chouette point de départ. On démêle ça ensemble.

## Écris-nous

<form action="/api/contact" method="POST">
  <div>
    <label for="name">Ton nom</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div>
    <label for="email">Ton email</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div>
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

  <div>
    <label for="message">Ton message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>

<button type="submit">Envoyer</button>

</form>

{% collection collection="reviews", filters=[{"by":"name","value":["Marie-Laure"]}], sortCriterias=[], itemPartial="review-card" %}{% endcollection %}

## Autrement

Tu préfères l'email direct? Pas de souci: {{ env.email | emailLink }}

Tu es plutôt réseaux sociaux? On est là aussi: [Instagram](https://instagram.com/mookai) / [LinkedIn](https://linkedin.com/company/mookai) — (à vérifier/ajuster selon les vrais liens)

Et si tu cherches à rejoindre l'équipe ou proposer un partenariat, mentionne-le dans le formulaire ou l'email. On lit tout, vraiment.
