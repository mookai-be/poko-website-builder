import { NODE_ENV, CONTENT_DIR, PROD_URL, DISPLAY_URL } from "../../../../env.config.js";

const isDev = NODE_ENV === 'development';

class CmsConfig {
	data() {
		return {
            layout: false,
			permalink: "/admin/config.json",
		};
	}
	render(data) {
        const pageFields = [
            { name: "name", label: "Page Name", widget: "string", required: true},
            // { name: "path", label: "Page URL path", widget: "string", required: true, pattern: ['^(?![\s\/\-]*$)(?!\/)[a-z0-9\/\-]*[a-z0-9\-]$', "URL must contain only letters, numbers, dashes, and forward slashes (not starting or ending with a slash or dash), and at least one letter or number"], hint: "URL-friendly slug or path (may contain '/' and '-'). NOTE: The homepage must be called 'index'"},
            { name: "body", label: "Content", widget: "markdown", required: false },
            { name: "eleventyNavigation", label: "Main Navigation", widget: "object", summary: '{{fields.add}}: {{fields.title}}', fields: [
                { name: "add", label: "Add to main navigation", widget: "boolean", default: false },
                { name: "title", label: "Title", widget: "string", required: false },
                { name: "parent", label: "Parent Page", widget: "relation", collection: "pages", search_fields: ["name"], value_field: "name", display_fields: ["name"], required: false },
                { name: "order", label: "Order", widget: "number", default: 0, required: false }
            ]},
            { name: "metadata", label: "Metadata", widget: "object", fields: [
                { name: "title", label: "Title", widget: "string", required: false, hint: "Default: Page Name" },
                { name: "description", label: "Description", widget: "text", required: false, hint: "Default: Page Name" },
                { name: "image", label: "Image", widget: "image", required: false, hint: "The default image used for sharing preview", allow_multiple: false, media_library: { config: { max_file_size: 10000000 } } },
            ]},
        ]
        const pagesCollection = {
            name: "pages",
            label: "Pages",
            label_singular: "Page",
            description: "Pages of the website",
            folder: `${CONTENT_DIR}/pages`,
            extension: "mdoc",
            format: "yaml-frontmatter",
            create: true,
            identifier_field: "name",
            // slug: "{{name}}",
            summary: "{{name}} {{eleventyNavigation.add | ternary(' (nav ', '')}}{{eleventyNavigation.order}}{{eleventyNavigation.add | ternary(')', '')}}",
            sortable_fields: {
              fields: ["eleventyNavigation.parent", "name", "eleventyNavigation.add", "eleventyNavigation.order"],
              default: {
                field: "eleventyNavigation.order",
                direction: "ascending"
              }
            },
            view_filters: [
              {
                label: "Navigation",
                field: "eleventyNavigation.add",
                pattern: true
              }
            ],
            fields: pageFields
        };
        const articleFields = [
            { name: "name", label: "Article Name", widget: "string", required: true, hint: "Internal name that will be used to generate the URL" },
            { name: "body", label: "Content", widget: "markdown", required: false },
        ]
        const articlesCollection = {
            name: "articles",
            label: "Articles",
            label_singular: "Article",
            // description: "Articles of the website",
            folder: `${CONTENT_DIR}/articles`,
            extension: "mdoc",
            format: "yaml-frontmatter",
            create: true,
            identifier_field: "name",
            // slug: "{{name}}",
            summary: "{{name}}",
            sortable_fields: {
              fields: ["name"],
              default: {
                field: "name",
                direction: "ascending"
              }
            },
            fields: articleFields
        };

        const generalConfig = {
            backend: {
                name: "github",
                repo: "m4rrc0/poko-website-builder",
                branch: "main",
            },
            media_folder: `${CONTENT_DIR}/_images`,
            public_folder: "/_images",
            site_url: PROD_URL,
            display_url: DISPLAY_URL,
            // logo_url: "https://your-site.com/images/logo.svg",
            locale: "en",
            collections: [pagesCollection, articlesCollection]
        };

		return JSON.stringify(generalConfig, null, isDev ? 2 : 0);
	}
}

export default async function(eleventyConfig, pluginOptions) {
    eleventyConfig.versionCheck(">=3.0.0-alpha.1");
    
    eleventyConfig.addTemplate("admin/config.11ty.js", CmsConfig);
}

// Example Blog Collection
// fields: # The fields for each document
// - name: "blog" # Used in routes, e.g., /admin/collections/blog
// label: "Blog" # Used in the UI
// folder: "${CONTENT_DIR}/blog" # The path to the folder where the documents are stored
// create: true # Allow users to create new documents in this collection
// slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
// fields: # The fields for each document, usually in front matter
// - { label: "Layout", name: "layout", widget: "hidden", default: "blog" }
// - { label: "Title", name: "title", widget: "string", required: true }
// - { label: "Publish Date", name: "date", widget: "datetime", required: false }
// - { label: "Featured Image", name: "thumbnail", widget: "image", required: false }
// - { label: "Rating (scale of 1-5)", name: "rating", widget: "number", required: false }
// - { label: "Body", name: "body", widget: "markdown", required: false }