import uvicorn
import os
from fastapi import FastAPI
from pydantic import BaseModel
from contextlib import asynccontextmanager
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import (
    desc,
    create_engine,
    Column,
    String,
    Boolean,
    Integer
)


Base = declarative_base()
db_path = os.path.abspath('items.db')
Engine = create_engine('sqlite:///items.db')
Session = sessionmaker(bind=Engine)

seed_items = [
    {"item": "eggs", "quantity": 1, "purchased": False},
    {"item": "milk", "quantity": 2, "purchased": False},
    {"item": "bread", "quantity": 1, "purchased": False},
    {"item": "bananas", "quantity": 4, "purchased": False}
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(Engine)
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(Base):
    __tablename__ = 'items'
    id = Column(Integer, autoincrement=True, primary_key=True)
    item = Column(String)
    quantity = Column(Integer)
    purchased = Column(Boolean)


class ItemSchema(BaseModel):
    item: str
    quantity: int
    purchased: bool


def serialize_item(item):
    return {
        "id": item.id,
        "item": item.item,
        "quantity": item.quantity,
        "purchased": item.purchased
    }


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post('/add')
def add_item(item: ItemSchema):
    session = Session()
    try:
        item = item.dict() if isinstance(item, ItemSchema) else item
        item = Item(**item)
        session.add(item)
        session.commit()

        return {"message": "Item Added"}, 200
    except IntegrityError as e:
        return {"error": f"Error Adding Item: {str(e)}"}, 500

    finally:
        session.close()


@app.post('/check')
def check_item(item_name: str):
    session = Session()
    try:
        item = session.query(Item).filter(Item.item == item_name).first()

        if item is None:
            return 'Error Finding Item'

        item.purchased = True
        session.commit()

        return {'message': "Item Checked"}, 200
    except IntegrityError as e:
        return {"error": f"Error checking item: {str(e)}"}, 500

    finally:
        session.close()


@app.post('/uncheck')
def uncheck_item(item_name: str):
    session = Session()
    try:
        item = session.query(Item).filter(Item.item == item_name).first()

        if item is None:
            return 'Error Finding Item'

        item.purchased = False
        session.commit()

        return {'message': "Item Unchecked"}, 200
    except IntegrityError as e:
        return {"error": f"Error checking item: {str(e)}"}, 500

    finally:
        session.close()


@app.get('/search')
def search(search_string: str):
    session = Session()
    try:
        items = session.query(Item).filter(
            Item.item.ilike(f"%{search_string}%")).all()

        session.commit()
        return {'items': [serialize_item(item) for item in items]}, 200

    except IntegrityError as e:
        return {"error": f"Error Searching for Items {e}"}, 400

    finally:
        session.close()


@app.get('/sort')
def sort():
    session = Session()
    try:
        items = session.query(Item).order_by(desc(Item.quantity)).all()

        session.commit()
        return {'items': [serialize_item(item) for item in items]}, 200
    except IntegrityError as e:
        return {"error": f"Error Searching for Items {e}"}, 400

    finally:
        session.close()


@app.get('/items')
def items():
    session = Session()
    try:
        items = session.query(Item).all()

        return {'items': items}

    except IntegrityError as e:
        return {'error': f"Error getting items {e}"}


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=5005)
