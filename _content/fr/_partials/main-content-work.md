<main id="main-content">
<div>
{% link url="portfolio" %}< Retour au Portfolio{% endlink %}
</div>
<div class="title-container">
  <h1 class="bg-title">
    Portfolio
  </h1>
</div>

:::div {.bg-title-section}

{% sectionTwoColumns %}
{% twoColumns type="fixedFluid", widthFixed="24rem", widthFluidMin="50%", gap="0", fixedSide="fixedRight" %}
{% twoColumnsItem class="flow" %}

{{ content | safe }}

{% if tags %}

<ul class="cluster reset v--gap-cluster:0.5em" role="list">
{% for tag in tags %}
{% if tag != "featured" %}
<li class="work-tag">{{ tag | replace("-", " ") }}</li>
{% endif %}
{% endfor %}
</ul>
{% endif %}

{% endtwoColumnsItem %}
{% twoColumnsItem %}

{% if firstPic %}

<div class="work-page-image">
{% image src=firstPic, alt=name %}
</div>
{% endif %}

{% endtwoColumnsItem %}
{% endtwoColumns %}

{% endsectionTwoColumns %}
:::

{% sectionGrid %}
{% grid columns="6", gap="0", widthColumnMin="200px" %}
{% for pic in pics %}
{% if pic %}
{% gridItem %}
{% image src=pic, aspectRatio="1" %}
{% endgridItem %}
{% endif %}
{% endfor %}
{% endgrid %}
{% endsectionGrid %}

</main>
