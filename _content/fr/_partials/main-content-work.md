<main id="main-content">
<div class="width-body">
{% link url="portfolio" %}< Retour au Portfolio{% endlink %}
</div>

Portfolio { .cover-title }

{% sectionTwoColumns %}
{% twoColumns type="fixedFluid", widthFixed="24rem", widthFluidMin="50%", fixedSide="fixedRight" %}
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
{% image src=firstPic, alt=name, width=510 %}
</div>
{% endif %}

{% endtwoColumnsItem %}
{% endtwoColumns %}

{% endsectionTwoColumns %}

{% sectionGrid  %}

{% grid type="faux-masonry", widthColumnMin="16rem", gap="0px" %}

{% for pic in pics %}
{% if pic %}
{% gridItem class="bg-white" %}
{% image src=pic, width=510 %}
{% endgridItem %}
{% endif %}
{% endfor %}

{% endgrid %}

{% endsectionGrid %}

</main>
