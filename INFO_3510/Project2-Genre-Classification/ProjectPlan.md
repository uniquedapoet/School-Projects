### **Step 1: Obtain Data**
#### 1.1. Download Data from Kaggle
- **Dataset:** Search Kaggle for datasets with relevant audio features, such as Spotify tracks or audio analysis datasets (e.g., tracks with `energy`, `danceability`, `valence`, etc.).
- **Clean the Dataset:** Ensure the dataset includes the columns needed, like `title`, `artist`, `genre`, and numerical audio features. Remove irrelevant data or duplicates.

#### 1.2. Scrape Lyrics from Genius
- **Use the Genius API**:
  - Sign up for a Genius Developer account and generate an API token.
  - Install the `lyricsgenius` library:
    ```bash
    pip install lyricsgenius
    ```
  - Use the API to retrieve lyrics based on song titles and artists from your dataset.

  **Example Code**:
  ```python
  import lyricsgenius

  genius = lyricsgenius.Genius("YOUR_GENIUS_API_TOKEN")

  # Example to fetch lyrics
  song = genius.search_song("Song Title", "Artist")
  print(song.lyrics)
  ```

- **Add Lyrics to Dataset**:
  - Append the retrieved lyrics as a new column in your dataset.
  - Handle missing lyrics appropriately (e.g., skip or add a placeholder like `"No lyrics found"`).

---

### **Step 2: Train Model on Genre Prediction**
#### 2.1. Preprocess Data
- **Feature Engineering**:
  - Combine audio features (`energy`, `dance`, etc.) with text data (lyrics).
  - Use `TF-IDF` or word embeddings (like `Word2Vec` or `BERT`) to represent lyrics numerically.
  - Normalize numerical audio features.

- **Split Data**:
  - Split the data into training and testing sets (e.g., 80% training, 20% testing).

#### 2.2. Train the Model
- **Choose a Model**:
  - For genre prediction, use models that handle mixed data types:
    - Text: Use models like `LSTM`, `BERT`, or `TF-IDF` combined with `LogisticRegression`.
    - Numerical Features: Use models like `RandomForestClassifier`, `XGBoost`, or a neural network.
  - Combine text and audio features into a single model using a pipeline or concatenate features.

- **Train the Model**:
  - Train the model on combined audio and lyrics features.
  - Evaluate the model using metrics like accuracy, precision, recall, and F1-score.

  **Example Workflow**:
  ```python
  from sklearn.pipeline import make_pipeline
  from sklearn.ensemble import RandomForestClassifier
  from sklearn.feature_extraction.text import TfidfVectorizer
  from sklearn.model_selection import train_test_split

  # Split data
  X = df[['energy', 'dance', 'lyrics']]  # Features
  y = df['genre']  # Target
  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

  # Text vectorizer and model
  pipeline = make_pipeline(TfidfVectorizer(), RandomForestClassifier())
  pipeline.fit(X_train['lyrics'], y_train)
  ```

---

### **Step 3: Load Songs and Genres into Database**
#### 3.1. Design the Database Schema
Create a SQLite database schema with the following tables:
- **`songs`**:
  - `id` (Primary Key)
  - `title` (Text)
  - `artist` (Text)
  - `lyrics` (Text)
  - `energy`, `dance`, `valence` (Float)
  - `genre` (Text)

- **`predictions`**:
  - `song_id` (Foreign Key)
  - `predicted_genre` (Text)
  - `confidence` (Float)

#### 3.2. Insert Data into SQLite
- Use `pandas.to_sql()` to load your DataFrame into the database.
- Insert predicted genres into the `predictions` table.

**Example**:
```python
import sqlite3

# Connect to database
con = sqlite3.connect('spotify.db')

# Insert data into songs table
df.to_sql('songs', con, if_exists='replace', index=False)
```

---

### **Step 4: Create User Interactions Through Discord**
#### 4.1. Set Up a Discord Bot
- **Install the Discord API Library**:
  ```bash
  pip install discord.py
  ```

- **Create a Discord Bot**:
  - Register a bot on the Discord Developer Portal.
  - Get your bot's token.

- **Basic Bot Setup**:
  ```python
  import discord
  from discord.ext import commands

  bot = commands.Bot(command_prefix='!')

  @bot.event
  async def on_ready():
      print(f'Bot is ready as {bot.user}')

  bot.run('YOUR_DISCORD_BOT_TOKEN')
  ```

#### 4.2. Add Commands to Interact with the Database
- **Fetch Song Info**:
  Allow users to query the database to get a song's genre:
  ```python
  @bot.command()
  async def get_genre(ctx, title):
      # Connect to SQLite and fetch data
      con = sqlite3.connect('spotify.db')
      cursor = con.cursor()
      cursor.execute("SELECT genre FROM songs WHERE title = ?", (title,))
      result = cursor.fetchone()
      if result:
          await ctx.send(f"The genre for {title} is {result[0]}.")
      else:
          await ctx.send("Song not found.")
  ```

- **Run New Songs Through the Model**:
  Add a command to predict the genre of a user-provided song:
  ```python
  @bot.command()
  async def predict_genre(ctx, title, lyrics, energy, dance):
      # Preprocess and predict
      features = [[energy, dance, lyrics]]
      predicted_genre = model.predict(features)
      await ctx.send(f"The predicted genre is {predicted_genre[0]}.")
  ```

- **Save New Songs to Database**:
  Append newly predicted songs to the SQLite database.

---

### Final Workflow
1. **Data Collection**:
   - Combine Kaggle data and Genius lyrics into a unified dataset.
2. **Model Training**:
   - Train a machine learning model on genre using audio features and lyrics.
3. **Database Integration**:
   - Load the songs and genres into a SQLite database.
4. **User Interactions**:
   - Implement Discord bot commands to fetch genres, run predictions, and save new songs.

Would you like help implementing specific parts of this plan, such as Discord bot development, model training, or database integration?