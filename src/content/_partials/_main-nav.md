{% set navPages = collections.all | filterCollection([{ by: 'lang', value:
lang }, { by: 'parent', value: undefined }]) | eleventyNavigation %}

{% if navPages | length %}

<header>
    <nav>
    <!-- Main pages navigation -->
    {# {{ navPages | eleventyNavigationToHtml | safe }} #}
    <ul role="list" id="main-nav">
        {% for link in navPages %}
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

    <!-- Language navigation -->
    {% if page.url | locale_links | length %}
    <ul role="list" id="lang-nav">
        {% for link in page.url | locale_links("all") %}
        <li>
        <a
            href="{{link.url}}"
            hreflang="{{link.lang}}"
            aria-current="{{ 'page' if link.lang === page.lang else 'false' }}"
            ><abbr lang="{{link.lang}}" title="{{link.label}}"
            >{{link.lang | upper}}</abbr></a>
        </li>
        {% endfor %}
    </ul>
    {% endif %}
    </nav>

</header>
{% endif %}
