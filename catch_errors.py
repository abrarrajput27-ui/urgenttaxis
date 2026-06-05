import http.server
import socketserver
import os
import threading
from playwright.sync_api import sync_playwright

PORT = 4173
DIRECTORY = "frontend/dist"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.type}: {msg.text}"))
    page.on("pageerror", lambda err: print(f"BROWSER PAGE ERROR: {err}"))
    
    page.goto("http://localhost:4173/")
    page.wait_for_timeout(3000)
    browser.close()
