# What we grow — hero images

Add **your own farm photos** here so the “What We Grow & Supply” section on the site uses originals instead of gallery placeholders.

## Filenames (current setup)

| File | Crop |
|------|------|
| `pomegranate.png` | Pomegranate |
| `dragon-fruit.png` | Dragon fruit |
| `watermelon.png` | Watermelon |
| `guava.png` | Guava |

Optional **`.webp`** versions with the same base name are used automatically when present (smaller files for faster loads).

You can switch to **`.jpg`** only by changing the `image` paths in `src/components/Products.jsx`.

## Tips

- **Aspect ratio:** wide landscape (about **3:2** or **16:9**) works best; the UI crops to `object-cover` with a fixed height.
- **Size:** roughly **1400–2000px** on the long edge is enough; compress for web (often **&lt; 400 KB** per image is a good target).
- **Alt text** is taken from the product title on the page for accessibility.

Until these files exist, the site automatically falls back to the older gallery images.
