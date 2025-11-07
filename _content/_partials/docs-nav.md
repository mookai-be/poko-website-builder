{% set docsNavPages = collections.all | filterCollection([{ by: 'lang', value:
lang }]) | eleventyNavigation("Docs") %}

{% if docsNavPages | length %}

<!-- Docs navigation -->
<p class="sidebar-title"><a href="{{ "docs" | link }}" {% if page.url == "/docs/" %}aria-current="page"{% endif %}>Docs Overview</a></p>

<ul role="list" class="docs-nav-list">
    {% for link in docsNavPages %}
    <li>
    {# prettier-ignore #}
    <a
        href="{{link.url}}"
        hreflang="{{link.lang}}"
        {% if link.url == page.url %}aria-current="page"{% endif %}
        >{{link.title}}</a
    >
    </li>
    {% endfor %}
</ul>
{% endif %}
