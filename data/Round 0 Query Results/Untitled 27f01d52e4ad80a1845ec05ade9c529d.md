# Untitled

Authors: Yuhua Liu, Hanfei Lin, Yitao Liang, Changbo Wang
Checked By: Alex, Henry
Description of layout algorithm: First characters are partitioned into cluster based on 1D multidimensional scaling. The characters then by default (if they are in no interaction), are within their cluster. Interactions are then assigned to the clusters based on how many characters of the interaction are in the cluster. Then the storyflow algorithm is used: barycenter-like crossing minimization. Longest common subsequence wiggle count minimization. 
Constraints / Assumptions: Equidistant interaction characters, Interaction grouping, Minimum character separation
Domain: Movement data - sport
Evaluation: None
Exclude?: No
Keep: Yes
Layout Method fully described in paper: Yes
Method Type: Heuristic - Longest Common Subsequence wiggle count minimization, Heuristic - MDS, Heuristic - Sugiyama-like ordering, Pipeline
Optimization Objectives: Crossings - pair crossings, Wiggles/Bends - wiggle count
Source: Snowballing
Special features: Clustering, Interactions
Temporal Model: Discrete, Non-persistent characters
Title: An application of optimization method for storyline based on cluster analysis
URL: https://doi.org/10.1145/3105971.3105986
Venue: VINCI '17: Proceedings of the 10th International Symposium on Visual Information Communication and Interaction
Visual/Structural features supported: Clustering, Labels - characters
Year: 2017