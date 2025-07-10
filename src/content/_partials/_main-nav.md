{% set navPages = collections.all | filterCollection({ by: 'lang', value:
lang }) | eleventyNavigation %}

{% if navPages | length %}

<header>
    <nav>
    <!-- Main pages navigation -->
    {{ navPages | eleventyNavigationToHtml | safe }}

    <!-- Language navigation -->
    {% if page.url | locale_links | length %}
    <ul id="lang-nav">
        {% for link in page.url | locale_links %}
        <li>
        <a href="{{link.url}}" hreflang="{{link.lang}}"
            ><abbr lang="{{link.lang}}" title="{{link.label}}"
            >{{link.lang | upper}}</abbr
            ></a
        >
        </li>
        {% endfor %}
        <li>
        <a href="{{page.url}}" hreflang="{{page.lang}}" aria-current="page"
            ><abbr lang="{{page.lang}}" title="{{page.label}}"
            >{{page.lang | upper}}</abbr
            ></a
        >
        </li>
    </ul>
    {% endif %}
    </nav>

</header>
{% endif %}
