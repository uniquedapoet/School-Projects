import csv

circuits_data = []
drivers_data = []

def load_circuits_data():
    global circuits_data
    with open("data/circuits.csv") as f:
        reader = csv.DictReader(f)
        circuits_data = list(reader)

def load_drivers_data():
    global circuits_data
    with open("data/circuits.csv") as f:
        reader = csv.DictReader(f)
        circuits_data = list(reader)