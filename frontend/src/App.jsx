import { useEffect, useMemo, useState } from "react";

function StatusPill({ ok, text }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        border: "1px solid rgba(255,255,255,0.12)",
        background: ok ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
        color: ok ? "rgb(134,239,172)" : "rgb(252,165,165)",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: ok ? "rgb(34,197,94)" : "rgb(239,68,68)",
        }}
      />
      {text}
    </span>
  );
}

function Card({ title, subtitle, right, children }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, opacity: 0.75 }}>{subtitle}</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{title}</div>
        </div>
        {right}
      </div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function CodeBlock({ value }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 14,
        borderRadius: 12,
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.10)",
        overflowX: "auto",
        fontSize: 13,
        lineHeight: 1.45,
      }}
    >
      {value}
    </pre>
  );
}

export default function App() {
  const [name, setName] = useState("Ekin");
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState(null);
  const [hello, setHello] = useState(null);
  const [err, setErr] = useState("");

  const prettyHealth = useMemo(
    () => (health ? JSON.stringify(health, null, 2) : "—"),
    [health]
  );
  const prettyHello = useMemo(
    () => (hello ? JSON.stringify(hello, null, 2) : "—"),
    [hello]
  );

  const isHealthy = health?.status === "ok";

  async function refresh() {
    setErr("");
    setLoading(true);
    try {
      const [h, msg] = await Promise.all([
        fetch("/api/health").then((r) => r.json()),
        fetch(`/api/hello?name=${encodeURIComponent(name || "world")}`).then((r) =>
          r.json()
        ),
      ]);
      setHealth(h);
      setHello(msg);
    } catch (e) {
      setErr(String(e));
      setHealth(null);
      setHello(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "rgba(255,255,255,0.92)",
        background:
          "radial-gradient(800px 400px at 20% 10%, rgba(99,102,241,0.25), transparent 60%)," +
          "radial-gradient(900px 500px at 80% 20%, rgba(34,197,94,0.18), transparent 60%)," +
          "linear-gradient(180deg, rgb(10,10,14), rgb(6,6,10))",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "28px 18px 40px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 18,
          }}
        >
          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              React (Vite) → FastAPI via <code>/api</code> proxy
            </div>
            <h1 style={{ margin: "8px 0 6px", fontSize: 34, letterSpacing: -0.6 }}>
              DevSecOps Demo Dashboard
            </h1>
            <div style={{ opacity: 0.75, lineHeight: 1.5 }}>
              Live API checks + friendly UI. Pipeline scans: SAST (Bandit), dependencies
              (pip-audit), secrets (Gitleaks), container (Trivy), DAST (OWASP ZAP).
            </div>
          </div>

          <StatusPill ok={isHealthy} text={isHealthy ? "API healthy" : "API not ready"} />
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              flex: "1 1 260px",
            }}
          >
            <span style={{ fontSize: 12, opacity: 0.75 }}>Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type a name…"
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "rgba(255,255,255,0.92)",
                fontSize: 14,
              }}
            />
          </div>

          <button
            onClick={refresh}
            disabled={loading}
            style={{
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              background: loading ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.25)",
              color: "rgba(255,255,255,0.92)",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 24px rgba(99,102,241,0.15)",
            }}
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>

          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Open Swagger
          </a>
        </div>

        {/* Error */}
        {err && (
          <div
            style={{
              marginBottom: 16,
              padding: 14,
              borderRadius: 16,
              border: "1px solid rgba(239,68,68,0.35)",
              background: "rgba(239,68,68,0.10)",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Error</div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>{err}</div>
          </div>
        )}

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 14,
          }}
        >
          <div style={{ gridColumn: "span 12" }}>
            <Card
              subtitle="Live Checks"
              title="API Status"
              right={<StatusPill ok={isHealthy} text={isHealthy ? "OK" : "Down"} />}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gap: 14,
                }}
              >
                <div style={{ gridColumn: "span 12" }}>
                  <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
                    GET <code>/health</code>
                  </div>
                  <CodeBlock value={health ? prettyHealth : loading ? "Loading…" : "—"} />
                </div>

                <div style={{ gridColumn: "span 12" }}>
                  <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
                    GET <code>/hello?name=…</code>
                  </div>
                  <CodeBlock value={hello ? prettyHello : loading ? "Loading…" : "—"} />
                </div>
              </div>
            </Card>
          </div>

          <div style={{ gridColumn: "span 12" }}>
            <Card subtitle="DevSecOps" title="What the pipeline does">
              <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.88, lineHeight: 1.7 }}>
                <li><b>Bandit</b> checks Python code for common security issues (SAST).</li>
                <li><b>pip-audit</b> scans dependencies for known vulnerabilities.</li>
                <li><b>Gitleaks</b> detects leaked secrets in git history.</li>
                <li><b>Trivy</b> scans the Docker image for CVEs.</li>
                <li><b>OWASP ZAP</b> performs a baseline DAST scan against the running API.</li>
              </ul>
            </Card>
          </div>
        </div>

        <div style={{ marginTop: 18, opacity: 0.55, fontSize: 12 }}>
          Tip: This UI uses a Vite proxy so the browser calls <code>/api</code> without CORS issues.
        </div>
      </div>
    </div>
  );
}