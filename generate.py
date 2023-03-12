import frontmatter
import os

from datetime import datetime
from email.utils import format_datetime
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markdown import markdown
from pathlib import Path
from shutil import rmtree
from typing import Any, Callable, Generic, Optional, TextIO, TypeVar, Union

import xml.etree.cElementTree as ET

OUT_DIR = Path('out')
BASE_DIR = Path('base')
BLOG_DIR = Path('blog')

BLOG_PATH = BLOG_DIR / 'blog.rss'

DOMAIN = 'https://robolounge.neocities.org/'

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
        self.date: datetime.datetime = post['date']
        self.content = markdown(post.content)

    def full_path(self) -> Path:
        return BLOG_DIR / str(self.date.year) / str(self.date.month) / str(self.date.day) / self.filename

    def url(self) -> str:
        return self.full_path().as_posix()

    def render(self) -> str:
        return blog_spec.render(self)

    def rss_item(self) -> ET.Element:
        item = ET.Element('item')
        link = full_url_from_path(self.full_path())
        ET.SubElement(item, 'title').text = self.title
        ET.SubElement(item, 'link').text = link
        ET.SubElement(item, 'guid').text = link
        ET.SubElement(item, 'pubDate').text = format_datetime(self.date)
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
    if ext == '.md':
        with open(path) as file:
            post = frontmatter.load(file)
        content = simple_spec.render(post)
        out_name = base + '.html'
    else:
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
    # post items
    for blog_post in blog_posts:
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
        'date': p.date.date().isoformat(),
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
        'content': markdown(p.content),
    },
)

clear_out_dir()
walk_base_dir()
make_rss_feed(create_blog_posts())
