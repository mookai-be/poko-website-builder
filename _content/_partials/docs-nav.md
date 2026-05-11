<nav class="docs-nav-sidebar flow">

  <p class="docs-nav-section-title h4">Getting Started</p>
  <ul role="list" class="docs-nav-list reset">
    <li><a href="#">Introduction &amp; setup</a></li>
    <li><a href="#">Global settings</a></li>
    <li><a href="#">Brand &amp; design config</a></li>
  </ul>

  <p class="docs-nav-section-title h4">Content</p>
  <ul role="list" class="docs-nav-list reset">
    <li><a href="#">Content authoring</a></li>
    <li><a href="#">Media &amp; icons</a></li>
    <li><a href="#">Navigation &amp; links</a></li>
  </ul>

  <p class="docs-nav-section-title h4">Building Pages</p>
  <ul role="list" class="docs-nav-list reset">
    <li><a href="#">Layout primitives</a></li>
    <li><a href="#">Section components</a></li>
    <li><a href="#">Design system &amp; utilities</a></li>
  </ul>

  <p class="docs-nav-section-title h4">Advanced</p>
  <ul role="list" class="docs-nav-list reset">
    <li><a href="#">Partials</a></li>
    <li><a href="#">Assets (CSS &amp; JS)</a></li>
    <li><a href="#">Extending the CMS</a></li>
    <li><a href="#">htmlClasses.js</a></li>
  </ul>

</nav>

{% css %}
p.docs-nav-section-title {
  text-transform: uppercase;
  color: var(--color-pop);
  margin-block-start: var(--step-2);
  margin-block-end: var(--step--3);
  margin-inline: 0;
}

p.docs-nav-section-title:first-child {
  margin-block-start: 0;
}

.docs-nav-list {
  margin: 0;
  font-family: Calibri, sans-serif;

}

.docs-nav-list a {
  text-decoration: none;
  font-size: var(--step--1);
  padding-inline-start: var(--step--2);
  border-inline-start: 2px solid transparent;
  display: block;
}

.docs-nav-list a:hover,
.docs-nav-list a[aria-current="page"] {
  color: var(--color-pop);
  border-inline-start-color: var(--color-pop);
}
{% endcss %}
