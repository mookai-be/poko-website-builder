<nav class="docs-nav-sidebar flow">

  <details class="docs-nav-group" open>
    <summary class="docs-nav-section-title">Getting Started</summary>
    <ul role="list" class="docs-nav-list reset">
      <li><a href="#">Introduction &amp; setup</a></li>
      <li><a href="#">Global settings</a></li>
      <li><a href="#">Brand &amp; design config</a></li>
    </ul>
  </details>

  <details class="docs-nav-group">
    <summary class="docs-nav-section-title">Content</summary>
    <ul role="list" class="docs-nav-list reset">
      <li><a href="#">Content authoring</a></li>
      <li><a href="#">Media &amp; icons</a></li>
      <li><a href="#">Navigation &amp; links</a></li>
    </ul>
  </details>

  <details class="docs-nav-group">
    <summary class="docs-nav-section-title">Building Pages</summary>
    <ul role="list" class="docs-nav-list reset">
      <li><a href="#">Layout primitives</a></li>
      <li><a href="#">Section components</a></li>
      <li><a href="#">Design system &amp; utilities</a></li>
    </ul>
  </details>

  <details class="docs-nav-group">
    <summary class="docs-nav-section-title">Advanced</summary>
    <ul role="list" class="docs-nav-list reset">
      <li><a href="#">Partials</a></li>
      <li><a href="#">Assets (CSS &amp; JS)</a></li>
      <li><a href="#">Extending the CMS</a></li>
      <li><a href="#">htmlClasses.js</a></li>
    </ul>
  </details>

</nav>

{% css %}

.docs-nav-group {
  border-inline-start: 2px solid transparent;
  transition: border-color 0.15s;
  margin-inline: 0;
}

.docs-nav-group[open] {
  border-inline-start-color: var(--color-pop);
}

.docs-nav-section-title {
  text-transform: uppercase;
  color: var(--color-pop);
  display: flex;
  align-items: center;
  gap: 0.4em;
  padding-inline-start: var(--step--2);
}

.docs-nav-section-title::before {
  content: '';
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(-45deg);
  transition: transform 0.2s;
  flex-shrink: 0;
}

details[open] .docs-nav-section-title::before {
  transform: rotate(45deg);
}

.docs-nav-list {
  margin: 0;
  padding-block: var(--step--3);
  font-family: Calibri, sans-serif;
  display: flex;
  flex-direction: column;
  gap: var(--step--3);
}

.docs-nav-list a {
  text-decoration: none;
  font-size: var(--step--1);
  padding-inline-start: var(--step-0);
  border-inline-start: 2px solid transparent;
  display: block;
  color: var(--color-text);
}

.docs-nav-list a:hover,
.docs-nav-list a[aria-current="page"] {
  color: var(--color-pop);
  border-inline-start-color: var(--color-pop);
}
{% endcss %}
