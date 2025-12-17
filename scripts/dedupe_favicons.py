import glob
import os
import re

patterns = ['apple-touch-icon', 'favicon-32x32', 'favicon-16x16', 'site.webmanifest']

html_files = glob.glob('**/*.html', recursive=True)
for path in html_files:
    # skip sitemap.xml or sitemap.html if it appears to be XML
    if os.path.basename(path).lower() == 'sitemap.html':
        continue
    try:
        with open(path, 'r', encoding='utf-8') as f:
            s = f.read()
    except Exception as e:
        print('skip', path, e)
        continue

    m = re.search(r'(<head[^>]*>)(.*?)(</head>)', s, flags=re.S | re.I)
    if not m:
        continue
    head_open, head_content, head_close = m.groups()
    lines = head_content.splitlines()

    kept = []
    seen = set()
    i = 0
    changed = False
    while i < len(lines):
        line = lines[i]
        lower = line.lower()
        matched = None
        for p in patterns:
            if p in lower:
                matched = p
                break
        if matched:
            if matched in seen:
                changed = True
                i += 1
                continue
            else:
                seen.add(matched)
                kept.append(line)
                i += 1
                continue

        # Handle <style>...</style> blocks (detect empty ones)
        if '<style' in lower:
            j = i
            block = [lines[j]]
            j += 1
            while j < len(lines):
                block.append(lines[j])
                if '</style>' in lines[j].lower():
                    break
                j += 1
            inner = '\n'.join(block[1:-1]).strip()
            if inner == '':
                key = '__empty_style__'
                if key in seen:
                    changed = True
                    i = j + 1
                    continue
                else:
                    seen.add(key)
                    kept.extend(block)
                    i = j + 1
                    continue
            else:
                kept.extend(block)
                i = j + 1
                continue

        kept.append(line)
        i += 1

    new_head = head_open + ('\n'.join(kept) + '\n' if kept and not ''.join(kept).endswith('\n') else ''.join(kept)) + head_close
    new_s = s[:m.start()] + new_head + s[m.end():]
    if new_s != s:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_s)
        print('Updated', path)

print('Done')
