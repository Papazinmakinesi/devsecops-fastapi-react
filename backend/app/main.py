from fastapi import FastAPI

app = FastAPI(title="DevSecOps Demo API")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/hello")
def hello(name: str = "world"):
    return {"message": f"hello {name}"}
