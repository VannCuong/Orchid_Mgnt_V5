import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  createOrchid,
  getApiErrorMessage,
  getOrchid,
  updateOrchid,
} from "../services/orchidApi.js";

const emptyForm = {
  orchidName: "",
  natural: false,
  orchidDescription: "",
  orchidCategory: "",
  attractive: false,
  orchidURL: "",
};

export default function EditOrchid({ createMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!createMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (createMode || !id) return undefined;

    let active = true;
    setLoading(true);
    getOrchid(id)
      .then((response) => {
        if (active) setForm({ ...emptyForm, ...response.data });
      })
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [createMode, id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (createMode) {
        await createOrchid(form);
      } else {
        await updateOrchid(id, form);
      }
      navigate("/");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="loading-state">Loading orchid…</p>;

  return (
    <section className="form-page">
      <p className="eyebrow">{createMode ? "NEW RECORD" : `ORCHID #${id}`}</p>
      <h1>{createMode ? "Add an orchid" : "Edit orchid"}</h1>
      <p className="text-secondary mb-4">
        {createMode ? "Add the details for a new orchid." : "Update this orchid's details."}
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="orchid-form">
        <Form.Group className="mb-3" controlId="orchidName">
          <Form.Label>Name <span className="required-mark">*</span></Form.Label>
          <Form.Control
            name="orchidName"
            value={form.orchidName ?? ""}
            onChange={handleChange}
            required
            maxLength={255}
            autoFocus
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="orchidCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="orchidCategory"
            value={form.orchidCategory ?? ""}
            onChange={handleChange}
            maxLength={255}
            placeholder="e.g. Cattleya"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="orchidDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="orchidDescription"
            value={form.orchidDescription ?? ""}
            onChange={handleChange}
            maxLength={1000}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="orchidURL">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="orchidURL"
            value={form.orchidURL ?? ""}
            onChange={handleChange}
            maxLength={255}
            placeholder="https://example.com/orchid.jpg"
          />
        </Form.Group>

        <div className="toggle-row mb-4">
          <Form.Check
            type="switch"
            id="natural"
            name="natural"
            label="Naturally occurring"
            checked={Boolean(form.natural)}
            onChange={handleChange}
          />
          <Form.Check
            type="switch"
            id="attractive"
            name="attractive"
            label="Featured / attractive"
            checked={Boolean(form.attractive)}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2">
          <Button type="submit" className="primary-button" disabled={saving}>
            {saving ? "Saving…" : "Save orchid"}
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </Form>
    </section>
  );
}
