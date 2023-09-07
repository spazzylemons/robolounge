import frontmatter
import os
import re
import subprocess
import tempfile
import pytz

import datetime
from email.utils import format_datetime
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markdown import markdown, Extension, Markdown
from markdown.treeprocessors import Treeprocessor
from pathlib import Path
from shutil import rmtree
from typing import Any, Callable, Generic, Optional, TextIO, TypeVar, Union

import xml.etree.cElementTree as ET
import xml.etree.ElementTree as etree

OUT_DIR = Path('out')
BASE_DIR = Path('base')
BLOG_DIR = Path('blog')

BLOG_PATH = BLOG_DIR / 'blog.rss'

DOMAIN = 'https://robolounge.neocities.org/'

# Set this timezone for the timezone where you want your dates to align to.
# This will be used for generating the RSS pubDate values.
TIMEZONE_NAME = 'US/Eastern'
TIMEZONE = pytz.timezone(TIMEZONE_NAME)

# A basic tree processor that converts all standalone images with titles into
# figures with captions.
class FigCaptionTreeprocessor(Treeprocessor):
    def run(self, root: etree.Element):
        for p in root.findall('p'):
            if len(p) == 1:
                img = p.find('img')
                if img is not None and 'title' in img.keys():
                    # Create caption to store image title.
                    figcaption = etree.SubElement(p, 'figcaption')
                    figcaption.text = img.get('title')
                    # Remove title from image.
                    del img.attrib['title']
                    # Convert the paragraph into a figure.
                    p.tag = 'figure'

class FigCaptionExtension(Extension):
    def extendMarkdown(self, md: Markdown) -> None:
        md.registerExtension(self)
        md.treeprocessors.register(FigCaptionTreeprocessor(), 'figcaption', 10)

def markdown_format(content: str):
    return markdown(content, extensions=( FigCaptionExtension(), 'fenced_code', 'smarty' ))

def clear_out_dir():
    try:
        rmtree(OUT_DIR)
    except:
        pass
    os.mkdir(OUT_DIR)

def full_url_from_path(p: Path) -> str:
    """Creates full URL from path, including domain. Used for RSS links."""
    return DOMAIN + p.as_posix()

T = TypeVar('T')
class TemplateSpec(Generic[T]):
    def __init__(self, name: str, gen: Callable[[T], dict[str, Any]]):
        self.template = env.get_template(name)
        self.gen = gen

    def render(self, value: T) -> str:
        result = self.template.render(**self.gen(value))
        return result

class BlogPost:
    def __init__(self, file: TextIO, filename: str):
        post = frontmatter.load(file)
        self.title: str = post['title']
        self.filename = filename + '.html'
        self.date: datetime.date = post['date']
        self.content = markdown_format(post.content)

    def full_path(self) -> Path:
        return BLOG_DIR / str(self.date.year) / '{:02}'.format(self.date.month) / '{:02}'.format(self.date.day) / self.filename

    def url(self) -> str:
        return self.full_path().as_posix()

    def render(self) -> str:
        return blog_spec.render(self)

    def rss_item(self) -> ET.Element:
        # calculate datetime using the timezone at the given date
        pub_date = datetime.datetime.combine(self.date, datetime.time())
        pub_date = datetime.datetime.combine(self.date, datetime.time(), datetime.timezone(TIMEZONE.utcoffset(pub_date)))
        item = ET.Element('item')
        link = full_url_from_path(self.full_path())
        ET.SubElement(item, 'title').text = self.title
        ET.SubElement(item, 'link').text = link
        ET.SubElement(item, 'guid').text = link
        ET.SubElement(item, 'pubDate').text = format_datetime(pub_date)
        return item

def without_ext(filename: str) -> str:
    result, _ = os.path.splitext(filename)
    return result

def write_out(content: Union[str, bytes], path: Path):
    # make directories if needed
    os.makedirs(OUT_DIR / path.parent, exist_ok=True)
    # create file and write content
    with open(OUT_DIR / path, 'w' if isinstance(content, str) else 'wb') as f:
        f.write(content)

def handle_base_file(path: Path):
    filename = path.name
    base, ext = os.path.splitext(filename)
    match ext:
        case '.md':
            with open(path) as file:
                post = frontmatter.load(file)
            content = simple_spec.render(post)
            out_name = base + '.html'
        case '.scss' | '.sass':
            with tempfile.NamedTemporaryFile() as temp:
                process = subprocess.run(
                    # read file in, write output to temporary file
                    ('sass', '--no-source-map', str(path), temp.name),
                    # capture stdout
                    capture_output=True,
                )
                if process.returncode != 0:
                    print(process.stderr.decode())
                    raise RuntimeError('failed to run sass on {}'.format(path))
                content = temp.read()
            out_name = base + '.css'
        case _:
            with open(path, 'rb') as file:
                content = file.read()
            out_name = filename
    out_path = Path(*path.parent.parts[1:]) / out_name
    write_out(content, out_path)

def walk_base_dir():
    for path, _, filenames in os.walk(BASE_DIR):
        path = Path(path)
        for filename in filenames:
            handle_base_file(path / filename)

def create_blog_posts() -> list[BlogPost]:
    result = []
    for filename in os.listdir(BLOG_DIR):
        with open(BLOG_DIR / filename) as file:
            blog_post = BlogPost(file, without_ext(filename))
        result.append(blog_post)
        write_out(blog_post.render(), blog_post.full_path())
    result.sort(key=lambda p: p.date, reverse=True)
    write_out(blog_list_spec.render(result), BLOG_DIR / 'index.html')
    return result

def make_rss_feed(blog_posts: list[BlogPost]):
    # rss feed
    rss = ET.Element('rss', version='2.0', **{ 'xmlns:atom': 'http://www.w3.org/2005/Atom' })
    # channel information
    channel = ET.SubElement(rss, 'channel')
    ET.SubElement(channel, 'title').text = 'robolounge blog'
    ET.SubElement(channel, 'link').text = full_url_from_path(BLOG_DIR) + '/'
    ET.SubElement(channel, 'description').text = "nil's blog on the interwebs"
    ET.SubElement(channel, 'language').text = 'en-us'
    ET.SubElement(channel, 'atom:link', href=full_url_from_path(BLOG_PATH), rel='self', type='application/rss+xml')
    # post items - no more than 4
    for blog_post in blog_posts[:min(4, len(blog_posts))]:
        channel.append(blog_post.rss_item())
    # write to rss file
    tree = ET.ElementTree(rss)
    tree.write(OUT_DIR / BLOG_PATH, xml_declaration=True, encoding='UTF-8')

env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=select_autoescape()
)

blog_spec: TemplateSpec[BlogPost] = TemplateSpec(
    name='blog.html',
    gen=lambda p: {
        'title': p.title,
        'date': p.date.isoformat(),
        'content': p.content,
    },
)

blog_list_spec: TemplateSpec[list[BlogPost]] = TemplateSpec(
    name='blog_list.html',
    gen=lambda p: {
        'posts': p,
    },
)

simple_spec: TemplateSpec[frontmatter.Post] = TemplateSpec(
    name='simple.html',
    gen=lambda p: {
        'breadcrumbs': p['breadcrumbs'],
        'content': markdown_format(p.content),
    },
)

clear_out_dir()
walk_base_dir()
make_rss_feed(create_blog_posts())
