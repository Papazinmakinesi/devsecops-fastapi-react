# 🔐 DevSecOps FastAPI + React Demo
![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions)
![Security](https://img.shields.io/badge/Security-DevSecOps-red)
![License](https://img.shields.io/badge/License-MIT-green)
[![CI](https://github.com/Papazinmakinesi/devsecops-fastapi-react/actions/workflows/ci.yml/badge.svg)](https://github.com/Papazinmakinesi/devsecops-fastapi-react/actions/workflows/ci.yml)

A full-stack DevSecOps demonstration project that runs a containerized **FastAPI backend** and **React frontend** with an automated security pipeline in **GitHub Actions**.

---

## ✨ What’s inside
## 📸 Dashboard Preview

![Dashboard Screenshot](docs/images/dashboard.png)
- **Backend:** FastAPI (Python) + Docker
- **Frontend:** React (Vite) served by Nginx
- **Reverse proxy:** `/api/*` routed from frontend → backend
- **CI / DevSecOps:** Automated scans on every push with downloadable reports (Artifacts)

---

## 🧱 Architecture

```mermaid
flowchart LR
  U[User Browser] -->|HTTP :5173| F[Nginx Frontend Container]
  F -->|/api/*| B[FastAPI Backend Container :8000]
  B -->|JSON| F