"""Build a same-origin Huiwen Mincho webfont for all current site text."""
from pathlib import Path
from urllib.request import urlopen
from fontTools.ttLib import TTFont
from fontTools import subset
import hashlib
import tempfile

ROOT = Path(__file__).resolve().parent.parent
SOURCE = 'https://raw.githubusercontent.com/bosswnx/huiwenmincho-improved/40b9dbb9bfa51bc4979b62d0dcd3bc064c5ea049/%E5%8C%AF%E6%96%87%E6%98%8E%E6%9C%9D%E9%AB%94.ttf'
SHA256 = '90bb5b835fd5841a46fa8fca4fe1c82aeb4b9c02be15eadc3effc60dad4fef58'
cache = Path(tempfile.gettempdir()) / ('museum-huiwen-' + SHA256 + '.ttf')
if not cache.exists() or hashlib.sha256(cache.read_bytes()).hexdigest() != SHA256:
    with urlopen(SOURCE, timeout=60) as response:
        data = response.read()
    if hashlib.sha256(data).hexdigest() != SHA256:
        raise RuntimeError('Huiwen Mincho source checksum mismatch')
    cache.write_bytes(data)
text = ''.join(chr(n) for n in range(32, 127))
for folder in ['src', 'content']:
    for path in (ROOT / folder).rglob('*'):
        if path.suffix in {'.md', '.mdx', '.tsx', '.ts'}:
            text += path.read_text(encoding='utf-8')
font = TTFont(cache, recalcTimestamp=False)
options = subset.Options()
options.flavor = 'woff'
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
font.flavor = 'woff'
out = ROOT / 'static/fonts/huiwen-mincho.woff'
out.parent.mkdir(parents=True, exist_ok=True)
font.save(out)
print(f'Huiwen Mincho ready: {out.stat().st_size // 1024} KB')
