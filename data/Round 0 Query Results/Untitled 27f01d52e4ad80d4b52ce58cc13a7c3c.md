# Untitled

Authors: Dustin L. Arendt
Checked By: Alex, Henry
Description of layout algorithm: Pipeline approach. Crossings are minimimized by modelling the storyline as a directed acyclic graph where each event corresponds to a node. Then graphvis is used to minimize crossings (probably sugiyama-style). Wiggle count is minimized heuristically by modelling the problem as maximum independent set. Linear programming is used for minimizing whitespace.
Constraints / Assumptions: Equidistant interaction characters, Interaction grouping
Evaluation: None
Exclude?: No
Keep: Yes
Layout Method fully described in paper: Yes
Method Type: Exact - Linear Programming, Heuristic - maximum independent set wiggle count, Pipeline
Optimization Objectives: Compactness - limit whitespace, Crossings - pair crossings, Wiggles/Bends - wiggle count
Source: Graph Drawing and Network Visualization
Temporal Model: Discrete, Interaction duration, Non-persistent characters
Title: SVEN: An Alternative Storyline Framework for Dynamic Graph Visualization
URL: 10.1007/978-3-319-27261-0 48
Venue: Graph Drawing and Network Visualization
Visual/Structural features supported: Labels - characters
Year: 2015