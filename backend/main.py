from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from .models import Base, Company
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or specify your frontend URL here, e.g., "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class CompanyCreate(BaseModel):
    name: str
    location: str

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.get("/companies")
def read_companies(db: Session = Depends(get_db)):
    return db.query(Company).all()

@app.post("/companies")
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    new_company = Company(name=company.name, location=company.location)
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company

@app.put("/companies/{company_id}")
def update_company(company_id: int, name: str, location: str, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    company.name = name
    company.location = location
    db.commit()
    return company

@app.delete("/companies/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    db.delete(company)
    db.commit()
    return {"message": "Company deleted"}
