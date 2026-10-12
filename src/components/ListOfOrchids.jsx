import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteOrchid, getApiErrorMessage, getOrchids } from "../services/orchidApi.js";

export default function ListOfOrchids() {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getOrchids();
      setOrchids(response.data);
      setError("");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (orchid) => {
    if (!window.confirm(`Delete "${orchid.orchidName}"?`)) return;

    try {
      await deleteOrchid(orchid.orchidId);
      setOrchids((current) => current.filter((item) => item.orchidId !== orchid.orchidId));
      setError("");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  };

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">COLLECTION</p>
          <h1>Orchid catalogue</h1>
          <p className="text-secondary mb-0">Manage the orchids in your collection.</p>
        </div>
        <Button as={Link} to="/orchids/new" className="primary-button">
          Add orchid
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="loading-state" role="status">
          <Spinner animation="border" size="sm" />
          <span>Loading orchids…</span>
        </div>
      ) : (
        <div className="table-shell">
          <Table responsive hover className="orchid-table mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Origin</th>
                <th>Attractive</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orchids.map((orchid) => (
                <tr key={orchid.orchidId}>
                  <td className="id-cell">{orchid.orchidId}</td>
                  <td>
                    <div className="orchid-name">{orchid.orchidName}</div>
                    {orchid.orchidDescription && (
                      <div className="orchid-description">{orchid.orchidDescription}</div>
                    )}
                  </td>
                  <td>{orchid.orchidCategory || "—"}</td>
                  <td>
                    <span className={`status-pill ${orchid.natural ? "natural" : "hybrid"}`}>
                      {orchid.natural ? "Natural" : "Hybrid"}
                    </span>
                  </td>
                  <td>{orchid.attractive ? "Yes" : "No"}</td>
                  <td className="text-end text-nowrap">
                    <Button
                      as={Link}
                      to={`/orchids/${orchid.orchidId}/edit`}
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(orchid)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {orchids.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-state">
                    No orchids yet. Add your first orchid to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {!loading && !error && (
        <p className="record-count">{orchids.length} orchid{orchids.length === 1 ? "" : "s"}</p>
      )}
    </section>
  );
}
