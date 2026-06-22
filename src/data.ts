/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  volumeAndPages?: string;
  doi: string;
  tags: string[];
  snippet: string;
  bibtex: string;
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  year: string;
  thesisTitle?: string;
  details: string;
}

export interface ResearchInterest {
  title: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface Course {
  title: string;
  code?: string;
  description: string;
  level: 'Core' | 'Advanced' | 'Interdisciplinary';
  topics: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  type: 'academic' | 'research' | 'fellowship';
  description: string;
  achievements: string[];
}

export const DR_AMIN_BIO = {
  name: "Dr. Morteza Amini",
  persianName: "دکتر مرتضی امینی",
  title: "Assistant Professor & Faculty Member",
  department: "Institute for Cognitive Science Studies (ICSS)",
  email: "amini_m@icss.ac.ir",
  location: "Tehran, Iran",
  summary: "An interdisciplinary scholar bridging the gap between Artificial Intelligence, Computational Neuroscience, and Psychological processes. His career is dedicated to analyzing cognitive structures and diagnosing brain disorders (such as Alzheimer's and Parkinson's) by fusing machine learning frameworks with biological neural signal processing.",
  detailedAbout: "Dr. Morteza Amini is a respected faculty member at the Institute for Cognitive Science Studies (ICSS). He began his academic tenure with B.Sc. and M.Sc. degrees in Electrical Engineering, specializing in Electronic Circuits and Systems. Realizing that the computational and artificial intelligence fields could benefit enormously from biological insights—and conversely, that psychological state assessment could be revolutionized by computational processing—he went on to complete a second Master's degree in General Psychology at the University of Tehran.\n\nDriven by this interdisciplinary syncretism of brain, mind, and machine, he completed his Ph.D. in Cognitive Science (specializing in Cognitive Modeling) at Shahid Beheshti University. His research focused heavily on the structural and cognitive changes in the brain for early Alzheimer's detection. He thereafter succeeded in completing two highly specialized post-doctoral research projects: one in Artificial Intelligence & Computing (at ICSS) focused on multi-modal data fusion for Parkinson's detection, and a second in Computational Neuroscience (at Shahid Beheshti University) focused on intelligent processing tools for pre-clinical neurodegenerative modeling.",
};

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    title: "Cognitive Modeling",
    description: "Developing dynamic mathematical and computational constructs that simulate human psychological and cognitive processes.",
    tag: "Cognitive Science",
    iconName: "Brain"
  },
  {
    title: "Computational Neuroscience",
    description: "Applying quantitative and electronic systems modeling to represent complex brain dynamics and neuroimaging coordinates.",
    tag: "Neuroscience",
    iconName: "Activity"
  },
  {
    title: "Alzheimer & Parkinson Diagnostics",
    description: "Utilizing deep learning models, EEG power spectra, and fMRI multi-task feature extractions for early-stage pathology detection.",
    tag: "Medical AI",
    iconName: "ShieldAlert"
  },
  {
    title: "Machine Learning & Neural Networks",
    description: "Architecting non-linear pattern recognition frameworks and multimodal data fusion algorithms for physiological signals.",
    tag: "Artificial Intelligence",
    iconName: "Cpu"
  },
  {
    title: "Human-Machine Interaction",
    description: "Researching how computational assist devices, handwriting telemetry, and digital cognitive interfaces connect with human users.",
    tag: "HCI",
    iconName: "UserCheck"
  },
  {
    title: "Neuro-Behavioral Economics",
    description: "Investigating the brain mechanisms that orchestrate decision-making, choice validation, and interpersonal behavioral states.",
    tag: "Economics/Psychology",
    iconName: "Coins"
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Ph.D.",
    major: "Cognitive Science – Cognitive Modeling",
    institution: "Shahid Beheshti University",
    year: "Graduated",
    thesisTitle: "Early detection of Alzheimer's Disease through analysis of brain structural-cognitive changes",
    details: "Focus on brain structural-cognitive change analysis using advanced neuroimaging datasets (MRI/fMRI/EEG) and complex multi-task feature extractions."
  },
  {
    degree: "Post-Doc (Fellowship 2)",
    major: "Computational Neuroscience",
    institution: "Shahid Beheshti University",
    year: "Completed",
    thesisTitle: "Early prediction of Alzheimer's Disease using an intelligent processing system",
    details: "Designed custom intelligent algorithms and bio-signal processing frameworks for pre-clinical Alzheimer's identification with high sensitivity."
  },
  {
    degree: "Post-Doc (Fellowship 1)",
    major: "Artificial Intelligence and Computing",
    institution: "Institute for Cognitive Science Studies (ICSS)",
    year: "Completed",
    thesisTitle: "Early diagnosis of Parkinson's Disease using a novel multimodal fusion technique",
    details: "Implemented multi-modal feature fusion algorithms blending handwriting analytics with structural imaging to flag early markers of Parkinsonism."
  },
  {
    degree: "M.Sc. (Second Degree)",
    major: "General Psychology",
    institution: "University of Tehran",
    year: "Graduated",
    thesisTitle: "Investigating the effect of acute and gradual weight loss on cognitive functions, executive functions, mood, and interpersonal interactions",
    details: "Explored psychological and biological states, clinical diagnostics, cognitive task performance, and the neurocognitive consequences of rapid physiological stress."
  },
  {
    degree: "B.Sc. & M.Sc. (First Degrees)",
    major: "Electrical Engineering – Electronics",
    institution: "Tarbiat Modares University (M.Sc.)",
    year: "Graduated",
    thesisTitle: "Detection of anxiety from handwriting with computer-aided processing systems",
    details: "Studied electronic board design, signal processing, and pattern recognition to capture and classify anxiety disorders through dynamic script telemetry."
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-1",
    title: "Highly Sensitive Surface Plasmon Resonance Biosensors Utilizing Prism-Waveguide Configuration for Detection of Alzheimer Disease Biomarker",
    authors: "Amini, M., Pedram, M.M., Moradi, A. et al.",
    journal: "Plasmonics",
    year: "2022",
    volumeAndPages: "17, 331–338",
    doi: "https://doi.org/10.1007/s11468-021-01520-8",
    tags: ["Biosensors", "Optoelectronics", "Alzheimer's", "Pathology"],
    snippet: "Presents a high-sensitivity prism-waveguide resonance design capable of profiling blood-based biomolecular markers for clinical neurodegenerative staging.",
    bibtex: `@article{amini2022highly,
  title={Highly Sensitive Surface Plasmon Resonance Biosensors Utilizing Prism-Waveguide Configuration for Detection of Alzheimer Disease Biomarker},
  author={Amini, Morteza and Pedram, Mir Mohsen and Moradi, Alireza and others},
  journal={Plasmonics},
  volume={17},
  pages={331--338},
  year={2022},
  publisher={Springer}
}`
  },
  {
    id: "pub-2",
    title: "Plasmonics Optoelectronics Nanobiosensors for Detection of Alzheimer’s Disease Biomarker via Amyloid-Beta (Aβ) in Near-Infrared",
    authors: "Amini, M., Pedram, M.M., Moradi, A. et al.",
    journal: "Plasmonics",
    year: "2022",
    volumeAndPages: "17, 1191–1201",
    doi: "https://doi.org/10.1007/s11468-022-01611-0",
    tags: ["Biosensors", "Nanotechnology", "Near-Infrared", "Alzheimer's"],
    snippet: "Integrates nanoplasmonics with near-infrared spectrum sensors for early detection of amyloid-beta (Aβ) aggregates, offering non-invasive potential.",
    bibtex: `@article{amini2022plasmonics,
  title={Plasmonics Optoelectronics Nanobiosensors for Detection of Alzheimer’s Disease Biomarker via Amyloid-Beta (A$\\beta$) in Near-Infrared},
  author={Amini, Morteza and Pedram, Mir Mohsen and Moradi, Alireza and others},
  journal={Plasmonics},
  volume={17},
  pages={1191--1201},
  year={2022},
  publisher={Springer}
}`
  },
  {
    id: "pub-3",
    title: "Application Of Machine Learning Methods in Diagnosis of Alzheimer Disease Based on Fractal Feature Extraction and Convolutional Neural Network",
    authors: "Amini, M. and Pedram, M.M.",
    journal: "9th Iranian Joint Congress on Fuzzy and Intelligent Systems (CFIS)",
    year: "2022",
    volumeAndPages: "pp. 1-5",
    doi: "https://doi.org/10.1109/CFIS54774.2022.9756434",
    tags: ["Machine Learning", "Fractal Analysis", "CNN", "Alzheimer's"],
    snippet: "Demonstrated custom fractal-dimension feature extraction on high-res neuroimaging coupled with convolutional layers, achieving high testing accuracies.",
    bibtex: `@inproceedings{amini2022application,
  title={Application Of Machine Learning Methods in Diagnosis of Alzheimer Disease Based on Fractal Feature Extraction and Convolutional Neural Network},
  author={Amini, Morteza and Pedram, Mir Mohsen},
  booktitle={2022 9th Iranian Joint Congress on Fuzzy and Intelligent Systems (CFIS)},
  pages={1--5},
  year={2022},
  organization={IEEE}
}`
  },
  {
    id: "pub-4",
    title: "Single and Combined Neuroimaging Techniques for Alzheimer’s Disease Detection",
    authors: "Amini, Morteza, Pedram, Mir Mohsen, Moradi, Alireza, Jamshidi, Mahdieh, Ouchani, Mahshad",
    journal: "Computational Intelligence and Neuroscience",
    year: "2021",
    volumeAndPages: "9523039, 22 pages",
    doi: "https://doi.org/10.1155/2021/9523039",
    tags: ["Neuroimaging", "Multi-modal Fusion", "Review", "Alzheimer's"],
    snippet: "A extensive review and data-fusion analysis exploring how combined modalities (PET, fMRI, sMRI) outperform single modalities in modern neural classifier networks.",
    bibtex: `@article{amini2021single,
  title={Single and Combined Neuroimaging Techniques for Alzheimer's Disease Detection},
  author={Amini, Morteza and Pedram, Mir Mohsen and Moradi, Alireza and Jamshidi, Mahdieh and Ouchani, Mahshad},
  journal={Computational Intelligence and Neuroscience},
  volume={2021},
  pages={9523039},
  year={2021},
  publisher={Hindawi}
}`
  },
  {
    id: "pub-5",
    title: "Diagnosis of Alzheimer’s Disease by Time-Dependent Power Spectrum Descriptors and Convolutional Neural Network Using EEG Signal",
    authors: "Amini, Morteza, Pedram, Mir Mohsen, Moradi, AliReza, Ouchani, Mahshad",
    journal: "Computational and Mathematical Methods in Medicine",
    year: "2021",
    volumeAndPages: "5511922, 17 pages",
    doi: "https://doi.org/10.1155/2021/5511922",
    tags: ["EEG Signals", "Signal Processing", "CNN", "Alzheimer's"],
    snippet: "An innovative diagnostic method extracting time-frequency descriptors from EEG signals, utilizing deep networks to identify early neural synchronic breakdowns.",
    bibtex: `@article{amini2021diagnosis,
  title={Diagnosis of Alzheimer’s Disease by Time-Dependent Power Spectrum Descriptors and Convolutional Neural Network Using EEG Signal},
  author={Amini, Morteza and Pedram, Mir Mohsen and Moradi, Alireza and Ouchani, Mahshad},
  journal={Computational and Mathematical Methods in Medicine},
  volume={2021},
  pages={5511922},
  year={2021},
  publisher={Hindawi}
}`
  },
  {
    id: "pub-6",
    title: "Diagnosis of Alzheimer’s Disease Severity with fMRI Images Using Robust Multitask Feature Extraction Method and Convolutional Neural Network (CNN)",
    authors: "Amini, Morteza, Pedram, Mir Mohsen, Moradi, AliReza, Ouchani, Mahshad",
    journal: "Computational and Mathematical Methods in Medicine",
    year: "2021",
    volumeAndPages: "5514839, 15 pages",
    doi: "https://doi.org/10.1155/2021/5514839",
    tags: ["fMRI", "Multitask Learning", "Feature Selection", "Alzheimer's"],
    snippet: "Formulates a robust multitask feature compression mathematical approach to extract regional neuro-pathological coordinates from active functional MRI data.",
    bibtex: `@article{amini2021diagnosisSeverity,
  title={Diagnosis of Alzheimer’s Disease Severity with fMRI Images Using Robust Multitask Feature Extraction Method and Convolutional Neural Network (CNN)},
  author={Amini, Morteza and Pedram, Mir Mohsen and Moradi, Alireza and Ouchani, Mahshad},
  journal={Computational and Mathematical Methods in Medicine},
  volume={2021},
  pages={5514839},
  year={2021},
  publisher={Hindawi}
}`
  },
  {
    id: "pub-7",
    title: "A Review of Methods of Diagnosis and Complexity Analysis of Alzheimer’s Disease Using EEG Signals",
    authors: "Ouchani, Mahshad, Gharibzadeh, Shahriar, Jamshidi, Mahdieh, Amini, Morteza",
    journal: "BioMed Research International",
    year: "2021",
    volumeAndPages: "5425569, 15 pages",
    doi: "https://doi.org/10.1155/2021/5425569",
    tags: ["EEG Signals", "Complexity Analysis", "Chaos Theory", "Review"],
    snippet: "Evaluates non-linear dynamics, chaos indices, and entropy metrics in EEG signals to track critical thresholds of neural decay during cognitive tasks.",
    bibtex: `@article{ouchani2021review,
  title={A Review of Methods of Diagnosis and Complexity Analysis of Alzheimer’s Disease Using EEG Signals},
  author={Ouchani, Mahshad and Gharibzadeh, Shahriar and Jamshidi, Mahdieh and Amini, Morteza},
  journal={BioMed Research International},
  volume={2021},
  pages={5425569},
  year={2021},
  publisher={Hindawi}
}`
  }
];

export const TEACHING_COURSES: Course[] = [
  {
    title: "Assessment and Evaluation Methods in Cognitive Sciences",
    description: "Methodological courses detailing psychophysics, computational test designs, and methods to quantify cognitive thresholds and perceptual features.",
    level: "Core",
    topics: ["Psychophysics", "Signal Detection Theory", "Computational Tests", "Behavioral Scoring"]
  },
  {
    title: "Artificial Neural Networks (ANN)",
    description: "Deep dive into biological-inspired neural networks, multilayer perceptrons, backpropagation gradients, learning rules, and neural network optimization.",
    level: "Core",
    topics: ["Backpropagation", "Gradient Descent", "Hopfield Networks", "Hebbian Learning", "Deep Convolutions"]
  },
  {
    title: "Machine Learning (ML)",
    description: "Fundamental patterns, classifiers, dimensionality reduction techniques (PCA, t-SNE), Support Vector Machines, and ensemble decision systems.",
    level: "Advanced",
    topics: ["SVMs", "Random Forests", "Supervised Learning", "Unsupervised Clustering", "Neural Latent Models"]
  },
  {
    title: "Cognitive Modeling",
    description: "The core specialty of modeling cognitive agents, simulating memory retrieval, attention models, and cognitive decision architectures.",
    level: "Advanced",
    topics: ["ACT-R architectures", "Drift Diffusion Models", "Reinforcement Learning Agents", "Bayesian Mind Models"]
  },
  {
    title: "Research Methods for Dynamic & Complex Systems in Neuroscience",
    description: "Advanced investigation techniques covering chaos metrics, attractor networks, non-linear dynamics, and dynamic connectivity maps of brain processes.",
    level: "Interdisciplinary",
    topics: ["Attractor States", "Non-linear ODEs", "Dynamic Causal Modeling", "Signal Entropy Analytics"]
  },
  {
    title: "Signal Processing & Psychophysics",
    description: "Mathematical filtering, Fourier analysis, wavelet transformations, and EEG voltage mapping paired with subjective psychological assessment thresholds.",
    level: "Interdisciplinary",
    topics: ["Wavelets", "FFT Analysis", "EEG Power Bands", "Fechnerian Scaling"]
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2023 - Present",
    title: "Assistant Professor & Faculty Member",
    subtitle: "Institute for Cognitive Science Studies (ICSS)",
    type: "academic",
    description: "Leading research groups on Neural Networks and Computational Diagnostics, supervising postgraduate computational modeling projects.",
    achievements: [
      "Designed novel curriculums for Advanced Brain Signal Processing.",
      "Instructed over 150 postgraduate scientists in Artificial Neural Networks and Cognitive Modeling.",
      "Coordinated international collaborative projects in early biomarkers research."
    ]
  },
  {
    year: "2021 - 2022",
    title: "Post-Doctoral Fellowship in Computational Neuroscience",
    subtitle: "Shahid Beheshti University",
    type: "fellowship",
    description: "Constructed deep analytics platforms for structural-cognitive brain connections to forecast progressive cognitive decline.",
    achievements: [
      "Pioneered robust multitask learning algorithms on diagnostic fMRI volumes.",
      "Published 3 peer-reviewed journal papers within high-tier neuro-computation circles.",
      "Devised custom feature compression matrices that boosted Alzheimer's classification precision."
    ]
  },
  {
    year: "2020 - 2021",
    title: "Post-Doctoral Fellowship in AI and Computing",
    subtitle: "Institute for Cognitive Science Studies (ICSS)",
    type: "fellowship",
    description: "Pioneered multimodal fusion of handwriting telemetry, clinical dynamics, and neural features for early Parkinson's prognosis.",
    achievements: [
      "Engineered a novel non-linear fusion module of dynamic biometric handwriting coordinates.",
      "Collaborated with clinical practitioners to validate computer-aided anxiety screening tools.",
      "Awarded elite researcher status for bridging clinical psychology with physical AI interfaces."
    ]
  },
  {
    year: "2016 - 2020",
    title: "Doctoral Dissertation Research",
    subtitle: "Cognitive Science & Cognitive Modeling, Shahid Beheshti University",
    type: "research",
    description: "Targeted early Alzheimer's Detection by parsing localized grey-matter degradation profiles and neural synchronization vectors.",
    achievements: [
      "Formulated pioneering fractal dimension extraction on brain MRIs.",
      "Integrated EEG-based power spectrum grids into standard Deep Learning architectures.",
      "Received highest marks of distinction during doctoral panel defense."
    ]
  }
];
