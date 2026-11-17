# Node.js 22 as in .nvmrc, on Debian 13 "trixie". The image brings git, npm and the user "node".
FROM mcr.microsoft.com/devcontainers/javascript-node:5.2.6-22-trixie

# Chromium runs the Karma unit tests without a window.
# Java runs the HL7 validator of the FHIR tools extension.
RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
  && apt-get install -y --no-install-recommends chromium openjdk-21-jre-headless \
  && rm -rf /var/lib/apt/lists/*

# Chromium's own sandbox needs rights that Docker does not give a container by default, so Chromium would stop with "No usable sandbox!".
# Debian's chromium starter reads extra flags from /etc/chromium.d. Karma only opens the test bundle of this project in this browser.
RUN echo 'export CHROMIUM_FLAGS="$CHROMIUM_FLAGS --no-sandbox"' > /etc/chromium.d/no-sandbox
