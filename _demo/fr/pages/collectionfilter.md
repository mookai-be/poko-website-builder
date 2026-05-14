---
translationKey: collectionfilter
lang: fr
createdAt: 2026-04-30T10:35:00.000Z
uuid: 0e3d5e092b39
localizationKey: 3e69dbe9b7da
name: collectionFilter
eleventyNavigation: null
metadata: null
preview: null
tags: []
status: ''
pageLayout: ''
pageFooter: ''
pageNav: ''
generatePage: ''
vars: {}
dataList: []
---

{% sectionCollection  %}

{% collection collection="articles", filters=[{"by":"tag","value":["graphisme"]},{"by":"tag","value":["featured"]}], exclusions=true, sortCriterias=[] %}{% endcollection %}

{% endsectionCollection %}
