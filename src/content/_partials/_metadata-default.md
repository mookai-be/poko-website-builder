{# TODO: Improve metadata #}

<title>{{ metadata.title }}</title>
<meta property="og:title" content="{{ metadata.title }}" />

{% if metadata.description %}

<meta name="description" content="{{ metadata.description }}" />
<meta property="og:description" content="{{ metadata.description }}" />
{% endif %}
{% if metadata.image %}
<meta name="image" content="{{ metadata.image | ogImage }}" />
<meta property="og:image" content="{{ metadata.image | ogImage }}" />
<meta property="og:image:url" content="{{ metadata.image | ogImage }}" />
<meta property="twitter:image" content="{{ metadata.image | ogImage }}" />
{% endif %}
