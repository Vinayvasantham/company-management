from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Replace '@' with '%40' in the password
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:Vinay%40123@localhost:3306/test_db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base

# SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:Vinay@123@localhost:3306/test_db"
# engine = create_engine(SQLALCHEMY_DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()
