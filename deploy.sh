#!/bin/bash

# Build and zip
npm run build
cd build && zip -r ../build.zip * && cd ..

# FTP Upload via lftp
lftp -u goldbjds,man@Home6 server801.web-hosting.com <<EOF
cd public_html
put -O . build.zip
bye
EOF
