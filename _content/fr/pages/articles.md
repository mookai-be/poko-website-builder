---
translationKey: articles
order: 7
lang: fr
createdAt: 2026-09-28T10:14:00.000Z
ldType: WebPage
name: Articles
sections:
  - type: sectionCollection
    layoutOptions:
      type: flow
    collection: articles
    sortAndFilterOptions:
      sortCriterias:
        - by: date
          direction: desc
      exclusions: false
eleventyNavigation:
  add: Nav
---

# Nos articles

{% sections %}{% endsections %}
