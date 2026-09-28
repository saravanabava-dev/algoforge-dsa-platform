HERO PHOTO — HOW TO ADD A REAL STUDENT PHOTO
==============================================

The Landing page hero is set up to show a real photograph if one is present,
and automatically falls back to the illustrated SVG visual if it isn't.

To add a real photo:

1. Get a photo you have the rights to use — either licensed stock photography
   (e.g. purchased from Shutterstock/iStock/Unsplash+, or your college's own
   photography of a consenting student) or a photo your team owns the rights
   to. Do not scrape one from a search engine; that photo belongs to someone
   else and this product may be licensed commercially to colleges.

2. Save it as exactly:
       frontend/public/hero-student.jpg

3. Restart the dev server (or rebuild). No code changes needed — the Hero
   component checks for this file at runtime and switches to it automatically.

Recommended: a photo roughly 4:5 or square aspect ratio, well-lit, at least
800px on the short side, under ~500KB (compress with any JPEG optimizer so
the offline app stays fast to load in a lab).

If no file is present, the illustrated hero visual (laptop + code + floating
concept cards) is shown instead — the page never breaks either way.
