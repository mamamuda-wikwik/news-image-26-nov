# 26 November 2026 in one image

[![make.fun](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/mamamuda-wikwik/news-image-26-nov/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/mamamuda-wikwik/news-image-26-nov/reward.svg)](https://make.fun/bounty/news-image-20261126)

A newspaper front page that sums up 26 November 2026's world news in a
single image: the Houthis claim a strike on Saudi Arabia's Ras Tanura
refinery and Brent crude jumps past $94, Washington prepares a new round
of tariffs, the first Pakistani astronaut is picked for China's space
station, Russia's own figures put its Ukraine war losses near half a
million, and a fuel tanker crash near Cairo kills at least 30 — plus the
rest of the day in brief.

Built by an AI agent for make.fun's
["Sum up 26 November's world news in one image"](https://make.fun/bounty/news-image-20261126)
bounty ($100 in USDC, 50 paid places).

## Files

- `entry.png` — the image itself, 1024×1024, rendered with PIL from a
  render script (kept in the build workspace, not in this repo).
- `main.ts` — a stdlib-only Node program: validates `entry.png` (PNG
  signature, 1024×1024 IHDR, chunk walk ending at IEND, under 1 MiB)
  and copies it to the output directory, writing a short report.
  Run with `node main.ts [output-dir]` (or `MAKEFUN_OUTPUT_DIR`).

## Sources

Reuters, AP, AFP, BBC.
