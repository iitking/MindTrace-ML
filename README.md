# 🧠 MindTrace

MindTrace is a machine learning powered API that predicts a student's **mental health score** based on their lifestyle habits — social media usage, sleep, study hours, physical activity, and stress level.

🔗 **Live Demo:** [Mindtrace](https://mindtrace-ml-1.onrender.com)

---

## 📌 Features

- Predicts a mental health score (0–10) using a trained **Random Forest Regression** model
- REST API built with **FastAPI**
- Interactive web form (HTML/CSS/JS) to test predictions in the browser
- Auto-generated API docs via Swagger UI (`/docs`)
- CORS enabled for frontend integration

---

## 🗂️ Project Structure

```
MindTrace-ML/
│
├── main.py                     # FastAPI backend & prediction logic
├── MindTrace-ML_Model.pkl      # Trained ML model (Pipeline: preprocessing + RandomForestRegressor)
├── requirements.txt            # Python dependencies
├── index.html                  # Frontend form
├── style.css                   # Frontend styling
├── script.js                   # Frontend logic (calls the API)
└── README.md
```

---

## ⚙️ Tech Stack

| Layer        | Technology                     |
|--------------|---------------------------------|
| Backend      | FastAPI, Uvicorn                |
| ML / Data    | scikit-learn, pandas, joblib    |
| Frontend     | HTML, CSS, JavaScript           |
| Deployment   | Render                          |

---

## 🚀 Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/iitking/MindTrace-ML.git
   cd MindTrace-ML
   ```

2. **Create and activate a virtual environment**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate      # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the API server**
   ```bash
   uvicorn main:app --reload
   ```

5. **Open the frontend**
   Open `index.html` in your browser (or serve it with Live Server), and the form will call the API running at `http://127.0.0.1:8000`.

6. **Explore the API docs**
   Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for the interactive Swagger UI.

---

## 📡 API Reference

### `POST /predict`

Predicts a mental health score based on student lifestyle data.

**Request body:**
```json
{
  "Age": 20,
  "Gender": "Male",
  "Country": "India",
  "Academic_Level": "Undergraduate",
  "Most_Used_Platform": "Instagram",
  "Purpose_Of_Use": "Education",
  "Avg_Daily_Usage_Hours": 3,
  "Daily_Unlocks": 40,
  "Study_Hours": 4,
  "Physical_Activity_Hours": 1,
  "Sleep_Hours_Per_Night": 7,
  "Stress_Level": "Medium"
}
```

**Response:**
```json
{
  "predicted_mental_health_score": 6.42
}
```

---

## 📈 Model Performance

Three models were trained and compared before finalizing the best one:

| Model                     | R² (Test) | R² (Train) | MAE    | RMSE   |
|---------------------------|-----------|------------|--------|--------|
| Linear Regression         | 0.7398    | 0.7237     | 0.5362 | 0.6760 |
| Random Forest (default)   | **0.8776**| 0.9808     | **0.3472** | **0.4637** |
| Random Forest (tuned)     | 0.8650    | 0.9547     | 0.3689 | 0.4869 |

**Best hyperparameters found via `RandomizedSearchCV`:**
```python
{
  'random_forest__n_estimators': 200,
  'random_forest__min_samples_split': 5,
  'random_forest__min_samples_leaf': 2,
  'random_forest__max_depth': 15
}
```

The **Random Forest Regressor** was selected as the final model, achieving an **R² score of ~0.88** on the test set — meaning it explains about 88% of the variance in students' mental health scores.

---

## 📊 Model

The model is a scikit-learn `Pipeline` combining:
- Log transformation + scaling for skewed numeric features (`Study_Hours`)
- Standard scaling for other numeric features (`Age`, `Avg_Daily_Usage_Hours`, `Daily_Unlocks`, `Physical_Activity_Hours`, `Sleep_Hours_Per_Night`)
- Ordinal encoding for `Stress_Level`
- One-hot encoding for categorical features (`Gender`, `Academic_Level`, `Most_Used_Platform`, `Purpose_Of_Use`, `Grouped_country`)
- A `RandomForestRegressor` as the final estimator

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🙋‍♂️ Author

Built by **Nivesh Kumar Meena**

B.Tech Electrical Engineering  
IIT Roorkee

### Connect with me

- GitHub: [Nivesh Kumar Meena](https://github.com/iitking)
- LinkedIn: [Nivesh Kumar Meena](https://www.linkedin.com/in/nivesh-kumar-meena-a31465221/)

---
