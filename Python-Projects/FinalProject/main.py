"""
Making Functions for extracting and manipulating data
"""
import pandas as pd
import matplotlib.pyplot as plt



def plot_bar_graph(df, title, x_label, y_label):
    plt.figure(figsize=(10, 6))
    df.plot(kind='bar', stacked=True)
    plt.title(title)
    plt.legend(title='Week',loc='right',bbox_to_anchor=(1.2, .5))
    plt.ylabel(y_label)
    plt.xlabel(x_label)
    plt.show()
    plt.savefig(title)