import discord
from discord.ext import commands
from project_functions import predict_genre
from project_functions import get_lyrics as get_lyrical_content
import pandas as pd
from dotenv import load_dotenv

load_dotenv("3510.env")
BOTTOKEN = os.getenv("BOTTOKEN")

intents = discord.Intents.default()
intents.message_content = True  # Enable access to message content
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}')


# Command example
@bot.command()
async def hello(ctx):
    await ctx.send(f'Hello {ctx.author.mention}!')

@bot.command()
async def greet(ctx):
    await ctx.send("Hello! I am your bot.")

@bot.command()
async def what_genre_is(ctx, *, input_text: str):
    try:
        song_name, artist_name = input_text.split(" by ")
        print(f"Song name: {song_name}, Artist name: {artist_name}")
        try:  
            genre = predict_genre(song_name, artist_name)
        except:
            await ctx.send(f"An error occurred. Song not found in Database.")
        await ctx.send(f"The genre of {song_name} by {artist_name} is {genre}.")
    except Exception as e:
        await ctx.send(f"An error occurred: {e}. Submit a valid song and artist name.")


@bot.command()
async def real_genre(ctx, *, input_text: str):
    try:
        song_name, artist_name = input_text.split(" by ")
        print(f"Song name: {song_name}, Artist name: {artist_name}")
        data = pd.read_csv("data/English-Songs.csv")
        genre = data[(data["Title"] == song_name) & (data["Artist"] == artist_name)]["Top Genre"].values[0]
        await ctx.send(f"The real genre of {song_name} by {artist_name} is {genre}.")
    except Exception as e:
        await ctx.send(f"An error occurred: {e}. Submit a valid song and artist name.")


@bot.command()
async def get_lyrics(ctx, *, input_text: str):
    try:
        song_name, artist_name = input_text.split(" by ")
        print(f"Song name: {song_name}, Artist name: {artist_name}")
        lyrics = get_lyrical_content(song_name, artist_name)
        await ctx.send(f"The lyrics of {song_name} by {artist_name} are: {lyrics}.")
    except Exception as e:
        await ctx.send(f"An error occurred: {e}. Submit a valid song and artist name.")

# Run the bot with your token
bot.run(BOTTOKEN)
