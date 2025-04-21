### 🎯 **Goal**  
Create a **standalone FastAPI backend** for a **grocery shopping list** app. No frontend this time — just a Python file with the API.

---

### 📦 **Core Features Your API Must Support**
Your endpoints should mimic the **functionality** of the old grocery shopping app you built in February (before categories were added):

1. ✅ **Check off (purchase)** an item  
2. 🚫 **Uncheck (unpurchase)** an item  
3. ➕ **Add** a new item  
4. 🔍 **Search** the list  
5. 🔃 **Sort** the list  

All data should follow this structure:
```json
{
  "item": "milk",
  "quantity": 2,
  "purchased": false
}
```

---

### 🔧 **Endpoints Example**
You might have endpoints like:
- `POST /add` – Add an item  
- `POST /check` – Mark item as purchased  
- `POST /uncheck` – Mark item as not purchased  
- `GET /search` – Return matching items  
- `GET /sort` – Return the sorted list  

---

### 🗃️ **Data Handling Options**
You have two options:
- **In-memory** storage (like we did with weather cache)  
- **SQLite + SQLAlchemy** (optional, but only if you want to)

Either way, start with this default data:
```python
[
  {"item": "eggs", "quantity": 1, "purchased": False},
  {"item": "milk", "quantity": 2, "purchased": False},
  {"item": "bread", "quantity": 1, "purchased": False},
  {"item": "bananas", "quantity": 4, "purchased": False}
]
```

---

### 🧪 **Testing**
Run the FastAPI dev server and test everything via the **interactive docs** (Swagger UI at `localhost:8000/docs`).

---

### 📝 **Grading Criteria**
You’re graded based on how closely your API matches the expected features:

- **4** = Fully matches  
- **3** = Mostly matches  
- **2** = Somewhat matches  
- **1** = Slightly matches  
- **0** = Missing or non-functional submission  

---

Let me know if you want a quick starter template for this — I can write one up in a flash.Here’s a clearer, more to-the-point rundown of what you need to build for this homework:

---

### 🎯 **Goal**  
Create a **standalone FastAPI backend** for a **grocery shopping list** app. No frontend this time — just a Python file with the API.

---

### 📦 **Core Features Your API Must Support**
Your endpoints should mimic the **functionality** of the old grocery shopping app you built in February (before categories were added):

1. ✅ **Check off (purchase)** an item  
2. 🚫 **Uncheck (unpurchase)** an item  
3. ➕ **Add** a new item  
4. 🔍 **Search** the list  
5. 🔃 **Sort** the list  

All data should follow this structure:
```json
{
  "item": "milk",
  "quantity": 2,
  "purchased": false
}
```

---

### 🔧 **Endpoints Example**
You might have endpoints like:
- `POST /add` – Add an item  
- `POST /check` – Mark item as purchased  
- `POST /uncheck` – Mark item as not purchased  
- `GET /search` – Return matching items  
- `GET /sort` – Return the sorted list  

---

### 🗃️ **Data Handling Options**
You have two options:
- **In-memory** storage (like we did with weather cache)  
- **SQLite + SQLAlchemy** (optional, but only if you want to)

Either way, start with this default data:
```python
[
  {"item": "eggs", "quantity": 1, "purchased": False},
  {"item": "milk", "quantity": 2, "purchased": False},
  {"item": "bread", "quantity": 1, "purchased": False},
  {"item": "bananas", "quantity": 4, "purchased": False}
]
```

---

### 🧪 **Testing**
Run the FastAPI dev server and test everything via the **interactive docs** (Swagger UI at `localhost:8000/docs`).

---

### 📝 **Grading Criteria**
You’re graded based on how closely your API matches the expected features:

- **4** = Fully matches  
- **3** = Mostly matches  
- **2** = Somewhat matches  
- **1** = Slightly matches  
- **0** = Missing or non-functional submission  

---

Let me know if you want a quick starter template for this — I can write one up in a flash.