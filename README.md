# devsecops-fastapi-react

Full-stack DevSecOps showcase using FastAPI and React with automated security testing: Bandit SAST, OWASP ZAP DAST, Trivy container scan, pip-audit, and GitHub Actions CI.



\#  DevSecOps FastAPI + React Demo



A full-stack DevSecOps demonstration project showcasing automated security testing and CI/CD integration.



---



\##  Features



\- FastAPI backend (Dockerized)

\- React frontend (container-ready)

\- Automated GitHub Actions CI pipeline

\- Security-first development workflow



---



\##  Automated Security Pipeline



Every push triggers a complete DevSecOps security workflow:



| Security Layer | Tool |

|----------------|------|

| Static Application Security Testing (SAST) | Bandit |

| Dependency Vulnerability Scan | pip-audit |

| Secret Leak Detection | Gitleaks |

| Container Security Scan | Trivy |

| Dynamic Application Security Testing (DAST) | OWASP ZAP |



---



\##  CI/CD Pipeline



GitHub Actions automatically:

\- Builds Docker containers

\- Runs security scans

\- Performs live API security testing

\- Generates downloadable security reports



---



\##  Security Reports



Pipeline artifacts include:

\- `bandit-report.txt`

\- `pip-audit-report.txt`

\- `gitleaks-report.json`

\- `trivy-report.txt`



---



\##  Run Locally



```bash

docker compose up --build

