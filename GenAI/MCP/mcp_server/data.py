from datetime import date as py_date
from sqlalchemy import Date, Integer, String, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
import json

dummy_expenses = [
    {
        "date": py_date(2026, 1, 5),
        "amount": 45,
        "category": "Food",
        "note": "Grocery shopping at Walmart",
    },
    {
        "date": py_date(2026, 1, 12),
        "amount": 15,
        "category": "Transportation",
        "note": "Uber ride to office",
    },
    {
        "date": py_date(2026, 1, 20),
        "amount": 120,
        "category": "Utilities",
        "note": "Monthly electric bill",
    },
    {
        "date": py_date(2026, 2, 2),
        "amount": 8,
        "category": "Food",
        "note": "Morning coffee run",
    },
    {
        "date": py_date(2026, 2, 14),
        "amount": 85,
        "category": "Entertainment",
        "note": "Valentine's day dinner",
    },
    {
        "date": py_date(2026, 2, 28),
        "amount": 30,
        "category": "Medical",
        "note": "Pharmacy prescription refill",
    },
    {
        "date": py_date(2026, 3, 3),
        "amount": 1500,
        "category": "Housing",
        "note": "Monthly rent payment",
    },
    {
        "date": py_date(2026, 3, 10),
        "amount": 60,
        "category": "Transportation",
        "note": "Gas station fill up",
    },
    {
        "date": py_date(2026, 3, 15),
        "amount": 25,
        "category": "Entertainment",
        "note": None,  # Tests your nullable=True constraint!
    },
    {
        "date": py_date(2026, 3, 22),
        "amount": 110,
        "category": "Shopping",
        "note": "New running shoes",
    },
]


engine = create_engine("sqlite:///mydatabase.db")


class Base(DeclarativeBase):
    pass


class Expense(Base):
    __tablename__ = "expense"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    date: Mapped[py_date] = mapped_column(Date, nullable=False)
    amount: Mapped[int] = mapped_column(Integer, nullable=False)
    category: Mapped[str] = mapped_column(String, nullable=False)
    note: Mapped[str] = mapped_column(String, nullable=True)

with Session(engine) as session:
        # for item in dummy_expenses:
        #     new_expense = Expense(**item)
        #     session.add(new_expense)
        expense_list = (
        select(Expense.date,Expense.amount,Expense.category,Expense.note)
        .order_by(Expense.date.asc())) 

        def date_encoder(obj):
            if isinstance(obj, py_date):
                return obj.isoformat()  # Turns date object into "YYYY-MM-DD"

        result = session.execute(expense_list).mappings().all()
        converted_result=[dict(row) for row in result]
        jsondata=json.dumps(converted_result, default=date_encoder, indent=4)
        print(type(jsondata))

        # json_result = json.dumps(result, default=str, indent=2)
        # print(json_result)