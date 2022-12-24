import os
from zipfile import ZipFile

import numpy as np
import pandas as pd
from sqlalchemy import create_engine

from config import db_user, db_password, db_host, db_port, db_name

data_path = os.path.join("data")

def extract():
    if os.path.exists(os.path.join(data_path, "tracks.csv")):
        print("Data present skipping extraction ⏩")
    else:
        with ZipFile(os.path.join(data_path, "tracks.csv.zip")) as artists_zip:
            artists_zip.extractall(path=data_path)
        print(f"Extraction from {data_path} complete ✅")


def transform():
    tracks_df = pd.read_csv(os.path.join(data_path, "tracks.csv"), index_col="id")
    # Add the year column
    tracks_df.release_date = pd.to_datetime(tracks_df.release_date)
    tracks_df["year"] = tracks_df.release_date.dt.year
    tracks_df.drop(index=tracks_df[tracks_df["year"] == 1900].index, inplace=True)

    # Generate the "mean", "min", "max", "std", "var" for all the values
    summary_df = tracks_df[[
        'year',
        'danceability',
        'energy',
        'loudness',
        'speechiness',
        'acousticness',
        'instrumentalness',
        'liveness',
        'valence',
        'tempo'
    ]].groupby("year").agg(["mean", "min", "max", "std", "var"])
    summary_df.columns = [f"{column[0]}_{column[1]}" if type(column) is tuple else column for column in
                          summary_df.columns]

    # Get count of explicit per year
    summary_df = summary_df.merge(
        tracks_df["explicit"].groupby(tracks_df.year).agg(["sum", "count"]).rename(columns={
            "sum": "explicit_count", "count": "total"
        }),
        left_index=True, right_index=True)

    # Calculate explicit ratio
    summary_df["explicit_ratio"] = summary_df["explicit_count"] / summary_df["total"] * 100.0

    # Add musical keys
    keys_df = pd.pivot_table(tracks_df,
                             index="year",
                             columns="key",
                             values="name",
                             aggfunc=np.size).fillna(0).add_prefix("key_")
    summary_df = summary_df.merge(keys_df, left_index=True, right_index=True)

    # Add time signature
    time_signature_df = pd.pivot_table(tracks_df,
                                       index="year",
                                       columns="time_signature",
                                       values="name",
                                       aggfunc=np.size).fillna(0).add_prefix("time_signature_")
    summary_df = summary_df.merge(time_signature_df, left_index=True, right_index=True)

    print(f"Transformation complete ✅")

    return summary_df


def load(df, table_name):
    engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")
    connection = engine.connect()
    df.to_sql(table_name, connection, if_exists="replace")
    print(f"Loading into {db_name}.{table_name} complete ✅")
