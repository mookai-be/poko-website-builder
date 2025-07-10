<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="generator" content="{{ eleventy.generator }}" />
<meta name="generator" content="poko" />

{# JS detection #}

<script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>

{# Metadata #}
{% include "_metadata-default.md" ignore missing %}
{% include "_metadata.md" ignore missing %}

{# Alternate langs #}

<link rel="alternate" hreflang="{{lang}}" href="{{baseUrl}}{{page.url}}" />
{% for link in page.url | locale_links %}
<link
    rel="alternate"
    hreflang="{{link.lang}}"
    href="{{baseUrl}}{{link.url}}"
/>
{% endfor %}
{# TODO: Add when we can identify the default lang #}
{# <link rel="alternate" hreflang="x-default" href="{{page.url}}" /> #}

{# Favicons #} {# TODO: Generate favicons, manifest, etc #}

{# User HTML head injection #}

{% include "_html-head.md" ignore missing %}
{{ globalSettings.htmlHead | safe }}

{# User CSS head injection #}

<style>{{ globalSettings.cssHead | safe }}</style>

{# NOTE: E-mail obfuscation styles #}

<style>a[href^="mailto:"] b {display: none;}</style>
