# The Story*line* So Far: A Survey on Storyline Visualization

**Sara Di Bartolomeo · Alexander Dobler · Velitchko Filipov · Martin Nöllenburg · Henry Ehlers**  
EuroVis 2026 · Nottingham, UK · *Computer Graphics Forum*

> Storyline visualizations model narratives as temporal networks, using x-monotone lines to represent entities and their interactions over time. This state-of-the-art report maps the current landscape of storyline visualization approaches, with a specific focus on visual structures, optimization objectives, and the layout algorithms that generate these.

---

## Live browser

[**velitchko.github.io/storyline-survey**](https://velitchko.github.io/storyline-survey/)

Browse all 53 curated papers with full annotations, multi-faceted filters (domain, method type, evaluation, temporal model, visual features), dark mode, and a detail drawer per paper.

---

## Repository layout

```
.
├── src/                  # React source (Vite)
├── public/
│   └── papers.json       # Paper data served at runtime — edit this to update the browser
├── data/
│   ├── data.csv          # Original full annotation spreadsheet
│   ├── papers.json       # Canonical source → copy to public/ before building
│   └── Round 0 Query Results/   # Raw literature search results
├── index.html
├── vite.config.js
├── package.json
└── .github/workflows/deploy.yml
```

## Updating the paper list

1. Edit `data/papers.json` directly (it's the authoritative source, structured for easy editing)
2. Copy it to `public/`: `cp data/papers.json public/papers.json`
3. Commit and push — GitHub Actions rebuilds and redeploys automatically

## Local development

```bash
npm install
npm run dev       # http://localhost:5173/storyline-survey/
```

## Cite this survey

```bibtex
@article{dibartolomeo2026storyline,
  title     = {The Story{\textit{line}} So Far: A Survey on Storyline Visualization},
  author    = {Di Bartolomeo, Sara and Dobler, Alexander and Filipov, Velitchko
               and N{\"{o}}llenburg, Martin and Ehlers, Henry},
  journal   = {Computer Graphics Forum},
  year      = {2026},
  publisher = {Wiley},
  note      = {Proc. EuroVis 2026, Nottingham, UK}
}
```

## Contact

Sara Di Bartolomeo — [sdb@ac.tuwien.ac.at](mailto:sdb@ac.tuwien.ac.at)
