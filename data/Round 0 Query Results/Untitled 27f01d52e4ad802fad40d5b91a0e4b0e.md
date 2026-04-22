# Untitled

Authors: Emilio Di Giacomo , Walter Didimo , Giuseppe Liotta , Fabrizio Montecchiani , and Alessandra Tappini
Checked By: Alex, Henry
Description of layout algorithm: Entities are not a single path but a tree because they can
participate in multiple groups at a single point in time. The
trees are computed heuristically. Then the SAT approach of van Dijk et al. for
minimizing block crossings is applied. Then local search
is applied to further reduce crossings. Although wiggle and whitespace is also minimized, it is not described how.
Constraints / Assumptions: Allowing multiple memberships, Interaction grouping
Domain: Authorship network
Evaluation: Look at picture (paper says case study)
Exclude?: No
Keep: Yes
Layout Method fully described in paper: Yes
Method Type: Exact - SAT, Heuristic - local search, Heuristic - other
Optimization Objectives: Compactness - limit whitespace, Crossings - block crossings, Wiggles/Bends
Source: Graph Drawing and Network Visualization
Special features: Character tree
Temporal Model: Discrete, Interaction duration, Non-persistent characters
Title: Storyline Visualizations with Ubiquitous Actors
URL: https://doi.org/10.1007/978-3-030-68766-3_25
Venue: Graph Drawing and Network Visualization
Visual/Structural features supported: Character trees
Year: 2020