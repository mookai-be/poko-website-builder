---
translationKey: index
lang: en
createdAt: 2025-09-30T20:01:00.000Z
uuid: b59c6173211c
localizationKey: 8c143928dd34
pageLayout: homepage
name: The Liberating Website Builder
eleventyNavigation:
  title: Home
  order: 1
metadata:
  description: poko is a lightweight, eco-focused, powerful, hackable website builder for the people
  image:
    src: /_images/device-set_v01_mockup-poko.webp
---
{% section type="cover", vars={"minHeight":"","noPadding":false,"gap":""}, blocks=[{"value":"# [poko]{style=color:var(--pink)} is a lightweight, eco-focused, powerful, hackable website builder for the people {.centered .h0}\n\n{{ \"get-started\" | link(undefined,\"html\") | safe }} {{ \"commitment\" | link(undefined,\"html\") | safe }} {{ \"docs\" | link(undefined,\"html\") | safe }} {.cluster style=--justify-cluster:center}\n\n<a href=\"#why-poko\" class=\"scroll pile\"></a>","type":"markdown"}], advanced={} %}

## Why poko?

Most website builders lock you into expensive subscriptions and proprietary systems. We want to build something different.

### Free & independent {.h4}

Host your site for free on modern static platforms. No subscriptions, no vendor lock-in. Your only recurring cost? Your domain name (\~15€/year).

### Planet-friendly by default {.h4}

Your site emits \~90% less CO² than typical WordPress or Wix sites. Lightweight code means faster loading, smoother performance, better SEO and a lighter footprint.

### Ridiculously simple {.h4}

No database. No plugins. Your content lives in readable files you control. Updates are optional. Maintenance is optional. Everything just works.

### Secure & future-proof {.h4}

Static sites can't execute malicious code—hackers have no way in. No security updates needed. Set it up once, and it stays secure.

{{ "get-started" | link(undefined,"html") | safe }}

## How it works

**1. Set up your project**  
Clone the starter template, install dependencies, and configure your site. Takes about 15 minutes.

**2. Edit with the CMS**  
Use the no-code interface to manage your content. Or dig into the code if you want—nothing is hidden.

**3. Deploy and go live**  
Push to GitHub, connect to free hosting, and your site goes live. Updates deploy automatically.

{{ "get-started" | link(undefined,"html") | safe }}

{% css %}
main {
padding-block-start: 0;
}
.scroll {
--_proportions: var(--step-2);
inline-size: var(--_proportions);
block-size: var(--_proportions);
margin-inline: auto;
border: 2px solid var(--white);
border-radius: 50%;
animation: down 1.5s infinite;
align-items: center;
justify-items: center;
&::before {
content: '';
width: calc(var(--_proportions) / 4);
height: calc(var(--_proportions) / 4);
border-left: 2px solid var(--white);
border-bottom: 2px solid var(--white);
transform: rotate(-45deg);
margin-top: calc(var(--_proportions) \* -0.05);
}
}

@keyframes down {
0% {transform: translate(0);}
20% {transform: translateY(calc(var(--_proportions) / 4));}
40% {transform: translate(0);}
}

{% endcss %}
