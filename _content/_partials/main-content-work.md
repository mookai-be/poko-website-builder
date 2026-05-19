{%- set _folderImages = ("_images/" + page.fileSlug + "/*") | glob %}
{%- set _folderFirstImage = ("/" + (_folderImages | sort)[0]) if (_folderImages and _folderImages.length) else null %}
{%- set firstImage = pagePreview.image.src if (pagePreview and pagePreview.image) else (metadata.image.src if metadata.image else _folderFirstImage) %}

<main id="main-content">
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

    {%- if tags %}
        <ul class="cluster reset v--gap-cluster:0.5em" role="list">
            {%- for tag in tags %}
            {%- if tag != "featured" %}
            <li class="work-tag">{{ tag | replace("-", " ") }}</li>
            {%- endif %}
            {%- endfor %}
        </ul>
        {%- endif %}

{% endtwoColumnsItem %}
{% twoColumnsItem %}

{%- if firstImage %}
<div class="work-page-image">
    {% image src=firstImage, alt="{{ name }}" %}
</div>
{%- endif %}
{% endtwoColumnsItem %}
{% endtwoColumns %}

{% endsectionTwoColumns %}
:::

{% sectionGrid %}  
  {% grid columns="6", gap="0", widthColumnMin="200px" %}
    {%- for imgFile in _folderImages | sort %}
    {%- set imgSrc = "/" + imgFile %}
    {% gridItem %}
    {% image src=imgSrc, alt=name, aspectRatio="1" %}
    {% endgridItem %}
    {%- endfor %}
  {% endgrid %}
{% endsectionGrid %}
</main>
