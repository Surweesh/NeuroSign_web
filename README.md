# NeuroSign_web

Problem Statement
	 With mental health conditions like depression and ADHD on the rise, there is a pressing need for non-invasive, data-driven tools that can assist in early diagnosis and monitoring. Traditional methods for diagnosing these disorders often rely on subjective assessments and can take time to produce accurate results. The project aims to address these limitations by utilizing EEG data and ma

Novelty
Cluster-Based Approach: Unlike existing models, this solution clusters unlabelled EEG data for depression and ADHD risk without pre-labelled datasets.
Real-Time Validation: An iterative process optimizes clusters until a validation score of 0.75+ is achieved, ensuring high reliability. Post-clustering, a Random Forest algorithm is applied to predict new inputs' mental health states with high accuracy, chain learning to predict mental health conditions based on cognitive load patterns.

Key Features

•	EEG Signal Processing: Extraction of key signals from the frontal regions, crucial for identifying attention and emotional imbalances.

•	Unsupervised Learning: Clustering the data to separate the mental states (healthy vs. affected by depression/ADHD) without explicit labels.

•	Validation-Driven Clustering: Adjusts the clusters based on silhouette validation, ensuring the most accurate and meaningful groups.

•	Predictive Analytics: Uses a trained Random Forest model to predict the future likelihood of depression or ADHD from unseen EEG data.

