import EnquiryPanel from "@/components/EnquiryPanel";
import Image from "next/image";
import React from "react";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/ui/accordion";

const Page = () => {
  const courseData = [
    {
      id: "1",
      title: "Level 1: Introduction to Machine Learning",
      subtitle: [
        "Introduction to ML Concepts: Overview of Machine Learning (ML), including supervised, unsupervised, and reinforcement learning. Explanation of key terms like features, labels, and algorithms.",
        "Python Fundamentals for ML: Basics of Python: data types, loops, and conditionals. Introduction to key libraries: NumPy, Pandas, Matplotlib. Implementing simple algorithms with Scikit-Learn.",
        "Data Preprocessing: Exploratory Data Analysis (EDA) and data visualization. Techniques for handling missing data and encoding categorical data. Feature scaling and normalization.",
        "Supervised Learning - Regression: Linear and Polynomial Regression models. Using Scikit-Learn for implementation and performance evaluation (MSE, R-squared).",
        "Project - Predictive Analysis: Building a housing price prediction model using linear regression.",
      ],
    },
    {
      id: "2",
      title: "Level 2: Intermediate Machine Learning",
      subtitle: [
        "Classification Algorithms: Logistic Regression, K-Nearest Neighbors (KNN). Evaluation using confusion matrix, accuracy, precision, and recall.",
        "Decision Trees and Ensemble Methods: Understanding Decision Trees and Random Forests. Introduction to ensemble methods like Bagging and Boosting. Project: Classification using decision trees (Iris or Titanic dataset).",
        "Unsupervised Learning - Clustering: K-Means and Hierarchical Clustering. Visualizing clusters using real-world datasets.",
        "Natural Language Processing (NLP) Basics: Text preprocessing, tokenization, and stemming. Sentiment analysis and frequency analysis on text datasets. Project: Sentiment analysis on Twitter data.",
        "Introduction to Neural Networks: Neural network architecture, layers, and activation functions. Using TensorFlow/Keras to build neural networks. Project: Image classification using MNIST dataset.",
      ],
    },
    {
      id: "3",
      title: "Level 3: Advanced Machine Learning (Part 1)",
      subtitle: [
        "Deep Learning - CNNs and Image Processing: Introduction to Convolutional Neural Networks (CNNs). Image recognition using TensorFlow/Keras on CIFAR-10 dataset.",
        "Deep Learning - RNNs and Time Series Analysis: Recurrent Neural Networks (RNNs) for sequence prediction. Time-series analysis and forecasting with RNNs. Project: Predictive analysis using a time-series dataset.",
        "Reinforcement Learning Basics: Introduction to reinforcement learning and Q-learning algorithms. Project: Developing an RL model for a game or simulation.",
        "Model Deployment and Ethics in ML: Serving ML models through Flask or FastAPI. Discussion on ethical issues in ML: fairness, bias, and transparency. Final Project: Deploying an ML model as an API with ethical considerations.",
      ],
    },
    {
      id: "4",
      title: "Level 4: Advanced Machine Learning (Part 2)",
      subtitle: [
        "Introduction to TensorFlow and PyTorch: Overview of both libraries and their usage. Comparison of model performance using TensorFlow and PyTorch.",
        "Model Deployment and Project Work: Serving models with Flask or FastAPI. Ethical considerations: addressing bias and ensuring transparency. Final Project: Deploying a model with ethical concerns integrated",
      ],
    },
  ];
  const enquiryPanelData = [
    {
      mode: "Online & Offline",
      age: "10-15 years",
      duration: "16 classes",
      size: "1 on 1 class",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl ">
      <div className="mt-32 px-4 text-center">
        <h1 className="my-4 text-3xl text-red-800 font-bold uppercase">
          Machine Learning
        </h1>
        <div className="flex md:w-[400px] md:h-[300px]  my-5 mx-auto   rounded-3xl overflow-hidden border">
          <Image
            src="/assets/online-course/mlgif.webp"
            alt="Course Curriculum webp"
            width={600}
            height={300}
            layout="intrinsic"
            className="object-contain"
          />
        </div>
        <EnquiryPanel data={enquiryPanelData} />
        <p className="my-4 w-[90%] mx-auto text-left">
          Machine learning refers to the process of enabling computer systems to
          learn with data using statistical techniques without being explicitly
          programmed. It is the process of active engagement with algorithms in
          order to enable them to learn from and make predictions on data. It is
          seen as a subset of artificial intelligence. Machine learning
          algorithms build a model based on sample data, known as &quot;training
          data&quot;, in order to make predictions or decisions. The study of
          mathematical optimization delivers methods, theory and application
          domains to the field of machine learning.
        </p>
      </div>
      <div className="mx-4 md:mx-20">
        <h2 className="text-center text-2xl font-bold uppercase text-red-800">
          Detailed Curriculum
        </h2>
      </div>
      <Testimonials testimonials={courseData} />
      <Footer />
    </div>
  );
};

export default Page;
