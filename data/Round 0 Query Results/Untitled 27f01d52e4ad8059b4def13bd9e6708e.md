# Untitled

Authors: Makarand Tapaswi, Martin Bauml, Rainer Stiefelhagen
Checked By: Alex, Henry
Description of layout algorithm: A ccombined objective function of proximity, squared wiggle height, and
crossings is given. It computes coordinates. The crossing ob-
jective is abstracted into a heuristic one (pseudo-Huber loss)
that is differentiable. Then matlab fmincon is used to compute
a solution with small combined objective function.

Proximity models that characters an interactions are together. Separation models a minimum separation between characters.

Alough there is a quantitative study, this is on the scene detection from video and not on the storyline.
Domain: Video scene detection
Exclude?: No
Keep: Yes
Layout Method fully described in paper: Yes
Method Type: Heuristic - gradient descent, Heuristic - objective abstraction
Optimization Objectives: Crossings - pair crossings, Wiggles/Bends - quadratic wiggle height
Source: Snowballing
Temporal Model: Discrete, Non-persistent characters
Title: StoryGraphs: Visualizing Character Interactions as a Timeline
URL: https://www.cv-foundation.org/openaccess/content_cvpr_2014/html/Tapaswi_StoryGraphs_Visualizing_Character_2014_CVPR_paper.html
Venue: Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR) 2014
Visual/Structural features supported: Labels - characters, Other - encoding non-interacting characters
Year: 2014