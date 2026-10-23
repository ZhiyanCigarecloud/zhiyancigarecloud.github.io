"""Render the museum's six-piece, single-play origami entrance animation.
Authoring tool only: requires Pillow; the exported GIF is committed for hosting.
"""
from pathlib import Path
from math import cos, sin, radians
from PIL import Image, ImageDraw

WIDTH, HEIGHT, SCALE = 640, 480, 2
PAPER = (243, 241, 233)
PURPLE = (111, 90, 168)
# Flat polygons follow the approved geometric Tyrannosaurus mark.
PIECES = [
    ([(65,750),(485,553),(499,711)], (-185,-55), -24, .05),
    ([(495,555),(724,648),(769,788),(597,925),(630,994),(811,1054),(541,1054),(501,920),(589,789),(524,727)], (-75,160), 23, .34),
    ([(503,541),(705,430),(825,525),(861,600),(773,752),(719,637)], (30,-160), -27, .21),
    ([(724,413),(767,276),(876,208),(815,306),(890,504),(865,578),(837,516)], (100,-145), 30, .53),
    ([(899,207),(1150,260),(1189,332),(1182,344),(981,372),(1152,451),(1119,491),(910,451),(835,317)], (185,-30), -19, .72),
    ([(875,602),(948,609),(972,655),(959,710),(926,636),(849,655)], (160,135), 38, .91),
]

def points_for_piece(points, offset, angle, start, t):
    progress = max(0., min(1., (t-start)/1.25))
    # Smooth arrival with zero speed at the final assembled position.
    ease = 1-(1-progress)**3
    remain = 1-ease
    pts = [((x-627)*.35+WIDTH/2, (y-631)*.35+HEIGHT/2) for x,y in points]
    cx,cy = [sum(p[i] for p in pts)/len(pts) for i in (0,1)]
    a = radians(angle*remain)
    return [((cx+(x-cx)*cos(a)-(y-cy)*sin(a)+offset[0]*remain)*SCALE,
             (cy+(x-cx)*sin(a)+(y-cy)*cos(a)+offset[1]*remain)*SCALE) for x,y in pts]

def frame(t):
    canvas=Image.new('RGB',(WIDTH*SCALE,HEIGHT*SCALE),PAPER)
    draw=ImageDraw.Draw(canvas)
    for points,offset,angle,start in PIECES:
        draw.polygon(points_for_piece(points,offset,angle,start,t),fill=PURPLE)
    return canvas.resize((WIDTH,HEIGHT),Image.Resampling.LANCZOS)

# A fixed palette avoids color flicker from independently quantized frames.
palette=Image.new('P',(1,1))
colors=[]
for i in range(32):
    ratio=i/31
    colors.extend(round(PAPER[j]+(PURPLE[j]-PAPER[j])*ratio) for j in range(3))
palette.putpalette(colors+[0]*(768-len(colors)))
frames=[frame(n*.05).quantize(palette=palette,dither=Image.Dither.NONE) for n in range(68)]
out=Path(__file__).resolve().parents[1]/'static/img/entrance-puzzle.gif'
frames[0].save(out,save_all=True,append_images=frames[1:],duration=50,optimize=True,disposal=1)
with Image.open(out) as gif:
    duration=sum((gif.seek(n) or gif.info['duration']) for n in range(gif.n_frames))
    assert duration==3400 and 'loop' not in gif.info
    print(f'{out}: {gif.n_frames} frames, {duration} ms, {out.stat().st_size} bytes; single play')
