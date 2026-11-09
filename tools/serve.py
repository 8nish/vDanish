"""Local preview server for the vDanish site.

Serves the site like GitHub Pages does, so clean URLs work locally:
/about -> about.html, /posts/<slug> -> posts/<slug>.html

Run from the site folder:
    python tools/serve.py          (http://localhost:8765)
    python tools/serve.py 9000     (pick another port)
"""
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        local = super().translate_path(path)
        if not os.path.exists(local) and os.path.exists(local + ".html"):
            return local + ".html"
        return local


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), CleanUrlHandler) as server:
        print(f"Serving {ROOT} at http://localhost:{port}")
        server.serve_forever()
