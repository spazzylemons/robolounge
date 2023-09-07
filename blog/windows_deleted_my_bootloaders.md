---
title: that time windows deleted all my bootloaders
date: 2023-09-07
---

A month ago I was in a rare session where I was actually using the Windows
partition on my laptop, when a slew of updates arrived. One of these was
[Windows 11, version 22H2](https://learn.microsoft.com/en-us/windows/release-health/status-windows-11-22h2).
Generally, Windows updates run smoothly for me, except for the times when they
complain about the small size of my EFI partition (I'll get to it someday). But
that was not the issue I faced.

The update ran as smooth as ever. However, upon trying to log in, I found myself
waiting quite a while. Impatient, I pressed CTRL+ALT+DEL to quickly enter my
desktop. I feel like this is what caused me all the trouble that ensues, but I
really have no idea. Once it looked like everything was all good, I returned to
Linux where I usually reside.

![The famous loss comic.](loss.jpg "This is the only thing I think about now when I see CTRL+ALT+DEL. I'm sorry.")

Later that day, I went back to Windows for some gaming, only to find that it
refused to authenticate me. Neither my PIN nor my fingerprint could be verified,
and I didn't remember my password since I use the Microsoft Authenticator app
now when I need to log in. I tried changing my password, but the old password
was still on my laptop so it was no use. I have no idea why this happened,
though my only suspicions are either that some TPM-related crap happened because
I had my laptop's motherboard recently replaced, or that me skipping the login
sequence earlier had aborted some critical initialization script. Either way, it
looked like I was locked out, and I was worried. _But it couldn't be that hard,
right?_

_This should be easy,_ I thought. _I'll just revert the update and everything
will be just fine._ I reboot a few times to open the recovery menu, and start
by trying to revert the latest quality update. No luck. I move on to the feature
update. Progress spinners start spinning. After some time, the update is
uninstalled. I power back on to find that -- "Your PC/Device needs to be
repaired"? That's what I've been trying to do!

A bit of internet searching leads me to understand that I no longer have any
bootloader, so what I was seeing was a BIOS error. This was a bit worrying to
hear, but it gave me a clear path to recovery. I tried using my trusty GRUB
rescue USB, which was able to detect the operating systems on my disk, but
couldn't boot them for whatever reason. At this point it was quite late, so I
had to put this aside until the next day.

I started with restoring the Linux bootloader since that's what I cared about
more, honestly. I flashed the Arch Linux install medium, only to find that I
couldn't mount my Linux partition because it's encrypted. I am so thankful that
I recently got an old Thinkpad from a friend that I happened to install Arch on,
because that way I was able to build a custom install medium with the necessary
package. Before building a custom install medium I tried installing packages
from within the unmodified install medium, to no avail. But once the build was
done (which took quite a bit longer than I thought it would), I was able to
chroot into my Linux install and simply re-register the bootloader with the
BIOS. One restart later and I was greeted with the welcoming face of
systemd-boot (sorry systemd haters, it just works).

For Windows, I had my dad build a Windows install USB on his computer while I
was busy fixing Linux. Once it was ready, my plan was to reinstall Windows
because I really felt like nothing could repair what I had done. Try as I might,
however, I could not get Windows to reinstall itself without wiping everything.
Any attempt to recover an existing installation assumed that the installation
was operable enough to at least log in. I figured there was a better way. And
there was, and much simpler too (and more obvious, in hindsight). The
all-knowing Microsoft Forums in their infinite wisdom suggested someone in my
situation to run `sfc /scannow` and `chkdsk`, et cetera, with the addition of
some `bcdedit` thing. The only way I could access the recovery command prompt
was through the install USB, so that wasn't a complete waste. I followed the
instructions, and honestly probably didn't _need_ to do the disk checks, but it
didn't hurt and did find some files to repair. Turns out that `bcdedit` is for
setting up the bootloader, and what I had just done was pretty much exactly what
I did on Linux -- I had registered the existing bootloader files in my EFI
partition with the BIOS. One more reboot and everything was back to normal.

![A parody of Microsoft Forums. Micropenis: Buy our shit! Daniel Norris posts: Good god christ my computer is smoking! Oh fuck it's lit on fire help someone call the fire department it's all over the house damnit fuck... Joe Biden, Microsoft MVP, Worker of 40 years, was born in MS HQ, replies: sfc /scannow chkdsk](sfc_scannow_chkdsk.jpg "Sometimes they're right.")

I suppose that the update rollback _did_ work, at least at the filesystem level,
since after repairing the bootloader I found my Windows system to be fully
functional and that the 22H2 update had been removed. After some hesitation, I
reinstalled the update and waited through the login process, and nothing has
broken since.

I have no clue as to why these events transpired. I don't know why the login
authentication system broke, nor why the update rollback wiped the bootloader
list in the BIOS. But it really puts into perspective the experience I've gained
from years of dealing with similar issues when working on Linux. If this
happened to me five years ago I'd probably consider the whole situation a wash
and wipe the drive clean. But through several Arch Linux installations, as well
as bootloader experimentation with GRUB and systemd-boot and rEFInd, I've gotten
familiar enough with the problem area that I was able to fix it swiftly, and
gotten comfortable enough that I didn't feel hopeless (okay, I may have felt a
_little_ hopeless in the moment, particularly concerning the fate of the Windows
partition). While Linux may be a massive investment of your time, there is some
ROI down the road.

Also, it sometimes helps to have a second computer to fix the first computer.

[I was livetooting this as it happened check out the thread here :3 kthxbai](https://furry.engineer/@nil/110846098174151518)
