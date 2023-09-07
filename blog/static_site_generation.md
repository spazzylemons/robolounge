---
title: adventures in static site generation
date: 2023-03-12
---

So I wanted to add better mobile support to my webpage. When viewing the site on
a mobile phone, everything was all shrunken down and you needed to zoom in and
it still didn't look good. So I looked up how to make my site look better on
mobile browsers. All I needed to do was to add a `<meta>` tag to my site. Easy.

But I'd need to do this for _every_ page. Not bad, for how small my site is so
far, but not ideal. But then that same thought came to mind that comes to any
programmer when tasked with this kind of problem: _I can automate this._

<figure>
  <img src="automation.png" alt="xkcd 1319" />
  <figcaption>
    <a href="https://xkcd.com/1319/">Source here</a>. If you somehow don't know what xkcd is, you're one of today's <a href="https://xkcd.com/1053/">lucky 10,000</a>.
  </figcaption>
</figure>

I looked at my options. I first considered Pelican, which is a static site
generator for blogs. It was really easy to get a full website generated, but it
felt like overkill. It generated pages for authors, categories, and more, and I
didn't need to write a line of code! But I already had a website with HTML and
CSS that I didn't want to throw out, and I also wanted more control. (Perhaps
another reason I wanted to write my own solution was because I just didn't feel
satisfied with how easy it was, lol)

Then I remembered a tool for webpage generation that's easy to use:
[Jinja](https://palletsprojects.com/p/jinja/). Jinja lets you build HTML pages
from a template, sorta like PHP. You can insert variables into your page and
Jinja will properly escape characters so that the page is correct. And since
it's for Python, I can use all of the other features of the Python ecosystem to
my advantage.

```html
<head>
  <!-- with Jinja, I can create a placeholder in HTML -->
  <title>{{ my_title }}</title>
</head>
```

```py
# and render it from Python
print(template.render(my_title="Hello world"))
```

In order to build webpages, I set up a few template files. One is for all
webpages and includes the header and footer. The rest extend this template, with
one for simple pages, one for blog posts that adds structure for a blog post,
and one for listing all available blog posts.

Web pages and blog posts are constructed using Markdown. Markdown can be
converted to HTML by simply calling the `markdown` function in the `markdown`
Python package, and then I can inject the HTML into my web page template - but
not without marking the injection as "safe" so Jinja doesn't escape all of the
HTML.

There's a bit more data that needs to be contained in each page, so for
that, I use YAML frontmatter, which is adding a YAML document at the top of a
text file, surrounded by `---`. With this, I can add information to my pages
that can be injected into the templates. For most pages, the only information I
include is "breadcrumbs", which are placed into the web page title so the title
tells you what's on the page and how you got there. For blog posts, this
includes the title of the post and the date of publishing, which is used in
formatting pages and creating an RSS feed.

```md
---
metadata: goes here
---

Page content goes _here_!
```

The Python script I wrote will copy all files from a `base` directory to an
`out` directory, except for Markdown files, which will be processed by Markdown
and wrapped in the website template. The blog posts are in a separate directory,
and are each converted into HTML, stored in the proper folder, and then a blog
list page is generated, as well as an RSS feed. I also wrote a Makefile, so I
can run `make test` to spin up a local HTTP server to preview the site, and I
can run `make upload` to upload the site.

The system isn't perfect, and there were some difficulties getting it all to
work. For one, my RSS feed generator was incorrectly placing `<item>` tags
outside of the `<channel>` tag, so none of the posts showed up! A reread of the
RSS spec, as well as peeking at a friend's feed, led me to find the problem and
fix it. I even discovered an RSS validator and followed its suggestions to
hopefully make my feed even better for more readers - you can check that out on
the bottom of the page (click the Valid RSS button). Additionally, any assets I
need to embed with a blog post are stored in the `base` directory, instead of
with the blog posts. This works fine enough for now, but I may refine this in
the future.

The source for this blog is [here](https://github.com/spazzylemons/robolounge),
so you can see how it's set up and maybe be inspired to build your own website
in a similar way. Until next time!
