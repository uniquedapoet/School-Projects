import requests
import sqlite3
import lyricsgenius
import pandas as pd
import re
from langdetect import detect, DetectorFactory


def is_english(lyrics):
    DetectorFactory.seed = 1
    try:
        language = detect(lyrics)
        return language == 'en'
    except:
        return False


def get_access_token(url, client_id, client_secret):
    """
    Gets access token from API given URL, client ID, and client secret.

    Parameters:
    url (str): URL to get access token from.
    client_id (str): Client ID for API.
    client_secret (str): Client secret for API.

    Returns:
    str: Access token.
    """
    url = url
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'client_credentials'
    }
    response = requests.post(url, data=data)
    response_data = response.json()
    if response.status_code != 200:
        print('Error:', response_data['error'])
        return None
    else:
        # print('Access Token:', response_data['access_token'])
        return response_data['access_token']


class Song:
    """
    Class to represent a song.

    Parameters:
    name (str): Name of the song.
    artist (str): Name of the artist.
    energy (int): Energy of the song.
    danceability (int): Danceability of the song.
    loudness (int): Loudness of the song.
    liveness (int): Liveness of the song.
    valence (int): Valence of the song.
    acousticness (int): Acousticness of the song.
    speechiness (int): Speechiness of the song.
    popularity (int): Popularity of the song.
    """

    def __init__(self,
                 name: int,
                 artist: int,
                 energy: int,
                 danceability: int,
                 loudness: int,
                 liveness: int,
                 valence: int,
                 acousticness: int,
                 speechiness: int,
                 popularity: int
                 ):
        self.name = name
        self.artist = artist
        self.energy = energy
        self.danceability = danceability
        self.loudness = loudness
        self.liveness = liveness
        self.valence = valence
        self.acousticness = acousticness
        self.speechiness = speechiness
        self.popularity = popularity
        self._lyrics = None

    @property
    def lyrics(self):
        """
        Gets the lyrics of the song from database or Genius API.

        Returns:
        str: Lyrics of the song.
        """
        # Get lyrics from the database
        try:
            with sqlite3.connect('data/spotify.db') as con:
                cursor = con.cursor()
                cursor.execute(
                    'SELECT lyrics FROM songs WHERE Title = ? AND Artist = ?',
                    (self.name, self.artist)
                )
                result = cursor.fetchone()
                if result:
                    self._lyrics = result[0]
        except sqlite3.Error as e:
            print(f"Database error: {e}")

        # If not in the database, get from Genius API
        if self._lyrics is None:
            try:
                GENIUS_CLIENT_ID = 'HBEdvu8RZHXDifNxoZSXBdXSapPiYoEFigthUL3Vo0Ork1pG0PD5hxo-umZXJYcx'
                GENIUS_SECRET = 'gbc3Zp4P13XThN_LirZwB4codP5jGtl5Rc8Yaxh5_eQF0ybh6sP-LNymgzmErL6Ys_R_IspR6roqd4DIiopneQ'
                genius_access_token = get_access_token(
                    url='https://api.genius.com/oauth/token',
                    client_id=GENIUS_CLIENT_ID,
                    client_secret=GENIUS_SECRET)
                genius = lyricsgenius.Genius(genius_access_token)
                song = genius.search_song(self.name, self.artist)
                if song:
                    self._lyrics = song.lyrics
                    # Save to database
                    try:
                        with sqlite3.connect('data/spotify.db') as con:
                            cursor = con.cursor()
                            cursor.execute(
                                'UPDATE songs SET lyrics = ? WHERE Title = ? AND Artist = ?',
                                (self._lyrics, self.name, self.artist))
                            con.commit()
                    except sqlite3.Error as e:
                        print(f"Error saving lyrics to database: {e}")
                else:
                    self._lyrics = 'Lyrics not found.'
            except Exception as e:
                print(f"Error fetching lyrics from Genius: {e}")
                self._lyrics = 'Lyrics not found.'

        return self._lyrics


def filter_genres(data: pd.DataFrame):
    """
    Maps specific genres to broad genres and filters out rows with no genre.

    Parameters:
    data (pd.DataFrame): DataFrame with genre data.

    Returns:
    pd.DataFrame: DataFrame with broad genres.
    """
    genre_mapping = {
        "Pop": [
            "pop", "cantopop", "mandopop", "britpop", "dance pop", "electro", "new wave pop",
            "indie-pop", "baroque pop", "art pop", "neo mellow", "bubblegum pop", "chamber pop",
            "operatic pop", "alternative pop", "dutch pop", "synth-pop", "power-pop", "dancehall"
        ],
        "Rock": [
            "rock", "alt-rock", "alternative rock", "classic rock", "rock-n-roll", "rockabilly",
            "psych-rock", "glam rock", "garage", "hard-rock", "album rock", "punk-rock",
            "irish rock", "art rock", "british alternative rock", "danish pop rock",
            "hard rock", "soft rock"
        ],
        "Electronic/Dance": [
            "edm", "house", "progressive-house", "deep-house", "techno", "detroit-techno",
            "dubstep", "minimal-techno", "trance", "club", "j-dance", "big beat", "gabba",
            "eurodance", "cyberpunk", "diva house", "downtempo", "basshall"
        ],
        "Metal": [
            "metal", "black-metal", "heavy-metal", "death-metal", "metalcore", "alternative metal",
            "finnish metal", "dutch metal", "glam metal"
        ],
        "Classical/Opera": [
            "classical", "opera", "new-age", "classic soundtrack", "classic italian pop",
            "classic uk pop", "classic schlager"
        ],
        "Hip-Hop/Rap": [
            "hip-hop", "rap", "detroit hip hop", "dutch hip hop", "atl hip hop", "g funk",
            "east coast hip hop"
        ],
        "Jazz/Blues": [
            "jazz", "blues", "acid jazz", "blues rock", "chicago soul", "classic soul",
            "contemporary vocal jazz"
        ],
        "Children's/Disney": [
            "children", "disney", "kids",
        ],
        "Latin": [
            "latin", "salsa", "latino", "reggaeton", "latin alternative", "mpb", "sertanejo"
        ],
        "Country/Bluegrass": [
            "country", "honky-tonk", "bluegrass", "australian americana", "canadian rock"
        ],
    }

    specific_to_broad = {subgenre: broad_genre for broad_genre,
                         subgenres in genre_mapping.items() for subgenre in subgenres}

    data['Genre'] = data['Top Genre'].map(specific_to_broad)
    data = data[pd.notna(data['Genre'])]
    return data


def filter_lyrics(text):
    """
    Cleans lyrics data.

    Parameters:
    text (str): The lyrics text.

    Returns:
    str: Cleaned lyrics.
    """
    if not isinstance(text, str):
        return text  # Return as is if not a string
    # Process text with brackets
    if '[' in text:
        # Keep text after the first ']'
        lyrics = text.split(']', 1)[1] if ']' in text else text
        # Remove text in square brackets
        lyrics = re.sub(r'\[.*?\]', ' ', lyrics)
        # Collapse multiple spaces into one
        lyrics = re.sub(r'\s+', ' ', lyrics)
        # Remove trailing content in the last '[' (if exists)
        lyrics = lyrics.rsplit('[', 1)[0] if '[' in lyrics else lyrics
    elif 'Lyrics' in text:
        # Keep text after 'Lyrics'
        lyrics = text.split('Lyrics', 1)[1] if 'Lyrics' in text else text
        # Remove trailing 'E'
        lyrics = lyrics.rsplit('E', 1)[0] if 'E' in lyrics else lyrics
    else:
        # Return original if no conditions match
        lyrics = text

    return lyrics.strip()

# def filter_lyrics(text):
#     """
#     Cleans lyrics data.

#     Parameters:
#     text (str): The lyrics text.

#     Returns:
#     str: Cleaned lyrics.
#     """
#     if not isinstance(text, str):
#         return text  # Return as is if not a string
    
#     # Replace newlines with spaces
#     text = text.replace('\n', ' ').replace('\r', ' ')
    
#     # Process text with brackets
#     if '[' in text:
#         lyrics = text.split(']', 1)[1] if ']' in text else text
#         # Remove text in square brackets
#         lyrics = re.sub(r'\[.*?\]', ' ', lyrics)
#         # Collapse multiple spaces into one
#         lyrics = re.sub(r'\s+', ' ', lyrics)
#         # Remove trailing content in the last '[' (if exists)
#         lyrics = lyrics.rsplit('[', 1)[0] if '[' in lyrics else lyrics
#     elif 'Lyrics' in text:
#         # Keep text after 'Lyrics'
#         lyrics = text.split('Lyrics', 1)[1] if 'Lyrics' in text else text
#         # Remove trailing 'E'
#         lyrics = lyrics.rsplit('E', 1)[0] if 'E' in lyrics else lyrics
#     else:
#         # If no special conditions match, just use the text as is
#         lyrics = text
    
#     # Final trim of spaces
#     return lyrics.strip()


def get_lyrics(title, artist, genre):
    try:
        GENIUS_CLIENT_ID = (
            'HBEdvu8RZHXDifNxoZSXBdXSapPiYoEFigthUL3Vo0Ork1pG0PD5hxo-umZXJYcx'
        )
        GENIUS_SECRET = (
            'gbc3Zp4P13XThN_LirZwB4codP5jGtl5Rc8Yaxh5_eQF0ybh6sP-LNymgzmErL6Ys_R_IspR6roqd4DIiopneQ'
        )
        genius_access_token = get_access_token(
            url='https://api.genius.com/oauth/token',
            client_id=GENIUS_CLIENT_ID,
            client_secret=GENIUS_SECRET
        )
        genius = lyricsgenius.Genius(genius_access_token)
        song = genius.search_song(title, artist)
        lyrics = song.lyrics
        lyrics = filter_lyrics(lyrics)
        new_row = pd.DataFrame({
            'Title': [title],
            'Artist': [artist],
            'Lyrics': [lyrics],
            'Genre': [genre]
        })
        new_row.to_csv('data/All-Songs-With-Lyrics.csv',
                        mode='a', header=False)
    except Exception as e:
        print(f"Error fetching lyrics from Genius: {e}")
        lyrics = 'Lyrics not found.'
    return lyrics

if __name__ == '__main__':
    data = pd.read_csv('data/English-Songs.csv')

    # Done already and sent to ^^^^
    # data = pd.read_csv('data/All-Songs.csv')
    # data = data[data['Title'].apply(is_english)]
    
    data['Lyrics'] = data.apply(
        lambda x: get_lyrics(x['Title'], x['Artist'], x['Genre']), axis=1)
    data.to_csv('data/English-Songs-With-Lyrics.csv', index=False)
