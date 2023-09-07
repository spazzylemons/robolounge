---
title: toot 3d
date: 2023-03-28
---

I'm writing this mostly so that I can move on from the project, because I really
don't have much motivation to work on it.

I saw a [post](https://catcatnya.com/@Kurt/109995605276525653) about the
possibility of a Mastodon client for the 3DS, and I figured I would give it a
try, since I have the knowledge to do it. However, what I don't have is the
motivation. It takes a lot of effort to build something like this for a system
with little to no libraries that you need, and I would rather spend my efforts
on something more practical. The source code is available, for those who want to
look at it and adapt it.

One of the largest challenges of getting it to work was networking. I chose to
use Rust, which was probably a good idea, because its large crate ecosystem made
it easy to find libraries to implement what I need. However, most networking and
async I/O libraries are designed only for major operating systems (reasonably!),
so after much frustration with networking crates, I decided to use networking
libraries provided by the devKitPro package repositories, as they are built for
the 3DS.

At first, I tried to use mbedTLS, and then use Rust crates for HTTP parsing, but
it would not work. I then switched to using cURL. The API is very aptly named,
curl_easy _is_ very easy to use! I couldn't use the Rust cURL bindings because
they depend on some things that aren't implemented for the 3DS, but making my
own bindings wasn't much trouble.

Additionally, I needed to implement a graphical interface. I used citro2d, but
needed to implement text rendering myself, in order to implement word wrapping
in a way that let me know the height of the text blocks. I also separated the
graphics and logic threads, though there's not much advantage to that in the
current state of the application.

At the moment, you can't even send toots at the same time as viewing posts. I
could probably implement this, but I don't really feel like it.

Maybe someday I'll feel like adding to this application, or cleaning it up, but
for now, I'd rather work on other projects, but I don't want to drop this
project without writing something about it.

(also I didn't want to upload the theming changes to the site without another
blog post)

[Here's the source code if you're interested.](https://github.com/spazzylemons/toot-3d)
