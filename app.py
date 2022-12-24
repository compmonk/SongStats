from flask import Flask, jsonify
from sqlalchemy import create_engine, inspect

from config import db_user, db_password, db_host, db_port, db_name
from etl import extract, transform, load

app = Flask(__name__)
engine = create_engine(f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")

@app.route("/summary")
def summary():
    results = engine.execute("SELECT * FROM summary")
    return jsonify([dict(_) for _ in results])


if __name__ == '__main__':
    if "summary" in inspect(engine).get_table_names():
        print("'summary' table found, skipping ETL ⏩ ")
    else:
        extract()
        df = transform()
        load(df, "summary")
    print("Starting web server 🌎")
    app.run(debug=True)
