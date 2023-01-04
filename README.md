# Song Stats

----------

![visitors](https://visitor-badge.laobi.icu/badge?page_id=compmonk.SongStats) [![GitHub forks](https://img.shields.io/github/forks/compmonk/SongStats)](https://github.com/compmonk/SongStats/network) [![GitHub stars](https://img.shields.io/github/stars/compmonk/SongStats)](https://github.com/compmonk/SongStats/stargazers)

Song Stats is a web app where you can summarize and compare the Statistical Song data over the years in a visual manner
using our dynamic charts. We use the data from
the [Spotify Datasets](https://www.kaggle.com/datasets/lehaknarnauli/spotify-datasets)
on [Kaggle](https://www.kaggle.com/) and created the plots based on yearly data for tracks (songs) from 1922 to 2021.
Some of the metrics summarized and compared are Acousticness, Danceability, Energy, Instrumentalness, Liveness,
Speechiness, Valence. We also visualize Loudness, Tempo, Duration and comparison of Time Signatures and Keys.

## Tools and Technology

--------------------

There are many tools and technologies used to create this web app. Some of them are listed below:

* [Flask](https://flask.palletsprojects.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [SQL Alchemy](https://www.sqlalchemy.org/)
* [D3 JS](https://d3js.org/)
* [Plotly](https://plotly.com/javascript/)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [Select 2](https://select2.org/)

## Key in Music

------------

key, in music, a system of functionally related chords deriving from the major and minor scales, with a central note,
called the tonic (or keynote). The central chord is the tonic triad, which is built on the tonic note. Any of the 12
tones of the chromatic scale can serve as the tonic of a key. Accordingly, 12 major keys and 12 minor keys are possible,
and all are used in music. In musical notation, the key is indicated by the key signature, a group of sharp or flat
signs at the beginning of each staff.

[Learn More about Keys in Music](https://www.britannica.com/art/key-music)

## Time Signature

--------------

The time signature (also known as meter signature, metre signature, or measure signature) is a notational convention
used in Western musical notation to specify how many beats (pulses) are contained in each measure (bar), and which note
value is equivalent to a beat.

[Learn More about Time Signature](https://en.wikipedia.org/wiki/Time_signature)

## Attribution and References

--------------------------

Special thanks to [Lehak Narnauli](https://www.kaggle.com/lehaknarnauli) for
the [Spotify Datasets](https://www.kaggle.com/datasets/lehaknarnauli/spotify-datasets)
and [Story Set](https://storyset.com/) for the images.

## Deploying to Github Pages

```shell
$ git checkout -b gh-pages
$ python freeze.py
$ rsync -r build/* . 
$ git add .
$ git commit -m "Deploy to Github Pages"
$ git push -u origin gh-pages
```