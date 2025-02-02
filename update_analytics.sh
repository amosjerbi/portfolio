#!/bin/bash

# GA4 code to insert
GA4_CODE='<!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-T22YJTJNH3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag("js", new Date());
        
        gtag("config", "G-T22YJTJNH3");
    </script>'

# Find all HTML files and update them
find . -name "*.html" -type f -exec sed -i '' -e '/<\/head>/i\
'"$GA4_CODE"'' {} \;
