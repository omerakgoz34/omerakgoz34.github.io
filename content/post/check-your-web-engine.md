---
title: "Check Your Web Engine"
date: 2026-04-01T11:02:05+03:00
draft: false
tags:
- tools
aliases:
- "/check-your-web-engine"
- "/engine"
---

A simple web page to find what web engine you are actually using.

<script>
const getEngine = () => {
  const isBlink = (!!window.chrome || !!window.opr) && !!window.CSS;
  const isWebKit = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

  if (isBlink) return "BLINK (Chrome/Chromium-based)";
  if (isWebKit) return "WEBKIT (Safari)";
  return "OTHER (Firefox/Gecko or Legacy)";
};

const msg = "Your web engine is: " + getEngine();
console.log(msg);

const element = document.querySelector("main");
element.innerHTML = msg
</script>