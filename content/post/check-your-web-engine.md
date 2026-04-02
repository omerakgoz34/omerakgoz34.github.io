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
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const isWebKit = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  const isSafari = window.navigator.vendor === "Apple Computer, Inc." && 
                 window.navigator.userAgent.indexOf("CriOS") === -1 && 
                 window.navigator.userAgent.indexOf("FxiOS") === -1;
  const isBlink = (!!window.chrome || !!window.opr) && !!window.CSS;

  if (isFirefox) return "GECKO (Firefox / Firefox-based)";
  if (isWebKit) return "WEBKIT (Safari / Apple)";
  if (isSafari) return "WEBKIT (Safari / Apple)";
  if (isBlink) return "BLINK (Chrome / Chromium-based)";
  return "OTHER (Unknown)";
};

const msg = "You are using: " + getEngine();
console.log(msg);

const element = document.querySelector("main");
element.innerHTML = msg
</script>